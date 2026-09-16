import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../types';
import { Layers, ArrowUpRight, Github, ExternalLink, Sparkles, Clock, Eye, Code2, FileText } from 'lucide-react';

interface ProjectCardProps {
  key?: React.Key;
  project: ProjectItem;
  onViewCaseStudy: (project: ProjectItem) => void;
  onOpenImage: (src: string, alt: string, caption?: string) => void;
  onShowComingSoon: (title: string, type: 'live' | 'github') => void;
}

export default function ProjectCard({
  project,
  onViewCaseStudy,
  onOpenImage,
  onShowComingSoon
}: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 220 }}
      whileHover={{ y: -6, scale: 1.012 }}
      className="group relative rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/20 dark:hover:shadow-blue-950/30 light:hover:shadow-blue-500/10 flex flex-col justify-between"
      style={{
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div>
        {/* Project Image Banner with Lightbox Trigger */}
        <div
          className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#070d18] dark:bg-[#070d18] light:bg-slate-100 cursor-pointer"
          onClick={() => onOpenImage(project.image, project.name, `${project.name} - ${project.type}`)}
        >
          {!imgError ? (
            <img
              src={project.image}
              alt={project.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 p-6 text-center">
              <Layers className="w-10 h-10 text-blue-400 mb-2 opacity-80" />
              <span className="text-sm font-semibold text-white dark:text-white light:text-slate-900">{project.name}</span>
              <span className="text-xs text-slate-400 mt-1">{project.type}</span>
            </div>
          )}
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] dark:from-[#0b1120] light:from-white/30 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Classification Badge (Top Left) */}
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#070e1e]/90 dark:bg-[#070e1e]/90 light:bg-white/95 backdrop-blur-md text-blue-400 dark:text-blue-300 light:text-blue-700 border border-blue-900/60 dark:border-blue-900/60 light:border-blue-200 shadow-md">
              {project.nature}
            </span>
          </div>

          {/* Hover zoom cue (Top Right) */}
          <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 dark:bg-black/75 light:bg-white/90 p-2 rounded-lg text-slate-300 dark:text-slate-300 light:text-slate-800 text-xs border border-slate-700 dark:border-slate-700 light:border-slate-300 flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            Zoom
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs font-mono font-medium uppercase tracking-wide"
                style={{ color: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))' }}
              >
                {project.categoryLabel}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-700 flex items-center gap-1.5 bg-emerald-950/40 dark:bg-emerald-950/40 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-900/40 dark:border-emerald-900/40 light:border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600" />
                {project.status}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
              {project.name}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium">
              {project.type}
            </p>
          </div>

          <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Technical Stack Pills */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400 dark:text-slate-400 light:text-slate-500">
              <Code2 className="w-3 h-3 text-blue-400" />
              <span>Technical Stack & Architecture</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 mt-4">
        <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
          {/* View Case Study Button */}
          <motion.button
            id={`case-study-btn-${project.id}`}
            onClick={() => onViewCaseStudy(project)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-xs font-semibold shadow-md transition-all"
            style={{
              backgroundColor: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))',
              boxShadow: '0 4px 15px -2px rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.35)',
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            Explore Case Study
          </motion.button>

          {/* Secondary links */}
          <div className="flex items-center gap-2">
            {project.documentUrl && (
              <a
                href={project.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Attached document for ${project.name}`}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-blue-400 dark:text-blue-400 light:text-blue-600 hover:text-white dark:hover:text-white text-xs font-medium border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors"
                title="Attached Document / Specification"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Doc</span>
              </a>
            )}

            {project.liveUrl ? (
              <a
                id={`live-btn-${project.id}`}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.name}`}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 hover:text-white dark:hover:text-white text-xs font-medium border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors"
                title="Open Live Deployment"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live</span>
              </a>
            ) : (
              <motion.button
                id={`live-btn-${project.id}`}
                onClick={() => onShowComingSoon(project.name, 'live')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Live concept demo for ${project.name}`}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 text-xs font-medium border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors cursor-pointer"
                title="Live concept deployment status"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Concept</span>
              </motion.button>
            )}

            {project.githubUrl ? (
              <a
                id={`github-btn-${project.id}`}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repository for ${project.name}`}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 hover:text-white dark:hover:text-white text-xs font-medium border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Repo</span>
              </a>
            ) : (
              <motion.button
                id={`github-btn-${project.id}`}
                onClick={() => onShowComingSoon(project.name, 'github')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Repository for ${project.name}`}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 text-xs font-medium border border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors cursor-pointer"
                title="Repository status"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Repo</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
