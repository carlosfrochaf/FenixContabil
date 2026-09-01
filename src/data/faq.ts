export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "Como funciona a troca de contador para a Mariani Contábil?",
    answer: "É extremamente simples e 100% digital. Você não precisa passar por nenhum constrangimento com seu contador atual: a Mariani cuida de todo o processo de transição, solicita os arquivos fiscais e certidões necessárias e assume a responsabilidade técnica sem interromper as operações da sua empresa."
  },
  {
    id: "2",
    question: "Quanto tempo leva para abrir uma empresa ou migrar?",
    answer: "A migração de contabilidade é concluída em até 48 horas úteis. Para abertura de novas empresas, com os processos digitais da Junta Comercial e da Receita Federal, seu CNPJ pode estar ativo em poucos dias, com alvarás e inscrições municipais e estaduais regularizadas."
  },
  {
    id: "3",
    question: "Como a Mariani consegue reduzir os impostos da minha empresa legalmente?",
    answer: "Através da Inteligência Tributária (elisão fiscal). Analisamos o enquadramento correto de CNAEs, aplicamos o Fator R para serviços intelectuais (reduzindo de 15,5% para 6% no Simples Nacional), segregamos produtos com ICMS monofásico/ST e estruturamos a distribuição de lucros isenta de imposto de renda."
  },
  {
    id: "4",
    question: "A Mariani atende apenas em Belo Horizonte ou no Brasil inteiro?",
    answer: "Nossa sede física está localizada no coração de Belo Horizonte/MG (Rua Bernardo Guimarães, 3.076 - Santo Agostinho), onde atuamos há mais de 30 anos. No entanto, através da nossa infraestrutura 100% digital em nuvem, atendemos clientes e empresas em todo o território nacional com a mesma agilidade e suporte humanizado via WhatsApp."
  },
  {
    id: "5",
    question: "O que está incluso na mensalidade da contabilidade?",
    answer: "Tudo o que sua empresa precisa para ficar 100% regular e segura: apuração de todos os tributos (Simples, Presumido, etc.), emissão de guias, declarações acessórias (DEFIS, DCTF, SPED, ECF), folha de pagamento e eSocial, emissão de CNDs periódicas, relatórios contábeis (DRE, Balanço) e suporte direto via WhatsApp com especialistas."
  },
  {
    id: "6",
    question: "Como funciona o BPO Financeiro terceirizado?",
    answer: "No BPO Financeiro, assumimos a rotina operacional do seu departamento financeiro: agendamento de contas a pagar, conciliação bancária diária, emissão de notas fiscais e boletos para seus clientes e relatórios de fluxo de caixa em tempo real para você tomar decisões sem perder tempo com planilhas."
  }
];
