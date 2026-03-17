import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

type OutputMessage = {
  type: 'comando' | 'sistema' | 'erro';
  texto: React.ReactNode;
};

const TypewriterLine = ({ children }: { children: React.ReactNode }) => {
  if (typeof children === 'string') {
    return (
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.02 } },
          hidden: {}
        }}
      >
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, display: "none" },
              visible: { opacity: 1, display: "inline" }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const INITIAL_MESSAGES: OutputMessage[] = [
  { type: 'sistema', texto: 'Iniciando sistema Antigravity CLI...' },
  { type: 'sistema', texto: 'Digite "help" para ver os comandos disponíveis.' }
];

export function Terminal() {
  const [historico, setHistorico] = useState<OutputMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [historico]);

  const processarComando = (cmd: string) => {
    const formatado = cmd.trim().toLowerCase();
    let resposta: React.ReactNode = '';

    switch (formatado) {
      case 'help':
        resposta = (
          <div className="flex flex-col gap-1 text-foreground/80">
            <span>Comandos disponíveis:</span>
            <span><strong className="text-primary">help</strong> - Mostra esta mensagem</span>
            <span><strong className="text-primary">about</strong> - Resumo sobre João Victor</span>
            <span><strong className="text-primary">projects</strong> - Lista de projetos em destaque</span>
            <span><strong className="text-primary">clear</strong> - Limpa o histórico do terminal</span>
          </div>
        );
        setHistorico(prev => [...prev, { type: 'comando', texto: cmd }, { type: 'sistema', texto: resposta }]);
        break;
      
      case 'about':
        resposta = 'João Victor é um Desenvolvedor de IA focado em arquiteturas RAG, coordenação multiagente e Vibe Coding.';
        setHistorico(prev => [...prev, { type: 'comando', texto: cmd }, { type: 'sistema', texto: resposta }]);
        break;

      case 'projects':
        resposta = '1. Agendamento Inteligente\n2. Automação de Fluxo de Caixa\n3. Analisador de Sentimento Vibe';
        setHistorico(prev => [...prev, { type: 'comando', texto: cmd }, { type: 'sistema', texto: resposta }]);
        break;

      case 'clear':
        setHistorico(INITIAL_MESSAGES);
        break;

      case '':
        break;

      default:
        resposta = `Comando não reconhecido: '${formatado}'. Digite 'help' para ver as opções.`;
        setHistorico(prev => [...prev, { type: 'comando', texto: cmd }, { type: 'erro', texto: resposta }]);
        break;
    }
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processarComando(input);
    }
  };

  return (
    <section className="w-full relative z-10 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl mx-auto glass-panel overflow-hidden border-card-border/50"
      >
        {/* Cabecalho Terminal */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-card-border/30">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-foreground/70 uppercase tracking-wider">Antigravity CLI</span>
          <div className="flex gap-1.5 ml-auto">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>

        {/* Corpo Terminal */}
        <div 
          ref={containerRef} 
          onClick={() => inputRef.current?.focus()}
          className="p-4 h-[350px] md:h-[400px] overflow-y-auto font-mono text-sm flex flex-col gap-2 bg-[#0a0a0c] cursor-text"
        >
          {historico.map((msg, idx) => (
            <div key={idx} className="flex flex-col">
              {msg.type === 'comando' && (
                <div className="flex items-center text-foreground/90 font-bold">
                  <span className="text-primary mr-2">joaovictoria@sys:~$</span>
                  <TypewriterLine>{msg.texto}</TypewriterLine>
                </div>
              )}
              {msg.type === 'sistema' && (
                <div className="text-foreground/70 mt-1 whitespace-pre-wrap">
                  <TypewriterLine>{msg.texto}</TypewriterLine>
                </div>
              )}
              {msg.type === 'erro' && (
                <div className="text-red-400 mt-1">
                  <TypewriterLine>{msg.texto}</TypewriterLine>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex items-center mt-2">
            <span className="text-primary mr-2">joaovictoria@sys:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-foreground/90 caret-primary"
              spellCheck={false}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
