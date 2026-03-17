import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?-=[]\\;\',./';

interface ScrambleTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

export function ScrambleTitle({ text, className = "", delay = 0.2 }: ScrambleTitleProps) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));


  useEffect(() => {
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      startAnimation();
    }, delay * 1000);
    let intervalId: ReturnType<typeof setInterval>;

    const startAnimation = () => {
      let iteration = 0;
      
      clearInterval(intervalId);
      
      intervalId = setInterval(() => {
        setDisplayText(
          text.split('')
            .map((_letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              // Preserve spaces
              if (text[index] === ' ') return ' ';
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('')
        );
        
        // The higher the number, the slower it reveals the final word
        iteration += 1 / 3;
        
        if (iteration >= text.length) {
          clearInterval(intervalId);
        }
      }, 30);
    };

    // Delay start is handled during declaration.

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`font-mono ${className}`}
    >
      {displayText}
    </motion.div>
  );
}
