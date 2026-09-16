import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolio } from '../config/portfolio';
import { ProjectItem } from '../types';
import ProjectCard from './ProjectCard';
import Modal from './Modal';
import { Sparkles, Clock, Layers, Filter, Lock, Plus } from 'lucide-react';

interface ProjectsProps {
  onViewCaseStudy: (project: ProjectItem) => void;
  onOpenImage: (src: string, alt: string, caption?: string) => void;
  projects?: ProjectItem[];
  onOpenAdminUpload?: () => void;
}

export default function Projects({ onViewCaseStudy, onOpenImage, projects, onOpenAdminUpload }: ProjectsProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [comingSoonInfo, setComingSoonInfo] = useState<{ title: string; type: 'live' | 'github' } | null>(null);

  const currentProjectList = projects && projects.length > 0 ? projects : portfolio.projects;

  // Dynamically calculate active categories present in current project list
  // Empty categories (e.g. categories with 0 active projects) are gracefully omitted.
  const filterCategories = useMemo(() => {
    const categoryMap = new Map<string, { label: string; count: number }>();

    currentProjectList.forEach((proj) => {
      const existing = categoryMap.get(proj.category);
      if (existing) {
        existing.count += 1;
      } else {
        categoryMap.set(proj.category, {
          label: proj.categoryLabel || proj.category,
          count: 1,
        });
      }
    });

    const activeList = Array.from(categoryMap.entries()).map(([id, data]) => ({
      id,
      label: data.label,
      count: data.count,
    }));

    return [
      { id: 'all', label: 'All Projects', count: currentProjectList.length },
      ...activeList,
    ];
  }, [currentProjectList]);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return currentProjectList;
    return currentProjectList.filter((p) => p.category === selectedFilter);
  }, [selectedFilter, currentProjectList]);

  const handleShowComingSoon = (title: string, type: 'live' | 'github') => {
    setComingSoonInfo({ title, type });
  };

  return (
    <section id="projects" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs font-mono font-medium text-blue-600 dark:text-blue-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>02 // Portfolio Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Selected Projects
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            <p className="leading-relaxed">
              Detailed interface architectures, modular design systems, and responsive concept implementations crafted with production discipline.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xs font-mono" style={{ color: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))' }}>
                ✦ Self-Initiated & Concept Explorations
              </span>
              {onOpenAdminUpload && (
                <button
                  type="button"
                  id="open-upload-portal-btn"
                  onClick={onOpenAdminUpload}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-semibold shadow-xs transition-all hover:scale-105 cursor-pointer"
                  title="Protected Content Upload System"
                >
                  <Lock className="w-3 h-3" />
                  <span>+ Upload / Add Project</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterCategories.map((category) => {
            const isActive = selectedFilter === category.id;
            return (
              <motion.button
                key={category.id}
                id={`filter-btn-${category.id}`}
                onClick={() => setSelectedFilter(category.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'text-white shadow-lg border-transparent'
                    : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))',
                        boxShadow: '0 8px 20px -2px rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.35)',
                      }
                    : {}
                }
              >
                <span>{category.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid with Smooth Motion Layout Reordering */}
        {filteredProjects.length > 0 ? (
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewCaseStudy={onViewCaseStudy}
                  onOpenImage={onOpenImage}
                  onShowComingSoon={handleShowComingSoon}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto space-y-3 shadow-sm"
          >
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Future Additions Coming Soon</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              New project explorations in this category are currently in development and will appear here shortly.
            </p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline font-mono"
            >
              Reset filter to view all projects
            </button>
          </motion.div>
        )}
      </div>

      {/* Graceful "Coming Soon" Modal (No fake URLs!) */}
      <Modal
        isOpen={comingSoonInfo !== null}
        onClose={() => setComingSoonInfo(null)}
        title="URL Deployment Status"
        subtitle={comingSoonInfo?.title}
        maxWidth="max-w-md"
      >
        <div className="space-y-5 text-slate-700 dark:text-slate-300 text-sm">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base">
                {comingSoonInfo?.type === 'live' ? 'Live Deployment Coming Soon' : 'Public Repository Coming Soon'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                In strict adherence to portfolio authenticity, no mock or placeholder URLs are used.
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The full case study, wireframes, visual design tokens, and technical architecture for <strong className="text-slate-900 dark:text-white">{comingSoonInfo?.title}</strong> are documented comprehensively in the Case Study view.
          </p>

          <button
            onClick={() => setComingSoonInfo(null)}
            className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            Understood
          </button>
        </div>
      </Modal>
    </section>
  );
}
