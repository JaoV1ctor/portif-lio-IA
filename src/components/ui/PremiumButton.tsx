import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PremiumButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  glow?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false,
  className, 
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden font-heading font-semibold rounded-lg px-6 py-3 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg";
  
  const variants = {
    primary: "bg-brand-primary text-brand-bg hover:opacity-90",
    secondary: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5",
    ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, variants[variant], glow && "shadow-[0_4px_20px_rgba(99,102,241,0.4)]", className)}
      {...props}
    >
      {glow && (
        <span className="absolute inset-x-0 -bottom-px h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
      )}
      <span className="relative z-10">{children as React.ReactNode}</span>
    </motion.button>
  );
};
