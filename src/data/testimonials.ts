export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  segment: string;
  avatar: string;
  content: string;
  rating: number;
  highlight: string;
  annualSavingsTag: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rodrigo Vasconcelos",
    role: "CEO & Co-fundador",
    company: "Nexum Tech & Software",
    segment: "Tecnologia / SaaS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content: "Migramos nossa software house para a Fênix há 2 anos. Eles aplicaram o Fator R de forma perfeita e reestruturaram nossos contratos internacionais. Reduzimos quase 60% dos impostos logo no primeiro trimestre.",
    rating: 5,
    highlight: "Economia de 58% em tributos",
    annualSavingsTag: "+R$ 74.000/ano economizados"
  },
  {
    id: "2",
    name: "Dra. Camila Meireles",
    role: "Diretora Clínica",
    company: "Instituto Meireles Dermatologia",
    segment: "Saúde & Medicina",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    content: "Eu atuava como pessoa física e pagava quase 27,5% de IR no carnê-leão. A equipe da Fênix abriu minha clínica PJ, cuidou da equiparação e hoje tenho suporte em tempo real no WhatsApp. Profissionalismo ímpar!",
    rating: 5,
    highlight: "Transição PF para PJ sem atrito",
    annualSavingsTag: "+R$ 48.000/ano economizados"
  },
  {
    id: "3",
    name: "Marcelo Albuquerque",
    role: "Fundador",
    company: "Albuquerque Engenharia & Projetos",
    segment: "Engenharia & Construção",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "O que mais me impressiona na Fênix é a velocidade de resposta e a proatividade. Eles não esperam a gente ter dúvida: avisam sobre benefícios fiscais e cuidam de todas as CNDs com antecedência.",
    rating: 5,
    highlight: "Atendimento ágil e consultivo",
    annualSavingsTag: "+R$ 36.000/ano economizados"
  },
  {
    id: "4",
    name: "Juliana Duarte",
    role: "Head de Operações",
    company: "Vitta Distribuição & E-commerce",
    segment: "E-commerce & Varejo",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    content: "A recuperação de créditos de PIS/COFINS e a segregação de ICMS monofásico que a Fênix fez no nosso e-commerce recuperou mais de R$ 90 mil que estavam esquecidos. São parceiros estratégicos do nosso crescimento.",
    rating: 5,
    highlight: "Recuperação de créditos fiscais",
    annualSavingsTag: "+R$ 92.000 recuperados"
  }
];

export const CLIENT_SEGMENTS_MARQUEE = [
  "Startups & SaaS",
  "Desenvolvedores & TI",
  "Clínicas Médicas & Saúde",
  "E-commerce & Dropshipping",
  "Engenharia & Arquitetura",
  "Advocacia & Jurídico",
  "Consultorias Empresariais",
  "Agências de Marketing & Mídia",
  "Holdings & Proteção Patrimonial",
  "Comércio & Franquias"
];
