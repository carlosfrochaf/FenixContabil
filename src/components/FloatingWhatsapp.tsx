import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { MessageSquare, X, ArrowUpRight } from 'lucide-react';

export const FloatingWhatsapp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultWhatsappMessage = encodeURIComponent("Olá. Gostaria de falar com o time técnico da Fênix Contábil.");
  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${defaultWhatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-tech">
      
      {/* Dialog Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0F0F0F] border border-[#262626] p-5 shadow-2xl animate-fadeIn text-left">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#262626] mb-3">
            <span className="text-[10px] text-[#FAFAFA] font-bold uppercase tracking-widest">
              ATENDIMENTO // FÊNIX
            </span>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8A8A8A] hover:text-[#FAFAFA]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-[#8A8A8A] leading-relaxed mb-4">
            Dúvidas sobre planejamento tributário, Fator R ou migração de escritório?
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between py-3 px-4 bg-[#FAFAFA] text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-[#E5E5E5] transition-colors"
          >
            <span>INICIAR CONVERSA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-[#FAFAFA] text-[#050505] hover:bg-[#E5E5E5] border border-[#FAFAFA] shadow-2xl transition-transform hover:scale-105 active:scale-95"
        aria-label="WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-[#050505]" />
      </button>

    </div>
  );
};
