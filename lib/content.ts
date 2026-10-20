export type Service = { number: string; title: string; icon: "House" | "HeartPulse" | "Sprout" | "CarFront" | "Landmark" | "Plane" | "Truck" | "Hourglass"; items: string[] };
export const heroHeadline = "SEU PATRIMÔNIO MERECE A MELHOR ESCOLHA: ZURY!";
export const heroLines = ["SEU PATRIMÔNIO MERECE", "A MELHOR ESCOLHA:", "ZURY!"] as const;

export type BenefitPartner = { id: string; name: string; logo: string; width: number; height: number; offer: string; description: string };
export const benefitPartners: readonly BenefitPartner[] = [
  { id: "farma-melhor", name: "FARMA MELHOR UNAÍ", logo: "/partners/farma-melhor.png", width: 300, height: 72, offer: "10% DE DESCONTO ADICIONAL", description: "CONDIÇÃO ESPECIAL PARA CLIENTES ZURY EM COMPRAS ELEGÍVEIS." },
  { id: "grupo-zapp", name: "GRUPO ZAPP", logo: "/partners/grupo-zapp.png", width: 997, height: 379, offer: "10% DE DESCONTO ADICIONAL", description: "VANTAGEM EXCLUSIVA PARA CLIENTES ZURY EM PRODUTOS ELEGÍVEIS." },
  { id: "grupo-mv", name: "GRUPO MV", logo: "/partners/grupo-mv.png", width: 1057, height: 1057, offer: "5% DE DESCONTO EM SERVIÇOS", description: "CONDIÇÃO ESPECIAL PARA CLIENTES ZURY EM SERVIÇOS ELEGÍVEIS." },
];
export const benefitsContent = {
  title: "BENEFÍCIOS EXCLUSIVOS",
  headline: "VANTAGENS QUE VÃO ALÉM DA PROTEÇÃO.",
  description: "CLIENTES ZURY TÊM ACESSO A CONDIÇÕES ESPECIAIS EM ESTABELECIMENTOS PARCEIROS.",
  notice: "PRÉVIA DAS OFERTAS. PUBLICAÇÃO SUJEITA À CONFIRMAÇÃO DAS PARCERIAS, AUTORIZAÇÕES DE USO DAS MARCAS E REGRAS COMERCIAIS.",
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
  { label: "SERVIÇOS", href: "#servicos" },
  { label: "DIFERENCIAIS", href: "#sobre" },
  { label: "SOBRE", href: "#institucional" },
] as const;

export const contacts = [
  { name: "Thiago", role: "Corretor", phone: "(38) 99864-5200", href: "https://wa.me/5538998645200" },
  { name: "Valdir", role: "Consultor", phone: "(38) 99961-5862", href: "https://wa.me/5538999615862" },
  { name: "Joana", role: "Saúde", phone: "(61) 98563-8090", href: "https://wa.me/5561985638090" },
] as const;

export type SiteNavigationItem = { label: string; href: string };

export function navigationForSite(includeReferrals: boolean): readonly SiteNavigationItem[] {
  return includeReferrals
    ? [...navigation.slice(0, 2), { label: "INDICAÇÕES", href: "#indicacoes" }, ...navigation.slice(2)]
    : navigation;
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
  headline: "SUAS INDICAÇÕES PODEM RENDER MAIS DE R$ 10 MIL.",
  introduction: "Transforme suas indicações em oportunidades de ganhos com a ZURY CORRETORA.",
  previewNotice: "Prévia do programa · publicação sujeita à validação comercial e jurídica.",
  disclaimer: "Os ganhos dependem de contratações elegíveis e das condições do programa. Não há garantia de renda. A referência de R$ 10 mil não representa resultado típico ou comprovado.",
  clientTitle: "MAIS VALOR PARA QUEM VOCÊ INDICA.",
  clientDescription: "Buscamos soluções competitivas, com transparência e atenção às necessidades de cada cliente.",
  options: [
    {
      id: "affiliate",
      title: "SEJA UM AFILIADO",
      reward: "R$ 100 POR CONTRATAÇÃO ELEGÍVEL",
      paragraphs: [
        "Qualquer pessoa pode solicitar participação no programa e indicar potenciais clientes à ZURY.",
        "Quando a indicação resultar em contratação confirmada e cumprir as condições do programa, o afiliado receberá R$ 100 via Pix.",
      ],
      benefits: ["Participação simples.", "Possibilidade de renda extra.", "Indicações sem necessidade de atuação comercial recorrente.", "Pagamento via Pix após validação.", "Relacionamento com a ZURY."],
      cta: "QUERO SER AFILIADO",
      message: "Olá! Tenho interesse em participar do programa de afiliados da ZURY CORRETORA. Gostaria de saber como funciona.",
    },
    {
      id: "commercial",
      title: "SEJA UM PARCEIRO COMERCIAL",
      reward: "10% DA COMISSÃO ELEGÍVEL RECEBIDA PELA ZURY",
      paragraphs: [
        "O parceiro comercial mantém uma relação mais próxima com a corretora, realizando indicações recorrentes.",
        "Cada parceiro aprovado poderá receber um código individual de indicação.",
        "Quando uma indicação resultar em contratação elegível, a remuneração corresponderá a 10% da comissão efetivamente recebida pela ZURY nessa contratação, conforme as regras do programa.",
      ],
      benefits: ["Parceria comercial recorrente.", "Código individual de indicação.", "Identificação de clientes indicados.", "Remuneração proporcional às comissões elegíveis.", "Possibilidade de ganhos crescentes.", "Relacionamento próximo com a corretora."],
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
  instagram: { handle: "@zury_corretora", href: "https://www.instagram.com/zury_corretora/" },
  tiktok: { handle: "@zury_corretora", href: "https://www.tiktok.com/@zury_corretora" },
  email: "contato@zurycorretora.com",
} as const;
