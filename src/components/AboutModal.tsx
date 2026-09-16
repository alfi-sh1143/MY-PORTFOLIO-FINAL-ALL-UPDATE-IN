import React from 'react';
import Modal from './Modal';
import { portfolio } from '../config/portfolio';
import { Mail, MapPin, GraduationCap, Shield, Cpu, Code2, Palette, Smartphone, Gamepad2, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage?: string;
}

export default function AboutModal({ isOpen, onClose, profileImage }: AboutModalProps) {
  const currentPhoto = profileImage || portfolio.profileImage;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="About Alfi Shahriyar"
      subtitle="Designer • Developer • Researcher"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-8 text-slate-700 dark:text-slate-200">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-xl shadow-blue-900/20 dark:shadow-blue-900/30 flex-shrink-0">
            <img
              src={currentPhoto}
              alt={portfolio.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h4 className="text-2xl font-bold font-display text-slate-900 dark:text-white">{portfolio.name}</h4>
            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{portfolio.role}</div>
            <div className="text-slate-500 dark:text-slate-400 text-xs tracking-wide">{portfolio.secondaryRole}</div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {portfolio.contact.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {portfolio.contact.email}
              </span>
            </div>
          </div>
        </div>

        {/* Biography & Philosophy */}
        <div className="space-y-3">
          <h5 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Background & Mission</h5>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {portfolio.bio}
          </p>
        </div>

        {/* Academic Credentials Snapshot */}
        <div className="space-y-3">
          <h5 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Academic Standing
          </h5>
          <div className="grid sm:grid-cols-3 gap-3">
            {portfolio.education.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{item.institution}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.degree}</div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">{item.result}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Disciplinary Dimensions */}
        <div className="space-y-3">
          <h5 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Core Focus Areas</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="text-xs">
                <div className="text-slate-900 dark:text-white font-medium">Front-End Dev</div>
                <div className="text-slate-500 dark:text-slate-400">React, TypeScript, Next.js</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div className="text-xs">
                <div className="text-slate-900 dark:text-white font-medium">UI/UX Design</div>
                <div className="text-slate-500 dark:text-slate-400">Figma, Design Systems</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <div className="text-xs">
                <div className="text-slate-900 dark:text-white font-medium">AI & ML</div>
                <div className="text-slate-500 dark:text-slate-400">Federated & Edge Learning</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div className="text-xs">
                <div className="text-slate-900 dark:text-white font-medium">Cybersecurity</div>
                <div className="text-slate-500 dark:text-slate-400">Intrusion Detection Systems</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <div className="text-xs">
                <div className="text-slate-900 dark:text-white font-medium">Mobile Apps</div>
                <div className="text-slate-500 dark:text-slate-400">Touch & Responsive UI</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <div className="text-xs">
                <div className="text-slate-900 dark:text-white font-medium">Creative Coding</div>
                <div className="text-slate-500 dark:text-slate-400">Games & Canvas Physics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership & Activities */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" /> Key Roles & Distinctions
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {portfolio.activities.map((act) => (
              <span key={act.id} className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm">
                <strong className="text-slate-900 dark:text-white">{act.title}</strong> — {act.role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
