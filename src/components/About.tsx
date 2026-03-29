import { motion } from 'framer-motion';
import { ScrambleTitle } from './ui/ScrambleTitle';

const skills = [
  "Prompt Engineering", 
  "Antigravity", 
  "Vibe Coding", 
  "RAG", 
  "Fine-tuning", 
  "Python",
  "React",
  "TypeScript",
  "UI/UX"
];

export function About() {
  return (
    <section id="sobre" className="w-full relative z-10 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="liquid-glass p-6 sm:p-10 md:p-12 text-left space-y-8 rounded-2xl"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-brand-text">
            <ScrambleTitle text="Sobre Mim" delay={0.1} />
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-brand-text/80 leading-relaxed text-lg text-justify hyphens-auto font-body">
            <p>
              Sou um desenvolvedor especializado em tecnologia e IA, focado em criar produtos digitais que causam impacto e entregam experiências extraordinárias. Minha abordagem une código conciso com engenharia de UI premium.
            </p>
            <p>
              Utilizo automações como RAG e Agentes Autônomos em conjunto com Web Design esteticamente refinado, não apenas para solucionar problemas, mas para colocar a marca dos meus clientes em um patamar superior.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-heading font-medium text-brand-text">SKILLS & TECH</h3>
            <p className="text-brand-text/60 text-sm">Ferramentas e conceitos que utilizo para moldar a web imersiva.</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-sm font-medium hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-secondary transition-all cursor-pointer select-none shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] text-brand-text"
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
