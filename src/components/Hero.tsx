import { motion } from 'framer-motion';
import { PremiumButton } from './ui/PremiumButton';

export function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-center">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-sm font-medium tracking-wide mb-6">
            ARQUITETANDO INTELIGÊNCIA
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold tracking-tight text-brand-text">
          João Victor | <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-purple-400">IA</span>
        </h1>
        
        <p className="text-lg md:text-xl text-brand-text/70 max-w-2xl mx-auto font-light leading-relaxed">
          Desenvolvedor de IA criando arquiteturas neurais de próxima geração, sistemas de coordenação multiagente e soluções de LLM ajustadas.
        </p>

        <motion.div 
          className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="#projetos">
            <PremiumButton variant="primary" glow>
              VER PROJETOS
            </PremiumButton>
          </a>
          <a href="#contato">
            <PremiumButton variant="secondary">
              CONTATO
            </PremiumButton>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
