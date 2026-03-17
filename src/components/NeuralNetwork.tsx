import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface NeuralNetworkProps {
  scrollProgress?: MotionValue<number>;
}

export function NeuralNetwork({ scrollProgress }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Calculate dynamic particle count based on screen size
    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      // Roughly 1 particle per 15000 pixels, min 40, max 150
      return Math.min(Math.max(Math.floor(area / 15000), 40), 150);
    };

    const initParticles = () => {
      particles = [];
      const numParticles = getParticleCount();
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lê o progresso do framer-motion para o scroll parallax (de 0 a 1)
      const progress = scrollProgress ? scrollProgress.get() : 0;
      
      // Interpolação de cor linear de Roxo (170, 59, 255) para Azul Cyan (59, 130, 246)
      const r = Math.floor(170 - (170 - 59) * progress);
      const g = Math.floor(59 + (130 - 59) * progress);
      const b = Math.floor(255 - (255 - 246) * progress);
      
      // Intensifica a distância máxima e a reação da rede conforme desce (120 até 180)
      const dynamicMaxDistSq = Math.pow(120 + (60 * progress), 2);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Aumenta a velocidade sutilmente com o scroll
        p.x += p.vx * (1 + progress);
        p.y += p.vy * (1 + progress);

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle (node)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`; 
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < dynamicMaxDistSq) {
            const opacity = 1 - (distSq / dynamicMaxDistSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.25})`; // Linhas mais vivas
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect with mouse
        const msDx = p.x - mouse.x;
        const msDy = p.y - mouse.y;
        const msDistSq = msDx * msDx + msDy * msDy;
        const msMaxDist = 150 * 150; // Interaction radius

        if (msDistSq < msMaxDist) {
          const opacity = 1 - (msDistSq / msMaxDist);
          // Gently repel nodes from mouse to create an organic feeling,
          // but mainly we draw the bright connection
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          // Brighter interaction lines com a cor atualizada
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Micro interactivity: slight push away
          p.x += (msDx / Math.sqrt(msDistSq)) * 0.5;
          p.y += (msDy / Math.sqrt(msDistSq)) * 0.5;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Fix canvas to viewport explicitly context 
    const handleMouseMoveFixed = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMoveFixed);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMoveFixed);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
