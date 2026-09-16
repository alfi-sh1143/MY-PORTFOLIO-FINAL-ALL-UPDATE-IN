import React, { useState } from 'react';
import { portfolio } from '../config/portfolio';
import { EducationItem, ActivityItem } from '../types';
import Modal from './Modal';
import { GraduationCap, Award, Shield, Cpu, Code2, ChevronRight, CheckCircle2, Building2 } from 'lucide-react';

interface EducationProps {
  onOpenImage: (src: string, alt: string, caption?: string) => void;
}

function InstitutionLogo({
  logo,
  institution,
  onClick
}: {
  logo: string;
  institution: string;
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="w-14 h-14 rounded-xl overflow-hidden bg-white p-1.5 flex items-center justify-center cursor-pointer flex-shrink-0 shadow-md border border-slate-200 dark:border-slate-700/60 hover:border-blue-500 hover:scale-105 transition-all"
      onClick={onClick}
      title={`Click to view ${institution} emblem`}
    >
      {!hasError ? (
        <img
          src={logo}
          alt={institution}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
        />
      ) : (
        <GraduationCap className="w-6 h-6 text-slate-800" />
      )}
    </div>
  );
}

export default function Education({ onOpenImage }: EducationProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'ai':
        return <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="education" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* ==================================================
            1. Education & Academic Background
        ================================================== */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
                06 // Credentials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                Education & Academic Background
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
              Rigorous academic foundation in Computer Science & Engineering with distinction in scientific and computational coursework.
            </p>
          </div>

          {/* Academic Journey Logo Wall & Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.education.map((item) => (
              <div
                key={item.id}
                className="p-7 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-950/20 transition-all duration-300 group shadow-sm"
              >
                <div className="space-y-5">
                  {/* Institution Logo & Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <InstitutionLogo
                      logo={item.logo}
                      institution={item.institution}
                      onClick={() => onOpenImage(item.logo, item.institution, `${item.institution} - Official Institution Crest`)}
                    />
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                      {item.result}
                    </span>
                  </div>

                  {/* Degree & Institution Names */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {item.institution}
                    </p>
                    {item.field && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Discipline: {item.field}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bottom Verification Note */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono">Academic Record</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Official Data
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            2. Leadership & Activities
        ================================================== */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-cyan-400 uppercase block mb-1">
                Collegiate Engagement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Leadership & Activities
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm">
              Click any engagement card to inspect responsibilities and technical contributions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.activities.map((act) => (
              <div
                key={act.id}
                onClick={() => setSelectedActivity(act)}
                className="p-6 rounded-2xl bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-cyan-500/50 cursor-pointer transition-all duration-200 group flex items-start justify-between gap-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center">
                    {getActivityIcon(act.iconName)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                      {act.title}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 block mt-0.5">
                      {act.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {act.description}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Achievement Popup Modal */}
      <Modal
        isOpen={selectedActivity !== null}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.title}
        subtitle={selectedActivity?.role}
        maxWidth="max-w-md"
      >
        <div className="space-y-5 text-slate-700 dark:text-slate-300 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-wider block font-semibold">
              {selectedActivity?.badge}
            </span>
            <p className="text-slate-900 dark:text-white text-sm font-medium leading-relaxed">
              {selectedActivity?.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Core Contributions & Highlights
            </span>
            {selectedActivity?.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSelectedActivity(null)}
            className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors mt-2 shadow-sm"
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
}
