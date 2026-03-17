import { motion } from 'framer-motion';

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
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium tracking-wide mb-6">
            ARQUITETANDO INTELIGÊNCIA
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground">
          João Victor | <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">IA</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
          Desenvolvedor de IA criando arquiteturas neurais de próxima geração, sistemas de coordenação multiagente e soluções de LLM ajustadas.
        </p>

        <motion.div 
          className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.a 
            href="#projetos" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            VER PROJETOS
          </motion.a>
          <motion.a 
            href="#contato" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-card border border-card-border text-foreground hover:bg-card/80 transition-colors"
          >
            CONTATO
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
