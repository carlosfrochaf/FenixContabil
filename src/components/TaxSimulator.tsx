import React, { useState, useMemo } from 'react';
import { TAX_SEGMENTS } from '../data/taxTables';
import { COMPANY_CONFIG } from '../data/config';
import { simulateTaxes, formatBRL } from '../utils/taxCalculator';
import type { CurrentRegimeType } from '../utils/taxCalculator';
import { ArrowRight, Info } from 'lucide-react';

export const TaxSimulator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(35000);
  const [selectedSegment, setSelectedSegment] = useState<string>("ti_tech");
  const [currentRegime, setCurrentRegime] = useState<CurrentRegimeType>("simples");

  const result = useMemo(() => {
    return simulateTaxes(monthlyRevenue, currentRegime, selectedSegment);
  }, [monthlyRevenue, currentRegime, selectedSegment]);

  const quickValues = [15000, 35000, 70000, 120000, 200000];

  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${result.whatsappMessage}`;

  return (
    <section id="simulador" className="py-24 border-b border-[#262626] bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#262626] items-end mb-12">
          <div className="lg:col-span-8 text-left">
            <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-widest block mb-2">
              [ MOTOR DE CÁLCULO FISCAL ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAFAFA] tracking-tight">
              SIMULADOR DE IMPACTO TRIBUTÁRIO.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs font-tech text-[#8A8A8A] leading-relaxed">
              Base de cálculo: LC 123/06 (Simples Nacional), Fator R e RIR.
            </p>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#262626] bg-[#0F0F0F]">
          
          {/* Left Inputs (Span 7) */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#262626] space-y-6 sm:space-y-8 text-left">
            
            {/* 1. Segmento */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-tech text-xs text-[#FAFAFA] uppercase tracking-wider">
                  01 // SEGMENTO DE ATUAÇÃO
                </label>
                <span className="text-[10px] font-tech text-[#8A8A8A]">SELECIONE UMA OPÇÃO</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TAX_SEGMENTS.map((seg) => {
                  const isSelected = selectedSegment === seg.id;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setSelectedSegment(seg.id)}
                      className={`p-3.5 text-left border transition-all ${
                        isSelected
                          ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]'
                          : 'bg-[#050505] text-[#8A8A8A] border-[#262626] hover:border-[#8A8A8A] hover:text-[#FAFAFA]'
                      }`}
                    >
                      <div className="font-tech text-xs font-bold uppercase truncate">{seg.name}</div>
                      <div className={`text-[10px] font-tech mt-0.5 ${isSelected ? 'text-[#525252]' : 'text-[#525252]'}`}>
                        {seg.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Slider Faturamento */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-tech text-xs text-[#FAFAFA] uppercase tracking-wider">
                  02 // FATURAMENTO MENSAL
                </label>
                <span className="font-tech text-base font-bold text-[#FAFAFA] border border-[#262626] px-3 py-1 bg-[#050505]">
                  {formatBRL(monthlyRevenue)}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-1.5 bg-[#262626] rounded-none appearance-none cursor-pointer accent-[#FAFAFA] focus:outline-none"
              />

              <div className="flex flex-wrap gap-2 mt-4">
                {quickValues.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMonthlyRevenue(val)}
                    className={`text-[11px] font-tech px-3 py-1 border transition-colors ${
                      monthlyRevenue === val
                        ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA] font-bold'
                        : 'bg-[#050505] text-[#8A8A8A] border-[#262626] hover:border-[#8A8A8A]'
                    }`}
                  >
                    {formatBRL(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Regime Atual */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-tech text-xs text-[#FAFAFA] uppercase tracking-wider">
                  03 // ENQUADRAMENTO ATUAL
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'simples', label: 'SIMPLES' },
                  { id: 'presumido', label: 'PRESUMIDO' },
                  { id: 'pf_autonomo', label: 'AUTÔNOMO PF' },
                  { id: 'nao_sei', label: 'NÃO SEI' },
                ].map((r) => {
                  const isSelected = currentRegime === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setCurrentRegime(r.id as CurrentRegimeType)}
                      className={`py-2.5 px-2 text-center font-tech text-xs border transition-all ${
                        isSelected
                          ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA] font-bold'
                          : 'bg-[#050505] text-[#8A8A8A] border-[#262626] hover:border-[#8A8A8A]'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Output Results (Span 5) */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-12 bg-[#050505] flex flex-col justify-between text-left space-y-6">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
                <span className="font-tech text-xs text-[#8A8A8A] uppercase tracking-wider">
                  RELATÓRIO // ESTIMATIVA
                </span>
                <span className="font-tech text-xs text-[#FAFAFA] px-2 py-0.5 border border-[#262626]">
                  {result.savingsPercentage}% REDUÇÃO
                </span>
              </div>

              {/* Big Savings Block */}
              <div className="p-4 sm:p-6 border border-[#262626] bg-[#0F0F0F] mb-6">
                <div className="font-tech text-[10px] text-[#8A8A8A] uppercase tracking-widest mb-1">
                  ECONOMIA ANUAL ESTIMADA
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-display text-[#FAFAFA] tracking-tight">
                  ~{formatBRL(result.annualSavings)}
                </div>
                <div className="font-tech text-xs text-[#8A8A8A] mt-2">
                  Retorno de caixa estimado em ~<strong>{formatBRL(result.monthlySavings)}/mês</strong>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="space-y-3 font-tech text-xs">
                <div className="flex justify-between p-3 border border-[#262626]">
                  <span className="text-[#8A8A8A]">Carga Atual Estimada:</span>
                  <span className="text-[#FAFAFA] font-bold">{formatBRL(result.currentMonthlyTax)}/mês (~{(result.currentEffectiveRate * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex justify-between p-3 border border-[#FAFAFA] bg-[#0F0F0F]">
                  <span className="text-[#FAFAFA] font-bold">Com Mariani Contábil:</span>
                  <span className="text-[#FAFAFA] font-bold">{formatBRL(result.fenixMonthlyTax)}/mês (~{(result.fenixEffectiveRate * 100).toFixed(1)}%)</span>
                </div>
              </div>

              {/* Strategy Details */}
              <div className="mt-6 p-4 border border-[#262626] text-xs font-tech text-[#8A8A8A] leading-relaxed">
                <span className="text-[#FAFAFA] font-bold block mb-1">DIRETRIZ APLICADA:</span>
                {result.strategyApplied}
              </div>
            </div>

            {/* Action Area */}
            <div className="space-y-3 pt-6 border-t border-[#262626]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-6 py-4 bg-[#FAFAFA] text-[#050505] font-tech font-bold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] transition-colors"
              >
                <span>SOLICITAR PARECER NO WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-start gap-2 text-[10px] font-tech text-[#525252] leading-tight">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Simulação estimada sujeita à auditoria fiscal individualizada.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
