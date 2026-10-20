export type Service = { number: string; title: string; icon: "House" | "HeartPulse" | "Sprout" | "CarFront" | "Landmark" | "Plane" | "Truck" | "Hourglass"; items: string[] };
export const heroHeadline = "Seu patrimônio merece a melhor escolha: Zury!";

export const services: Service[] = [
  { number: "01", title: "BENS", icon: "House", items: ["Residenciais", "Condomínios", "Imóveis", "Empresariais", "Equipamentos agrícolas", "Industriais", "Armazéns", "Seguros de engenharia", "Usinas"] },
  { number: "02", title: "VIDA E SAÚDE", icon: "HeartPulse", items: ["Seguros de vida", "Planos de saúde", "Odontológicos"] },
  { number: "03", title: "AGRO", icon: "Sprout", items: ["Seguros agrícolas", "Transportes", "Soluções de logística", "Safras", "Pecuários"] },
  { number: "04", title: "AUTOMOTIVO", icon: "CarFront", items: ["Automóveis", "Frotas", "Motos", "Caminhões"] },
  { number: "05", title: "CRÉDITO", icon: "Landmark", items: ["Consórcios", "Financiamentos", "Empréstimos"] },
  { number: "06", title: "AÉREO E MARÍTIMO", icon: "Plane", items: ["Marítimos", "Aeronáuticos", "Hangares"] },
  { number: "07", title: "TRANSPORTE", icon: "Truck", items: ["TRANSPORTE NACIONAL E INTERNACIONAL DE CARGAS", "RESPONSABILIDADE CIVIL DE CARGAS", "TRANSPORTADOR DE CARGAS", "OPERADOR DE CARGAS"] },
  { number: "08", title: "PREVIDÊNCIA", icon: "Hourglass", items: ["Planos de previdência", "Seguros prestamistas"] },
];
export const differentiators = [
  { number: "01", title: "SEGURANÇA", description: "Equipe qualificada, atuação autorizada pela SUSEP e parceria com diversas seguradoras para proteger seu patrimônio." },
  { number: "02", title: "SUPORTE", description: "Atendimento humanizado e especializado, disponível 24 horas por dia." },
  { number: "03", title: "AGILIDADE", description: "Agilidade nas cotações e no acompanhamento e resolução de sinistros." },
];

// Presentation only: retain the official full sentences above as the source of truth.
export function differentiatorDetails(description: string): string[] {
  return description.replace(/\.$/u, "").split(/, | e (?=parceria)| e no (?=acompanhamento)/u)
    .map((part) => part.charAt(0).toLocaleUpperCase("pt-BR") + part.slice(1));
}

export const navigation = [
  { label: "SERVIÇOS", href: "#servicos" },
  { label: "DIFERENCIAIS", href: "#sobre" },
  { label: "SOBRE", href: "#institucional" },
] as const;

export const contacts = [
  { name: "Thiago", role: "Corretor", phone: "(38) 99864-5200", href: "https://wa.me/5538998645200" },
  { name: "Valdir", role: "Consultor", phone: "(38) 99961-5862", href: "https://wa.me/5538999615862" },
  { name: "Joana", role: "Saúde", phone: "(61) 98563-8090", href: "https://wa.me/5561985638090" },
] as const;

// Owner-provided destinations: preserve these exact links even if public access is blocked.
export const digitalChannels = {
  instagram: { handle: "@zury_corretora", href: "https://www.instagram.com/zury_corretora/" },
  tiktok: { handle: "@zury_corretora", href: "https://www.tiktok.com/@zury_corretora" },
  email: "contato@zurycorretora.com",
} as const;
