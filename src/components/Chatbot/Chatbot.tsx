import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';

type ChatMessage = {
  id: string;
  sender: 'user' | 'ia';
  text: string;
};

// Respostas simuladas e simples para "Vibe"
const MOCK_IA_RESPONSES: Record<string, string> = {
  "sobre": "Sou João Victor, sou focado em desenvolvimento de IA, RAG e Vibe Coding. Como posso ajudar seu negócio?",
  "projetos": "Meus projetos principais incluem o Agendamento Inteligente e a Automação de Fluxo de Caixa. Role a página para ver mais 😊",
  "contato": "Você pode me chamar no WhatsApp ou mandar um email. Links estão no final da página!",
  "ola": "Olá! Bem-vindo ao meu portfólio de inteligência artificial. O que você gostaria de saber?",
  "oi": "Oi! Tudo bem? Como posso te ajudar hoje?",
  "default": "Ainda estou aprendendo a conversar melhor 🤖. Tente perguntar sobre meus 'projetos', 'sobre' mim ou 'contato'."
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'initial', sender: 'ia', text: 'Olá! Sou a IA do João Victor. Como posso te ajudar hoje?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;

    const userMsg = inputMsg.trim();
    const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: userMsg };
    
    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');
    setIsTyping(true);

    // Simular delay de pensamento da IA
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let responseText = MOCK_IA_RESPONSES["default"];
      
      for (const [key, value] of Object.entries(MOCK_IA_RESPONSES)) {
         if (lower.includes(key) && key !== 'default') {
           responseText = value;
           break;
         }
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ia', text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Botão Flutuante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center z-50 hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Janela de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] glass-panel z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-card-border/50 bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Assistente Vibe</h3>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-foreground/70 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.sender === 'user' 
                      ? "bg-primary text-primary-foreground ml-auto rounded-br-sm" 
                      : "bg-white/10 text-foreground border border-card-border/30 rounded-bl-sm"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              
              {isTyping && (
                <div className="bg-white/10 border border-card-border/30 text-foreground max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3.5 w-fit">
                  <div className="flex gap-1.5">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* InputArea */}
            <div className="p-3 bg-black/20 border-t border-card-border/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Envie uma mensagem..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-background/50 border border-card-border/50 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputMsg.trim() || isTyping}
                  className="absolute right-1.5 p-1.5 rounded-full bg-primary text-white disabled:opacity-50 disabled:bg-primary/50 transition-colors"
                >
                  <Send className="w-4 h-4 -ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
