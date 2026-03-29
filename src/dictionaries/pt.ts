import type { Dictionary } from "./en";

export const pt: Dictionary = {
  locale: "pt",
  market: "LATAM",
  jobsPath: "empregos",
  companiesPath: "empresas",

  nav: {
    jobs: "Empregos",
    companies: "Empresas",
    postJob: "Publicar vaga",
    signIn: "Entrar",
  },

  hero: {
    title: "Carreiras growth que importam",
    subtitle: "Encontre seu pr\u00f3ximo cargo em growth marketing nas melhores startups e scale-ups.",
    cta: "Ver vagas",
  },

  job: {
    apply: "Candidatar-se",
    applyLogin: "Entre para se candidatar",
    posted: "Publicado",
    salary: "Sal\u00e1rio",
    remote: "Remoto",
    seniority: "Experi\u00eancia",
    category: "Categoria",
    location: "Localiza\u00e7\u00e3o",
    contract: "Contrato",
    description: "Descri\u00e7\u00e3o da vaga",
    aboutCompany: "Sobre a empresa",
    similarJobs: "Vagas similares",
    allJobs: "Todas as vagas",
    noJobs: "Nenhuma vaga encontrada com seus crit\u00e9rios.",
  },

  filters: {
    allCategories: "Todas as categorias",
    allLocations: "Todas as cidades",
    allSeniority: "Todos os n\u00edveis",
    remote: "Remoto",
    search: "Buscar vagas...",
  },

  company: {
    claimPage: "\u00c9 sua empresa? Reivindique esta p\u00e1gina",
    jobs: "Vagas abertas",
    about: "Sobre",
    noJobs: "Nenhuma vaga aberta no momento.",
  },

  footer: {
    subscribe: "Receba as melhores vagas growth toda semana",
    subscribePlaceholder: "Seu email",
    subscribeButton: "Inscrever-se",
    copyright: "Growth.Talent",
  },

  categories: {
    "growth-marketing": "Growth Marketing",
    "product-marketing": "Product Marketing",
    "demand-generation": "Demand Generation",
    "growth-engineering": "Growth Engineering",
    "marketing-ops": "Marketing Ops",
    "content-marketing": "Content Marketing",
    "performance-marketing": "Performance Marketing",
    "crm-lifecycle": "CRM & Lifecycle",
    "seo": "SEO",
    "data-analytics": "Data & Analytics",
    "brand-marketing": "Brand Marketing",
    "social-media": "Redes Sociais",
    "partnerships": "Parcerias",
    "head-of-growth": "Head of Growth",
    "vp-marketing": "VP Marketing",
    "cmo": "CMO",
  },

  seniority: {
    INTERN: "Estagi\u00e1rio",
    JUNIOR: "Junior",
    MID: "Pleno",
    SENIOR: "Senior",
    LEAD: "Lead",
    MANAGER: "Manager",
    DIRECTOR: "Diretor",
    VP: "VP",
    C_LEVEL: "C-Level",
  },
} as const;
