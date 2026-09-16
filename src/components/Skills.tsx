import React, { useState } from 'react';
import { motion } from 'motion/react';
import { portfolio } from '../config/portfolio';
import { Sparkles, Layers, CheckCircle2, Code, Shield, Palette, Terminal, Cpu } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  DESIGN: <Palette className="w-4 h-4 text-blue-400" />,
  'FRONT-END': <Code className="w-4 h-4 text-indigo-400" />,
  DEVELOPMENT: <Terminal className="w-4 h-4 text-cyan-400" />,
  'AI / ML': <Cpu className="w-4 h-4 text-purple-400" />,
  CYBERSECURITY: <Shield className="w-4 h-4 text-emerald-400" />,
  CREATIVE: <Sparkles className="w-4 h-4 text-pink-400" />,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070b14]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
              05 // Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Skills & Tech Stack
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            A comprehensive, authentic overview of design methodologies, front-end technologies, and research tooling. No arbitrary percentage bars.
          </p>
        </div>

        {/* Skills Grid by Category */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.skills.map((category, idx) => {
            const isHovered = activeCategory === category.title;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.01 }}
                onMouseEnter={() => setActiveCategory(category.title)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`p-6 rounded-2xl bg-white dark:bg-[#0b1120] border transition-all duration-300 flex flex-col justify-between shadow-sm ${
                  isHovered
                    ? 'border-blue-500 dark:border-blue-500/50 shadow-xl shadow-blue-500/10 dark:shadow-blue-950/20'
                    : 'border-slate-200 dark:border-slate-800/90'
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      {categoryIcons[category.title] || <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      <h3 className="text-sm font-bold font-mono tracking-wider text-slate-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {category.skills.length} skills
                    </span>
                  </div>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className="group/pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 dark:bg-slate-900/90 dark:hover:bg-blue-950/70 border border-slate-200 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-800/60 transition-all text-xs font-medium text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-200 cursor-default shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500/60 group-hover/pill:bg-blue-500 dark:group-hover/pill:bg-blue-400 transition-colors" />
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Subtle bottom note */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/50 text-[11px] text-slate-500 font-mono">
                  Applied in research & product design
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
