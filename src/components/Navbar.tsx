import React, { useState, useEffect } from 'react';
import { portfolio } from '../config/portfolio';
import { Menu, X, FileText, ArrowUpRight, Sparkles, Sun, Moon, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenCV: () => void;
  activeSection: string;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onOpenAdminGate?: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onOpenCV, activeSection, theme = 'dark', onToggleTheme, onOpenAdminGate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#070b14]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-lg dark:shadow-black/10 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#080c14] rounded-[10px] flex items-center justify-center font-display font-extrabold text-sm text-blue-600 dark:text-white">
              AS
            </div>
          </div>
          <div>
            <span className="font-display font-bold text-slate-900 dark:text-white text-base tracking-tight block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {portfolio.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider uppercase block">
              UI/UX • Front-End
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Vault & Upload Studio Gate */}
          {onOpenAdminGate && (
            <button
              id="nav-admin-gate-btn-desktop"
              onClick={onOpenAdminGate}
              aria-label="Admin Vault & Protected Upload Studio"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 transition-all hover:scale-105 shadow-sm flex items-center justify-center cursor-pointer"
              title="Admin Vault & Upload Studio (Protected Gate)"
            >
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>
          )}

          {/* Day / Night Mode Toggle */}
          {onToggleTheme && (
            <button
              id="theme-toggle-btn-desktop"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 transition-all hover:scale-105 shadow-sm flex items-center justify-center"
              title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 animate-in fade-in zoom-in duration-200" />
              )}
            </button>
          )}

          <button
            id="nav-cv-button"
            onClick={onOpenCV}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300/80 dark:border-slate-700/60 transition-all hover:border-blue-500/50 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {portfolio.cv.label}
          </button>
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all hover:scale-105"
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex sm:hidden items-center gap-2">
          {onToggleTheme && (
            <button
              id="theme-toggle-btn-mobile"
              onClick={onToggleTheme}
              aria-label="Toggle theme mode"
              className="p-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          )}
          <button
            id="mobile-cv-quick-btn"
            onClick={onOpenCV}
            className="p-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
            aria-label="View CV"
          >
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-[#0a0f1d] border-b border-slate-200 dark:border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {onOpenAdminGate && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminGate();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Admin Vault & Uploads
                </span>
                <span className="text-[11px] font-mono font-semibold">
                  Protected Gate
                </span>
              </button>
            )}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  Appearance Mode
                </span>
                <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 capitalize font-semibold">
                  {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
                </span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {portfolio.cv.label}
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5"
            >
              Get In Touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
