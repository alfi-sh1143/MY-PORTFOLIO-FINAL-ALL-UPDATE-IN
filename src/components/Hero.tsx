import React from 'react';
import { motion } from 'motion/react';
import { portfolio } from '../config/portfolio';
import { ArrowRight, Download, Mail, Github, Linkedin, ExternalLink, Sparkles, Layout, Cpu, ShieldCheck, Code2, Camera } from 'lucide-react';

interface HeroProps {
  onOpenCV: () => void;
  onOpenImage: (src: string, alt: string, caption?: string) => void;
  onOpenPhotoUpdater?: () => void;
  profileImage?: string;
}

export default function Hero({ onOpenCV, onOpenImage, onOpenPhotoUpdater, profileImage }: HeroProps) {
  const currentPhoto = profileImage || portfolio.profileImage;

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle Background Glow Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-30 transition-colors duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.4) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-10 opacity-20 transition-colors duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Information & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left"
          >
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium tracking-wide">{portfolio.contact.availability}</span>
            </motion.div>

            {/* Typography Stack */}
            <div className="space-y-2">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg font-mono font-medium block"
                style={{ color: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))' }}
              >
                {portfolio.eyebrow}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-[1.08]"
              >
                {portfolio.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="pt-2"
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-200">
                  {portfolio.role}
                </h2>
                <span className="inline-block mt-1.5 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                  {portfolio.secondaryRole}
                </span>
              </motion.div>
            </div>

            {/* Supporting Statements */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-3 max-w-2xl mx-auto lg:mx-0"
            >
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {portfolio.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-blue-600 dark:border-blue-500/50 pl-3">
                {portfolio.subTagline}
              </p>
            </motion.div>

            {/* Call to Actions with Magnetic / Elastic Micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <motion.a
                id="hero-view-work-btn"
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white text-sm font-semibold shadow-xl transition-all"
                style={{
                  backgroundColor: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))',
                  boxShadow: '0 10px 25px -4px rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.45)',
                }}
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                id="hero-contact-btn"
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white text-sm font-semibold border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm transition-all"
              >
                Contact Me
              </motion.a>

              <motion.button
                id="hero-cv-btn"
                onClick={onOpenCV}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-sm font-medium border border-slate-200 dark:border-slate-800/80 transition-all"
              >
                <Download
                  className="w-4 h-4"
                  style={{ color: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))' }}
                />
                Download CV
              </motion.button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-slate-500 dark:text-slate-400"
            >
              <span className="text-xs uppercase tracking-wider font-mono text-slate-500">Connect:</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolio.contact.email}`}
                aria-label="Send Email"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Photograph & Floating Harmonic Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 sm:w-88 md:w-96 aspect-[4/5] max-w-full">
              {/* Outer Decorative Glow Border */}
              <div
                className="absolute -inset-1.5 rounded-3xl blur-md opacity-80 transition-colors duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.45), rgba(147, 51, 234, 0.3))',
                }}
              />

              {/* Photograph Frame with 3D Depth Hover */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0c1220] shadow-2xl cursor-pointer group"
                onClick={() => onOpenImage(currentPhoto, portfolio.name, "Alfi Shahriyar — UI/UX Designer & Front-End Developer")}
              >
                <img
                  src={currentPhoto}
                  alt={portfolio.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/80 via-transparent to-transparent pointer-events-none" />

                {/* Quick Update Photo Button */}
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

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/75 backdrop-blur-md border border-slate-800 text-left">
                  <div className="text-white text-xs font-bold font-display">{portfolio.name}</div>
                  <div className="text-[11px] font-mono" style={{ color: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))' }}>
                    BSc CSE • CGPA 3.94
                  </div>
                </div>
              </motion.div>

              {/* Floating Harmonic UI Badges (Organic breathing motions) */}
              {/* 1. UI/UX Design Badge (Top Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -left-4 sm:-left-6 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0d1424]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/70 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Layout className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                UI/UX Design
              </motion.div>

              {/* 2. Figma Badge (Top Right) */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-12 -right-4 sm:-right-6 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0d1424]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/70 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                Figma
              </motion.div>

              {/* 3. Next.js & React (Middle Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -left-4 sm:-left-8 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0d1424]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/70 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Next.js
              </motion.div>

              {/* 4. AI/ML Badge (Bottom Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-20 -right-3 sm:-right-6 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0d1424]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/70 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                AI/ML
              </motion.div>

              {/* 5. Cybersecurity Badge (Bottom Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-3 -left-2 sm:-left-4 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0d1424]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/70 shadow-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Cybersecurity
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
