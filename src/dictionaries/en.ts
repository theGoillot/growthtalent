export const en = {
  locale: "en" as const,
  market: "USA",
  jobsPath: "jobs",
  companiesPath: "companies",

  nav: {
    jobs: "Jobs",
    companies: "Companies",
    postJob: "Post a Job",
    signIn: "Sign In",
  },

  hero: {
    title: "Growth careers that matter",
    subtitle: "Find your next growth marketing role at the best startups and scale-ups worldwide.",
    cta: "Browse Jobs",
  },

  job: {
    apply: "Apply Now",
    applyLogin: "Sign in to Apply",
    posted: "Posted",
    salary: "Salary",
    remote: "Remote",
    seniority: "Seniority",
    category: "Category",
    location: "Location",
    contract: "Contract",
    description: "Job Description",
    aboutCompany: "About the Company",
    similarJobs: "Similar Jobs",
    allJobs: "All Jobs",
    noJobs: "No jobs found matching your criteria.",
  },

  filters: {
    allCategories: "All Categories",
    allLocations: "All Locations",
    allSeniority: "All Levels",
    remote: "Remote",
    search: "Search jobs...",
  },

  company: {
    claimPage: "Is this your company? Claim this page",
    jobs: "Open Positions",
    about: "About",
    noJobs: "No open positions at the moment.",
  },

  footer: {
    subscribe: "Get weekly growth jobs in your inbox",
    subscribePlaceholder: "Enter your email",
    subscribeButton: "Subscribe",
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
    "partnerships": "Partnerships",
    "head-of-growth": "Head of Growth",
    "vp-marketing": "VP Marketing",
    "cmo": "CMO",
  },

  seniority: {
    INTERN: "Intern",
    JUNIOR: "Junior",
    MID: "Mid-level",
    SENIOR: "Senior",
    LEAD: "Lead",
    MANAGER: "Manager",
    DIRECTOR: "Director",
    VP: "VP",
    C_LEVEL: "C-Level",
  },
} as const;

export interface Dictionary {
  locale: string;
  market: string;
  jobsPath: string;
  companiesPath: string;
  nav: { jobs: string; companies: string; postJob: string; signIn: string };
  hero: { title: string; subtitle: string; cta: string };
  job: Record<string, string>;
  filters: Record<string, string>;
  company: Record<string, string>;
  footer: Record<string, string>;
  categories: Record<string, string>;
  seniority: Record<string, string>;
}
