import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400"
        style={{
          scaleX,
          backgroundColor: 'rgb(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235))',
          boxShadow: '0 0 10px rgba(var(--accent-r, 37), var(--accent-g, 99), var(--accent-b, 235), 0.7)',
        }}
      />
    </div>
  );
}
