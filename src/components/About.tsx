import { motion } from 'framer-motion';
import { ScrambleTitle } from './ui/ScrambleTitle';

const skills = [
  "Prompt Engineering", 
  "Antigravity", 
  "Vibe Coding", 
  "RAG", 
  "Fine-tuning", 
  "Python"
];

export function About() {
  return (
    <section id="sobre" className="w-full relative z-10 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="glass-panel p-8 md:p-12 text-left space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            <ScrambleTitle text="Sobre Mim" delay={0.1} />
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-foreground/80 leading-relaxed text-lg text-justify hyphens-auto">
            <p>
              Sou um desenvolvedor de IA em nível intermediário, especializado em criar tecnologias que impactam positivamente negócios locais e PMEs. Minha abordagem combina rigor técnico com a filosofia de "Vibe Coding" — priorizando a fluidez, a intuição e a entrega de valor imediato.
            </p>
            <p>
              Atualmente focado em arquiteturas RAG (Retrieval-Augmented Generation) e automações que eliminam gargalos operacionais, permitindo que empreendedores foquem no que realmente importa: o crescimento.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">SKILLS & TECH</h3>
            <p className="text-foreground/60 text-sm">Ferramentas e conceitos que utilizo para construir o futuro.</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, rotate: index % 2 === 0 ? 2 : -2 }}
                  className="px-4 py-2 rounded-full border border-card-border bg-background/50 text-sm font-medium hover:border-primary border-transparent hover:bg-primary/20 hover:text-white hover:shadow-[0_0_15px_rgba(170,59,255,0.4)] transition-all cursor-pointer select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
