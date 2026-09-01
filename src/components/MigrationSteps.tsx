import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/config';

interface MigrationStepsProps {
  onOpenDiagnostic: () => void;
}

export const MigrationSteps: React.FC<MigrationStepsProps> = ({ onOpenDiagnostic }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Diagnóstico Fiscal",
      desc: "Auditoria do CNPJ atual e identificação imediata de oportunidades tributárias sem compromisso.",
    },
    {
      num: "02",
      title: "Planejamento e Proposta",
      desc: "Apresentação da modelagem de enquadramento (Simples/Presumido) e cálculo de economia líquida.",
    },
    {
      num: "03",
      title: "Transição Técnica Direta",
      desc: "A Mariani solicita livros, certidões e histórico fiscal ao contador anterior sem desgaste para o cliente.",
    },
    {
      num: "04",
      title: "Operação e Atendimento",
      desc: "Ativação do canal técnico dedicado de WhatsApp com acompanhamento proativo de prazos e CNDs.",
    }
  ];

  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent("Olá. Gostaria de iniciar o processo de migração para a Mariani Contábil.")}`;

  return (
    <section id="migracao" className="py-24 border-b border-[#262626] bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#262626] items-end mb-12">
          <div className="lg:col-span-8 text-left">
            <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-widest block mb-2">
              [ PROTOCOLO DE ONBOARDING ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAFAFA] tracking-tight">
              TRANSIÇÃO TÉCNICA EM 4 ETAPAS.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs font-tech text-[#8A8A8A] leading-relaxed">
              Processo padronizado para troca de escritório sem impacto na sua operação diária.
            </p>
          </div>
        </div>

        {/* 4-Step Rigid Grid with Interactive Hover Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#262626] mb-12">
          {steps.map((s, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-8 sm:p-10 border-r border-b border-[#262626] transition-all duration-200 text-left flex flex-col justify-between min-h-[280px] cursor-default ${
                  isHovered ? 'bg-[#0E0E0E] border-b-[#FAFAFA]' : 'bg-[#050505]'
                }`}
              >
                <div>
                  <div className={`font-display text-3xl sm:text-5xl mb-6 transition-all duration-200 ${
                    isHovered ? 'text-[#FAFAFA] translate-x-1' : 'text-[#333333]'
                  }`}>
                    {s.num}
                  </div>

                  <h3 className="font-display text-base text-[#FAFAFA] mb-2 uppercase tracking-tight">
                    {s.title}
                  </h3>

                  <p className="text-xs text-[#8A8A8A] font-tech leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className={`pt-6 font-tech text-[10px] uppercase transition-colors ${
                  isHovered ? 'text-[#FAFAFA]' : 'text-[#525252]'
                }`}>
                  FASE {s.num} // 100% DIGITAL
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar Action */}
        <div className="p-8 border border-[#262626] bg-[#0A0A0A] hover:border-[#333333] transition-colors flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h4 className="font-display text-lg text-[#FAFAFA] uppercase">
              Inicie a transição da sua empresa agora mesmo
            </h4>
            <p className="text-xs font-tech text-[#8A8A8A] mt-1">
              Atendimento técnico direto por WhatsApp ou videoconferência.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenDiagnostic}
              className="px-6 py-3.5 bg-[#FAFAFA] text-[#050505] font-tech text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E5] transition-transform active:scale-95"
            >
              DIAGNÓSTICO GRATUITO
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-transparent border border-[#262626] text-[#FAFAFA] font-tech text-xs uppercase tracking-widest hover:bg-[#050505] hover:border-[#FAFAFA] transition-all flex items-center justify-center gap-2"
            >
              <span>FALAR COM CONSULTOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
