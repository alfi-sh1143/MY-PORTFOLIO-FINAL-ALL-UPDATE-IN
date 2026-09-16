import React from 'react';
import { motion } from 'motion/react';
import { portfolio } from '../config/portfolio';
import { ProjectItem } from '../types';
import { Layers, ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface CaseStudiesSectionProps {
  onViewCaseStudy: (project: ProjectItem) => void;
  onOpenImage: (src: string, alt: string, caption?: string) => void;
}

interface CaseStudyRowProps {
  key?: React.Key;
  project: ProjectItem;
  idx: number;
  onViewCaseStudy: (project: ProjectItem) => void;
  onOpenImage: (src: string, alt: string, caption?: string) => void;
}

function CaseStudyRow({ project, idx, onViewCaseStudy, onOpenImage }: CaseStudyRowProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ y: -4 }}
      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 shadow-md dark:shadow-xl"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Thumbnail & Trigger */}
        <div className="lg:col-span-5">
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/70 bg-slate-100 dark:bg-[#080d1a] group cursor-pointer shadow-md aspect-[16/10] flex items-center justify-center"
            onClick={() => onOpenImage(project.image, project.name, `${project.name} - Case Study Overview`)}
          >
            {!imgError ? (
              <img
                src={project.image}
                alt={project.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-900 dark:to-blue-950/40">
                <Layers className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-2 opacity-80" />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{project.type}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-slate-900/80 text-xs text-blue-300 font-mono border border-slate-700">
              {project.nature}
            </div>
          </div>
        </div>

        {/* Right: Case Study Story Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
              Case Study 0{idx + 1}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {project.categoryLabel}
            </span>
          </div>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            {project.name}
          </h3>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.caseStudy.overview}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 py-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-slate-200 block mb-1">Target Users</strong>
              {project.caseStudy.targetUsers}
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-slate-200 block mb-1">Impact / Outcome</strong>
              {project.caseStudy.qualitativeOutcome}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onViewCaseStudy(project)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/25 transition-all hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              Read Full Case Study
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesSection({
  onViewCaseStudy,
  onOpenImage
}: CaseStudiesSectionProps) {
  return (
    <section id="case-studies" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#060a14]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-cyan-400 uppercase block mb-2">
              10 // In-Depth Analysis
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              UX Case Studies
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            End-to-end design rationales from user problem identification to information architecture, visual design systems, and front-end engineering notes.
          </p>
        </div>

        {/* Featured In-Depth Case Study Showcase Cards */}
        <div className="space-y-8">
          {portfolio.projects.map((project, idx) => (
            <CaseStudyRow
              key={project.id}
              project={project}
              idx={idx}
              onViewCaseStudy={onViewCaseStudy}
              onOpenImage={onOpenImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
