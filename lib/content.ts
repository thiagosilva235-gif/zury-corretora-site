export type Service = { number: string; title: string; icon: "House" | "HeartPulse" | "Sprout" | "CarFront" | "Landmark" | "Plane" | "Truck" | "Hourglass"; items: string[] };
export const services: Service[] = [
  { number: "01", title: "BENS", icon: "House", items: ["Residencial", "Condomínio", "Imóveis", "Empresarial", "Equipamentos agrícolas", "Industrial", "Armazéns", "Engenharia", "Usinas"] },
  { number: "02", title: "VIDA E SAÚDE", icon: "HeartPulse", items: ["Seguro de vida", "Plano de saúde", "Odontológico"] },
  { number: "03", title: "AGRO", icon: "Sprout", items: ["Seguro agrícola", "Transporte", "Logística", "Safras", "Pecuário"] },
  { number: "04", title: "AUTOMOTIVO", icon: "CarFront", items: ["Automóvel", "Frotas", "Moto", "Caminhões"] },
  { number: "05", title: "CRÉDITO", icon: "Landmark", items: ["Consórcios", "Financiamentos", "Empréstimos"] },
  { number: "06", title: "AÉREO E MARÍTIMO", icon: "Plane", items: ["Marítimo", "Aeronáuticos", "Hangar"] },
  { number: "07", title: "TRANSPORTE", icon: "Truck", items: ["Nacional/internacional", "RC de cargas", "Transportador", "Operador"] },
  { number: "08", title: "PREVIDÊNCIA", icon: "Hourglass", items: ["Previdência", "Prestamista"] },
];
export const differentiators = [
  { number: "01", title: "SEGURANÇA", description: "Equipe qualificada, atuação autorizada pela SUSEP e parceria com diversas seguradoras para proteger seu patrimônio." },
  { number: "02", title: "SUPORTE", description: "Atendimento humanizado e especializado, disponível 24 horas por dia." },
  { number: "03", title: "AGILIDADE", description: "Agilidade nas cotações e no acompanhamento e resolução de sinistros." },
];

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

// Candidates stay inactive until the actual profiles can be verified.
export const digitalChannels = {
  instagram: { handle: "@zury_corretora", candidate: "https://www.instagram.com/zury_corretora/", verified: false },
  tiktok: { handle: "@zury_corretora", candidate: "https://www.tiktok.com/@zury_corretora", verified: false },
  email: "contato@zurycorretora.com",
} as const;
