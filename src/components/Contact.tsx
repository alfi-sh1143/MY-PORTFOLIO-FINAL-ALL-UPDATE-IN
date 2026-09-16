import React, { useState } from 'react';
import { portfolio } from '../config/portfolio';
import Modal from './Modal';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, ArrowRight, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message of at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSuccessModalOpen(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070b14]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Details & Direct Outreach */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
                09 // Communication
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
                {portfolio.contact.heading}
              </h2>
              <p className="mt-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                {portfolio.contact.subheading}
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                Direct Email Channel
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-sm font-mono text-slate-900 dark:text-white select-all">
                  {portfolio.contact.email}
                </span>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 text-xs"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Based in {portfolio.contact.location} • Available Globally</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Typically responds within 24–48 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 shadow-xl dark:shadow-2xl space-y-6"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-800 dark:text-slate-300 block uppercase tracking-wider font-mono">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500/30' : 'border-slate-200 dark:border-slate-800'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 dark:text-red-400 block">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-800 dark:text-slate-300 block uppercase tracking-wider font-mono">
                    Your Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500/30' : 'border-slate-200 dark:border-slate-800'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 dark:text-red-400 block">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-800 dark:text-slate-300 block uppercase tracking-wider font-mono">
                  Project Details or Inquiry *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your product requirements, timeline, or position..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border ${
                    errors.message ? 'border-red-500 ring-1 ring-red-500/30' : 'border-slate-200 dark:border-slate-800'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all resize-none`}
                />
                {errors.message && (
                  <span className="text-xs text-red-500 dark:text-red-400 block">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setFormData({ name: '', email: '', message: '' });
        }}
        title="Message Staged"
        subtitle="Direct Communication"
        maxWidth="max-w-md"
      >
        <div className="space-y-5 text-slate-700 dark:text-slate-300 text-sm">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Thanks {formData.name}!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Your message is ready to be sent.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Click below to instantly launch your mail app with your pre-filled inquiry addressed directly to <strong className="text-slate-900 dark:text-white">{portfolio.contact.email}</strong>:
          </p>

          <a
            href={`mailto:${portfolio.contact.email}?subject=Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Hi Alfi,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" /> Open In Email Client
          </a>

          <button
            onClick={() => {
              setIsSuccessModalOpen(false);
              setFormData({ name: '', email: '', message: '' });
            }}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </Modal>
    </section>
  );
}
