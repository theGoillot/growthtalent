/**
 * Programmatic SEO content for category pages.
 * Each category gets a unique blurb, salary range, and FAQ
 * to capture long-tail search traffic.
 */

interface CategorySeoContent {
  what: string;
  salaryRange: string;
  topSkills: string[];
  faq: { q: string; a: string }[];
}

export const CATEGORY_SEO: Record<string, CategorySeoContent> = {
  "growth-marketing": {
    what: "Growth marketers drive user acquisition, activation, and retention through data-driven experimentation. They sit at the intersection of product, data, and marketing — running A/B tests, building funnels, and scaling what works.",
    salaryRange: "$70K\u2013$180K in the US, depending on seniority and company stage",
    topSkills: ["A/B testing", "Funnel optimization", "SQL & analytics", "Paid acquisition", "Product-led growth"],
    faq: [
      { q: "What does a Growth Marketer do?", a: "A Growth Marketer owns the full funnel \u2014 from acquiring new users to retaining them. They run experiments across channels, analyze data to find leverage points, and scale winning strategies." },
      { q: "How is Growth Marketing different from traditional marketing?", a: "Traditional marketing focuses on brand awareness and top-of-funnel. Growth marketing is experiment-driven, covers the full funnel (acquisition through retention), and is deeply tied to product metrics." },
      { q: "What skills do I need for a Growth Marketing role?", a: "You need a mix of analytical and creative skills: SQL, A/B testing frameworks, paid acquisition, email/lifecycle marketing, and the ability to build and interpret dashboards." },
    ],
  },
  "product-marketing": {
    what: "Product marketers are the bridge between product and market. They own positioning, messaging, go-to-market launches, competitive intelligence, and sales enablement. The best PMMs make complex products feel simple.",
    salaryRange: "$80K\u2013$200K in the US, with senior PMMs at top tech companies reaching $250K+ OTE",
    topSkills: ["Positioning & messaging", "Go-to-market strategy", "Competitive analysis", "Sales enablement", "Customer research"],
    faq: [
      { q: "What does a Product Marketing Manager do?", a: "PMMs define how a product is positioned in the market, craft the messaging, plan launches, create sales collateral, and gather competitive intelligence. They're the voice of the customer inside the company." },
      { q: "Is Product Marketing more marketing or more product?", a: "It depends on the company. At product-led companies, PMMs work closely with product teams on adoption and activation. At sales-led companies, they focus more on enablement and collateral." },
      { q: "What's the career path for a PMM?", a: "Junior PMM \u2192 PMM \u2192 Senior PMM \u2192 Group PMM / Head of Product Marketing \u2192 VP Marketing or CMO. Many PMMs also transition into product management or general management." },
    ],
  },
  "demand-generation": {
    what: "Demand gen professionals build and optimize the pipeline engine. They design campaigns that generate qualified leads, nurture prospects through the funnel, and partner closely with sales to hit revenue targets.",
    salaryRange: "$75K\u2013$170K in the US, with directors and VPs reaching $200K+",
    topSkills: ["Marketing automation (HubSpot, Marketo)", "ABM strategy", "Lead scoring", "Campaign management", "Revenue attribution"],
    faq: [
      { q: "What is Demand Generation?", a: "Demand generation is the practice of creating awareness and interest in a product to build a qualified pipeline of leads. It spans content, events, paid media, ABM, and nurture programs." },
      { q: "How is Demand Gen different from Lead Gen?", a: "Lead gen is about capturing contact information. Demand gen is broader \u2014 it includes creating the demand itself through education, content, and brand building before a lead is ever captured." },
      { q: "What tools do Demand Gen managers use?", a: "HubSpot or Marketo for automation, Salesforce for CRM, 6sense or Demandbase for ABM, Google/LinkedIn Ads for paid, and Looker or Tableau for reporting." },
    ],
  },
  "growth-engineering": {
    what: "Growth engineers build the experimentation infrastructure and implement product changes that drive key metrics. They write code that directly impacts conversion rates, activation, and retention \u2014 not just features.",
    salaryRange: "$120K\u2013$250K in the US, matching senior software engineer compensation",
    topSkills: ["Full-stack development", "A/B testing infrastructure", "Data pipelines", "Feature flagging", "Statistical analysis"],
    faq: [
      { q: "What does a Growth Engineer do?", a: "Growth engineers build and ship experiments that directly impact business metrics. They work on onboarding flows, pricing pages, referral systems, and any product surface that drives growth." },
      { q: "Is Growth Engineering a real engineering role?", a: "Yes. Growth engineers are full software engineers who happen to focus on business-critical surfaces. They need strong coding skills plus an understanding of experimentation and data analysis." },
      { q: "What's the difference between a Growth Engineer and a regular engineer?", a: "A regular engineer builds features based on a spec. A growth engineer identifies what to build by analyzing data, runs experiments to validate hypotheses, and iterates based on metric impact." },
    ],
  },
  "marketing-ops": {
    what: "Marketing ops professionals own the tech stack, data flows, and processes that make marketing teams efficient. They manage automation platforms, reporting infrastructure, lead routing, and attribution models.",
    salaryRange: "$70K\u2013$160K in the US, with directors reaching $180K+",
    topSkills: ["Marketing automation", "CRM administration", "Data hygiene", "Attribution modeling", "Process optimization"],
    faq: [
      { q: "What is Marketing Operations?", a: "Marketing ops is the function that keeps the marketing machine running. They manage tools (HubSpot, Marketo, Salesforce), build workflows, maintain data quality, and provide reporting and attribution." },
      { q: "What tools do Marketing Ops teams use?", a: "The core stack typically includes a marketing automation platform (HubSpot, Marketo), CRM (Salesforce), analytics (Google Analytics, Looker), and various integration tools (Zapier, Workato)." },
      { q: "Is Marketing Ops a good career path?", a: "Excellent. Companies increasingly recognize that their marketing is only as good as their operations. The role offers clear progression to Director of Marketing Ops, RevOps leadership, or VP Marketing." },
    ],
  },
  "content-marketing": {
    what: "Content marketers create the articles, guides, videos, and thought leadership that attract and educate potential customers. The best content marketers think like publishers \u2014 building audiences, not just writing blog posts.",
    salaryRange: "$55K\u2013$150K in the US, with Heads of Content at $160K+",
    topSkills: ["SEO writing", "Editorial strategy", "Content distribution", "Analytics & measurement", "Storytelling"],
    faq: [
      { q: "What does a Content Marketer do?", a: "Content marketers plan, create, and distribute content that attracts an audience and drives business outcomes. This includes blog posts, whitepapers, video scripts, podcasts, and social content." },
      { q: "Is Content Marketing just blogging?", a: "No. Modern content marketing spans video, podcasts, newsletters, interactive tools, webinars, and community content. Blogging is one channel, but the best content marketers are multi-format." },
      { q: "What makes a good Content Marketing portfolio?", a: "Show range: an SEO article that ranks, a thought leadership piece, something with measurable impact (traffic, leads, revenue). Include your process, not just the output." },
    ],
  },
  "performance-marketing": {
    what: "Performance marketers manage paid acquisition across Google, Meta, LinkedIn, TikTok, and other channels. They optimize ad spend for ROI, run creative tests, and build attribution models to prove what works.",
    salaryRange: "$65K\u2013$170K in the US, with senior managers at agencies or high-growth startups reaching $200K+",
    topSkills: ["Google Ads & Meta Ads", "Campaign optimization", "Creative testing", "Attribution & analytics", "Budget management"],
    faq: [
      { q: "What does a Performance Marketer do?", a: "Performance marketers manage paid advertising budgets across digital channels. They create campaigns, optimize targeting and creative, track conversions, and continuously improve return on ad spend." },
      { q: "What's the difference between Performance Marketing and Growth Marketing?", a: "Performance marketing focuses specifically on paid channels and ROAS. Growth marketing is broader \u2014 it includes paid but also organic, product, lifecycle, and experimentation across the full funnel." },
      { q: "Which paid channels should I learn first?", a: "Start with Google Ads (Search) and Meta Ads (Facebook/Instagram). These are the two largest platforms and the most commonly required skills. Then add LinkedIn for B2B or TikTok for DTC." },
    ],
  },
  "crm-lifecycle": {
    what: "CRM & lifecycle marketers own the post-acquisition journey. They design onboarding sequences, retention campaigns, win-back flows, and loyalty programs that maximize customer lifetime value.",
    salaryRange: "$65K\u2013$155K in the US, with senior lifecycle roles at $170K+",
    topSkills: ["Email marketing", "Marketing automation", "Segmentation", "Customer journey mapping", "A/B testing"],
    faq: [
      { q: "What is Lifecycle Marketing?", a: "Lifecycle marketing is the practice of sending the right message to the right user at the right time based on where they are in their journey \u2014 from onboarding through activation, retention, and reactivation." },
      { q: "What tools do Lifecycle Marketers use?", a: "Common tools include Braze, Iterable, Customer.io, Klaviyo (for ecommerce), and Salesforce Marketing Cloud. Most roles also require experience with segmentation and A/B testing." },
      { q: "How is CRM different from Lifecycle Marketing?", a: "CRM traditionally focuses on managing customer data and relationships (Salesforce). Lifecycle marketing is about using that data to build automated communication journeys. In practice, the roles overlap significantly." },
    ],
  },
  "seo": {
    what: "SEO professionals drive organic traffic by optimizing website content, technical infrastructure, and link-building strategy. They combine technical skills with content strategy to rank for high-intent keywords.",
    salaryRange: "$60K\u2013$160K in the US, with Heads of SEO at $180K+",
    topSkills: ["Technical SEO", "Keyword research", "Content strategy", "Link building", "Analytics (GSC, Ahrefs, Semrush)"],
    faq: [
      { q: "What does an SEO Manager do?", a: "SEO managers develop and execute strategies to improve organic search rankings. This includes keyword research, on-page optimization, technical audits, content planning, and link acquisition." },
      { q: "Is SEO still relevant in 2026?", a: "Yes. Search is still the highest-intent channel for most businesses. The landscape is evolving with AI overviews and SGE, but organic traffic remains a critical acquisition channel." },
      { q: "What SEO skills are most in demand?", a: "Technical SEO (site speed, structured data, crawlability), programmatic SEO at scale, and content strategy that accounts for AI search features. Pure link building is less valued than it used to be." },
    ],
  },
  "data-analytics": {
    what: "Data & analytics professionals in marketing transform raw data into actionable insights. They build dashboards, run attribution analysis, design experiments, and help marketing teams make data-driven decisions.",
    salaryRange: "$75K\u2013$180K in the US, with senior analytics leaders at $200K+",
    topSkills: ["SQL", "Python/R", "Dashboard building (Looker, Tableau)", "Statistical analysis", "Marketing attribution"],
    faq: [
      { q: "What does a Marketing Analyst do?", a: "Marketing analysts collect and analyze data to measure campaign performance, build attribution models, identify trends, and provide recommendations. They're the data backbone of the marketing team." },
      { q: "Do I need to know how to code?", a: "SQL is essential. Python or R is increasingly expected for senior roles. You don't need to be a software engineer, but you need to be comfortable querying databases and manipulating data." },
      { q: "What's the difference between a Marketing Analyst and a Data Analyst?", a: "A marketing analyst specializes in marketing data (campaigns, attribution, funnel metrics). A data analyst may work across any business function. The technical skills overlap, but domain knowledge differs." },
    ],
  },
  "brand-marketing": {
    what: "Brand marketers build the perception, voice, and visual identity that makes a company memorable. They oversee creative campaigns, brand guidelines, partnerships, and the emotional connection between company and customer.",
    salaryRange: "$65K\u2013$170K in the US, with Brand Directors at $190K+",
    topSkills: ["Brand strategy", "Creative direction", "Campaign development", "Consumer insights", "Cross-functional leadership"],
    faq: [
      { q: "What does a Brand Marketer do?", a: "Brand marketers define how a company looks, sounds, and feels. They develop brand guidelines, oversee creative campaigns, manage agency relationships, and ensure consistency across every touchpoint." },
      { q: "How do you measure brand marketing?", a: "Brand lift surveys, share of voice, unaided awareness, NPS, and organic search volume for branded terms. It's harder to measure than performance marketing, but not impossible." },
      { q: "Is Brand Marketing a good career in tech?", a: "Yes, especially at companies past Series B that need to differentiate beyond features. As markets mature, brand becomes a competitive moat. DTC, consumer apps, and B2B brands all invest heavily." },
    ],
  },
  "social-media": {
    what: "Social media professionals build and manage a brand's presence across platforms like Instagram, TikTok, LinkedIn, X, and YouTube. The best ones are equal parts creative, analytical, and community-driven.",
    salaryRange: "$45K\u2013$130K in the US, with Heads of Social at $150K+",
    topSkills: ["Content creation", "Platform strategy (TikTok, Instagram, LinkedIn)", "Community management", "Social analytics", "Short-form video"],
    faq: [
      { q: "What does a Social Media Manager do?", a: "Social media managers create content, manage posting schedules, engage with the community, track performance metrics, and develop platform-specific strategies. Many also handle influencer partnerships." },
      { q: "Which social platforms matter most for jobs?", a: "It depends on the industry. B2B companies prioritize LinkedIn. DTC and lifestyle brands focus on Instagram and TikTok. Most roles expect you to be strong on at least 2-3 platforms." },
      { q: "Do I need video skills for social media jobs?", a: "Increasingly, yes. Short-form video (TikTok, Reels) dominates engagement. Being comfortable on camera and with basic editing tools (CapCut, Premiere) is a major advantage." },
    ],
  },
  "partnerships": {
    what: "Partnerships professionals build and manage strategic relationships that drive revenue \u2014 through channel partners, affiliates, co-marketing, integrations, or business development deals.",
    salaryRange: "$70K\u2013$180K in the US, with senior partnerships leaders at $200K+ OTE",
    topSkills: ["Relationship management", "Deal structuring", "Revenue attribution", "Cross-functional coordination", "Negotiation"],
    faq: [
      { q: "What does a Partnerships Manager do?", a: "Partnerships managers identify, negotiate, and manage strategic relationships that drive mutual growth. This includes affiliate programs, co-marketing, technology integrations, and channel partnerships." },
      { q: "Is Partnerships more sales or marketing?", a: "It's both. Partnerships roles require sales skills (negotiation, deal closing) and marketing skills (co-marketing, campaign management). The split depends on the company and the type of partnerships." },
      { q: "What's the earning potential in Partnerships?", a: "High. Senior partnerships roles often include significant variable compensation tied to partner-sourced revenue. Directors and VPs at SaaS companies routinely earn $200K+ OTE." },
    ],
  },
  "head-of-growth": {
    what: "Heads of Growth own the company's growth strategy end-to-end. They lead cross-functional teams spanning acquisition, activation, retention, and monetization \u2014 and are accountable for the revenue number.",
    salaryRange: "$140K\u2013$280K in the US, plus equity at startups",
    topSkills: ["Growth strategy", "Team leadership", "P&L ownership", "Experimentation at scale", "Cross-functional management"],
    faq: [
      { q: "What does a Head of Growth do?", a: "They set the growth strategy, manage a team of growth marketers/engineers, own key metrics (CAC, LTV, activation rate), and report to the CEO or VP Marketing. It's a leadership role that requires both strategic thinking and hands-on execution." },
      { q: "How do I become a Head of Growth?", a: "Most Heads of Growth spent 5-8 years as individual contributors in growth marketing, performance marketing, or product \u2014 then moved into management. A strong analytical foundation and T-shaped skillset are essential." },
      { q: "Head of Growth vs. VP Marketing?", a: "Head of Growth is more metrics and experimentation-focused. VP Marketing is broader, covering brand, comms, and sometimes product marketing. At some companies these roles overlap or are the same person." },
    ],
  },
  "vp-marketing": {
    what: "VPs of Marketing lead the entire marketing function. They set strategy, manage teams across brand, demand gen, product marketing, and content, and are accountable for marketing's contribution to revenue.",
    salaryRange: "$180K\u2013$350K in the US, plus significant equity",
    topSkills: ["Marketing strategy", "Team building", "Board-level communication", "Budget management", "Revenue accountability"],
    faq: [
      { q: "What does a VP of Marketing do?", a: "A VP of Marketing owns the marketing strategy and team. They manage budgets, set priorities, hire and develop talent, and are the marketing representative in the leadership team. They're accountable for pipeline and revenue." },
      { q: "VP Marketing vs. CMO?", a: "At startups, these are often the same role. At larger companies, the VP reports to the CMO. The CMO is typically a C-suite executive with board-level responsibilities and broader strategic influence." },
      { q: "When do startups hire a VP Marketing?", a: "Usually between Series A and Series B, when the company needs to professionalize marketing beyond the founding team. The right timing is when marketing becomes a full-time leadership challenge." },
    ],
  },
  "cmo": {
    what: "Chief Marketing Officers are the most senior marketing leaders in an organization. They set the marketing vision, own the brand, drive revenue through marketing, and represent the customer at the executive table.",
    salaryRange: "$250K\u2013$500K+ in the US, plus equity and bonus",
    topSkills: ["Executive leadership", "Brand vision", "Revenue strategy", "Board management", "Organizational design"],
    faq: [
      { q: "What does a CMO do?", a: "The CMO sets the marketing vision and strategy for the entire company. They lead all marketing functions, manage significant budgets, represent marketing to the board, and drive brand and revenue growth." },
      { q: "Is the CMO role changing?", a: "Yes. Modern CMOs are increasingly expected to own revenue, not just brand. They need to be data-literate, technology-savvy, and able to demonstrate marketing's direct impact on the bottom line." },
      { q: "What's the average CMO tenure?", a: "About 3-4 years at public companies. It's one of the shortest C-suite tenures, which reflects both the pressure of the role and the tendency for companies to want fresh perspectives as they evolve." },
    ],
  },
};
