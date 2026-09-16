import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  X,
  RotateCcw,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Zap,
  Eye
} from 'lucide-react';

export interface ColorwayPreset {
  id: string;
  name: string;
  r: number;
  g: number;
  b: number;
  hex: string;
  label: string;
}

export const PRESET_COLORWAYS: ColorwayPreset[] = [
  { id: 'cyber-cobalt', name: 'Cyber Cobalt', r: 37, g: 99, b: 235, hex: '#2563eb', label: 'Default' },
  { id: 'neon-emerald', name: 'Neon Emerald', r: 16, g: 185, b: 129, hex: '#10b981', label: 'Matrix' },
  { id: 'cyber-violet', name: 'Cyber Violet', r: 147, g: 51, b: 234, hex: '#9333ea', label: 'Synthwave' },
  { id: 'crimson-sunset', name: 'Sunset Crimson', r: 244, g: 63, b: 94, hex: '#f43f5e', label: 'Vibrant' },
  { id: 'solar-fusion', name: 'Solar Fusion', r: 245, g: 158, b: 11, hex: '#f59e0b', label: 'Amber' },
  { id: 'hyper-aqua', name: 'Hyper Aqua', r: 6, g: 182, b: 212, hex: '#06b6d4', label: 'Cyan' },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function ColorwayWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentR, setCurrentR] = useState(37);
  const [currentG, setCurrentG] = useState(99);
  const [currentB, setCurrentB] = useState(235);
  const [glowIntensity, setGlowIntensity] = useState(60);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [isChromaMode, setIsChromaMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const chromaRef = useRef<number | null>(null);
  const hueRef = useRef(220);

  // Initialize from localStorage or defaults
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_colorway');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.r === 'number' && typeof parsed.g === 'number' && typeof parsed.b === 'number') {
          setCurrentR(parsed.r);
          setCurrentG(parsed.g);
          setCurrentB(parsed.b);
          if (typeof parsed.glow === 'number') setGlowIntensity(parsed.glow);
        }
      }
    } catch {
      // fallback to default
    }
  }, []);

  // Update root CSS variables in real-time
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-r', `${currentR}`);
    root.style.setProperty('--accent-g', `${currentG}`);
    root.style.setProperty('--accent-b', `${currentB}`);
    const hex = rgbToHex(currentR, currentG, currentB);
    root.style.setProperty('--accent-hex', hex);
    root.style.setProperty('--accent-glow', `rgba(${currentR}, ${currentG}, ${currentB}, ${glowIntensity / 100})`);
    root.style.setProperty('--accent-border', `rgba(${currentR}, ${currentG}, ${currentB}, 0.5)`);
    root.style.setProperty('--accent-subtle', `rgba(${currentR}, ${currentG}, ${currentB}, 0.12)`);

    try {
      localStorage.setItem(
        'portfolio_colorway',
        JSON.stringify({ r: currentR, g: currentG, b: currentB, glow: glowIntensity })
      );
    } catch {
      // ignore storage errors
    }
  }, [currentR, currentG, currentB, glowIntensity]);

  // Chroma Flow mode (smooth rainbow cycle)
  useEffect(() => {
    if (!isChromaMode) {
      if (chromaRef.current) cancelAnimationFrame(chromaRef.current);
      return;
    }

    let lastTime = performance.now();
    const cycle = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      hueRef.current = (hueRef.current + delta * 0.04) % 360;

      // Convert HSL to RGB
      const h = hueRef.current;
      const s = 0.9;
      const l = 0.55;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (h < 60) { r = c; g = x; b = 0; }
      else if (h < 120) { r = x; g = c; b = 0; }
      else if (h < 180) { r = 0; g = c; b = x; }
      else if (h < 240) { r = 0; g = x; b = c; }
      else if (h < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }

      setCurrentR(Math.round((r + m) * 255));
      setCurrentG(Math.round((g + m) * 255));
      setCurrentB(Math.round((b + m) * 255));

      chromaRef.current = requestAnimationFrame(cycle);
    };

    chromaRef.current = requestAnimationFrame(cycle);
    return () => {
      if (chromaRef.current) cancelAnimationFrame(chromaRef.current);
    };
  }, [isChromaMode]);

  const handleSelectPreset = (preset: ColorwayPreset) => {
    setIsChromaMode(false);
    setCurrentR(preset.r);
    setCurrentG(preset.g);
    setCurrentB(preset.b);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const parsed = hexToRgb(val);
    if (parsed) {
      setIsChromaMode(false);
      setCurrentR(parsed.r);
      setCurrentG(parsed.g);
      setCurrentB(parsed.b);
    }
  };

  const handleReset = () => {
    setIsChromaMode(false);
    setCurrentR(37);
    setCurrentG(99);
    setCurrentB(235);
    setGlowIntensity(60);
  };

  const handleCopyHex = () => {
    const hex = rgbToHex(currentR, currentG, currentB);
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentHex = rgbToHex(currentR, currentG, currentB);

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.button
          id="colorway-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle RGB Colorway Customizer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 dark:bg-slate-900/90 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          style={{
            borderColor: `rgba(${currentR}, ${currentG}, ${currentB}, 0.5)`,
            boxShadow: `0 8px 32px -4px rgba(${currentR}, ${currentG}, ${currentB}, 0.45)`,
          }}
        >
          {/* Animated Glow Dot */}
          <span
            className="w-3.5 h-3.5 rounded-full shadow-md animate-pulse"
            style={{
              backgroundColor: currentHex,
              boxShadow: `0 0 10px ${currentHex}`,
            }}
          />

          <Palette className="w-4 h-4 text-slate-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            RGB Lab
          </span>

          {isChromaMode && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white uppercase tracking-wider animate-pulse">
              Live
            </span>
          )}
        </motion.button>
      </div>

      {/* Floating Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-white/95 dark:bg-[#0c1222]/95 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl backdrop-blur-xl overflow-hidden"
            style={{
              borderColor: `rgba(${currentR}, ${currentG}, ${currentB}, 0.35)`,
              boxShadow: `0 20px 50px -10px rgba(${currentR}, ${currentG}, ${currentB}, 0.35)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: currentHex }}
                />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                    RGB Colorway Lab
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Live dynamic theme & accent engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset to default theme"
                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                  activeTab === 'presets'
                    ? 'border-blue-500 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Presets ({PRESET_COLORWAYS.length})
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                  activeTab === 'custom'
                    ? 'border-blue-500 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Custom RGB Sliders
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {activeTab === 'presets' ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {PRESET_COLORWAYS.map((preset) => {
                    const isSelected =
                      !isChromaMode &&
                      currentR === preset.r &&
                      currentG === preset.g &&
                      currentB === preset.b;

                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-500 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                          style={{
                            backgroundColor: preset.hex,
                            boxShadow: `0 0 8px ${preset.hex}`,
                          }}
                        />
                        <div className="min-w-0">
                          <span className="block text-xs font-bold truncate text-slate-900 dark:text-white">
                            {preset.name}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            {preset.hex}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Custom RGB & Hex Mode */
                <div className="space-y-3.5">
                  {/* Hex + Picker Row */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={currentHex}
                        onChange={handleHexChange}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">Hex Code</span>
                        <span className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase">
                          {currentHex}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyHex}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Red Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-red-500 font-bold">R (Red)</span>
                      <span>{currentR}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={currentR}
                      onChange={(e) => {
                        setIsChromaMode(false);
                        setCurrentR(Number(e.target.value));
                      }}
                      className="w-full accent-red-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                    />
                  </div>

                  {/* Green Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-500 font-bold">G (Green)</span>
                      <span>{currentG}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={currentG}
                      onChange={(e) => {
                        setIsChromaMode(false);
                        setCurrentG(Number(e.target.value));
                      }}
                      className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                    />
                  </div>

                  {/* Blue Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-blue-500 font-bold">B (Blue)</span>
                      <span>{currentB}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={currentB}
                      onChange={(e) => {
                        setIsChromaMode(false);
                        setCurrentB(Number(e.target.value));
                      }}
                      className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Glow Intensity Slider */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Glow Intensity</span>
                  <span className="font-mono text-slate-500">{glowIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>

              {/* Chroma Flow Animated Mode Button */}
              <button
                onClick={() => setIsChromaMode(!isChromaMode)}
                className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                  isChromaMode
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-transparent shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${isChromaMode ? 'animate-spin' : 'text-purple-400'}`} />
                  <span>Chroma Flow (Auto-Cycle)</span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/20">
                  {isChromaMode ? 'Active' : 'Enable'}
                </span>
              </button>
            </div>

            {/* Footer Status Bar */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span>RGB({currentR}, {currentG}, {currentB})</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Check className="w-3 h-3" /> Live Synced
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
