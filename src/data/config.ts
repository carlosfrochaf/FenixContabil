export interface CompanyConfig {
  name: string;
  tagline: string;
  description: string;
  establishedYear: number;
  yearsOfExperience: number;
  phoneDisplay: string;
  phoneClean: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    fullFormatted: string;
  };
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  crc: string;
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: "Fênix Contábil",
  tagline: "Contabilidade Estratégica & Inteligência Tributária",
  description: "Há mais de 30 anos transformando números em lucro, blindagem jurídica e crescimento sustentável para empresas em todo o Brasil.",
  establishedYear: 1994,
  yearsOfExperience: 30,
  phoneDisplay: "(31) 3275-2526",
  phoneClean: "3132752526",
  whatsappNumber: "553132752526", // Altere aqui o número oficial do WhatsApp
  email: "contato@fenixcontabil.com",
  address: {
    street: "Rua Bernardo Guimarães, 3.076",
    neighborhood: "Santo Agostinho / Barro Preto",
    city: "Belo Horizonte",
    state: "MG",
    zipCode: "30140-083",
    fullFormatted: "Rua Bernardo Guimarães, 3.076 - Santo Agostinho, Belo Horizonte - MG, 30140-083"
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com"
  },
  crc: "CRC-MG 000000/O"
};
