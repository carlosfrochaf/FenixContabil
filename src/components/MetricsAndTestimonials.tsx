import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';

export const MetricsAndTestimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-24 border-b border-[#262626] bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#262626] items-end mb-12">
          <div className="lg:col-span-8 text-left">
            <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-widest block mb-2">
              [ PROVA TÉCNICA & AUTORIDADE ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAFAFA] tracking-tight">
              HISTÓRICO COMPROVADO DE MERCADO.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs font-tech text-[#8A8A8A] leading-relaxed">
              Três décadas de governança contábil em Belo Horizonte e atuação nacional.
            </p>
          </div>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#262626] bg-[#0F0F0F] mb-12 text-left">
          
          <div className="p-8 border-b sm:border-b-0 border-r border-[#262626]">
            <div className="font-display text-3xl sm:text-5xl text-[#FAFAFA] mb-2">
              30+
            </div>
            <div className="font-tech text-xs text-[#FAFAFA] uppercase font-bold">Anos de Atuação</div>
            <div className="font-tech text-[10px] text-[#8A8A8A] mt-1">Sede em Belo Horizonte // MG</div>
          </div>

          <div className="p-8 border-b sm:border-b-0 border-r border-[#262626]">
            <div className="font-display text-3xl sm:text-5xl text-[#FAFAFA] mb-2">
              15M+
            </div>
            <div className="font-tech text-xs text-[#FAFAFA] uppercase font-bold">Em Elisão Fiscal</div>
            <div className="font-tech text-[10px] text-[#8A8A8A] mt-1">Economia líquida comprovada</div>
          </div>

          <div className="p-8 border-r border-[#262626]">
            <div className="font-display text-3xl sm:text-5xl text-[#FAFAFA] mb-2">
              500+
            </div>
            <div className="font-tech text-xs text-[#FAFAFA] uppercase font-bold">Empresas Ativas</div>
            <div className="font-tech text-[10px] text-[#8A8A8A] mt-1">Nacional e multissetorial</div>
          </div>

          <div className="p-8">
            <div className="font-display text-3xl sm:text-5xl text-[#FAFAFA] mb-2">
              99.4%
            </div>
            <div className="font-tech text-xs text-[#FAFAFA] uppercase font-bold">Índice de Retenção</div>
            <div className="font-tech text-[10px] text-[#8A8A8A] mt-1">Satisfação técnica de clientes</div>
          </div>

        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#262626] text-left">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="p-8 sm:p-10 border-r border-b border-[#262626] bg-[#050505] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6 font-tech">
                  <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{t.segment}</span>
                  <span className="text-xs text-[#FAFAFA] font-bold">{t.annualSavingsTag}</span>
                </div>

                <p className="text-sm text-[#FAFAFA] font-normal leading-relaxed mb-8">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A] font-tech text-xs">
                <div className="font-bold text-[#FAFAFA] uppercase">{t.name}</div>
                <div className="text-[#8A8A8A] text-[11px] mt-0.5">{t.role} — <span className="text-[#FAFAFA]">{t.company}</span></div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
