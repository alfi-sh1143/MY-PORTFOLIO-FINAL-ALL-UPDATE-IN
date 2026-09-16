import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Configurable Secrets
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '5101143';
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const PROJECTS_FILE = path.join(DATA_DIR, 'custom_projects.json');
const REGISTRY_FILE = path.join(DATA_DIR, 'uploads_registry.json');

// Ensure necessary directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(REGISTRY_FILE)) {
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify([], null, 2));
}

// Security: Session Cache & Rate Limiting (In-memory)
interface SessionInfo {
  token: string;
  createdAt: number;
  expiresAt: number;
}
const activeSessions = new Map<string, SessionInfo>();

interface RateLimitTracker {
  attempts: number;
  firstAttempt: number;
  lockedUntil?: number;
}
const rateLimitMap = new Map<string, RateLimitTracker>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes window
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown-ip';
}

function checkRateLimit(ip: string): { allowed: boolean; waitSeconds?: number; remaining?: number } {
  const now = Date.now();
  const tracker = rateLimitMap.get(ip);

  if (!tracker) {
    rateLimitMap.set(ip, { attempts: 0, firstAttempt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  // Check lockout
  if (tracker.lockedUntil && tracker.lockedUntil > now) {
    const waitSeconds = Math.ceil((tracker.lockedUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  // Reset window if expired
  if (now - tracker.firstAttempt > WINDOW_MS) {
    tracker.attempts = 0;
    tracker.firstAttempt = now;
    delete tracker.lockedUntil;
  }

  if (tracker.attempts >= MAX_ATTEMPTS) {
    tracker.lockedUntil = now + LOCKOUT_MS;
    const waitSeconds = Math.ceil(LOCKOUT_MS / 1000);
    return { allowed: false, waitSeconds };
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - tracker.attempts };
}

function recordFailedAttempt(ip: string): number {
  const tracker = rateLimitMap.get(ip) || { attempts: 0, firstAttempt: Date.now() };
  tracker.attempts += 1;
  const remaining = Math.max(0, MAX_ATTEMPTS - tracker.attempts);
  if (remaining === 0) {
    tracker.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  rateLimitMap.set(ip, tracker);
  return remaining;
}

function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

// Authentication Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const directPassword = req.headers['x-admin-password'];

  // Direct password check (if provided in header)
  if (typeof directPassword === 'string' && directPassword === ADMIN_PASSWORD) {
    return next();
  }

  // Bearer Token check
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = activeSessions.get(token);

    if (session && session.expiresAt > Date.now()) {
      return next();
    }
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized: Valid admin verification required.',
    requiresAuth: true
  });
}

// Multer Storage Configuration for Local PC Uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, safeExt)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 50);
    const uniqueSuffix = `${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    cb(null, `${cleanBase}_${uniqueSuffix}${safeExt}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 35 * 1024 * 1024 // 35 MB max
  },
  fileFilter: (_req, file, cb) => {
    const allowedExtensions = [
      '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif',
      '.pdf', '.docx', '.doc', '.zip', '.txt'
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${ext} not allowed. Supported formats: images, PDF, DOCX, ZIP.`));
    }
  }
});

// JSON & Body Parsing
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ extended: true, limit: '40mb' }));

// Serve static upload folders directly
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 1. Password Verification & Token Minting
app.post('/api/auth/verify', (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const rateLimitStatus = checkRateLimit(ip);

  if (!rateLimitStatus.allowed) {
    return res.status(429).json({
      success: false,
      error: `Security Lockout: Too many failed passcode attempts. Please wait ${rateLimitStatus.waitSeconds} seconds before retrying.`,
      lockout: true,
      waitSeconds: rateLimitStatus.waitSeconds
    });
  }

  const { password } = req.body;

  if (typeof password !== 'string' || !password) {
    return res.status(400).json({
      success: false,
      error: 'Password is required.'
    });
  }

  // Constant-time comparison to prevent timing attacks
  const passwordBuffer = Buffer.from(password);
  const targetBuffer = Buffer.from(ADMIN_PASSWORD);

  const isValid =
    passwordBuffer.length === targetBuffer.length &&
    crypto.timingSafeEqual(passwordBuffer, targetBuffer);

  if (!isValid) {
    const remaining = recordFailedAttempt(ip);
    return res.status(401).json({
      success: false,
      error: remaining > 0
        ? `Access Denied: Invalid security passcode. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`
        : 'Access Denied: Maximum attempts exceeded. Vault is locked for 15 minutes.',
      remainingAttempts: remaining
    });
  }

  // Success: Reset rate limits & Mint session token
  resetRateLimit(ip);
  const token = crypto.randomBytes(32).toString('hex');
  const sessionDuration = 4 * 60 * 60 * 1000; // 4 hours
  const sessionInfo: SessionInfo = {
    token,
    createdAt: Date.now(),
    expiresAt: Date.now() + sessionDuration
  };

  activeSessions.set(token, sessionInfo);

  return res.json({
    success: true,
    token,
    expiresAt: sessionInfo.expiresAt,
    message: 'Security Verification Successful. Admin session unlocked.'
  });
});

// Check Session Status
app.get('/api/auth/check', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = activeSessions.get(token);
    if (session && session.expiresAt > Date.now()) {
      return res.json({ success: true, authenticated: true, expiresAt: session.expiresAt });
    }
  }
  return res.json({ success: true, authenticated: false });
});

// Logout / Lock Vault
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
  }
  return res.json({ success: true, message: 'Vault locked and session destroyed.' });
});

// 2. Dynamic Projects Endpoint
app.get('/api/projects', (_req: Request, res: Response) => {
  try {
    let customProjects = [];
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      customProjects = JSON.parse(data || '[]');
    }
    return res.json({
      success: true,
      customProjects
    });
  } catch (err: any) {
    console.error('Error fetching custom projects:', err);
    return res.status(500).json({ success: false, error: 'Failed to read custom projects.' });
  }
});

// Add New Project (Protected)
app.post('/api/projects', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const projectData = req.body;

    if (!projectData.name || !projectData.shortDescription) {
      return res.status(400).json({
        success: false,
        error: 'Project name and description are required.'
      });
    }

    let existingProjects: any[] = [];
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      existingProjects = JSON.parse(data || '[]');
    }

    const newProject = {
      id: projectData.id || `custom-proj-${Date.now()}`,
      name: String(projectData.name).trim(),
      type: projectData.type || 'Web Application & Product Design',
      category: projectData.category || 'ui-ux',
      categoryLabel: projectData.categoryLabel || 'Custom Project',
      nature: projectData.nature || 'Self-Initiated Concept',
      shortDescription: String(projectData.shortDescription).trim(),
      status: projectData.status || 'Active & Published',
      tools: Array.isArray(projectData.tools) ? projectData.tools : ['React', 'TypeScript', 'Tailwind CSS'],
      image: projectData.image || '/images/og-image.jpg',
      liveUrl: projectData.liveUrl ? String(projectData.liveUrl).trim() : null,
      githubUrl: projectData.githubUrl ? String(projectData.githubUrl).trim() : null,
      documentUrl: projectData.documentUrl ? String(projectData.documentUrl).trim() : null,
      createdAt: new Date().toISOString(),
      caseStudy: projectData.caseStudy || {
        overview: projectData.shortDescription,
        problem: 'Designing an optimized and accessible interface tailored to user requirements.',
        goal: 'Deliver a high-fidelity, high-performance responsive solution.',
        targetUsers: 'Modern web users, developers, and product teams.',
        researchInsights: [
          'User testing indicated high demand for seamless interactions and intuitive visual hierarchy.',
          'Responsive design across mobile and desktop reduces friction significantly.'
        ],
        userFlowSteps: [
          '1. Initial landing & value exploration',
          '2. Interactive content engagement',
          '3. Action completion & asset export'
        ],
        designSystem: {
          colors: [
            { name: 'Accent Primary', hex: '#2563eb', role: 'Primary actions and highlights' },
            { name: 'Canvas Dark', hex: '#070a12', role: 'Background surface' }
          ],
          typography: 'Plus Jakarta Sans for high-contrast legibility',
          principles: ['Zero CLS', 'WCAG AA Compliance', 'Subtle Motion Micro-Interactions']
        },
        designDecisions: [
          'Implemented responsive layouts with full keyboard accessibility.',
          'Added custom state feedback for all interactive controls.'
        ],
        developmentNotes: [
          'Built with modern modular components and strict TypeScript typing.',
          'Integrated secure client-side and server-side validation.'
        ],
        qualitativeOutcome: 'A polished, production-ready implementation meeting all UX and engineering standards.',
        whatILearned: 'Deeper appreciation for rapid prototyping combined with strict security and authentication gating.'
      }
    };

    // Prepend to list so newest appears first
    existingProjects.unshift(newProject);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(existingProjects, null, 2));

    return res.status(201).json({
      success: true,
      message: 'Project published successfully!',
      project: newProject
    });
  } catch (err: any) {
    console.error('Error saving project:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to save project.' });
  }
});

// Delete Project (Protected)
app.delete('/api/projects/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!fs.existsSync(PROJECTS_FILE)) {
      return res.status(404).json({ success: false, error: 'No custom projects file found.' });
    }

    const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    let existingProjects: any[] = JSON.parse(data || '[]');

    const initialLength = existingProjects.length;
    existingProjects = existingProjects.filter(p => p.id !== id);

    if (existingProjects.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }

    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(existingProjects, null, 2));
    return res.json({ success: true, message: 'Project removed successfully.' });
  } catch (err: any) {
    console.error('Error deleting project:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete project.' });
  }
});

// 3. Protected Content Upload System: Local PC Files OR Google Drive Links
app.post('/api/upload', requireAdminAuth, (req: Request, res: Response) => {
  // Check if it's a Google Drive link submission (JSON)
  if (req.is('application/json') || req.body.uploadType === 'google-drive') {
    const { driveUrl, fileName, description, category } = req.body;

    if (!driveUrl || typeof driveUrl !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Google Drive URL is required.'
      });
    }

    // Extract Google Drive File ID
    // Matches: https://drive.google.com/file/d/FILE_ID/view... OR id=FILE_ID
    const driveRegex = /(?:id=|\/d\/|folders\/)([a-zA-Z0-9_-]{25,})/;
    const match = driveUrl.match(driveRegex);

    if (!match || !match[1]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Google Drive link. Please provide a standard shareable Google Drive link (e.g. https://drive.google.com/file/d/.../view).'
      });
    }

    const driveId = match[1];
    // Generate high-resolution embed and preview links
    const previewUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    const directViewUrl = `https://drive.google.com/uc?export=view&id=${driveId}`;

    const record = {
      id: `drive-${Date.now()}`,
      name: fileName || `Google Drive Document (${driveId.slice(0, 8)})`,
      type: 'google-drive',
      category: category || 'document',
      originalUrl: driveUrl,
      previewUrl,
      directUrl: directViewUrl,
      driveId,
      description: description || 'Google Drive linked asset',
      uploadedAt: new Date().toISOString()
    };

    let registry: any[] = [];
    if (fs.existsSync(REGISTRY_FILE)) {
      registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8') || '[]');
    }
    registry.unshift(record);
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));

    return res.json({
      success: true,
      message: 'Google Drive link verified and registered successfully!',
      file: record
    });
  }

  // Otherwise handle via multer multipart upload
  upload.single('file')(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message || 'File upload error.'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file was provided in the upload request.'
      });
    }

    const file = req.file;
    const isImage = file.mimetype.startsWith('image/');
    const fileUrl = `/uploads/${file.filename}`;

    // Mirror to dist/uploads if dist exists for production build consistency
    const distUploads = path.join(process.cwd(), 'dist', 'uploads');
    if (fs.existsSync(distUploads)) {
      try {
        fs.copyFileSync(file.path, path.join(distUploads, file.filename));
      } catch (copyErr) {
        console.warn('Could not mirror file to dist/uploads:', copyErr);
      }
    }

    const record = {
      id: `local-${Date.now()}`,
      name: req.body.customName || file.originalname,
      originalName: file.originalname,
      filename: file.filename,
      type: isImage ? 'image' : 'document',
      mimeType: file.mimetype,
      size: file.size,
      url: fileUrl,
      category: req.body.category || (isImage ? 'screenshot' : 'document'),
      uploadedAt: new Date().toISOString()
    };

    let registry: any[] = [];
    if (fs.existsSync(REGISTRY_FILE)) {
      registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8') || '[]');
    }
    registry.unshift(record);
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));

    return res.json({
      success: true,
      message: 'File successfully uploaded and stored on secure disk!',
      file: record
    });
  });
});

