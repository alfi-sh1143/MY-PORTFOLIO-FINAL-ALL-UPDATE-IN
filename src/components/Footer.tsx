import React from 'react';
import { portfolio } from '../config/portfolio';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/90 dark:bg-[#05080f] py-16 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Column */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-[#080c14] rounded-[6px] flex items-center justify-center font-display font-bold text-xs text-white">
                  AS
                </div>
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-base">
                {portfolio.name}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs max-w-sm">
              {portfolio.role} • Research in AI/ML & Federated Intrusion Detection.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-slate-400 font-medium">
            <a href="#home" className="hover:text-blue-600 dark:hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-600 dark:hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-white transition-colors">Projects</a>
            <a href="#research" className="hover:text-blue-600 dark:hover:text-white transition-colors">Research</a>
            <a href="#skills" className="hover:text-blue-600 dark:hover:text-white transition-colors">Skills</a>
            <a href="#education" className="hover:text-blue-600 dark:hover:text-white transition-colors">Education</a>
            <a href="#case-studies" className="hover:text-blue-600 dark:hover:text-white transition-colors">Case Studies</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact</a>
          </div>

          {/* Back to Top */}
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs shadow-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved. Designed & built with precision.
          </p>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolio.contact.email}`}
              aria-label="Email"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
