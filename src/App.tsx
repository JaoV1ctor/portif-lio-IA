import { useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Terminal } from './components/Terminal/Terminal';
import { Chatbot } from './components/Chatbot/Chatbot';
import { Contact } from './components/Contact';
import { NeuralNetwork } from './components/NeuralNetwork';

function App() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Forçar o scroll para o topo no carregamento inicial
    window.scrollTo(0, 0);
    
    // Fallback para browsers que salvam a posição do scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden selection:bg-primary/30 antialiased">
      {/* Background Sólido Base */}
      <div className="fixed inset-0 bg-[#050505] z-[-2]" />
      
      {/* Rede Neural Interativa Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <NeuralNetwork scrollProgress={scrollYProgress} />
      </div>
      
      {/* Mesh gradients ou background elements globais podem vir aqui */}
      <div className="fixed inset-0 pointer-events-none z-0 before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] before:opacity-10" />
      
      <main className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-6 sm:px-12 pt-20 pb-32 space-y-32">
        <Hero />
        <About />
        <Projects />
        <Terminal />
        <Contact />
      </main>

      <Chatbot />
    </div>
  );
}

export default App;
