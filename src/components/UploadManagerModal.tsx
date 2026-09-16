import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import {
  Upload,
  FolderGit2,
  FileText,
  Link,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Shield,
  LogOut,
  X,
  FileCheck,
  AlertCircle,
  Copy,
  Layers,
  Sparkles,
  RefreshCw,
  FolderOpen,
  Image as ImageIcon,
  Database
} from 'lucide-react';

interface UploadManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  onLogout: () => void;
  onProjectAdded: (project: ProjectItem) => void;
  onProjectDeleted: (projectId: string) => void;
  customProjects: ProjectItem[];
}

export default function UploadManagerModal({
  isOpen,
  onClose,
  token,
  onLogout,
  onProjectAdded,
  onProjectDeleted,
  customProjects
}: UploadManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'new-project' | 'file-upload' | 'manage'>('new-project');

  // New Project Form State
  const [projectName, setProjectName] = useState('');
  const [projectCategory, setProjectCategory] = useState<ProjectItem['category']>('ui-ux');
  const [categoryLabel, setCategoryLabel] = useState('UI/UX Design');
  const [nature, setNature] = useState('Self-Initiated Concept');
  const [shortDescription, setShortDescription] = useState('');
  const [tools, setTools] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);
  const [toolInput, setToolInput] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [imageSourceType, setImageSourceType] = useState<'local' | 'drive' | 'url'>('local');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Case Study extra fields
  const [overview, setOverview] = useState('');
  const [problem, setProblem] = useState('');
  const [goal, setGoal] = useState('');
  const [targetUsers, setTargetUsers] = useState('');

  // Status and feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // File & Drive Upload Tab State
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [driveFileName, setDriveFileName] = useState('');
  const [isIngestingDrive, setIsIngestingDrive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch uploads registry when modal or tab opens
  const fetchUploads = async () => {
    if (!token) return;
    setIsLoadingFiles(true);
    try {
      const res = await fetch('/api/uploads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.files)) {
          setUploadedFiles(data.files);
        }
      }
    } catch (err) {
      console.warn('Could not fetch uploads:', err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchUploads();
    }
  }, [isOpen, token, activeTab]);

  // Handle Tag Addition
  const handleAddTool = () => {
    if (toolInput.trim() && !tools.includes(toolInput.trim())) {
      setTools([...tools, toolInput.trim()]);
      setToolInput('');
    }
  };

  const handleRemoveTool = (tagToRemove: string) => {
    setTools(tools.filter((t) => t !== tagToRemove));
  };

  // Upload Local File from PC
  const handleFileUpload = async (file: File, isForProjectImage = false) => {
    if (!token) return;
    if (isForProjectImage) setIsUploadingImage(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('customName', file.name);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isForProjectImage) {
          setImageUrl(data.file.url);
          setSuccessMessage(`Image "${file.name}" uploaded successfully!`);
        } else {
          setSuccessMessage(`File "${file.name}" uploaded successfully!`);
          fetchUploads();
        }
      } else {
        setErrorMessage(data.error || 'Failed to upload file.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with upload server.');
    } finally {
      if (isForProjectImage) setIsUploadingImage(false);
    }
  };

  // Ingest Google Drive Link
  const handleIngestGoogleDrive = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!driveUrlInput.trim() || !token) return;

    setIsIngestingDrive(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          uploadType: 'google-drive',
          driveUrl: driveUrlInput.trim(),
          fileName: driveFileName.trim() || undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('Google Drive link registered and verified successfully!');
        setDriveUrlInput('');
        setDriveFileName('');
        fetchUploads();
      } else {
        setErrorMessage(data.error || 'Invalid Google Drive link format.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to register Google Drive link.');
    } finally {
      setIsIngestingDrive(false);
    }
  };

  // Submit New Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !shortDescription.trim() || !token) {
      setErrorMessage('Please fill in the project title and description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const newProjectPayload: Partial<ProjectItem> = {
      id: `custom-${Date.now()}`,
      name: projectName.trim(),
      type: `${categoryLabel} • Dynamic Production Project`,
      category: projectCategory,
      categoryLabel: categoryLabel,
      nature: nature,
      shortDescription: shortDescription.trim(),
      status: 'Active & Deployed',
      tools: tools.length > 0 ? tools : ['React', 'TypeScript'],
      image: imageUrl.trim() || '/images/og-image.jpg',
      liveUrl: liveUrl.trim() || null,
      githubUrl: githubUrl.trim() || null,
      documentUrl: documentUrl.trim() || null,
      isCustom: true,
      caseStudy: {
        overview: overview.trim() || shortDescription.trim(),
        problem: problem.trim() || 'Balancing complex functional requirements with responsive, accessible usability.',
        goal: goal.trim() || 'Engineer a clean, modular solution with high-contrast aesthetic and responsive interactions.',
        targetUsers: targetUsers.trim() || 'Modern web users, developers, and product stakeholders.',
        researchInsights: [
          'Direct user feedback highlighted need for fluid workflows and low cognitive load.',
          'Responsive visual feedback reduces task completion friction by 40%.'
        ],
        userFlowSteps: [
          '1. Discovery & project exploration',
          '2. Interactive engagement & feature execution',
          '3. Result verification & asset output'
        ],
        designSystem: {
          colors: [
            { name: 'Accent Primary', hex: '#2563eb', role: 'Main interaction highlight' },
            { name: 'Canvas Dark', hex: '#070a12', role: 'Primary background surface' }
          ],
          typography: 'Plus Jakarta Sans for sharp contrast and modern rhythm',
          principles: ['High Accessibility', 'Micro-Interactions', 'Zero Cumulative Layout Shift']
        },
        designDecisions: [
          'Designed modular components for maximum maintainability and fast re-renders.',
          'Employed strict client-side & server-side validation.'
        ],
        developmentNotes: [
          'Configured with TypeScript interfaces for end-to-end type safety.',
          'Protected by authenticated backend verification gate.'
        ],
        qualitativeOutcome: 'Successfully deployed and rendered with full interactive fidelity.',
        whatILearned: 'Seamless dynamic project ingestion while maintaining strict authentication security.'
      }
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProjectPayload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Project "${projectName}" published to your portfolio!`);
        onProjectAdded(data.project);

        // Reset form
        setProjectName('');
        setShortDescription('');
        setLiveUrl('');
        setGithubUrl('');
        setDocumentUrl('');
        setImageUrl('');
        setOverview('');
        setProblem('');
        setGoal('');
        setTargetUsers('');
      } else {
        setErrorMessage(data.error || 'Failed to create project.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Custom Project
  const handleDeleteProject = async (projectId: string) => {
    if (!token || !window.confirm('Are you sure you want to permanently delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        onProjectDeleted(projectId);
        setSuccessMessage('Project successfully deleted.');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to delete project.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error deleting project.');
    }
  };

  // Delete Uploaded File
  const handleDeleteFile = async (fileId: string) => {
    if (!token || !window.confirm('Delete this uploaded file/document?')) return;
    try {
      const res = await fetch(`/api/uploads/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSuccessMessage('File deleted from server.');
        fetchUploads();
      }
    } catch (err: any) {
      setErrorMessage('Could not delete file.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Top Decorative Bar */}
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shrink-0" />

          {/* Modal Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white">
                    Portfolio Admin & Upload Studio
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-medium">
                    Vault Unlocked
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protected Content Uploads, Google Drive Ingestion & Project Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
                title="Lock Vault & Revoke Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Vault</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 shrink-0 px-6 bg-slate-100/60 dark:bg-slate-900/60">
            <button
              onClick={() => setActiveTab('new-project')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'new-project'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Project
            </button>
            <button
              onClick={() => setActiveTab('file-upload')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'file-upload'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              PC & Google Drive Uploads
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'manage'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              Manage Projects ({customProjects.length})
            </button>
          </div>

          {/* Alert Banners */}
          <div className="px-6 pt-4 shrink-0">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mb-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
                <button onClick={() => setSuccessMessage(null)} className="cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mb-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button onClick={() => setErrorMessage(null)} className="cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Tab 1: New Project Form */}
          {activeTab === 'new-project' && (
            <form onSubmit={handleCreateProject} className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Project Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. NextGen FinTech Banking Dashboard"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={projectCategory}
                    onChange={(e) => {
                      const val = e.target.value as ProjectItem['category'];
                      setProjectCategory(val);
                      const map: Record<string, string> = {
                        'ui-ux': 'UI/UX Design',
                        'web-design': 'Web Design & Systems',
                        frontend: 'Front-End Engineering',
                        'ai-ml': 'AI / Machine Learning',
                        cybersecurity: 'Cybersecurity & Defense',
                        mobile: 'Mobile Applications',
                        creative: 'Creative & Experimental'
                      };
                      setCategoryLabel(map[val] || 'Project');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="web-design">Web Design & Systems</option>
                    <option value="frontend">Front-End Engineering</option>
                    <option value="ai-ml">AI / Machine Learning</option>
                    <option value="cybersecurity">Cybersecurity & Systems</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="creative">Creative & Game Dev</option>
                  </select>
                </div>
              </div>

              {/* Nature & Short Description */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Nature / Origin
                  </label>
                  <input
                    type="text"
                    value={nature}
                    onChange={(e) => setNature(e.target.value)}
                    placeholder="e.g. Self-Initiated Concept, Client Project, Academic Research"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Custom GitHub Repository Link
                  </label>
                  <div className="relative">
                    <FolderGit2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/alfi-shahriyar/your-repo"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A concise, high-impact summary of this project's purpose and key value proposition..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Links: Live URL & Document / Google Drive Link */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Live Demo / Web Link
                  </label>
                  <div className="relative">
                    <Link className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://my-app.vercel.app"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Attached Document or Google Drive Link
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={documentUrl}
                      onChange={(e) => setDocumentUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/.../view or /uploads/spec.pdf"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Screenshot / Featured Image Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    Project Screenshot / Cover Asset
                  </span>
                  <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-[11px]">
                    <button
                      type="button"
                      onClick={() => setImageSourceType('local')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        imageSourceType === 'local'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Local PC File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceType('drive')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        imageSourceType === 'drive'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Google Drive Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceType('url')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        imageSourceType === 'url'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Custom URL
                    </button>
                  </div>
                </div>

                {imageSourceType === 'local' && (
                  <div>
                    <input
                      type="file"
                      ref={projectImageInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], true);
                        }
                      }}
                    />
                    <div
                      onClick={() => projectImageInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/50 dark:bg-slate-900/50"
                    >
                      {isUploadingImage ? (
                        <div className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 py-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Uploading image from local PC...</span>
                        </div>
                      ) : imageUrl ? (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono truncate max-w-sm">
                            ✓ Uploaded: {imageUrl}
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 underline font-medium">
                            Replace Image
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Upload className="w-5 h-5 mx-auto text-slate-400" />
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            Click to select screenshot image from local PC
                          </p>
                          <p className="text-[11px] text-slate-400">PNG, JPG, WebP or SVG up to 35MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {imageSourceType === 'drive' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste shareable Google Drive image link (e.g. https://drive.google.com/file/d/.../view)"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                    />
                    <p className="text-[11px] text-slate-400">
                      The system converts Google Drive file links into direct rendering links automatically.
                    </p>
                  </div>
                )}

                {imageSourceType === 'url' && (
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /images/my-project.jpg"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                  />
                )}
              </div>

              {/* Tools & Tech Stack */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tech Stack & Tools
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTool();
                      }
                    }}
                    placeholder="Add tool (e.g. Next.js, Figma, Python) and press Enter"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    Add Tool
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(tag)}
                        className="hover:text-rose-500 cursor-pointer ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Publish Project to Portfolio
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: PC Files & Google Drive Ingestion */}
          {activeTab === 'file-upload' && (
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 1. Local PC Drag and Drop Zone */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                    <Upload className="w-4 h-4 text-blue-500" />
                    Local PC File Upload
                  </h3>

                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach((file) => handleFileUpload(file as File));
                      }
                    }}
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files) {
                        Array.from(e.dataTransfer.files).forEach((file) => handleFileUpload(file as File));
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-300 dark:border-slate-700 hover:border-blue-500/80 bg-slate-50/50 dark:bg-slate-900/50'
                    }`}
                  >
                    <Upload className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Drop files here or click to browse
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Screenshots (PNG, JPG, WebP), Documents (PDF, DOCX, ZIP) up to 35MB
                    </p>
                  </div>
                </div>

                {/* 2. Google Drive Link Ingestion Zone */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                    <FileCheck className="w-4 h-4 text-indigo-500" />
                    Google Drive Link Ingestion
                  </h3>

                  <form onSubmit={handleIngestGoogleDrive} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Google Drive Share Link
                      </label>
                      <input
                        type="url"
                        required
                        value={driveUrlInput}
                        onChange={(e) => setDriveUrlInput(e.target.value)}
                        placeholder="https://drive.google.com/file/d/1a2B3c.../view?usp=sharing"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Custom Label (Optional)
                      </label>
                      <input
                        type="text"
                        value={driveFileName}
                        onChange={(e) => setDriveFileName(e.target.value)}
                        placeholder="e.g. Federated Learning Thesis Document"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isIngestingDrive || !driveUrlInput}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isIngestingDrive ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      Verify & Ingest Google Drive Asset
                    </button>
                  </form>
                </div>
              </div>

              {/* Uploaded Files Table */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                    Stored Assets & Registered Documents ({uploadedFiles.length})
                  </h4>
                  <button
                    onClick={fetchUploads}
                    disabled={isLoadingFiles}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                    title="Refresh list"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {uploadedFiles.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
                    No files or drive assets registered yet. Upload a local file or ingest a Google Drive link above.
                  </p>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {file.type === 'google-drive' ? (
                            <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                              <FileCheck className="w-4 h-4" />
                            </span>
                          ) : (
                            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                              <ImageIcon className="w-4 h-4" />
                            </span>
                          )}
                          <div className="truncate">
                            <p className="font-semibold text-slate-900 dark:text-white truncate">
                              {file.name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono truncate">
                              {file.type === 'google-drive' ? file.originalUrl : file.url}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(file.url || file.previewUrl || file.originalUrl, file.id)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                            title="Copy Link"
                          >
                            {copiedId === file.id ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <a
                            href={file.url || file.previewUrl || file.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDeleteFile(file.id)}
                            className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Manage Projects */}
          {activeTab === 'manage' && (
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Dynamic Portfolio Projects
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Projects added via the Protected Content Upload System are rendered live on your portfolio.
                  </p>
                </div>
              </div>

              {customProjects.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <Database className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    No custom dynamic projects added yet.
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Click "Add New Project" above to publish your first dynamic project or document.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {customProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={proj.image}
                          alt={proj.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/og-image.jpg';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {proj.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono shrink-0">
                              {proj.categoryLabel || proj.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md mt-0.5">
                            {proj.shortDescription}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono"
                              >
                                <FolderGit2 className="w-3 h-3" /> GitHub
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                              >
                                <ExternalLink className="w-3 h-3" /> Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
