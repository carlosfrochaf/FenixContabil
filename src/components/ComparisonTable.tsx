import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ComparisonProps {
  onOpenDiagnostic: () => void;
}

export const ComparisonTable: React.FC<ComparisonProps> = ({ onOpenDiagnostic }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const comparisons = [
    {
      parameter: "TEMPO DE RESPOSTA",
      conventional: "Dias úteis por canais impessoais ou chamados em fila.",
      fenix: "Atendimento direto no WhatsApp por contadores dedicados.",
    },
    {
      parameter: "POSTURA TRIBUTÁRIA",
      conventional: "Emissão passiva de guias e impostos no final do mês.",
      fenix: "Aplicação ativa de Fator R, elisão e recuperação de créditos.",
    },
    {
      parameter: "TRANSFERÊNCIA DE DADOS",
      conventional: "Malotes físicos ou sistemas burocráticos legados.",
      fenix: "Infraestrutura digital em nuvem com integração bancária.",
    },
    {
      parameter: "CONTROLE FINANCEIRO",
      conventional: "O cliente opera o caixa sem apoio técnico contábil.",
      fenix: "BPO financeiro, DRE gerencial e fluxo de caixa conciliado.",
    },
    {
      parameter: "MIGRAÇÃO DE ESCRITÓRIO",
      conventional: "Processo desgastante e com atrito entre contadores.",
      fenix: "A Mariani assume 100% da transição técnica em até 48 horas.",
    },
    {
      parameter: "PROPOSTA DE VALOR",
      conventional: "Custo obrigatório para evitar autuações fiscais.",
      fenix: "Consultoria estratégica focada em retenção e expansão de margem.",
    }
  ];

  return (
    <section id="comparativo" className="py-24 border-b border-[#262626] bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#262626] items-end mb-12">
          <div className="lg:col-span-8 text-left">
            <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-widest block mb-2">
              [ MATRIZ DE DIFERENCIAÇÃO ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAFAFA] tracking-tight">
              MÉTODO CONVENCIONAL VS MARIANI.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs font-tech text-[#8A8A8A] leading-relaxed">
              Passe o cursor sobre os parâmetros para comparar.
            </p>
          </div>
        </div>

        {/* Structural Matrix with Interactive Row Hover */}
        <div className="border border-[#262626] divide-y divide-[#262626] text-left font-tech">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#0F0F0F] text-xs font-bold uppercase tracking-wider text-[#FAFAFA] p-4 sm:p-6 select-none">
            <div className="md:col-span-4 text-[#8A8A8A]">PARÂMETRO OPERACIONAL</div>
            <div className="md:col-span-4 text-[#8A8A8A] mt-2 md:mt-0">CONTABILIDADE CONVENCIONAL</div>
            <div className="md:col-span-4 text-[#FAFAFA] mt-2 md:mt-0">PADRÃO MARIANI CONTÁBIL</div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => {
            const isHovered = hoveredRow === index;
            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 gap-4 items-center transition-all duration-150 cursor-default ${
                  isHovered ? 'bg-[#121212] border-l-2 border-l-[#FAFAFA]' : 'hover:bg-[#0A0A0A]'
                }`}
              >
                <div className="md:col-span-4 text-xs font-bold uppercase flex items-center gap-2">
                  <span className={`text-[10px] ${isHovered ? 'text-[#FAFAFA]' : 'text-[#525252]'}`}>
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <span className={isHovered ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]'}>{row.parameter}</span>
                </div>
                <div className="md:col-span-4 text-xs text-[#8A8A8A]">
                  {row.conventional}
                </div>
                <div className={`md:col-span-4 text-xs font-semibold transition-colors ${isHovered ? 'text-[#FAFAFA] pl-1' : 'text-[#FAFAFA]'}`}>
                  {row.fenix}
                </div>
              </div>
            );
          })}

        </div>

        {/* Action Row */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onOpenDiagnostic}
            className="flex items-center gap-2 px-6 py-3 bg-[#FAFAFA] text-[#050505] font-tech text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E5] transition-transform active:scale-95"
          >
            <span>SOLICITAR AVALIAÇÃO DE MIGRAÇÃO</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
