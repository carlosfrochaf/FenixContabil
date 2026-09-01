import React from 'react';
import { Logo } from './Logo';
import { COMPANY_CONFIG } from '../data/config';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLgpd: () => void;
  onOpenDiagnostic: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLgpd, onOpenDiagnostic }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#8A8A8A] text-xs font-tech pt-20 pb-12 border-t border-[#262626]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#262626] text-left">
          
          {/* Col 1: Brand (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" />
            <p className="text-[#8A8A8A] text-xs leading-relaxed max-w-sm mt-3">
              {COMPANY_CONFIG.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-[#FAFAFA]">
              <span className="border border-[#262626] px-2.5 py-1 uppercase bg-[#0F0F0F]">
                REGISTRO CRC-MG
              </span>
              <span className="border border-[#262626] px-2.5 py-1 uppercase bg-[#0F0F0F]">
                CONFORMIDADE LGPD
              </span>
            </div>
          </div>

          {/* Col 2: Navigation (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-bold text-[#FAFAFA] uppercase tracking-wider block mb-4">
              [ NAVEGAÇÃO ]
            </span>
            <ul className="space-y-2 uppercase">
              <li>
                <a href="#hero" className="hover:text-[#FAFAFA] transition-colors">01 // Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#FAFAFA] transition-colors">02 // Serviços</a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-[#FAFAFA] transition-colors">03 // Simulador</a>
              </li>
              <li>
                <a href="#comparativo" className="hover:text-[#FAFAFA] transition-colors">04 // Diferenciais</a>
              </li>
              <li>
                <a href="#migracao" className="hover:text-[#FAFAFA] transition-colors">05 // Transição</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FAFAFA] transition-colors">06 // FAQ</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-bold text-[#FAFAFA] uppercase tracking-wider block mb-4">
              [ SEDE & ATENDIMENTO ]
            </span>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#525252] block text-[10px] uppercase">Endereço Oficial:</span>
                <span className="text-[#FAFAFA]">{COMPANY_CONFIG.address.fullFormatted}</span>
              </div>

              <div className="pt-1">
                <span className="text-[#525252] block text-[10px] uppercase">Telefone Geral:</span>
                <a href={`tel:${COMPANY_CONFIG.phoneClean}`} className="text-[#FAFAFA] hover:underline">
                  {COMPANY_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="pt-1">
                <span className="text-[#525252] block text-[10px] uppercase">E-mail Corporativo:</span>
                <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-[#FAFAFA] hover:underline">
                  {COMPANY_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenDiagnostic}
                className="px-4 py-2 border border-[#FAFAFA] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#050505] transition-colors uppercase text-[11px] font-bold tracking-wider"
              >
                SOLICITAR DIAGNÓSTICO
              </button>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#525252] text-[11px]">
          <div>
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. TODOS OS DIREITOS RESERVADOS.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenLgpd}
              className="hover:text-[#FAFAFA] uppercase transition-colors"
            >
              POLÍTICA DE PRIVACIDADE // LGPD
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#FAFAFA] uppercase transition-colors"
            >
              <span>TOPO</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
