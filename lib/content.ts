export type Service = { number: string; title: string; icon: "House" | "HeartPulse" | "Sprout" | "CarFront" | "Landmark" | "Plane" | "Truck" | "Hourglass"; items: string[] };
export const heroHeadline = "SEU PATRIMÔNIO MERECE A MELHOR ESCOLHA: ZURY!";
export const heroLines = ["SEU PATRIMÔNIO MERECE", "A MELHOR ESCOLHA:", "ZURY!"] as const;

export type BenefitPartner = { id: string; name: string; logo: string | null; width: number; height: number; offer: string };
export const benefitPartners: readonly BenefitPartner[] = [
  { id: "farma-melhor", name: "FARMELHOR UNAÍ", logo: "/partners/farma-melhor.png", width: 300, height: 72, offer: "10% DE DESCONTO ADICIONAL" },
  { id: "grupo-zapp", name: "ZAPP", logo: "/partners/grupo-zapp-metalico.png", width: 2172, height: 724, offer: "10% DE DESCONTO ADICIONAL" },
  { id: "grupo-mv", name: "GRUPO MV", logo: "/partners/grupo-mv.png", width: 1057, height: 1057, offer: "5% DE DESCONTO EM SERVIÇOS" },
];
export const benefitsContent = {
  title: "BENEFÍCIOS EXCLUSIVOS",
};

export function isBenefitsPreviewEnabled(env: { NODE_ENV?: string; ZURY_BENEFITS_PREVIEW?: string }): boolean {
  return env.NODE_ENV === "development" || env.ZURY_BENEFITS_PREVIEW === "true";
}

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
  { label: "SOLUÇÕES", href: "#servicos" },
  { label: "DIFERENCIAIS", href: "#sobre" },
  { label: "SOBRE", href: "#institucional" },
] as const;

export type Contact = { name: string; role?: string; phone: string; href: string };
export const contacts: readonly Contact[] = [
  { name: "Thiago", role: "Corretor", phone: "(38) 99864-5200", href: "https://wa.me/5538998645200" },
  { name: "Valdir", role: "Consultor", phone: "(38) 99961-5862", href: "https://wa.me/5538999615862" },
  { name: "Joana", role: "Saúde", phone: "(61) 98563-8090", href: "https://wa.me/5561985638090" },
] as const;

export type SiteNavigationItem = { label: string; href: string };

// User-supplied and browser-verified business profile, with Google's review entry.
export const googleReviewHref = "https://share.google/AnNgzLmPy4lMNqHO9";

// Verified official search pages; no documented prefilled lookup was established.
// Linking to these services does not validate the displayed business registrations.
export const institutionalLinks = {
  cnpj: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/",
  susep: "https://www2.susep.gov.br/safe/Corretores/pesquisa",
} as const;

export function navigationForSite(includeReferrals: boolean, includeBenefits = false): readonly SiteNavigationItem[] {
  return [
    ...navigation.slice(0, 2),
    ...(includeReferrals ? [{ label: "INDICAÇÕES", href: "#indicacoes" }] : []),
    ...(includeBenefits ? [{ label: "BENEFÍCIOS", href: "#beneficios" }] : []),
    ...navigation.slice(2),
  ];
}

// Build-time preview only. This is not commercial/legal approval or access control.
export function isReferralPreviewEnabled(env: { NODE_ENV?: string; ZURY_REFERRAL_PREVIEW?: string }): boolean {
  return env.NODE_ENV === "development" || env.ZURY_REFERRAL_PREVIEW === "true";
}

export type ReferralMode = "affiliate" | "commercial";
type ReferralOption = {
  id: ReferralMode;
  title: string;
  reward: string;
  paragraphs: readonly string[];
  benefits: readonly string[];
  cta: string;
  message: string;
};

export const referralProgram = {
  title: "PROGRAMA DE INDICAÇÕES",
  commercialTitle: "QUEM INDICA MERECE MAIS",
  commercialDescription: "EM AGRADECIMENTO ÀS INDICAÇÕES, A ZURY BUSCA MELHORES CONDIÇÕES PARA AFILIADOS E PARCEIROS NAS CONTRATAÇÕES PRÓPRIAS, INCLUSIVE COM POSSÍVEL RENÚNCIA À COMISSÃO, QUANDO APLICÁVEL.",
  options: [
    {
      id: "affiliate",
      title: "SEJA UM AFILIADO",
      reward: "R$ 100 POR CONTRATAÇÃO",
      paragraphs: [
        "QUALQUER PESSOA PODE INDICAR POTENCIAIS CLIENTES À ZURY.",
        "SE A INDICAÇÃO RESULTAR EM CONTRATAÇÃO, O AFILIADO RECEBERÁ R$ 100 VIA PIX.",
      ],
      benefits: ["PARTICIPAÇÃO SIMPLES", "POSSIBILIDADE DE RENDA EXTRA", "INDICAÇÕES SEM NECESSIDADE DE ATUAÇÃO COMERCIAL RECORRENTE"],
      cta: "QUERO SER AFILIADO",
      message: "Olá! Tenho interesse em participar do programa de afiliados da ZURY CORRETORA. Gostaria de saber como funciona.",
    },
    {
      id: "commercial",
      title: "SEJA UM PARCEIRO COMERCIAL",
      reward: "10% DA COMISSÃO RECEBIDA PELA ZURY",
      paragraphs: [
        "O PARCEIRO COMERCIAL MANTÉM UMA RELAÇÃO MAIS PRÓXIMA COM A CORRETORA, REALIZANDO INDICAÇÕES RECORRENTES.",
        "CADA PARCEIRO RECEBERÁ UM CÓDIGO INDIVIDUAL DE INDICAÇÃO.",
        "SE A INDICAÇÃO RESULTAR EM CONTRATAÇÃO, A REMUNERAÇÃO CORRESPONDERÁ A 10% DA COMISSÃO RECEBIDA PELA ZURY NESSA CONTRATAÇÃO.",
      ],
      benefits: [],
      cta: "QUERO SER PARCEIRO COMERCIAL",
      message: "Olá! Tenho interesse em me tornar parceiro comercial da ZURY CORRETORA. Gostaria de conhecer as condições da parceria.",
    },
  ] satisfies readonly ReferralOption[],
};

export function referralInquiryHref(mode: ReferralMode): string {
  const option = referralProgram.options.find((item) => item.id === mode);
  if (!option) throw new RangeError("Modalidade de indicação desconhecida");
  const params = new URLSearchParams({ text: option.message });
  return `${contacts[0].href}?${params.toString()}`;
}

// Owner-provided destinations: preserve these exact links even if public access is blocked.
export const digitalChannels = {
  facebook: { href: null as string | null },
  instagram: { handle: "@zury_corretora", href: "https://www.instagram.com/zury_corretora/" },
  tiktok: { handle: "@zury_corretora", href: "https://www.tiktok.com/@zury_corretora" },
  email: "contato@zurycorretora.com",
} as const;
