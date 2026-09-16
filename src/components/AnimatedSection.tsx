import React from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'fade';
}

export default function AnimatedSection({
  id,
  className = '',
  children,
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  const getInitialY = () => {
    if (direction === 'up') return 32;
    if (direction === 'down') return -32;
    return 0;
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: getInitialY() }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
