import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlowCard({ children, className = "", delay = 0 }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Valores de Movimento 3D (Tilt Paralaxe)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformações spring para movimento fluído (vidro não corta abruptamente)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Transforma o deslocamento (-0.5 a 0.5) em graus de rotação (-10 a 10)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calcula posição absoluta para o glow
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    setMousePosition({ x: clientX, y: clientY });

    // Calcula posição normalizada para o tilt (-0.5 a 0.5 do centro)
    const normalizedX = clientX / rect.width - 0.5;
    const normalizedY = clientY / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Retorna o tilt suavemente ao centro zero
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={`glass-panel p-6 flex flex-col h-full group transition-shadow hover:shadow-[0_8px_30px_rgba(170,59,255,0.15)] relative overflow-hidden ${className}`}
    >
      {/* O Efeito Glow Interno */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(170, 59, 255, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Borda Brilhante Interativa */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(170, 59, 255, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px' // espessura da borda
        }}
      />
      
      {/* Conteúdo (Children) precisa ter index z superior para não ficar embaixo do glow */}
      <div 
        className="relative z-10 flex flex-col h-full"
        style={{ transform: "translateZ(50px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
