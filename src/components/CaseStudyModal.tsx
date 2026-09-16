import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem } from '../types';
import Modal from './Modal';
import { ExternalLink, Layers, CheckCircle2, Lightbulb, Target, Sparkles, AlertCircle } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenImage?: (src: string, alt: string, caption?: string) => void;
}

export default function CaseStudyModal({
  project,
  isOpen,
  onClose,
  onOpenImage
}: CaseStudyModalProps) {
  const [imgError, setImgError] = useState(false);
  const activeProjectRef = useRef<ProjectItem | null>(project);

  if (project) {
    activeProjectRef.current = project;
  }

  const currentProject = project || activeProjectRef.current;
  if (!currentProject) return null;

  const { caseStudy } = currentProject;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentProject.name}
      subtitle={`Case Study • ${currentProject.nature}`}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-10 text-slate-700 dark:text-slate-200">
        {/* Hero Visual Preview */}
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#080d1a]">
          {!imgError ? (
            <img
              src={project.image}
              alt={project.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-64 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              onClick={() => onOpenImage && onOpenImage(project.image, project.name, `${project.name} - Primary Interface Preview`)}
            />
          ) : (
            <div className="w-full h-64 sm:h-96 flex flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 p-8 text-center">
              <Layers className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
              <span className="text-base font-semibold text-slate-900 dark:text-white">{project.name}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">{project.type}</span>
            </div>
          )}
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-slate-100 border border-slate-700 flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Click to view full preview
          </div>
        </div>

        {/* Quick Meta Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider font-semibold">Project Type</span>
            <span className="text-slate-900 dark:text-white font-medium">{project.type}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider font-semibold">Category</span>
            <span className="text-slate-900 dark:text-white font-medium">{project.categoryLabel}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider font-semibold">Classification</span>
            <span className="text-blue-600 dark:text-blue-300 font-medium">{project.nature}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider font-semibold">Tools Used</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tools.map((tool) => (
                <span key={tool} className="text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/40">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Overview */}
        <section className="space-y-3">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Project Overview
          </h4>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            {caseStudy.overview}
          </p>
        </section>

        {/* 2. Problem & Goal */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" /> The Problem
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold text-sm">
              <Target className="w-4 h-4" /> The Goal
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {caseStudy.goal}
            </p>
          </div>
        </div>

        {/* 3. Target Users & Qualitative Research */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" /> Target Users & Research Insights
          </h4>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block mb-1">Target Audience</span>
            <p className="text-slate-900 dark:text-white text-sm font-medium">{caseStudy.targetUsers}</p>
          </div>
          <div className="space-y-2.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">Key Qualitative Findings</span>
            {caseStudy.researchInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0c1220] p-3 rounded-lg border border-slate-200 dark:border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. User Flow */}
        <section className="space-y-3">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
            User Journey & Information Architecture
          </h4>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            {caseStudy.userFlowSteps.map((step, idx) => (
              <div key={idx} className="text-sm text-blue-800 dark:text-blue-200 font-mono flex items-center gap-2 overflow-x-auto py-1">
                <span>⚡</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Design System */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
            Design System & Aesthetics
          </h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block mb-2">Color Palette</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {caseStudy.designSystem.colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                    <span className="w-8 h-8 rounded-md border border-slate-300 dark:border-slate-700/60 shadow-inner flex-shrink-0" style={{ backgroundColor: c.hex }} />
                    <div className="text-xs">
                      <div className="text-slate-900 dark:text-white font-medium">{c.name}</div>
                      <div className="text-slate-500 dark:text-slate-400 font-mono">{c.hex} • {c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block mb-1">Typography & Visual Tokens</span>
              <p className="text-sm text-slate-700 dark:text-slate-300">{caseStudy.designSystem.typography}</p>
            </div>
          </div>
        </section>

        {/* 6. Key Design Decisions & Development */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Design Decisions</h5>
            <div className="space-y-2">
              {caseStudy.designDecisions.map((dec, idx) => (
                <div key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{dec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Front-End Engineering</h5>
            <div className="space-y-2">
              {caseStudy.developmentNotes.map((note, idx) => (
                <div key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Qualitative Outcome & Learnings */}
        <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-gradient-to-r dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800/40 space-y-4">
          <div>
            <span className="text-xs text-blue-800 dark:text-blue-300 uppercase tracking-wider font-semibold block mb-1">Outcome (Qualitative Impact)</span>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{caseStudy.qualitativeOutcome}</p>
          </div>
          <div className="border-t border-blue-200 dark:border-blue-900/40 pt-3">
            <span className="text-xs text-blue-800 dark:text-blue-300 uppercase tracking-wider font-semibold block mb-1">What I Learned</span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{caseStudy.whatILearned}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Note: This project is structured as a <span className="text-slate-800 dark:text-slate-200 font-semibold">{project.nature}</span>.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-transparent"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
