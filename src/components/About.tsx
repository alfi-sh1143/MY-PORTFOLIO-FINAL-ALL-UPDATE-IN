import React from 'react';
import { portfolio } from '../config/portfolio';
import { ArrowUpRight, GraduationCap, Shield, Cpu, Sparkles, User, BookOpen, Camera } from 'lucide-react';

interface AboutProps {
  onOpenAboutModal: () => void;
  onOpenImage: (src: string, alt: string, caption?: string) => void;
  onOpenPhotoUpdater?: () => void;
  profileImage?: string;
}

export default function About({ onOpenAboutModal, onOpenImage, onOpenPhotoUpdater, profileImage }: AboutProps) {
  const currentPhoto = profileImage || portfolio.profileImage;

  return (
    <section id="about" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/70 dark:bg-[#070b14]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
              01 // Background
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              About Me
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Bridging thoughtful user interface craftsmanship with robust computer science and privacy-centric research.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Portrait & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0c1220] shadow-xl group cursor-pointer"
              onClick={() => onOpenImage(currentPhoto, portfolio.name, "Alfi Shahriyar — Profile Snapshot")}
            >
              <img
                src={currentPhoto}
                alt={portfolio.name}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-90" />

              {/* Quick Update Button */}
              {onOpenPhotoUpdater && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPhotoUpdater();
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-md transition-all opacity-80 hover:opacity-100 flex items-center gap-1.5 text-xs font-semibold z-10"
                  title="Change / Update Photograph"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Update Photo</span>
                </button>
              )}

              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-display font-bold text-lg">{portfolio.name}</h4>
                  <p className="text-xs text-blue-300 font-mono">Daffodil International University</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-semibold shadow-md">
                  CGPA 3.94
                </div>
              </div>
            </div>

            {/* Academic & Club Quick Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">AI Club</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Lead Member</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Cybersecurity Club</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Lead Member</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Research Callout */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                I'm <strong className="text-slate-900 dark:text-white font-semibold">Alfi Shahriyar</strong>, a Computer Science & Engineering student and aspiring UI/UX Designer & Front-End Developer with interests spanning modern web development, AI/ML, cybersecurity, mobile applications and creative digital experiences.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                My work combines design thinking with technical development. I enjoy turning ideas into useful interfaces, experimenting with modern technologies, and exploring how thoughtful design can improve digital products.
              </p>
            </div>

            {/* Highlighted Research Focus Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-[#0c162d] dark:to-[#0a1122] border border-blue-200 dark:border-blue-900/50 space-y-3 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-700 dark:text-blue-400 uppercase">
                <Shield className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> Core Research Direction
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                Federated Learning-Based Intrusion Detection for IoT & Edge Networks
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Exploring AI/ML techniques for privacy-aware and resource-conscious cybersecurity, enabling distributed edge devices to cooperatively build intrusion defense models without exposing raw user data.
              </p>
            </div>

            {/* Beyond the Web teaser */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-500">Creative & Engineering Interests:</span>
              <div className="flex flex-wrap gap-2">
                {portfolio.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium shadow-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Profile Popup Trigger Button */}
            <div className="pt-2">
              <button
                id="about-more-modal-btn"
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 hover:text-slate-900 dark:text-white font-medium text-sm border border-slate-300 dark:border-slate-700/80 hover:border-blue-500/50 transition-all shadow-sm group"
              >
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                More About Me
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
