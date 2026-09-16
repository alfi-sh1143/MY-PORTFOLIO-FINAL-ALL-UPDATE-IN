import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { portfolio } from '../config/portfolio';
import { Smartphone, Palette, Gamepad2, Play, RotateCcw, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

export default function BeyondWeb() {
  // Mini-Game State (Signal Defender: Fun interactive canvas game)
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Simple, engaging game logic: intercept incoming red attack packets before they breach the edge node!
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = 240);

    let packets: { x: number; y: number; speed: number; radius: number; isAttack: boolean }[] = [];
    let currentScore = 0;
    let isRunning = true;
    let spawnCounter = 0;

    const spawnPacket = () => {
      packets.push({
        x: Math.random() * (width - 40) + 20,
        y: 0,
        speed: 1.5 + Math.random() * 2,
        radius: 10 + Math.random() * 4,
        isAttack: Math.random() > 0.35 // 65% are intrusion threats
      });
    };

    const loop = () => {
      if (!isRunning) return;

      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Edge Gateway Base at bottom
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, height - 12, width, 12);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px monospace';
      ctx.fillText('SECURE EDGE GATEWAY BUFFER', 14, height - 3);

      spawnCounter++;
      if (spawnCounter % 40 === 0) {
        spawnPacket();
      }

      // Update and Draw Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.y += p.speed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isAttack) {
          ctx.fillStyle = '#f43f5e'; // Red attack packet
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#10b981'; // Green clean telemetry
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check breach
        if (p.y + p.radius >= height - 12) {
          if (p.isAttack) {
            // Intrusion reached edge! Game Over
            isRunning = false;
            setGameOver(true);
            setIsPlaying(false);
            if (currentScore > highScore) setHighScore(currentScore);
            return;
          } else {
            // Clean packet passed safely
            packets.splice(i, 1);
            currentScore += 5;
            setScore(currentScore);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    // Click handler to neutralize attack packet
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const dist = Math.hypot(p.x - clickX, p.y - clickY);
        if (dist <= p.radius + 15) {
          if (p.isAttack) {
            // Threat successfully mitigated
            packets.splice(i, 1);
            currentScore += 20;
            setScore(currentScore);
          } else {
            // False positive deduction
            packets.splice(i, 1);
            currentScore = Math.max(0, currentScore - 10);
            setScore(currentScore);
          }
          break;
        }
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      isRunning = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <section id="creative" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070b14]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
              04 // Exploration
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Beyond the Web
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            Applying interface thinking, visual aesthetics, and creative computing across mobile touchscreens and interactive micro-experiences.
          </p>
        </div>

        {/* 3 Columns: Mobile, Graphics, Game Dev */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card 1: Mobile App Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-7 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between hover:border-blue-500/40 shadow-sm transition-colors"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  Touch & Mobile Interfaces
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Mobile App Development
                </h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Exploring mobile application development, focusing on useful interfaces, responsive interaction patterns and practical digital experiences. Designing with thumb-reach ergonomics and native haptics in mind.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {["React Native", "Mobile UI/UX", "Touch UX", "iOS & Android"].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
                ✦ Future mobile concepts currently in development.
              </div>
            </div>
          </motion.div>

          {/* Card 2: Graphics Design & Visual Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-7 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between hover:border-indigo-500/40 shadow-sm transition-colors"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Visual Systems
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Creative & Visual Design
                </h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Visual composition, digital graphics, typography hierarchies, and identity assets that create distinct digital atmospheres. Emphasizing restraint, mathematical proportion, and brand memorability.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {["Brand Identity", "Visual Composition", "Figma", "Digital Graphics"].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-slate-900/60 border border-indigo-200 dark:border-slate-800/80 text-xs text-indigo-700 dark:text-indigo-300">
                ✦ Selected creative design work coming soon.
              </div>
            </div>
          </motion.div>

          {/* Card 3: Creative Experiments & Mini-Game */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-7 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between hover:border-cyan-500/40 shadow-sm transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Best: {highScore}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                  Creative Coding Playground
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Signal Defender Mini-Game
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Intercept red threat packets by clicking them before they breach the Edge Gateway buffer. Let green telemetry flow through!
              </p>
            </div>

            {/* Interactive Canvas Game Area */}
            <div className="relative rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-[#080d1a] h-52 flex flex-col justify-center items-center shadow-inner">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
              />

              {!isPlaying && !gameOver && (
                <div className="absolute inset-0 bg-[#080d1a]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <span className="text-xs text-cyan-300 font-mono">Interactive Browser Experiment</span>
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" /> Start Simulation
                  </button>
                </div>
              )}

              {gameOver && (
                <div className="absolute inset-0 bg-red-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <span className="text-xs text-red-400 font-mono font-bold">Threat Breached Gateway!</span>
                  <div className="text-lg font-bold text-white">Score: {score}</div>
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retry Defense
                  </button>
                </div>
              )}

              {isPlaying && (
                <div className="absolute top-2 right-3 pointer-events-none text-xs font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-slate-700">
                  Score: {score}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
