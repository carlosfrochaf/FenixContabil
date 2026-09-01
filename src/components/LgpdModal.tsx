import React from 'react';
import { X } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/config';

interface LgpdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LgpdModal: React.FC<LgpdModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#262626] p-8 text-left font-tech max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8A8A8A] hover:text-[#FAFAFA] border border-[#262626]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] text-[#8A8A8A] uppercase tracking-widest block mb-1">
            [ COMPLIANCE // LGPD ]
          </span>
          <h3 className="font-display text-2xl text-[#FAFAFA] tracking-tight">
            POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS
          </h3>
          <p className="text-xs text-[#8A8A8A] mt-1">
            {COMPANY_CONFIG.name} • SEDE: BELO HORIZONTE // MG
          </p>
        </div>

        <div className="space-y-4 text-xs text-[#8A8A8A] leading-relaxed border-t border-[#262626] pt-6">
          <div>
            <h4 className="font-bold text-[#FAFAFA] uppercase mb-1">1. Enquadramento e Sigilo</h4>
            <p>
              A {COMPANY_CONFIG.name}, sob registro regular no CRC-MG, atua em estrita conformidade com a Lei nº 13.709/2018 (LGPD) e o Código de Ética Profissional do Contabilista.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#FAFAFA] uppercase mb-1">2. Tratamento das Informações</h4>
            <p>
              Os dados cadastrais e fiscais coletados são restritos ao escopo de elaboração do parecer contábil-tributário e relacionamento direto com o titular.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#FAFAFA] uppercase mb-1">3. Segurança dos Registros</h4>
            <p>
              Todas as transações utilizam criptografia de ponta a ponta e controle estrito de acessos aos sistemas em nuvem.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#FAFAFA] uppercase mb-1">4. Canal do Titular</h4>
            <p>
              Para requisições e revogação de consentimento: {COMPANY_CONFIG.email} | {COMPANY_CONFIG.phoneDisplay}.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#262626] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#FAFAFA] text-[#050505] text-xs font-bold uppercase tracking-wider hover:bg-[#E5E5E5] transition-colors"
          >
            CONFIRMAR LEITURA
          </button>
        </div>

      </div>
    </div>
  );
};
