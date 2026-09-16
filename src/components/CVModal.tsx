import React from 'react';
import Modal from './Modal';
import { portfolio } from '../config/portfolio';
import { FileText, Download, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curriculum Vitae"
      subtitle="Professional Resume"
      maxWidth="max-w-md"
    >
      <div className="space-y-6 text-slate-700 dark:text-slate-200">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{portfolio.name} — Resume</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">UI/UX Designer & Front-End Developer</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Updated with academic standings (CGPA 3.94) & official education details</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Highlights research in Federated Learning & IoT Intrusion Detection</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Details UI/UX case studies and modern front-end stack capabilities</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 text-xs text-blue-700 dark:text-blue-300">
          {portfolio.cv.available ? (
            <span>PDF resume is available for instant download below.</span>
          ) : (
            <span>
              Configured for production deployment. Place your PDF in <code className="text-blue-600 dark:text-blue-200 font-mono">/public/cv/Alfi_Shahriyar_CV.pdf</code> or update <code className="text-blue-600 dark:text-blue-200 font-mono">src/config/portfolio.ts</code>.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          {portfolio.cv.available ? (
            <a
              href={portfolio.cv.path}
              download
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              <Download className="w-4 h-4" /> Download PDF Resume
            </a>
          ) : (
            <a
              href={`mailto:${portfolio.contact.email}?subject=Resume%20Request%20-%20Alfi%20Shahriyar`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              <Mail className="w-4 h-4" /> Request Official CV via Email
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
