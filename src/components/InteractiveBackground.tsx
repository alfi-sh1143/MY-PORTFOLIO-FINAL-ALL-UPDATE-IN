import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface InteractiveBackgroundProps {
  interactive?: boolean;
}

export default function InteractiveBackground({ interactive = true }: InteractiveBackgroundProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHasMouse(true);
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Fluid Ambient Orbs that respond gently to cursor and float continuously */}
      <motion.div
        animate={{
          x: [0, 60, -40, 20, 0],
          y: [0, -50, 40, -20, 0],
          scale: [1, 1.15, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-[110px] opacity-25 dark:opacity-35 transition-colors duration-700"
        style={{
          x: hasMouse ? springX : undefined,
          y: hasMouse ? springY : undefined,
          background: 'radial-gradient(circle, rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.45) 0%, transparent 70%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -70, 50, -30, 0],
          y: [0, 60, -50, 30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 -right-36 w-[36rem] h-[36rem] rounded-full blur-[120px] opacity-20 dark:opacity-30 transition-colors duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.35) 0%, rgba(147, 51, 234, 0.25) 50%, transparent 75%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, 40, -60, 30, 0],
          y: [0, -40, 50, -30, 0],
          scale: [0.95, 1.1, 1, 1.08, 0.95],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute -bottom-40 left-1/4 w-[40rem] h-[40rem] rounded-full blur-[130px] opacity-15 dark:opacity-25 transition-colors duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.3) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 75%)',
        }}
      />

      {/* 2. Delicate Cyber Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(148, 163, 184, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3. Subtle floating particle stardust (lightweight, zero lag) */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              left: `${15 + i * 16}%`,
              top: `${20 + (i * 13) % 70}%`,
              backgroundColor: 'rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.6)',
              boxShadow: '0 0 12px rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.8)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
}