// Uploads Registry Listing (Protected)
app.get('/api/uploads', requireAdminAuth, (_req: Request, res: Response) => {
  try {
    let registry = [];
    if (fs.existsSync(REGISTRY_FILE)) {
      registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8') || '[]');
    }
    return res.json({ success: true, files: registry });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Failed to read uploads registry.' });
  }
});

// Delete Upload Record & File (Protected)
app.delete('/api/uploads/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!fs.existsSync(REGISTRY_FILE)) {
      return res.status(404).json({ success: false, error: 'Registry not found.' });
    }

    const registry: any[] = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8') || '[]');
    const targetIndex = registry.findIndex(f => f.id === id);

    if (targetIndex === -1) {
      return res.status(404).json({ success: false, error: 'File record not found.' });
    }

    const fileRecord = registry[targetIndex];

    // If local file, remove from disk
    if (fileRecord.filename) {
      const diskPath = path.join(UPLOADS_DIR, fileRecord.filename);
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath);
        } catch (unlinkErr) {
          console.warn('Could not delete disk file:', unlinkErr);
        }
      }
    }

    registry.splice(targetIndex, 1);
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));

    return res.json({ success: true, message: 'Upload removed from registry and disk.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Failed to delete upload.' });
  }
});

// 4. Legacy Author Photo Updater (Protected by AUTHOR_PIN or ADMIN_PASSWORD)
app.post('/api/upload-photo', (req: Request, res: Response) => {
  const authorPin = process.env.AUTHOR_PIN || 'alfi2026';
  const clientKey = req.headers['x-author-key'] || req.headers['x-admin-password'];

  if (clientKey !== authorPin && clientKey !== ADMIN_PASSWORD) {
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Photo updating is restricted to the author.'
    });
  }

  try {
    const { image, target } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, error: 'Image data is required.' });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const tmpFile = '/tmp/uploaded_raw.png';
    fs.writeFileSync(tmpFile, buffer);

    const dimensions = execSync(`identify -format "%w %h" ${tmpFile}`).toString().trim().split(' ');
    const width = parseInt(dimensions[0], 10);
    const height = parseInt(dimensions[1], 10);

    if (width > height * 1.2) {
      const halfWidth = Math.floor(width / 2);
      execSync(`convert ${tmpFile} -crop ${halfWidth}x${height}+0+0 +repage -quality 95 public/images/alfi-studio.jpg`);
      execSync(`convert ${tmpFile} -crop ${width - halfWidth}x${height}+${halfWidth}+0 +repage -quality 95 public/images/alfi-shahriyar.jpg`);
    } else {
      if (target === 'studio') {
        execSync(`convert ${tmpFile} -quality 95 public/images/alfi-studio.jpg`);
      } else {
        execSync(`convert ${tmpFile} -quality 95 public/images/alfi-shahriyar.jpg`);
      }
    }

    if (fs.existsSync('dist/images')) {
      if (fs.existsSync('public/images/alfi-shahriyar.jpg')) {
        fs.copyFileSync('public/images/alfi-shahriyar.jpg', 'dist/images/alfi-shahriyar.jpg');
      }
      if (fs.existsSync('public/images/alfi-studio.jpg')) {
        fs.copyFileSync('public/images/alfi-studio.jpg', 'dist/images/alfi-studio.jpg');
      }
    }

    return res.json({
      success: true,
      message: 'Images updated successfully on disk with exact facial fidelity!',
      width,
      height
    });
  } catch (err: any) {
    console.error('Photo upload error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Static Serving Setup
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: HOST,
        port: PORT
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Vault Server] Backend server running securely on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Vault Server] Failed to start server:', err);
});
