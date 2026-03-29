import { useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
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
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="relative min-h-screen text-brand-text overflow-hidden selection:bg-brand-secondary/30 antialiased font-body">
      
      {/* Dynamic Animated Mesh Gradient Base */}
      <div className="mesh-gradient" />
      
      {/* Existing Neural Network Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20 transition-opacity">
        <NeuralNetwork scrollProgress={scrollYProgress} />
      </div>
      
      <Navbar />
      
      <main className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-32 space-y-32">
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
