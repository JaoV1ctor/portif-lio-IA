import { motion } from 'framer-motion';
import { Mail, Instagram, MessageCircle } from 'lucide-react';
import { ScrambleTitle } from './ui/ScrambleTitle';

export function Contact() {
  return (
    <section id="contato" className="w-full relative z-10 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Informações de Contato Centralizadas */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12 text-center"
        >
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase leading-none">
              <span className="text-foreground block"><ScrambleTitle text="Vamos" delay={0.1} /></span>
              <span className="text-primary block"><ScrambleTitle text="Conversar?" delay={0.4} /></span>
            </h2>
            <p className="text-foreground/70 text-lg mx-auto max-w-sm pt-2">
              Pronto para elevar o nível tecnológico do seu projeto com soluções de inteligência artificial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jaions2003@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-full border border-card-border bg-background/50 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-lg">
                <Mail className="w-6 h-6 text-red-500 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wider text-foreground/50 uppercase">Email</p>
                <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">jaions2003@gmail.com</p>
              </div>
            </a>
            
            <a 
              href="https://instagram.com/jao.cfxz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-full border border-card-border bg-background/50 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-lg">
                <Instagram className="w-6 h-6 text-pink-500 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wider text-foreground/50 uppercase">Instagram</p>
                <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">@jao.cfxz</p>
              </div>
            </a>
            
            <a 
              href="https://wa.me/5513991377983"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-full border border-card-border bg-background/50 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-lg">
                <MessageCircle className="w-6 h-6 text-green-500 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wider text-foreground/50 uppercase">WhatsApp</p>
                <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">+55 (13) 99137-7983</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="text-center mt-32 mb-8">
        <p className="text-sm font-mono text-foreground/40">
          © {new Date().getFullYear()} João Victor IA. Todos os direitos reservados.
        </p>
      </div>
    </section>
  );
}
