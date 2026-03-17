import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ScrambleTitle } from './ui/ScrambleTitle';

import { GlowCard } from './ui/GlowCard';

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
          <h2 className="text-3xl font-bold tracking-tight">
            <ScrambleTitle text="Projetos em Destaque" delay={0.1} />
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <GlowCard key={index} delay={index * 0.1}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              
              <p className="text-foreground/70 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-2 py-1 rounded bg-background/50 text-foreground/80 border border-card-border">
                    {tag}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
