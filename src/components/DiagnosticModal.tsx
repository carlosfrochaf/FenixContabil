import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { X, ArrowRight } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [objective, setObjective] = useState<string>("trocar_contador");
  const [segment, setSegment] = useState<string>("Tecnologia / TI");
  const [revenue, setRevenue] = useState<string>("R$ 20.000 a R$ 50.000/mês");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const objectiveLabels: Record<string, string> = {
      trocar_contador: "Trocar de Escritório / Otimização Tributária",
      abrir_empresa: "Abertura de Novo CNPJ",
      pf_para_pj: "Transição PF para PJ"
    };

    const message = `Olá Mariani Contábil.

Solicito Diagnóstico Fiscal:

• Nome: ${name || 'Não informado'}
• WhatsApp: ${phone || 'Não informado'}
• E-mail: ${email || 'Não informado'}
• Objetivo: ${objectiveLabels[objective] || objective}
• Segmento: ${segment}
• Faturamento: ${revenue}

Aguardo contato para auditoria preliminar.`;

    const url = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0F0F0F] border border-[#262626] p-8 text-left font-tech">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8A8A8A] hover:text-[#FAFAFA] border border-[#262626]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <span className="text-[10px] text-[#8A8A8A] uppercase tracking-widest block mb-1">
            [ PROTOCOLO // DIAGNÓSTICO ]
          </span>
          <h3 className="font-display text-2xl text-[#FAFAFA] tracking-tight">
            SOLICITAÇÃO DE PARECER FISCAL
          </h3>
          <p className="text-xs text-[#8A8A8A] mt-1">
            Análise preliminar de enquadramento tributário e oportunidades de redução.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-1 flex-1 transition-colors ${step >= 1 ? 'bg-[#FAFAFA]' : 'bg-[#262626]'}`} />
          <div className={`h-1 flex-1 transition-colors ${step >= 2 ? 'bg-[#FAFAFA]' : 'bg-[#262626]'}`} />
        </div>

        {/* Step 1: Objective & Revenue */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FAFAFA] mb-2 font-bold">
                01 // OBJETIVO PRINCIPAL:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'trocar_contador', label: 'MIGRAÇÃO DE ESCRITÓRIO E REDUÇÃO FISCAL' },
                  { id: 'abrir_empresa', label: 'ABERTURA DE NOVO CNPJ ESTATUTÁRIO' },
                  { id: 'pf_para_pj', label: 'TRANSIÇÃO DE AUTÔNOMO (PF) PARA PESSOA JURÍDICA' },
                ].map((item) => {
                  const isSelected = objective === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setObjective(item.id)}
                      className={`p-3 text-left text-xs border transition-all ${
                        isSelected
                          ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA] font-bold'
                          : 'bg-[#050505] text-[#8A8A8A] border-[#262626] hover:border-[#8A8A8A]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-[#FAFAFA] mb-1.5 font-bold">SEGMENTO:</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] p-3 text-xs text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]"
                >
                  <option value="Tecnologia / TI">Tecnologia & Devs</option>
                  <option value="Saúde & Clínicas">Saúde & Clínicas</option>
                  <option value="Comércio & E-commerce">Comércio & Varejo</option>
                  <option value="Engenharia & Consultoria">Engenharia & Consultoria</option>
                  <option value="Serviços B2B">Serviços Especializados</option>
                  <option value="Outro">Outro segmento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#FAFAFA] mb-1.5 font-bold">FATURAMENTO:</label>
                <select
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] p-3 text-xs text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]"
                >
                  <option value="Até R$ 15.000/mês">Até R$ 15.000/mês</option>
                  <option value="R$ 15.000 a R$ 40.000/mês">R$ 15.000 a R$ 40.000/mês</option>
                  <option value="R$ 40.000 a R$ 100.000/mês">R$ 40.000 a R$ 100.000/mês</option>
                  <option value="Acima de R$ 100.000/mês">Acima de R$ 100.000/mês</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#FAFAFA] text-[#050505] font-bold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
              >
                <span>AVANÇAR PARA DADOS DE CONTATO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-[#FAFAFA] mb-1 font-bold">NOME / EMPRESA:</label>
              <input
                type="text"
                required
                placeholder="Nome do responsável"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050505] border border-[#262626] p-3 text-xs text-[#FAFAFA] placeholder-[#525252] focus:outline-none focus:border-[#FAFAFA]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#FAFAFA] mb-1 font-bold">WHATSAPP (COM DDD):</label>
              <input
                type="tel"
                required
                placeholder="(31) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#050505] border border-[#262626] p-3 text-xs text-[#FAFAFA] placeholder-[#525252] focus:outline-none focus:border-[#FAFAFA]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#FAFAFA] mb-1 font-bold">E-MAIL CORPORATIVO:</label>
              <input
                type="email"
                placeholder="contato@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-[#262626] p-3 text-xs text-[#FAFAFA] placeholder-[#525252] focus:outline-none focus:border-[#FAFAFA]"
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3.5 px-6 border border-[#262626] text-xs font-bold text-[#8A8A8A] hover:text-[#FAFAFA]"
              >
                VOLTAR
              </button>

              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#FAFAFA] text-[#050505] font-bold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] transition-colors"
              >
                ENVIAR SOLICITAÇÃO
              </button>
            </div>

            <p className="text-[10px] text-[#525252] text-center uppercase tracking-wider pt-2">
              SIGILO PROFISSIONAL EM CONFORMIDADE COM O CFC E LGPD.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
