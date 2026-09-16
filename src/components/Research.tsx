import React, { useState } from 'react';
import { motion } from 'motion/react';
import { portfolio } from '../config/portfolio';
import Modal from './Modal';
import { Shield, Cpu, Network, Lock, Zap, Eye, ChevronRight, CheckCircle, Info } from 'lucide-react';

interface ResearchProps {
  onOpenImage: (src: string, alt: string, caption?: string) => void;
}

export default function Research({ onOpenImage }: ResearchProps) {
  const { research } = portfolio;
  const [activePillarModal, setActivePillarModal] = useState<{ title: string; description: string } | null>(null);
  const [diagramError, setDiagramError] = useState(false);

  return (
    <section id="research" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070b14]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 dark:text-cyan-400 uppercase mb-2">
              <Shield className="w-3.5 h-3.5" /> 03 // Academic Research
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Research & Technology
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 inline-block mb-2">
              {research.category}
            </span>
            <p className="leading-relaxed">
              Investigating distributed, privacy-preserving machine learning paradigms for next-generation edge cyber defense.
            </p>
          </div>
        </div>

        {/* Central Research Showcase Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 dark:from-[#0c1428] dark:via-[#090f1e] dark:to-[#070c18] border border-slate-200 dark:border-blue-900/40 p-6 sm:p-10 shadow-xl dark:shadow-2xl space-y-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Detailed Technical Concept */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest">
                  Undergraduate Research Focus
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white leading-snug">
                  {research.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {research.concept}
                </p>
              </div>

              {/* Research Areas Tag Cloud */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Investigative Sub-Domains:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {research.areas.map((area) => (
                    <span
                      key={area}
                      className="text-xs px-3 py-1 rounded-md bg-white dark:bg-slate-900/90 text-slate-800 dark:text-blue-200 border border-slate-200 dark:border-blue-950/80 font-medium shadow-xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Diagram Preview with Lightbox Trigger */}
            <div className="lg:col-span-5">
              <div
                className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 bg-slate-900 group cursor-pointer shadow-xl aspect-[16/9] flex items-center justify-center"
                onClick={() => onOpenImage(research.diagramImage, research.title, "Federated IDS Network Architecture & Aggregation Model")}
              >
                {!diagramError ? (
                  <img
                    src={research.diagramImage}
                    alt="Federated Learning Architecture Diagram"
                    referrerPolicy="no-referrer"
                    onError={() => setDiagramError(true)}
                    className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-blue-950/40">
                    <Network className="w-12 h-12 text-cyan-400 mb-3" />
                    <span className="text-sm font-bold text-white">Federated Learning IDS Architecture</span>
                    <span className="text-xs text-slate-400 mt-1">Decentralized Edge Defense & Aggregation Flow</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-slate-300 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700">
                  <span className="font-mono text-blue-300 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5" /> Edge Node Architecture
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 group-hover:text-white">
                    <Eye className="w-3 h-3" /> Expand
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Architectural Pillars */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Core Architectural Pillars
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              {research.keyPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  onClick={() => setActivePillarModal(pillar)}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-cyan-500/40 cursor-pointer transition-all duration-200 group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 font-semibold">Pillar 0{idx + 1}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors mb-1">
                    {pillar.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillar Detail Modal */}
      <Modal
        isOpen={activePillarModal !== null}
        onClose={() => setActivePillarModal(null)}
        title={activePillarModal?.title}
        subtitle="Architectural Pillar Detail"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
          <p className="leading-relaxed">
            {activePillarModal?.description}
          </p>

          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">Research Methodology Note</div>
            <div>
              Designed to overcome IoT constraints: limited battery life, restricted RAM, and intermittent wireless edge connectivity.
            </div>
          </div>

          <button
            onClick={() => setActivePillarModal(null)}
            className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
}
