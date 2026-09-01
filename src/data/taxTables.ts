/**
 * ============================================================================
 * TABELAS E PARÂMETROS TRIBUTÁRIOS - FÊNIX CONTÁBIL
 * ============================================================================
 * Este arquivo centraliza todas as faixas, alíquotas e deduções fiscais usadas
 * no simulador da landing page.
 *
 * Fontes Oficiais:
 * - Lei Complementar nº 123/2006 (Simples Nacional - Anexos I, III e V)
 * - Lei nº 9.249/1995 e Lei nº 9.430/1996 (Lucro Presumido)
 * - Tabela Progressiva do IRPF (Instruções Normativas RFB)
 * ============================================================================
 */

export interface SimplesFaixa {
  faixa: number;
  limiteSuperiorAnual: number;
  aliquotaNominal: number; // Ex: 0.06 para 6%
  parcelaDeduzir: number;  // Em R$
}

/**
 * Anexo I - Comércio (Varejo, Atacado, E-commerce)
 */
export const SIMPLES_ANEXO_I: SimplesFaixa[] = [
  { faixa: 1, limiteSuperiorAnual: 180000, aliquotaNominal: 0.04, parcelaDeduzir: 0 },
  { faixa: 2, limiteSuperiorAnual: 360000, aliquotaNominal: 0.073, parcelaDeduzir: 5940 },
  { faixa: 3, limiteSuperiorAnual: 720000, aliquotaNominal: 0.095, parcelaDeduzir: 13860 },
  { faixa: 4, limiteSuperiorAnual: 1800000, aliquotaNominal: 0.107, parcelaDeduzir: 22500 },
  { faixa: 5, limiteSuperiorAnual: 3600000, aliquotaNominal: 0.143, parcelaDeduzir: 87300 },
  { faixa: 6, limiteSuperiorAnual: 4800000, aliquotaNominal: 0.19, parcelaDeduzir: 378000 },
];

/**
 * Anexo III - Serviços com Fator R >= 28% ou atividades regulamentadas no Anexo III
 * (TI, Software, Consultoria com Pró-labore estratégico, Manutenção, etc.)
 */
export const SIMPLES_ANEXO_III: SimplesFaixa[] = [
  { faixa: 1, limiteSuperiorAnual: 180000, aliquotaNominal: 0.06, parcelaDeduzir: 0 },
  { faixa: 2, limiteSuperiorAnual: 360000, aliquotaNominal: 0.112, parcelaDeduzir: 9360 },
  { faixa: 3, limiteSuperiorAnual: 720000, aliquotaNominal: 0.135, parcelaDeduzir: 17640 },
  { faixa: 4, limiteSuperiorAnual: 1800000, aliquotaNominal: 0.16, parcelaDeduzir: 35640 },
  { faixa: 5, limiteSuperiorAnual: 3600000, aliquotaNominal: 0.21, parcelaDeduzir: 125640 },
  { faixa: 6, limiteSuperiorAnual: 4800000, aliquotaNominal: 0.33, parcelaDeduzir: 648000 },
];

/**
 * Anexo V - Serviços Intelectuais sem aplicação do Fator R
 */
export const SIMPLES_ANEXO_V: SimplesFaixa[] = [
  { faixa: 1, limiteSuperiorAnual: 180000, aliquotaNominal: 0.155, parcelaDeduzir: 0 },
  { faixa: 2, limiteSuperiorAnual: 360000, aliquotaNominal: 0.18, parcelaDeduzir: 4500 },
  { faixa: 3, limiteSuperiorAnual: 720000, aliquotaNominal: 0.195, parcelaDeduzir: 9900 },
  { faixa: 4, limiteSuperiorAnual: 1800000, aliquotaNominal: 0.205, parcelaDeduzir: 17100 },
  { faixa: 5, limiteSuperiorAnual: 3600000, aliquotaNominal: 0.23, parcelaDeduzir: 62100 },
  { faixa: 6, limiteSuperiorAnual: 4800000, aliquotaNominal: 0.305, parcelaDeduzir: 540000 },
];

/**
 * Parâmetros de Lucro Presumido Médios (Federal + ISS/ICMS)
 */
export const LUCRO_PRESUMIDO_RATES = {
  servicos: {
    pis: 0.0065, // 0.65%
    cofins: 0.03, // 3.00%
    irpjBase: 0.32,
    irpjAliquota: 0.15, // 4.8% efetivo base
    irpjAdicionalAliquota: 0.10, // 10% sobre o que exceder R$ 20k/mês de presunção
    csllBase: 0.32,
    csllAliquota: 0.09, // 2.88% efetivo base
    issMedio: 0.035, // 2% a 5% (média ponderada 3.5% em BH)
    aliquotaMediaTotal: 0.1483 // ~14.83% a 16.33% total
  },
  comercio: {
    pis: 0.0065,
    cofins: 0.03,
    irpjBase: 0.08,
    irpjAliquota: 0.15,
    csllBase: 0.12,
    csllAliquota: 0.09,
    icmsMedio: 0.04, // ICMS líquido aproximado
    aliquotaMediaTotal: 0.0898 // ~8.98%
  }
};

/**
 * Tabela Progressiva IRPF Pessoa Física / Carnê-Leão (Mensal)
 */
export interface IRPFFaixa {
  limiteSuperior: number;
  aliquota: number;
  deducao: number;
}

export const TABELA_IRPF_PF: IRPFFaixa[] = [
  { limiteSuperior: 2259.20, aliquota: 0.00, deducao: 0.00 },
  { limiteSuperior: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { limiteSuperior: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { limiteSuperior: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { limiteSuperior: Infinity, aliquota: 0.275, deducao: 896.00 },
];

/**
 * Constantes de Segmentos para o Seletor do Simulador
 */
export interface TaxSegment {
  id: string;
  name: string;
  badge: string;
  icon: string;
  description: string;
  defaultAnexo: 'anexo_iii_fator_r' | 'anexo_i' | 'anexo_v' | 'presumido';
}

export const TAX_SEGMENTS: TaxSegment[] = [
  {
    id: "ti_tech",
    name: "Tecnologia, TI & Startups",
    badge: "Fator R Estratégico",
    icon: "Code2",
    description: "Devs, Engenheiros de Software, SaaS, Agências Digitais e Designers PJ.",
    defaultAnexo: "anexo_iii_fator_r"
  },
  {
    id: "saude_medicos",
    name: "Médicos, Clínicas & Saúde",
    badge: "Equiparação & Anexo III",
    icon: "Stethoscope",
    description: "Médicos, Dentistas, Psicólogos, Fisioterapeutas e Clínicas Médicas.",
    defaultAnexo: "anexo_iii_fator_r"
  },
  {
    id: "comercio_ecommerce",
    name: "Comércio, Lojas & E-commerce",
    badge: "Anexo I / Segregação",
    icon: "ShoppingBag",
    description: "E-commerce, Varejo Físico, Dropshipping, Distribuidoras e Importação.",
    defaultAnexo: "anexo_i"
  },
  {
    id: "servicos_consultoria",
    name: "Serviços, Engenharia & Consultoria",
    badge: "Elisão Fiscal",
    icon: "Briefcase",
    description: "Engenheiros, Arquitetos, Advogados, Consultores e Prestadores B2B.",
    defaultAnexo: "anexo_iii_fator_r"
  },
  {
    id: "outro",
    name: "Outros Segmentos / Autônomo PF",
    badge: "Planejamento Amplo",
    icon: "Layers",
    description: "Profissionais liberais, novas empresas ou migração de porte.",
    defaultAnexo: "anexo_iii_fator_r"
  }
];
