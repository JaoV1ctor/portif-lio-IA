import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary origin-left z-50 rounded-r-full" 
        style={{ scaleX }}
      />
      <header
        className={`fixed top-4 left-4 right-4 z-40 transition-all duration-300 max-w-6xl mx-auto rounded-2xl ${
          isScrolled ? "liquid-glass py-4 px-6 md:px-8" : "bg-transparent py-5 px-6 md:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-heading font-bold text-brand-primary"
          >
            JOÃO.<span className="text-brand-secondary">DEV</span>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex gap-8 items-center"
          >
            {['Projetos', 'Sobre', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-brand-primary/80 hover:text-brand-secondary transition-colors font-medium font-heading"
              >
                {item}
              </a>
            ))}
          </motion.nav>
        </div>
      </header>
    </>
  );
};
