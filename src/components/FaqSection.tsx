import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/config';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappFaqUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent("Olá. Gostaria de esclarecer uma dúvida técnica sobre os serviços da Mariani Contábil.")}`;

  return (
    <section id="faq" className="py-24 border-b border-[#262626] bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#262626] items-end mb-12">
          <div className="lg:col-span-8 text-left">
            <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-widest block mb-2">
              [ BASE DE CONHECIMENTO & DÚVIDAS ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAFAFA] tracking-tight">
              PERGUNTAS FREQUENTES.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs font-tech text-[#8A8A8A] leading-relaxed">
              Esclarecimentos técnicos sobre contratação, migração e obrigações fiscais.
            </p>
          </div>
        </div>

        {/* Hairline Accordion List */}
        <div className="border-t border-[#262626] divide-y divide-[#262626] text-left mb-12">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={item.id} 
                className={`transition-all duration-200 ${
                  isOpen ? 'bg-[#0E0E0E] px-4 -mx-4 border-l-2 border-l-[#FAFAFA]' : 'hover:bg-[#0A0A0A]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between gap-6 focus:outline-none cursor-pointer select-none group"
                >
                  <span className={`font-tech text-sm sm:text-base font-bold uppercase transition-colors ${
                    isOpen ? 'text-[#FAFAFA]' : 'text-[#8A8A8A] group-hover:text-[#FAFAFA]'
                  }`}>
                    [{String(index + 1).padStart(2, '0')}] {item.question}
                  </span>
                  <div className={`p-2 transition-all shrink-0 border ${
                    isOpen ? 'border-[#FAFAFA] bg-[#FAFAFA] text-[#050505]' : 'border-[#262626] text-[#8A8A8A] group-hover:border-[#8A8A8A]'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-8 text-xs sm:text-sm text-[#8A8A8A] font-tech leading-relaxed max-w-4xl animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Direct Box */}
        <div className="p-8 border border-[#262626] bg-[#0F0F0F] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <h4 className="font-tech text-sm font-bold text-[#FAFAFA] uppercase">Tem uma demanda tributária específica?</h4>
            <p className="text-xs font-tech text-[#8A8A8A] mt-0.5">Fale diretamente com os sócios e auditores contábeis da Mariani.</p>
          </div>
          <a
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#FAFAFA] text-[#050505] font-tech text-xs font-bold uppercase tracking-wider hover:bg-[#E5E5E5] transition-colors whitespace-nowrap"
          >
            <span>CONSULTAR CORPO TÉCNICO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
