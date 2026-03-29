import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ScrambleTitle } from './ui/ScrambleTitle';
import { PremiumCard } from './ui/PremiumCard';

const projects = [
  {
    title: "Agendamento Inteligente",
    description: "Sistema de reservas via IA para negócios locais que entende linguagem natural e otimiza a agenda automaticamente.",
    tags: ["IA", "NLP", "Automação"]
  },
  {
    title: "Automação de Fluxo de Caixa",
    description: "Ferramenta financeira para PMEs que utiliza IA para categorizar gastos e prever saúde financeira futura.",
    tags: ["Finanças", "Machine Learning"]
  },
  {
    title: "Analisador de Sentimento Vibe",
    description: "Monitoramento de redes sociais baseado em 'Vibe Coding', capturando nuances emocionais além do texto básico.",
    tags: ["Vibe Coding", "Análise de Sentimentos"]
  }
];

export function Projects() {
  return (
    <section id="projetos" className="w-full relative z-10 scroll-mt-24">
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-heading font-bold tracking-tight text-brand-text">
            <ScrambleTitle text="Case Studies" delay={0.1} />
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full mx-auto"></div>
        </motion.div>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scroll-bar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {projects.map((project, index) => (
            <PremiumCard 
              key={index} 
              glowBorder 
              className="flex-none w-[85vw] md:w-[400px] snap-center flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-heading font-semibold text-brand-text group-hover:text-brand-secondary transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-brand-text/40 hover:text-brand-accent transition-colors" />
              </div>
              
              <p className="text-brand-text/70 leading-relaxed mb-6 flex-grow text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-2 py-1 rounded-sm bg-brand-primary/5 text-brand-text/80 border border-brand-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
      <style>{`.hide-scroll-bar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
