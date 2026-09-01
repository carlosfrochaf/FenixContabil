import React, { useState } from 'react';
import { 
  TrendingDown, 
  ArrowRightLeft, 
  DollarSign, 
  Users, 
  Building2, 
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

interface BentoGridProps {
  onOpenDiagnostic: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenDiagnostic }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const services = [
    {
      code: "01 // TRIBUTÁRIO",
      title: "Planejamento & Elisão Fiscal",
      desc: "Revisão contínua de enquadramento (Simples vs Presumido), aplicação de Fator R para redução de 15,5% para 6% e segregação de monofásicos.",
      icon: TrendingDown,
      metric: "ATÉ 60% REDUÇÃO"
    },
    {
      code: "02 // MIGRAÇÃO",
      title: "Transição Técnica Sem Atrito",
      desc: "Assumimos o contato com seu contador anterior, auditamos o histórico fiscal e regularizamos a empresa em até 48 horas.",
      icon: ArrowRightLeft,
      metric: "TRANSIÇÃO 48H"
    },
    {
      code: "03 // BPO FINANCEIRO",
      title: "Gestão Operacional de Caixa",
      desc: "Conciliação bancária diária, agendamento de contas a pagar, faturamento de notas e relatórios executivos de DRE sem planilhas manuais.",
      icon: DollarSign,
      metric: "DRE EM TEMPO REAL"
    },
    {
      code: "04 // DEPARTAMENTO PESSOAL",
      title: "Folha & eSocial em Nuvem",
      desc: "Admissões, rescisões, pró-labore dos sócios e obrigações trabalhistas com conformidade legal absoluta perante a CLT.",
      icon: Users,
      metric: "100% COMPLIANCE"
    },
    {
      code: "05 // PATRIMONIAL",
      title: "Holdings & Blindagem",
      desc: "Estruturação societária para proteção de bens pessoais, redução de ITBI/ganho de capital e planejamento sucessório familiar.",
      icon: Building2,
      metric: "PROTEÇÃO JURÍDICA"
    },
    {
      code: "06 // COMPLIANCE",
      title: "Monitoramento de CNDs",
      desc: "Varredura contínua de certidões negativas federais, estaduais e municipais para garantir operações e licitações sem travas.",
      icon: ShieldCheck,
      metric: "VARREDURA DIÁRIA"
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIdx(idx);
  };

  return (
    <section id="servicos" className="py-24 border-b border-[#262626] bg-[#050505] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#262626] items-end mb-12">
          <div className="lg:col-span-8 text-left">
            <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-widest block mb-2">
              [ ARQUITETURA DE SERVIÇOS ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAFAFA] tracking-tight">
              ESTRUTURA CONTÁBIL E FISCAL INTEGRADA.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs font-tech text-[#8A8A8A] leading-relaxed">
              Passe o cursor sobre os módulos para detalhes operacionais.
            </p>
          </div>
        </div>

        {/* Rigid 3-Column Hairline Grid with Spotlight Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#262626]">
          {services.map((s, index) => {
            const Icon = s.icon;
            const isHovered = hoveredIdx === index;

            return (
              <div
                key={index}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative p-8 sm:p-10 border-r border-b border-[#262626] bg-[#050505] hover:bg-[#0A0A0A] transition-all duration-200 flex flex-col justify-between group text-left min-h-[320px] overflow-hidden cursor-default"
              >
                {/* Mouse Spotlight Glow */}
                {isHovered && (
                  <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
                    style={{
                      background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(250, 250, 250, 0.07), transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-tech text-[10px] text-[#8A8A8A] group-hover:text-[#FAFAFA] uppercase tracking-widest transition-colors">
                      {s.code}
                    </span>
                    <div className="p-2 border border-[#1A1A1A] group-hover:border-[#FAFAFA] bg-[#0A0A0A] transition-all">
                      <Icon className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#FAFAFA] transition-colors stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-[#FAFAFA] mb-3 tracking-tight">
                    {s.title}
                  </h3>

                  <p className="text-xs text-[#8A8A8A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-8 flex items-center justify-between border-t border-[#1A1A1A] group-hover:border-[#262626] transition-colors">
                  <span className="text-[10px] font-tech px-2 py-0.5 border border-[#262626] text-[#8A8A8A] group-hover:text-[#FAFAFA] group-hover:border-[#FAFAFA] uppercase transition-colors">
                    {s.metric}
                  </span>

                  <button 
                    onClick={onOpenDiagnostic}
                    className="text-xs font-tech text-[#8A8A8A] group-hover:text-[#FAFAFA] flex items-center gap-1.5 transition-all group-hover:translate-x-0.5"
                  >
                    <span>CONSULTAR</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
