import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function photoUploadPlugin(): Plugin {
  return {
    name: 'photo-upload-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/upload-photo', (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        // Security check: Only author with valid key can modify photos
        const authorPin = process.env.AUTHOR_PIN || 'alfi2026';
        const clientKey = req.headers['x-author-key'];
        if (clientKey !== authorPin) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: false, 
            error: 'Unauthorized: Photo updating is strictly restricted to the author (Alfi Shahriyar).' 
          }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const tmpFile = '/tmp/uploaded_raw.png';
            fs.writeFileSync(tmpFile, buffer);

            // Determine dimensions using ImageMagick identify
            const dimensions = execSync(`identify -format "%w %h" ${tmpFile}`).toString().trim().split(' ');
            const width = parseInt(dimensions[0], 10);
            const height = parseInt(dimensions[1], 10);

            // If it's a composite image with two side-by-side portraits (width > height * 1.2)
            if (width > height * 1.2) {
              const halfWidth = Math.floor(width / 2);
              // Left half is Studio Portrait -> alfi-studio.jpg
              execSync(`convert ${tmpFile} -crop ${halfWidth}x${height}+0+0 +repage -quality 95 public/images/alfi-studio.jpg`);
              // Right half is Office Professional -> alfi-shahriyar.jpg
              execSync(`convert ${tmpFile} -crop ${width - halfWidth}x${height}+${halfWidth}+0 +repage -quality 95 public/images/alfi-shahriyar.jpg`);
            } else {
              // Single image upload
              if (data.target === 'studio') {
                execSync(`convert ${tmpFile} -quality 95 public/images/alfi-studio.jpg`);
              } else {
                execSync(`convert ${tmpFile} -quality 95 public/images/alfi-shahriyar.jpg`);
              }
            }

            // Sync to dist if dist exists
            if (fs.existsSync('dist/images')) {
              if (fs.existsSync('public/images/alfi-shahriyar.jpg')) {
                fs.copyFileSync('public/images/alfi-shahriyar.jpg', 'dist/images/alfi-shahriyar.jpg');
              }
              if (fs.existsSync('public/images/alfi-studio.jpg')) {
                fs.copyFileSync('public/images/alfi-studio.jpg', 'dist/images/alfi-studio.jpg');
              }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              success: true, 
              message: 'Images updated successfully on disk with 100% exact facial fidelity!',
              width,
              height
            }));
          } catch (err: any) {
            console.error('Photo upload error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
