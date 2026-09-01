import React from 'react';
import { ParticleCanvas } from './ParticleCanvas';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenDiagnostic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDiagnostic }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 sm:pt-36 pb-20 border-b border-[#262626] overflow-hidden">
      
      {/* 12-Column Grid Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top Coordinate & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between pb-8 mb-8 border-b border-[#262626] text-[11px] font-tech text-[#8A8A8A] uppercase tracking-widest gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FAFAFA]" />
            <span>BELO HORIZONTE // MG — BRASIL</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>REGISTRO: CRC-MG</span>
            <span>FUNDAÇÃO: 1994 [+30 ANOS]</span>
            <span>SISTEMA: INTELIGÊNCIA TRIBUTÁRIA</span>
          </div>
        </div>

        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Giant Display Headline (~70% visual weight) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 text-left z-10">
            
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-[#FAFAFA] leading-[0.92] tracking-tighter">
                CONTABILIDADE<br />
                ESTRATÉGICA E<br />
                <span className="glitch-text text-[#FAFAFA]" data-text="RIGOR FISCAL.">
                  RIGOR FISCAL.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#8A8A8A] max-w-2xl font-normal leading-relaxed pt-2">
                Mais de 30 anos transformando complexidade tributária em margem líquida, blindagem societária e conformidade para empresas em todo o território nacional.
              </p>
            </div>

            {/* Brutalist Action Area */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#simulador"
                className="flex items-center justify-between sm:justify-center gap-4 px-8 py-4 bg-[#FAFAFA] text-[#050505] font-tech font-bold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] transition-colors"
              >
                <span>SIMULAR ECONOMIA TRIBUTÁRIA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDiagnostic}
                className="flex items-center justify-between sm:justify-center gap-4 px-8 py-4 bg-transparent text-[#FAFAFA] border border-[#262626] font-tech text-xs uppercase tracking-widest hover:bg-[#0F0F0F] hover:border-[#FAFAFA] transition-colors"
              >
                <span>SOLICITAR PARECER</span>
                <ArrowUpRight className="w-4 h-4 text-[#8A8A8A]" />
              </button>
            </div>

          </div>

          {/* Right Column: Asymmetric 3D Flow Particle Shape */}
          <div className="lg:col-span-5 xl:col-span-4 border border-[#262626] bg-[#0F0F0F] relative flex items-center justify-center p-2">
            <ParticleCanvas />
          </div>

        </div>

      </div>
    </section>
  );
};
