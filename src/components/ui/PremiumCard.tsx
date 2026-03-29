import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PremiumCardProps extends HTMLMotionProps<'div'> {
  glowBorder?: boolean;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  className,
  glowBorder = false,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, rotateY: 2, rotateX: 2 }}
      className={cn(
        "liquid-glass p-6 rounded-2xl cursor-pointer perspective-1000",
        glowBorder && "glow-border",
        className
      )}
      {...props}
    >
      {/* Ocultando o overflow de forma nativa para revelação e zoom de imagens */}
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {children as React.ReactNode}
      </div>
    </motion.div>
  );
};
