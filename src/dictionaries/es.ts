import type { Dictionary } from "./en";

export const es: Dictionary = {
  locale: "es",
  market: "LATAM",
  jobsPath: "empleos",
  companiesPath: "empresas",

  nav: {
    jobs: "Empleos",
    companies: "Empresas",
    postJob: "Publicar empleo",
    signIn: "Iniciar sesi\u00f3n",
  },

  hero: {
    title: "Carreras growth que importan",
    subtitle: "Encuentra tu pr\u00f3ximo rol en growth marketing en las mejores startups y scale-ups.",
    cta: "Ver empleos",
  },

  job: {
    apply: "Postular",
    applyLogin: "Inicia sesi\u00f3n para postular",
    posted: "Publicado",
    salary: "Salario",
    remote: "Remoto",
    seniority: "Experiencia",
    category: "Categor\u00eda",
    location: "Ubicaci\u00f3n",
    contract: "Contrato",
    description: "Descripci\u00f3n del puesto",
    aboutCompany: "Sobre la empresa",
    similarJobs: "Empleos similares",
    allJobs: "Todos los empleos",
    noJobs: "No se encontraron empleos que coincidan con tus criterios.",
  },

  filters: {
    allCategories: "Todas las categor\u00edas",
    allLocations: "Todas las ciudades",
    allSeniority: "Todos los niveles",
    remote: "Remoto",
    search: "Buscar empleos...",
  },

  company: {
    claimPage: "\u00bfEs tu empresa? Reclama esta p\u00e1gina",
    jobs: "Posiciones abiertas",
    about: "Acerca de",
    noJobs: "No hay posiciones abiertas en este momento.",
  },

  footer: {
    subscribe: "Recibe los mejores empleos growth cada semana",
    subscribePlaceholder: "Tu email",
    subscribeButton: "Suscribirse",
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
    "social-media": "Redes Sociales",
    "partnerships": "Alianzas",
    "head-of-growth": "Head of Growth",
    "vp-marketing": "VP Marketing",
    "cmo": "CMO",
  },

  seniority: {
    INTERN: "Pasante",
    JUNIOR: "Junior",
    MID: "Semi-senior",
    SENIOR: "Senior",
    LEAD: "Lead",
    MANAGER: "Manager",
    DIRECTOR: "Director",
    VP: "VP",
    C_LEVEL: "C-Level",
  },
} as const;
