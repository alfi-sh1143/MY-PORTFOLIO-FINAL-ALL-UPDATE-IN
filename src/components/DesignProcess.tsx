import React from 'react';
import { portfolio } from '../config/portfolio';
import { Search, Compass, Layout, Palette, Code, CheckCircle } from 'lucide-react';

const stepIcons = [
  <Search className="w-5 h-5 text-blue-400" />,
  <Compass className="w-5 h-5 text-cyan-400" />,
  <Layout className="w-5 h-5 text-indigo-400" />,
  <Palette className="w-5 h-5 text-purple-400" />,
  <Code className="w-5 h-5 text-emerald-400" />,
  <CheckCircle className="w-5 h-5 text-teal-400" />,
];

export default function DesignProcess() {
  return (
    <section id="process" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070b14]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
              07 // Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              My Design Process
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            A systematic, human-centered workflow turning complex requirements into intuitive, polished digital reality.
          </p>
        </div>

        {/* 6 Steps Grid / Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.designProcess.map((step, idx) => (
            <div
              key={step.step}
              className="p-7 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/80 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-950/20 transition-all duration-300 group flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-blue-600/80 dark:text-blue-400/70 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <span>Phase</span> <span className="text-slate-800 dark:text-slate-300 font-semibold">{idx + 1} of 6</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
