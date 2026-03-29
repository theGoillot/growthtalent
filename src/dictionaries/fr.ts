import type { Dictionary } from "./en";

export const fr: Dictionary = {
  locale: "fr",
  market: "FRANCE",
  jobsPath: "emplois",
  companiesPath: "entreprises",

  nav: {
    jobs: "Emplois",
    companies: "Entreprises",
    postJob: "Publier une offre",
    signIn: "Connexion",
  },

  hero: {
    title: "Des carri\u00e8res growth qui comptent",
    subtitle: "Trouvez votre prochain poste en growth marketing dans les meilleures startups et scale-ups.",
    cta: "Voir les offres",
  },

  job: {
    apply: "Postuler",
    applyLogin: "Se connecter pour postuler",
    posted: "Publi\u00e9e",
    salary: "Salaire",
    remote: "T\u00e9l\u00e9travail",
    seniority: "Exp\u00e9rience",
    category: "Cat\u00e9gorie",
    location: "Localisation",
    contract: "Contrat",
    description: "Description du poste",
    aboutCompany: "\u00c0 propos de l'entreprise",
    similarJobs: "Offres similaires",
    allJobs: "Toutes les offres",
    noJobs: "Aucune offre ne correspond \u00e0 vos crit\u00e8res.",
  },

  filters: {
    allCategories: "Toutes les cat\u00e9gories",
    allLocations: "Toutes les villes",
    allSeniority: "Tous les niveaux",
    remote: "T\u00e9l\u00e9travail",
    search: "Rechercher...",
  },

  company: {
    claimPage: "C'est votre entreprise\u00a0? Revendiquez cette page",
    jobs: "Postes ouverts",
    about: "\u00c0 propos",
    noJobs: "Aucun poste ouvert pour le moment.",
  },

  footer: {
    subscribe: "Recevez les meilleures offres growth chaque semaine",
    subscribePlaceholder: "Votre email",
    subscribeButton: "S'inscrire",
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
    "social-media": "Social Media",
    "partnerships": "Partenariats",
    "head-of-growth": "Head of Growth",
    "vp-marketing": "VP Marketing",
    "cmo": "CMO",
  },

  seniority: {
    INTERN: "Stage",
    JUNIOR: "Junior",
    MID: "Confirm\u00e9",
    SENIOR: "Senior",
    LEAD: "Lead",
    MANAGER: "Manager",
    DIRECTOR: "Directeur",
    VP: "VP",
    C_LEVEL: "C-Level",
  },
} as const;
