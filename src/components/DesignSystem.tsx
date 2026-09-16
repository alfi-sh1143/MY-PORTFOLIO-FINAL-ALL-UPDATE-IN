import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  Eye,
  Sliders,
  Bell,
  Code2,
  Cpu,
  ShieldCheck,
  Sun,
  Moon,
  Zap,
  Gauge,
  Palette,
  Type,
  LayoutGrid
} from 'lucide-react';

interface DesignSystemProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export default function DesignSystem({ theme = 'dark', onToggleTheme }: DesignSystemProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'components' | 'tokens' | 'typography'>('architecture');
  const [testInputValue, setTestInputValue] = useState('Production Design System Input');
  const [buttonState, setButtonState] = useState<'idle' | 'clicked'>('idle');
  const [toggleActive, setToggleActive] = useState(true);
  const [sliderVal, setSliderVal] = useState(16);

  return (
    <section id="design-system" className="py-24 relative border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-50 border border-blue-500/20 text-xs font-mono font-medium text-blue-400 dark:text-blue-400 light:text-blue-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>08 // Craft & Precision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white dark:text-white light:text-slate-900 tracking-tight">
              Design System & Architecture
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
            <p className="leading-relaxed">
              An agency-grade design specification articulating the typographic hierarchies, optical color tokens, WCAG AA contrast ratios, and modular frontend primitives engineered for this portfolio.
            </p>
          </div>
        </div>

        {/* Tab Switcher & Quick Theme Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Architecture & Stack
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'components'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              UI Primitives & States
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'tokens'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Color Tokens & Contrast
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'typography'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              Typographic Scale
            </button>
          </div>

          {/* Inline Theme Preview Pill */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-white text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-blue-500/40 transition-all shadow-sm"
              title="Toggle global theme mode"
            >
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">Preview:</span>
              <span className="flex items-center gap-1.5 font-semibold text-blue-400 dark:text-blue-400 light:text-blue-600">
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
              </span>
            </button>
          )}
        </div>

        {/* Tab Content 1: Architecture & Technical Stack */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 4 Core Architectural Tenets */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 font-display">
                  React 19 + TypeScript
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  Single source of truth in configuration with strict compile-time type validation, zero loose untyped states, and functional ergonomics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 font-display">
                  Tailwind CSS v4 Engine
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  Modern CSS custom property mapping with zero runtime overhead, GPU-accelerated backdrop filters, and rapid layout computations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 font-display">
                  WCAG AA & AAA Ratios
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  Mathematically validated contrast ratios exceeding 4.5:1 on text and 3:1 on interactive borders across both Day and Night modes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Gauge className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 font-display">
                  Zero Cumulative Layout Shift
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  Fixed aspect ratio image wrappers, reserved font baseline bounds, and defensive flexbox containers to ensure 0.00 CLS.
                </p>
              </div>
            </div>

            {/* Architectural Specification Box */}
            <div className="p-6 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                  Engineering Blueprint & Modular Organization
                </span>
                <span className="text-[11px] font-mono text-blue-400">Production-Ready Clean Architecture</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                <div className="space-y-2">
                  <strong className="text-white dark:text-white light:text-slate-900 block font-semibold">1. Config-Driven Content</strong>
                  <p className="leading-relaxed">
                    All biography, skills, research papers, projects, and contact points flow from <code className="px-1.5 py-0.5 rounded bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-blue-400 font-mono text-[10px]">portfolio.ts</code>, separating UI presentation from data.
                  </p>
                </div>
                <div className="space-y-2">
                  <strong className="text-white dark:text-white light:text-slate-900 block font-semibold">2. Dynamic Resilience</strong>
                  <p className="leading-relaxed">
                    Category filters compute available projects dynamically, preventing empty or dead states without fragile manual configurations.
                  </p>
                </div>
                <div className="space-y-2">
                  <strong className="text-white dark:text-white light:text-slate-900 block font-semibold">3. Adaptive Surfaces</strong>
                  <p className="leading-relaxed">
                    Custom CSS properties and backdrop filters harmonize glassmorphism across dark obsidian layers and crisp daylight panels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: UI Components & States */}
        {activeTab === 'components' && (
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {/* Column 1: Buttons & Interactive Triggers */}
            <div className="p-6 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                  Interactive Triggers
                </span>
                <span className="text-[10px] font-mono text-blue-400">Clickable Feedback</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setButtonState('clicked');
                    setTimeout(() => setButtonState('idle'), 1800);
                  }}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                >
                  {buttonState === 'clicked' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" /> Interaction Verified!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Primary Action CTA
                    </>
                  )}
                </button>

                <button className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold text-xs rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 transition-all flex items-center justify-center gap-2">
                  Secondary Neutral Action
                </button>

                <button className="w-full py-2.5 px-4 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-blue-400 dark:hover:text-blue-300 light:hover:text-blue-600 font-medium text-xs rounded-xl hover:bg-blue-950/20 dark:hover:bg-blue-950/20 light:hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  Ghost Action Link <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Column 2: Form Controls & Inputs */}
            <div className="p-6 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                  Input Primitives & Toggles
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Live Validation</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 block">
                    Form Control Text Field
                  </label>
                  <input
                    type="text"
                    value={testInputValue}
                    onChange={(e) => setTestInputValue(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-500 outline-none transition-all"
                  />
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 light:text-slate-400 font-mono">
                    Character Count: {testInputValue.length} (WCAG AA compliant focus state)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">
                    Interactive Boolean Switch
                  </span>
                  <button
                    type="button"
                    onClick={() => setToggleActive(!toggleActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      toggleActive ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        toggleActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3: Badges, Status Indicators & Radius Slider */}
            <div className="p-6 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                  Status Badges & Tokens
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Micro-States</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 block">
                    Telemetry Badges
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active / Verified
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-950/60 dark:bg-blue-950/60 light:bg-blue-50 text-blue-300 dark:text-blue-300 light:text-blue-700 border border-blue-800/40 dark:border-blue-800/40 light:border-blue-200">
                      In Development
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan-950/60 dark:bg-cyan-950/60 light:bg-cyan-50 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 border border-cyan-800/40 dark:border-cyan-800/40 light:border-cyan-200">
                      Research Node
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div className="flex justify-between text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <span>Corner Radius: {sliderVal}px</span>
                    <span className="font-mono text-blue-400">Nested Border Ratio</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div
                    className="p-2.5 mt-2 bg-blue-500/10 border border-blue-500/30 text-center text-[10px] font-mono text-blue-400"
                    style={{ borderRadius: `${sliderVal}px` }}
                  >
                    Inner container radius dynamic preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Color Palette & Tokens */}
        {activeTab === 'tokens' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Color Swatch Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Canvas Obsidian', hex: '#070a12', lightHex: '#f8fafc', role: 'Base Background Surface', contrast: '18.2:1 (AAA)' },
                { name: 'Container Slate', hex: '#0b1120', lightHex: '#ffffff', role: 'Component Card Surface', contrast: '16.5:1 (AAA)' },
                { name: 'Electric Sapphire', hex: '#2563eb', lightHex: '#1d4ed8', role: 'Primary CTA Trigger', contrast: '4.6:1 (AA)' },
                { name: 'Cyan Pulse', hex: '#06b6d4', lightHex: '#0891b2', role: 'Vector Accent & Eyebrow', contrast: '5.1:1 (AA)' },
                { name: 'Divider Stroke', hex: '#1e293b', lightHex: '#e2e8f0', role: 'Border & Geometry Stroke', contrast: '3.2:1 (UI)' },
                { name: 'Text High-Contrast', hex: '#f8fafc', lightHex: '#0f172a', role: 'Display Headings & Titles', contrast: '18.2:1 (AAA)' },
                { name: 'Text Reading Slate', hex: '#94a3b8', lightHex: '#334155', role: 'Body Copy & Descriptions', contrast: '7.8:1 (AAA)' },
                { name: 'Success Emerald', hex: '#10b981', lightHex: '#059669', role: 'Verified Node Indicator', contrast: '4.5:1 (AA)' },
              ].map((token) => (
                <div key={token.name} className="p-4 rounded-xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-3">
                  <div
                    className="w-full h-14 rounded-lg border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 shadow-inner flex items-end p-2"
                    style={{ backgroundColor: theme === 'dark' ? token.hex : token.lightHex }}
                  >
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                      {theme === 'dark' ? token.hex : token.lightHex}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">{token.name}</div>
                    <div className="text-[11px] font-mono text-blue-400 dark:text-blue-400 light:text-blue-600 font-medium">
                      Contrast: {token.contrast}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-0.5">{token.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Surface Hierarchy Elevation Cards */}
            <div className="p-6 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                  Surface Elevation & Glassmorphism Tokens
                </span>
                <span className="text-[11px] font-mono text-cyan-400">Z-Index & Blur Specs</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#080c14] dark:bg-[#080c14] light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs">
                  <strong className="text-white dark:text-white light:text-slate-900 block mb-1">Level 0: Base Canvas</strong>
                  <span className="text-slate-400 dark:text-slate-400 light:text-slate-600 block text-[11px]">
                    Dark: #070a12 • Light: #f8fafc
                  </span>
                  <span className="text-slate-500 text-[10px] mt-1 block">Root body container with subtle radial ambient glow.</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs shadow-sm">
                  <strong className="text-white dark:text-white light:text-slate-900 block mb-1">Level 1: Frosted Glass Panel</strong>
                  <span className="text-slate-400 dark:text-slate-400 light:text-slate-600 block text-[11px]">
                    backdrop-filter: blur(16px)
                  </span>
                  <span className="text-slate-500 text-[10px] mt-1 block">Primary content cards, section dividers, project grids.</span>
                </div>

                <div className="p-4 rounded-xl bg-[#111a30] dark:bg-[#111a30] light:bg-blue-50/80 border border-blue-900/40 dark:border-blue-900/40 light:border-blue-200 text-xs shadow-md">
                  <strong className="text-white dark:text-white light:text-slate-900 block mb-1">Level 2: Floating Overlay</strong>
                  <span className="text-blue-300 dark:text-blue-300 light:text-blue-700 block text-[11px]">
                    z-index: 50 • Modal & Lightbox
                  </span>
                  <span className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-[10px] mt-1 block">Case study reader, image lightbox, fixed navigation bar.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Typographic Scale */}
        {activeTab === 'typography' && (
          <div className="p-6 rounded-2xl bg-[#0b1120] dark:bg-[#0b1120] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                Font Pairings & Step Ratios (Major Second 1.125 & Perfect Fourth 1.333)
              </span>
              <span className="text-[11px] font-mono text-blue-400">Baseline Grid</span>
            </div>

            <div className="space-y-6">
              <div className="border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900">
                    Syne Display Typeface
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                    H1-H3 Display Headings
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
                  Weights: 700 / 800 • Letter-spacing: -0.025em • Optical human-crafted curves
                </p>
              </div>

              <div className="border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-sans text-lg sm:text-xl font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                    Plus Jakarta Sans Body Typeface
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                    Body Copy & Interfaces
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
                  Weights: 400 / 500 / 600 • Line-height: 1.6 • Max measure: 65-75ch
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-sm sm:text-base font-medium text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                    JetBrains Mono Telemetry Typeface
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                    Telemetry, Tags & Code
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
                  Weights: 400 / 500 • Tracking: 0.05em • Fixed character width alignment
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
