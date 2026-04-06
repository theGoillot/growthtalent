/**
 * English guide content pages — SEO articles for /guides/[slug]
 * Mirrors the structure of content.ts (French /ressources/)
 */

export interface GuidePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  content: string;
  relatedCategory: string;
  targetKeywords: string[];
  author: string;
  publishedDate: string;
  speakers?: { name: string; role: string; linkedinUrl?: string }[];
  frenchEquivalent?: string; // slug of the FR /ressources/ version
}

export const GUIDE_PAGES: Record<string, GuidePage> = {
  "product-led-growth-strategy": {
    slug: "product-led-growth-strategy",
    title: "Product-Led Growth Strategy: A Masterclass with Elena Verna, Enzo Avigo & Louis",
    metaTitle: "Product-Led Growth Strategy: Complete Guide with Elena Verna (2026)",
    metaDescription: "Learn PLG strategy from Elena Verna (Miro, Amplitude), Enzo Avigo (June.so), and Louis (Bling). Covers B2B vs B2C, freemium vs trial, activation, and monetization.",
    heroSubtitle: "Inside a 56-minute masterclass with three PLG experts. Elena Verna (ex-Miro, ex-Amplitude, now Lovable), Enzo Avigo (June.so founder, now Amplitude), and Louis (Bling growth lead) break down what product-led growth actually means, when it works, and how to implement it.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["product led growth", "PLG strategy", "product led growth examples", "elena verna growth"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    speakers: [
      { name: "Elena Verna", role: "Growth at Lovable (ex-Miro, ex-Amplitude)", linkedinUrl: "https://linkedin.com/in/elenaverna" },
      { name: "Enzo Avigo", role: "PM at Amplitude (ex-CEO June.so, YC W21)", linkedinUrl: "https://linkedin.com/in/enzoa" },
      { name: "Louis", role: "Growth Lead at Bling (Fintech B2C)" },
    ],
    frenchEquivalent: "strategie-product-led-growth",
    content: `<h2>What is Product-Led Growth? Three Definitions from Three Experts</h2>

<p>Product-led growth means different things depending on who you ask. In this live session hosted by Jeremy Goillot (Growth.Talent), three practitioners with very different backgrounds converged on a surprisingly aligned definition.</p>

<h3>Elena Verna's Definition: Self-Serve Activate, Engage, and Sell</h3>

<blockquote>
<p>"Product-led growth is all about the ability of the product to self-serve activate, self-serve engage, and the product's ability to sell itself. There has to be an activation of the setup, aha, habit moment that can be resolved by product without human intervention. The product has to either create a self-serve monetization motion or product-led sales, where it attaches a sales team and monetizes usage through sales."</p>
<cite>— Elena Verna, Growth at Lovable (ex-Miro, ex-Amplitude)</cite>
</blockquote>

<p>Elena deliberately excludes <strong>acquisition</strong> from her core definition. Why? Because in B2B, not every product has inherent viral loops or content loops. Companies like Amplitude, Snowflake, and Okta have strong PLG engines for activation, engagement, and monetization — but their acquisition is marketing-led, not product-led.</p>

<h3>Louis's B2C Perspective: Growth Through Product Experience</h3>

<p>Coming from Bling (a fintech app giving cash advances), Louis defines PLG as <strong>teams that make the business grow using the product</strong> — a team of people who can launch experiments from beginning to end, working hand-in-hand with the product team.</p>

<p>In mobile B2C, the emphasis is on <strong>referral and the K-factor</strong> (how viral your product is). At Bling, they achieved strong virality on what should be a "boring" credit product — by making the user experience exceptional enough that users naturally recommended it to friends.</p>

<h3>Enzo Avigo's Framework: Product at the Center of the Org</h3>

<blockquote>
<p>"I think what's really happening is that some companies find ways to reinvent the way they can enter markets or compete in some markets. Product-led is like having the product at the core of this flywheel — whether you're going to do acquisition through virality, activation through the product, or monetization through the product. It depends on your product, your industry, and your company."</p>
<cite>— Enzo Avigo, PM at Amplitude (ex-CEO June.so)</cite>
</blockquote>

<p>Enzo frames PLG as a <strong>cost and efficiency strategy</strong>: if you can use PLG for acquisition, you reduce CAC. For onboarding, you need fewer success people. It allows you to enter markets with an advantage that didn't exist before.</p>

<h2>The 3 Prerequisites for PLG: Motivation, Ability, Permission</h2>

<p>Elena shared a framework for assessing whether PLG can work for your company. Three conditions must be met:</p>

<h3>1. Motivation</h3>
<p>The end user must be motivated enough to discover and try your product on their own. If they're not actively looking for a solution, PLG won't work — they won't self-serve activate.</p>

<h3>2. Ability</h3>
<p>The user must be able to self-serve activate and engage with your product. Some products are too complicated, the reward cycle isn't clear, or the job-to-be-done is too big. PLG works best when you start with a small, solvable job — not the entire enterprise problem.</p>

<h3>3. Permission</h3>
<p>In B2B, the end user needs permission from their organization to use the product — or at least a "forgiveness level" relationship with IT/admin.</p>

<blockquote>
<p>"If any of those three are missing, PLG just comes to a screeching end. You need to figure out how to reduce complexity, gain permission, or trigger motivation by addressing a subtly tangential problem."</p>
<cite>— Elena Verna</cite>
</blockquote>

<p><strong>Real example of permission failure:</strong> Jeremy shared the case of a startup building on the Zoom App Store. The product required the Zoom administrator (IT/CTO) to approve the extension — individual users couldn't install it on enterprise Zoom accounts. This killed their PLG motion for enterprise customers.</p>

<h2>PLG vs Sales-Led: The Miro vs Mural Case Study</h2>

<p>Elena provided a powerful comparison from her time as interim CMO at Miro (2020-2021):</p>

<ul>
<li><strong>Miro (PLG)</strong>: Started bootstrapped, grew to millions in revenue before taking funding. Users discovered the product, activated on their own, spread it within their teams, and eventually the problem escalated to enterprise-level contracts.</li>
<li><strong>Mural (Sales-Led)</strong>: Went after enterprise buyers top-down, trying to close contracts before users experienced the product.</li>
</ul>

<p>The PLG advantage: Miro entered organizations like a <strong>Trojan horse</strong>, starting with individual users solving small problems. Over 12-18 months, usage expanded within teams until it triggered enterprise-level contracts ($15K-$100K+). The CAC was lower, but the timeline was longer.</p>

<h2>June.so: PLG in Practice for B2B SaaS</h2>

<p>Enzo applied Elena's framework to June.so (plug-and-play product analytics for B2B SaaS):</p>

<ul>
<li><strong>Permission:</strong> Users could connect their data source (like Segment) without needing admin approval. Jeremy himself connected Segment to June while at Spendesk — validating that individuals could self-serve.</li>
<li><strong>Ability:</strong> Data visualization should be self-serve. The problem is well-defined and distributed enough for individual users.</li>
<li><strong>Motivation:</strong> The hardest part. June's approach: get close to potential users (LinkedIn, newsletter), continuously distribute value without overselling, and wait for the moment of peak frustration with their current tool. "We just try to get close to people and let them come to us at some point."</li>
</ul>

<h2>When NOT to Use PLG</h2>

<p>The panel was clear that PLG is not for everyone:</p>

<ul>
<li><strong>Products with a large job-to-be-done:</strong> If your product solves an enterprise-level problem from day one, individual users can't self-serve activate.</li>
<li><strong>Products requiring admin/IT permission:</strong> If users can't install or use the product without organizational approval, your PLG funnel breaks.</li>
<li><strong>No clear aha moment:</strong> If users can't quickly understand the value, they'll drop off before activation.</li>
<li><strong>Low motivation market:</strong> If end users aren't actively looking for solutions, they won't discover your product.</li>
</ul>

<h2>Key Takeaways for Growth Professionals</h2>

<ol>
<li><strong>PLG is not just about acquisition.</strong> Most of the value comes from self-serve activation, engagement, and monetization. Acquisition can remain marketing-led.</li>
<li><strong>Test the 3 prerequisites first:</strong> Motivation, Ability, Permission. If any is missing, fix that before investing in PLG.</li>
<li><strong>PLG is a cost/efficiency strategy,</strong> not a silver bullet. It lowers CAC and reduces headcount needs, but timelines are longer (12-18 months for B2B enterprise).</li>
<li><strong>Product experience is the growth lever.</strong> In B2C (Bling) and B2B (Miro, June), the quality of the product experience is what drives organic growth.</li>
<li><strong>PLG and SLG can coexist.</strong> Many successful companies layer sales on top of a PLG base (product-led sales).</li>
</ol>

<h2>About the Speakers</h2>

<h3>Elena Verna</h3>
<p>Elena Verna is currently leading growth at <strong>Lovable</strong>, one of the fastest-growing AI companies. Previously, she was Head of Growth at Amplitude, SVP Growth at Miro, and has advised companies including Dropbox, MongoDB, and Netlify through Reforge. She has 190,000+ followers on LinkedIn and is widely considered one of the leading voices on product-led growth in B2B.</p>

<h3>Enzo Avigo</h3>
<p>Enzo Avigo is a Principal Product Manager at <strong>Amplitude</strong> following the acquisition of June.so, the product analytics company he co-founded. June was part of Y Combinator W21, grew to 2,000+ companies, and was acquired in 2025. Enzo has 63,000+ LinkedIn followers and 18M+ impressions.</p>

<h3>Louis</h3>
<p>Louis led growth at <strong>Bling</strong>, a French fintech B2C app offering cash advances. He built the growth team and achieved strong virality metrics on a traditionally "boring" product category through exceptional user experience design.</p>

<p><em>This article is based on a Growth.Talent LinkedIn Live session hosted by <a href="https://linkedin.com/in/jeremygoillot">Jeremy Goillot</a>. The original recording featured 56 minutes of discussion with live Q&A from the audience.</em></p>`,
  },

  "growth-tracking-analytics-guide": {
    slug: "growth-tracking-analytics-guide",
    title: "The Complete Guide to Growth Tracking & Analytics",
    metaTitle: "Growth Tracking & Analytics: Complete Setup Guide (2026)",
    metaDescription: "How to set up tracking for growth teams. Product analytics, CDPs, cohort analysis, and the full tracking stack explained by Amplitude and growth experts.",
    heroSubtitle: "Most growth teams track too little or track the wrong things. In this 55-minute session, two tracking experts break down the full analytics stack — from product analytics to CDPs — and explain how to build a model that drives revenue, not just reports.",
    relatedCategory: "data-analytics",
    targetKeywords: ["growth analytics", "marketing tracking setup", "product analytics for growth", "growth metrics"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    speakers: [
      { name: "Victor", role: "Growth Tracking Expert" },
      { name: "Esther", role: "Ex-Amplitude, Growth Analytics Advisor" },
    ],
    frenchEquivalent: "guide-tracking-analytics-growth",
    content: `<h2>Why Startups Need Tracking (And Most Do It Wrong)</h2>

<p>Tracking isn't just about Google Tag Manager and UTM parameters. According to Victor and Esther, there are two fundamentally different types of tracking that growth teams need to master:</p>

<ol>
<li><strong>Website tracking:</strong> Where traffic comes from, which links drive visits, conversion on landing pages.</li>
<li><strong>User behavior tracking:</strong> What users do inside your product — which actions, which buttons, which flows lead to conversion and retention.</li>
</ol>

<p>The second type is where most startups fail. They invest in acquisition tracking but ignore the post-signup experience entirely.</p>

<blockquote>
<p>"If you only track acquisition, you're gonna lose a lot of money. You need a model that goes all the way through retained users, active users, churned users. That's when you start building a model for revenue."</p>
<cite>— Esther, Growth Analytics Advisor</cite>
</blockquote>

<h2>The 3 Categories of the Growth Tracking Stack</h2>

<h3>1. Product Analytics (Amplitude, Mixpanel, PostHog)</h3>
<p>This is the platform for understanding what users do inside your product. Product analytics answers: what actions do paying users take that free users don't? What does the top 1% of users do that others don't?</p>

<p>Esther's framework: "It's not tech first or tool first. It's: what are your goals? What are you trying to accomplish? How can you get the data to measure what matters?"</p>

<h3>2. Customer Data Platform (Segment, RudderStack, Snowplow)</h3>
<p>CDPs collect events from your product and distribute them to every tool in your stack. Victor explains: "If you track 'campaign_created' in Segment, it goes to Amplitude for analytics AND to Customer.io for email automation AND to your CRM — all from one event."</p>

<h3>3. Cohort Analysis & CRM Integration</h3>
<p>Modern analytics platforms let you build user cohorts (e.g., "users who converted to paid within 7 days") and push those cohorts into your CRM, ad platforms, and email tools. This closes the loop between tracking and action.</p>

<h2>Building a Tracking Model: Acquisition vs Revenue</h2>

<blockquote>
<p>"Are you building a model for acquisition, activation, or business outcomes? If your model stops at acquisition, you'll know your inputs and outputs — but only for more leads. Build a model that goes all the way through retained users, and you build a model for revenue."</p>
<cite>— Esther, Growth Analytics Advisor</cite>
</blockquote>

<p>The key insight: B2C companies invested early in post-signup tracking. B2B SaaS companies in France traditionally "solved" retention with large customer success teams instead of data. The smartest growth teams now use the same toolkit regardless of B2B or B2C.</p>

<h2>Key Takeaways</h2>

<ol>
<li><strong>Track behavior, not just acquisition.</strong> Knowing where users come from is step 1. Knowing what they do after is where the money is.</li>
<li><strong>Choose tools based on goals, not features.</strong> Don't pick Amplitude because it's popular — pick it because you need to understand user journeys.</li>
<li><strong>Use a CDP if you have 3+ tools.</strong> Without a central event pipeline, you'll end up with inconsistent data across every platform.</li>
<li><strong>Build cohorts and act on them.</strong> The power of tracking is in creating segments and triggering actions — not just dashboards.</li>
<li><strong>Start simple.</strong> You don't need every tool on day one. Start with product analytics, add a CDP when complexity grows.</li>
</ol>

<p><em>Based on a Growth.Talent LinkedIn Live session (55 minutes) hosted by Jeremy Goillot.</em></p>`,
  },

  "how-to-build-growth-culture": {
    slug: "how-to-build-growth-culture",
    title: "How to Build a Growth Culture in Your Company",
    metaTitle: "How to Build a Growth Culture: Lessons from French Unicorns (2026)",
    metaDescription: "How to infuse growth thinking across your organization. Real examples from growth leaders at French unicorns on making growth a strategic function.",
    heroSubtitle: "Growth isn't just a team — it's a mindset. In this session, growth leaders from some of France's biggest startups explain how to position growth as a strategic function, not just a set of tactics. From hiring to org design to executive buy-in.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["growth culture", "growth mindset company", "how to build growth team", "growth organization"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    speakers: [],
    frenchEquivalent: "culture-growth-en-entreprise",
    content: `<h2>Growth as a Strategic Function, Not a Tactic</h2>

<p>The biggest mistake companies make with growth is treating it as a collection of tactics — running ads, A/B testing buttons, optimizing landing pages. The speakers in this session argue that real growth is a strategic function that touches every part of the organization.</p>

<p>Working at two of France's biggest unicorns, they've seen firsthand what happens when growth is elevated from "the team that runs ads" to "the function that drives company strategy."</p>

<h2>What Growth Culture Actually Looks Like</h2>

<h3>Experimentation as a Default</h3>
<p>In a growth-cultured company, every decision starts with a hypothesis. Not "let's redesign the pricing page" but "we believe that showing annual pricing first will increase conversion by 15% because users anchor on the lower monthly equivalent." The culture values learning over shipping.</p>

<h3>Data Literacy Across Teams</h3>
<p>Growth culture means everyone — from sales to product to customer success — can read a dashboard, understand a funnel, and make data-informed decisions. This doesn't happen by accident. It requires investment in tooling, training, and shared metrics.</p>

<h3>Cross-Functional Collaboration</h3>
<p>Growth teams that sit in a silo fail. The most impactful growth work happens at the intersection of product, marketing, sales, and engineering. Growth culture means tearing down walls between these functions.</p>

<h2>How to Start Building Growth Culture</h2>

<ol>
<li><strong>Get executive sponsorship.</strong> Growth culture starts at the top. If the CEO doesn't understand and champion growth thinking, it won't stick.</li>
<li><strong>Hire a growth leader, not just a growth hacker.</strong> You need someone who can articulate strategy, not just run experiments.</li>
<li><strong>Create shared metrics.</strong> When marketing, product, and sales all own the same North Star metric, collaboration happens naturally.</li>
<li><strong>Make experimentation safe.</strong> Failed experiments should be celebrated (within reason). If people are punished for experiments that don't work, they'll stop experimenting.</li>
<li><strong>Invest in data infrastructure.</strong> You can't have a data-driven culture without data. Budget for analytics before you budget for ads.</li>
</ol>

<h2>Common Mistakes</h2>

<ul>
<li><strong>Hiring too junior too early.</strong> Your first growth hire should be someone who's done it before — not an intern who read about growth hacking.</li>
<li><strong>Confusing growth with marketing.</strong> Growth includes marketing, but also product, engineering, data, and sometimes sales. Don't box it in.</li>
<li><strong>Expecting results in weeks.</strong> Growth culture takes months to build. The compounding effects take even longer to show.</li>
<li><strong>Copying playbooks blindly.</strong> What worked at Notion won't work at your B2B SaaS targeting French SMBs. Context matters more than tactics.</li>
</ul>

<h2>Key Takeaways</h2>

<ol>
<li><strong>Growth is a mindset, not a department.</strong> The goal is to make growth thinking pervasive across the org.</li>
<li><strong>Start with the right hire.</strong> A senior growth leader who can influence executives is worth 10 growth hackers.</li>
<li><strong>Invest in infrastructure first.</strong> Data, tooling, and shared metrics create the foundation for everything else.</li>
<li><strong>Be patient.</strong> Growth culture compounds. The first 6 months feel slow. The next 6 months feel transformative.</li>
</ol>

<p><em>Based on a Growth.Talent LinkedIn Live session (52 minutes) hosted by Jeremy Goillot, featuring growth leaders from French unicorns.</em></p>`,
  },

  "content-strategy-for-growth": {
    slug: "content-strategy-for-growth",
    title: "Content & Brand Strategy for Startup Growth",
    metaTitle: "Content Strategy for Growth: How Startups Build Brand (2026)",
    metaDescription: "Why most startups underinvest in content and brand. Elsa, Leslie, and Flora share actionable strategies for using content as a growth lever.",
    heroSubtitle: "Content is the most underinvested growth channel in the French startup ecosystem. In this session, three content and brand experts explain why most startups default to performance marketing when content could be their strongest competitive advantage.",
    relatedCategory: "content-marketing",
    targetKeywords: ["content marketing strategy", "startup content strategy", "brand strategy growth", "content led growth"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    speakers: [
      { name: "Elsa", role: "Content & Brand Strategist" },
      { name: "Leslie", role: "Content Lead" },
      { name: "Flora", role: "Brand Strategy Expert" },
    ],
    frenchEquivalent: "strategie-content-brand-growth",
    content: `<h2>Why Startups Underinvest in Content</h2>

<p>Jeremy opens this session with a strong observation: in the French startup ecosystem, content is not given enough attention. It's easier to launch email campaigns or paid ads than to build a content strategy. But the companies that invest early in content build a moat that paid channels can never replicate.</p>

<blockquote>
<p>"Very few startups invest enough in content and brand. It's easier to launch an email list campaign than to build a content strategy. But the ROI of content compounds in ways that paid never will."</p>
<cite>— Jeremy Goillot, Host</cite>
</blockquote>

<h2>Content as a Growth Lever: The Framework</h2>

<h3>1. Content Creates Trust Before the Sale</h3>
<p>In B2B, buyers research extensively before talking to sales. If your content answers their questions during that research phase, you've already won mindshare. By the time they reach out, you're the default choice.</p>

<h3>2. Content Drives Organic Acquisition</h3>
<p>SEO-driven content is the only acquisition channel that gets cheaper over time. Paid ads cost more every year. Content published today can drive traffic for years — but only if it's genuinely useful, not keyword-stuffed filler.</p>

<h3>3. Content Enables Product-Led Growth</h3>
<p>Great onboarding content (docs, tutorials, use cases) reduces time-to-value and increases activation. This is content as a product function, not just a marketing function.</p>

<h2>Building a Content Strategy from Zero</h2>

<ol>
<li><strong>Start with your ICP's questions.</strong> What does your ideal customer Google before they know your product exists? Those are your first articles.</li>
<li><strong>Create content pillars.</strong> Define 3-5 topics where you want to be the authority. Everything you publish should ladder up to one of these pillars.</li>
<li><strong>Invest in distribution, not just creation.</strong> A great article with no distribution strategy will get zero readers. Plan for LinkedIn, newsletter, community sharing from day one.</li>
<li><strong>Measure what matters.</strong> Pageviews are vanity. Track: organic traffic growth, time on page, email signups, and demo requests attributed to content.</li>
<li><strong>Repurpose ruthlessly.</strong> One webinar becomes a blog post, a LinkedIn carousel, a newsletter edition, and 5 social posts. Maximize every piece of content.</li>
</ol>

<h2>Brand vs Performance: It's Not Either/Or</h2>

<p>Flora makes the case that brand and performance marketing aren't opposing forces — they're multipliers. Strong brand reduces CAC on paid channels. Performance data informs brand messaging. The best growth teams invest in both simultaneously.</p>

<h2>Key Takeaways</h2>

<ol>
<li><strong>Content compounds.</strong> Start now, even if the ROI isn't immediate. In 12 months, you'll have a moat.</li>
<li><strong>Distribution > Creation.</strong> Don't publish into the void. Every piece needs a distribution plan.</li>
<li><strong>Brand amplifies performance.</strong> Invest in brand early — it makes every other channel work better.</li>
<li><strong>Hire a content person before your 3rd marketer.</strong> Content is foundational, not an afterthought.</li>
</ol>

<p><em>Based on a Growth.Talent LinkedIn Live session (62 minutes) hosted by Jeremy Goillot, featuring Elsa, Leslie, and Flora.</em></p>`,
  },

  "remote-growth-teams": {
    slug: "remote-growth-teams",
    title: "How to Build and Manage a Remote Growth Team",
    metaTitle: "Remote Growth Teams: Organization, Tools & Best Practices (2026)",
    metaDescription: "Practical advice on building remote growth teams. How to organize, communicate, and stay productive from growth professionals who work remotely.",
    heroSubtitle: "Remote work isn't going away — but managing a remote growth team requires different skills than managing one in an office. Two growth professionals who've worked remotely for years share actionable advice on organization, communication, and staying productive.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["remote growth team", "remote marketing team management", "remote work growth", "managing remote marketers"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    speakers: [
      { name: "Pierre", role: "Remote Growth Professional" },
      { name: "Fred", role: "Remote Growth Professional" },
    ],
    frenchEquivalent: "growth-en-remote",
    content: `<h2>Why Growth Teams Thrive Remote</h2>

<p>Growth work is uniquely suited to remote environments. Most of the work is digital-native — running experiments, analyzing data, building campaigns, optimizing funnels. Unlike sales (which benefits from energy and in-person bonding) or engineering (which sometimes needs whiteboarding), growth professionals can do 95% of their work with a laptop and an internet connection.</p>

<p>But remote growth has unique challenges: staying aligned on priorities, maintaining experiment velocity, and avoiding isolation from the broader organization.</p>

<h2>How to Organize a Remote Growth Team</h2>

<h3>Async-First Communication</h3>
<p>The biggest mistake remote teams make is trying to replicate office communication on Slack. Instead of constant messaging, document decisions in writing. Use Notion or Linear for async updates. Reserve video calls for alignment and brainstorming — not status updates.</p>

<h3>Weekly Experiment Reviews</h3>
<p>One sacred meeting per week: the experiment review. Every team member presents what they tested, what they learned, and what they'll test next. This creates accountability and shared learning without micromanagement.</p>

<h3>Shared Dashboards, Not Reports</h3>
<p>Instead of asking people to "report" their numbers, build dashboards that everyone can see in real time. When the data is transparent, the conversation shifts from "what happened" to "what should we do."</p>

<h2>Tools for Remote Growth Teams</h2>

<ul>
<li><strong>Project management:</strong> Linear or Notion (not Jira — too heavy for growth experiments)</li>
<li><strong>Communication:</strong> Slack for quick questions, Loom for async video updates</li>
<li><strong>Analytics:</strong> Amplitude or Mixpanel with shared dashboards</li>
<li><strong>Experimentation:</strong> Statsig, LaunchDarkly, or even a shared Google Sheet for experiment tracking</li>
<li><strong>Documentation:</strong> Notion as the single source of truth for playbooks and learnings</li>
</ul>

<h2>Staying Connected to the Company</h2>

<p>The biggest risk of remote growth teams is becoming disconnected from product and sales. Pierre and Fred recommend:</p>

<ol>
<li><strong>Join product standups as a listener.</strong> You don't need to speak — just knowing what's being built helps you plan experiments.</li>
<li><strong>Share wins publicly.</strong> Post experiment results in company-wide channels, not just the growth channel.</li>
<li><strong>Visit in person quarterly.</strong> Even the most remote-friendly teams benefit from periodic face time. Use offsites for strategy, not status.</li>
</ol>

<h2>Key Takeaways</h2>

<ol>
<li><strong>Async-first, meetings-second.</strong> Write more, call less. Reserve meetings for decisions and brainstorming.</li>
<li><strong>Weekly experiment reviews are non-negotiable.</strong> They create rhythm, accountability, and shared learning.</li>
<li><strong>Invest in shared dashboards.</strong> Transparency eliminates the need for status reports.</li>
<li><strong>Stay connected to the org.</strong> Remote growth teams that isolate themselves lose impact fast.</li>
</ol>

<p><em>Based on a Growth.Talent LinkedIn Live session (57 minutes) hosted by Jeremy Goillot with Timothee, featuring Pierre and Fred.</em></p>`,
  },

  "data-analytics-for-growth": {
    slug: "data-analytics-for-growth",
    title: "Data & Analytics for Growth Teams: Building Your First Data Stack",
    metaTitle: "Data Analytics for Growth Teams: Complete Stack Guide (2026)",
    metaDescription: "How to build a data stack for growth. Two ex-Spendesk and Gorgias engineers explain the technical foundations of data-driven growth teams.",
    heroSubtitle: "Most growth teams want to be 'data-driven' but don't know where to start. Aurelien (ex-Spendesk, first business engineer) and Eliott (Gorgias, data engineer) explain how to build a data stack from scratch — from first events to production dashboards.",
    relatedCategory: "data-analytics",
    targetKeywords: ["growth data stack", "data analytics growth team", "startup data infrastructure", "growth engineering"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    speakers: [
      { name: "Aurelien", role: "Ex-Spendesk (First Business Engineer), Founder", linkedinUrl: "https://linkedin.com/in/aurelien" },
      { name: "Eliott", role: "Data Engineer at Gorgias (E-commerce Helpdesk)", linkedinUrl: "https://linkedin.com/in/eliott" },
    ],
    frenchEquivalent: "data-analytics-equipe-growth",
    content: `<h2>The Growth Engineer: A New Type of Role</h2>

<p>Both Aurelien and Eliott have engineering backgrounds but work on business problems, not product features. Aurelien was one of the first engineers at Spendesk — but instead of building the product, he built the data infrastructure that powered the growth team. Eliott does similar work at Gorgias, a helpdesk for e-commerce.</p>

<blockquote>
<p>"When you combine technical skills with a passion for business problems, you quickly end up in the growth ecosystem. The role is messy — your career path isn't well-defined, you don't know where you'll be in 6 months. But you get to create your own scope."</p>
<cite>— Aurelien, Ex-Spendesk</cite>
</blockquote>

<p>This is the growth engineer archetype: someone who codes but thinks in funnels, someone who builds infrastructure but measures it in revenue impact.</p>

<h2>Building the Data Stack: Three Phases</h2>

<h3>Phase 1: Foundations — Event Tracking</h3>
<p>Before dashboards or models, you need events. Define the key user actions in your product and start tracking them consistently. Use a naming convention from day one (e.g., <code>user_signed_up</code>, <code>campaign_created</code>, <code>payment_completed</code>). Bad naming compounds into bad data.</p>

<h3>Phase 2: Storage & Transformation — The Warehouse</h3>
<p>Once you have events flowing, you need somewhere to store and transform them. A data warehouse (BigQuery, Snowflake, or even PostgreSQL for early-stage) becomes the single source of truth. Use dbt or SQL transforms to create clean, business-ready tables from raw events.</p>

<h3>Phase 3: Activation — Dashboards & Automations</h3>
<p>The output layer: dashboards for humans (Metabase, Looker, Amplitude) and automations for machines (reverse ETL to push cohorts into CRM, email tools, ad platforms).</p>

<h2>What Makes a Great First Data Hire</h2>

<blockquote>
<p>"I was curious. I started coding at 12-13 because I wanted to understand how everything worked. With the internet, you just need a laptop and a connection — you can build anything. That curiosity is what makes a great first data hire."</p>
<cite>— Aurelien, Ex-Spendesk</cite>
</blockquote>

<p>The ideal first data/growth engineer hire is:</p>

<ul>
<li><strong>Full-stack capable:</strong> Can write Python, SQL, and basic frontend code.</li>
<li><strong>Business-curious:</strong> Wants to understand funnels, not just build APIs.</li>
<li><strong>Comfortable with ambiguity:</strong> The role is undefined — they need to create their own scope.</li>
<li><strong>Scrappy:</strong> Will build with spreadsheets and scripts before requesting a $50K/year tool.</li>
</ul>

<h2>Gorgias: Data at Scale</h2>

<p>Eliott provides the perspective of a larger organization (150+ people when he joined). At Gorgias, there was already a team of engineers dedicated to go-to-market problems. His contribution was developing new capabilities around data activation — making sure the right information reaches the right person at the right time.</p>

<p>The challenge at scale: data quality. When 15 teams contribute data to the same warehouse, inconsistencies multiply. Ownership, naming conventions, and documentation become critical infrastructure.</p>

<h2>Key Takeaways</h2>

<ol>
<li><strong>Start with events, not tools.</strong> Define your key user actions before choosing any analytics platform.</li>
<li><strong>Hire curious engineers.</strong> The best growth engineers are autodidacts who code AND think about business.</li>
<li><strong>Name things well from day one.</strong> Bad event naming compounds into months of cleanup later.</li>
<li><strong>Build for activation, not just reporting.</strong> The goal of data isn't dashboards — it's automated actions.</li>
<li><strong>Data quality is infrastructure.</strong> At scale, invest in ownership, naming conventions, and documentation.</li>
</ol>

<p><em>Based on a Growth.Talent LinkedIn Live session (63 minutes) hosted by Jeremy Goillot, featuring Aurelien (ex-Spendesk) and Eliott (Gorgias). Jeremy recruited Aurelien as the first business engineer at Spendesk — giving this discussion a unique insider perspective.</em></p>`,
  },

  "what-does-head-of-growth-do": {
    slug: "what-does-head-of-growth-do",
    title: "What Does a Head of Growth Actually Do?",
    metaTitle: "What Does a Head of Growth Do? Role, Skills, Salary (2026)",
    metaDescription: "Complete breakdown of the Head of Growth role: day-to-day responsibilities, required skills, salary ranges, career path, and how to get hired.",
    heroSubtitle: "The Head of Growth title is everywhere — but what does the job actually look like? Based on analyzing 50+ Head of Growth job listings and interviews with growth leaders, here's the definitive breakdown.",
    relatedCategory: "head-of-growth",
    targetKeywords: ["what does head of growth do", "head of growth role", "head of growth responsibilities", "head of growth salary"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    content: `<h2>The Head of Growth Role: Not What You Think</h2>

<p>Ask five companies what their Head of Growth does, and you'll get five different answers. That's because the role is defined by the company's stage, business model, and existing team — not by a universal job description.</p>

<p>But after analyzing 50+ Head of Growth listings on Growth.Talent and interviewing growth leaders, clear patterns emerge.</p>

<h2>Core Responsibilities</h2>

<h3>1. Owning the Growth Strategy</h3>
<p>The Head of Growth sets the overall growth strategy — which channels to invest in, which metrics to optimize, which experiments to prioritize. They're not executing every campaign themselves. They're deciding where the company should place its bets.</p>

<h3>2. Managing the Growth Team</h3>
<p>At most companies, the Head of Growth manages 3-8 people across acquisition, lifecycle, product growth, and sometimes data/analytics. They're responsible for hiring, coaching, and ensuring the team ships experiments at high velocity.</p>

<h3>3. Cross-Functional Alignment</h3>
<p>Growth touches product, engineering, marketing, sales, and data. The Head of Growth is the person who aligns all of these functions around shared metrics and priorities. They spend as much time in meetings with the VP Product as they do reviewing ad performance.</p>

<h3>4. Experimentation at Scale</h3>
<p>The best Heads of Growth build experimentation systems, not just experiments. They create processes for hypothesis generation, prioritization (ICE/RICE), execution, and learning distribution so the team can run 20+ experiments per quarter.</p>

<h2>Required Skills</h2>

<ul>
<li><strong>T-shaped expertise:</strong> Deep in one channel (paid, SEO, product) + broad across all growth levers</li>
<li><strong>Data fluency:</strong> SQL, dashboard building, statistical significance — not just reading charts</li>
<li><strong>Leadership:</strong> Managing ICs, influencing executives, and building culture</li>
<li><strong>Strategic thinking:</strong> Knowing when to double down and when to kill a channel</li>
<li><strong>Technical literacy:</strong> Understanding product development well enough to scope experiments with engineers</li>
</ul>

<h2>Salary Ranges (2026)</h2>

<ul>
<li><strong>US (startup):</strong> $140K-$200K base + equity</li>
<li><strong>US (scale-up):</strong> $180K-$280K base + equity</li>
<li><strong>France:</strong> 70K-120K EUR base + BSPCE</li>
<li><strong>Remote (global):</strong> $120K-$220K depending on company location</li>
</ul>

<h2>Career Path to Head of Growth</h2>

<ol>
<li><strong>Years 1-3:</strong> Individual contributor in growth marketing, performance marketing, or product</li>
<li><strong>Years 3-5:</strong> Senior growth role, owning a channel or segment end-to-end</li>
<li><strong>Years 5-8:</strong> Growth lead or senior manager, building and managing a small team</li>
<li><strong>Year 8+:</strong> Head of Growth, VP Growth, or CMO track</li>
</ol>

<h2>Head of Growth vs Related Roles</h2>

<ul>
<li><strong>vs VP Marketing:</strong> VP Marketing is broader (brand, comms, events). HoG is more metrics-focused and experiment-driven.</li>
<li><strong>vs Growth Marketing Manager:</strong> GMM executes. HoG sets strategy and manages the team.</li>
<li><strong>vs CMO:</strong> CMO is C-suite with board-level responsibilities. HoG typically reports to CEO or CMO.</li>
</ul>

<h2>Key Takeaways</h2>

<ol>
<li><strong>The role is defined by the company, not the title.</strong> Always ask about scope, team size, and reporting line during interviews.</li>
<li><strong>You need both depth and breadth.</strong> Master one channel, then broaden your skills across the full funnel.</li>
<li><strong>Leadership is non-negotiable.</strong> At this level, your impact comes through your team, not your hands on keyboard.</li>
<li><strong>The best HoGs are systems thinkers.</strong> They build processes and frameworks, not just campaigns.</li>
</ol>

<p><em>Data sourced from 50+ Head of Growth listings on Growth.Talent and interviews with growth leaders across the US and France.</em></p>`,
  },

  "growth-marketing-salary-guide": {
    slug: "growth-marketing-salary-guide",
    title: "Growth Marketing Salary Guide 2026",
    metaTitle: "Growth Marketing Salary Guide 2026: Complete Breakdown by Role & City",
    metaDescription: "2026 salary ranges for every growth marketing role: Head of Growth, Growth Manager, SEO, Performance Marketing, CRM, and more. US, France, and remote.",
    heroSubtitle: "What should you be earning in growth marketing? We analyzed salary data from 500+ job listings across the US, France, and LatAm to build the most comprehensive growth salary guide available.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["growth marketing salary", "head of growth salary", "marketing manager salary 2026", "growth salary guide"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    content: `<h2>Growth Marketing Salaries: The Full Picture</h2>

<p>Growth marketing salaries vary wildly based on three factors: seniority, location, and company stage. A Head of Growth at a Series B startup in San Francisco earns 3x what a Growth Manager at a seed-stage company in Paris makes. This guide breaks down every variable.</p>

<h2>US Salary Ranges by Role</h2>

<h3>Head of Growth / VP Growth</h3>
<ul>
<li><strong>Startup (Seed-Series A):</strong> $130K-$180K + 0.5-1.5% equity</li>
<li><strong>Scale-up (Series B-D):</strong> $180K-$280K + equity refresh</li>
<li><strong>Public/Late-stage:</strong> $220K-$350K+ total comp</li>
</ul>

<h3>Growth Marketing Manager</h3>
<ul>
<li><strong>Junior (0-2 years):</strong> $60K-$85K</li>
<li><strong>Mid-level (2-5 years):</strong> $85K-$130K</li>
<li><strong>Senior (5-8 years):</strong> $130K-$180K</li>
</ul>

<h3>Performance Marketing Manager</h3>
<ul>
<li><strong>Junior:</strong> $55K-$80K</li>
<li><strong>Mid:</strong> $80K-$120K</li>
<li><strong>Senior:</strong> $120K-$170K</li>
</ul>

<h3>SEO Manager</h3>
<ul>
<li><strong>Junior:</strong> $50K-$75K</li>
<li><strong>Mid:</strong> $75K-$110K</li>
<li><strong>Senior/Head of SEO:</strong> $110K-$160K</li>
</ul>

<h3>Product Marketing Manager</h3>
<ul>
<li><strong>Junior:</strong> $70K-$95K</li>
<li><strong>Mid:</strong> $95K-$140K</li>
<li><strong>Senior/Group PMM:</strong> $140K-$200K</li>
</ul>

<h3>CRM / Lifecycle Manager</h3>
<ul>
<li><strong>Junior:</strong> $55K-$75K</li>
<li><strong>Mid:</strong> $75K-$110K</li>
<li><strong>Senior:</strong> $110K-$155K</li>
</ul>

<h3>Social Media Manager</h3>
<ul>
<li><strong>Junior:</strong> $40K-$60K</li>
<li><strong>Mid:</strong> $60K-$90K</li>
<li><strong>Senior/Head:</strong> $90K-$140K</li>
</ul>

<h2>France Salary Ranges (EUR)</h2>

<h3>Head of Growth</h3>
<ul>
<li><strong>Startup:</strong> 60K-90K + BSPCE</li>
<li><strong>Scale-up:</strong> 80K-120K + BSPCE</li>
</ul>

<h3>Growth Manager</h3>
<ul>
<li><strong>Junior (0-2 ans):</strong> 35K-45K</li>
<li><strong>Confirme (2-5 ans):</strong> 45K-65K</li>
<li><strong>Senior (5+ ans):</strong> 65K-90K</li>
</ul>

<h3>Other Roles (France)</h3>
<ul>
<li><strong>SEO Manager:</strong> 38K-65K</li>
<li><strong>Performance Marketing:</strong> 40K-70K</li>
<li><strong>CRM Manager:</strong> 38K-60K</li>
<li><strong>Content Marketing:</strong> 35K-55K</li>
<li><strong>Social Media Manager:</strong> 30K-48K</li>
</ul>

<h2>Salary by City</h2>

<ul>
<li><strong>San Francisco:</strong> +20-30% above national US average</li>
<li><strong>New York:</strong> +15-25% above national average</li>
<li><strong>Austin/Miami:</strong> At or slightly above national average</li>
<li><strong>Paris:</strong> +10-20% above French national average</li>
<li><strong>Lyon/Bordeaux:</strong> At French national average</li>
<li><strong>Remote (US company):</strong> -10% from HQ city, but varies widely</li>
</ul>

<h2>Equity & Variable Compensation</h2>

<p>At startups, equity can represent 20-50% of total compensation. Key things to evaluate:</p>

<ul>
<li><strong>BSPCE (France):</strong> Tax-advantaged stock options. Standard for French startups. Typically 0.1-1% for growth roles.</li>
<li><strong>ISO/NSO (US):</strong> Stock options with different tax treatments. Ask about strike price, vesting schedule (typically 4 years with 1-year cliff), and 409A valuation.</li>
<li><strong>RSUs (public/late-stage):</strong> Restricted stock units. More predictable value than options.</li>
</ul>

<h2>How to Negotiate Your Growth Salary</h2>

<ol>
<li><strong>Know the market.</strong> Use this guide, Levels.fyi, and Growth.Talent salary data to benchmark.</li>
<li><strong>Lead with impact, not tenure.</strong> "I grew pipeline by 3x" beats "I have 5 years of experience."</li>
<li><strong>Negotiate equity separately.</strong> Many companies have fixed salary bands but flexibility on equity.</li>
<li><strong>Consider total comp.</strong> A lower salary with strong equity at a rocketship can be worth 10x more than a higher salary at a slow-growth company.</li>
</ol>

<p><em>Salary data sourced from 500+ job listings on Growth.Talent, cross-referenced with Glassdoor and Levels.fyi data. Updated April 2026.</em></p>`,
  },

  "growth-marketing-interview-questions": {
    slug: "growth-marketing-interview-questions",
    title: "Growth Marketing Interview Questions: 30 Questions You'll Actually Get Asked",
    metaTitle: "Growth Marketing Interview Questions: 30 Real Questions & Answers (2026)",
    metaDescription: "Prepare for your growth marketing interview with 30 real questions asked at top startups. Covers strategy, analytics, channels, case studies, and culture fit.",
    heroSubtitle: "Forget generic interview prep. These are the actual questions growth hiring managers ask — sourced from 20+ growth leaders and hundreds of interviews at startups like Spendesk, Miro, and Amplitude.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["growth marketing interview questions", "growth interview preparation", "head of growth interview", "marketing interview questions"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    content: `<h2>Strategy & Thinking Questions</h2>

<h3>1. "How would you grow this product from 1K to 10K users?"</h3>
<p><strong>What they're testing:</strong> Your ability to think from first principles, not recite playbooks. Start with understanding the product, the ICP, and the current channels. Then propose a 90-day plan with specific experiments.</p>

<h3>2. "What's your framework for prioritizing growth experiments?"</h3>
<p><strong>What they're testing:</strong> Process thinking. Mention ICE or RICE scoring, but also explain how you balance quick wins vs strategic bets. The best answer includes how you handle experiments that fail.</p>

<h3>3. "Tell me about a time you killed a channel that was working."</h3>
<p><strong>What they're testing:</strong> Strategic discipline. Growth isn't just about adding channels — it's about knowing when to cut one that's delivering diminishing returns to free up resources for higher-potential bets.</p>

<h3>4. "How do you think about PLG vs sales-led growth?"</h3>
<p><strong>What they're testing:</strong> Whether you understand growth strategy beyond tactics. Reference the product's complexity, buyer vs user dynamics, and contract size. There's no universal right answer.</p>

<h3>5. "What metrics would you track on day one at this company?"</h3>
<p><strong>What they're testing:</strong> Business acumen. Don't list 20 metrics. Pick 3-5 that matter for the company's stage and model. Explain why each one matters and how they connect to revenue.</p>

<h2>Analytics & Data Questions</h2>

<h3>6. "Walk me through how you'd set up attribution for a multi-channel campaign."</h3>
<p><strong>Good answer:</strong> Explain the tradeoffs between first-touch, last-touch, and multi-touch attribution. Mention UTM conventions, pixel setup, and the reality that perfect attribution doesn't exist — you're building a useful model, not finding truth.</p>

<h3>7. "This A/B test shows a 5% lift with p=0.08. What do you do?"</h3>
<p><strong>What they're testing:</strong> Statistical literacy. p=0.08 isn't significant at the standard 0.05 threshold. But context matters — is this a high-impact change? Can you extend the test? Is the sample size sufficient? Don't dogmatically follow rules.</p>

<h3>8. "How do you measure the ROI of content marketing?"</h3>
<p><strong>Good answer:</strong> Organic traffic growth, first-touch attribution from content to signups/demos, keyword ranking improvements, and backlinks. Be honest that content ROI is harder to measure than paid — and explain why it's still worth investing in.</p>

<h3>9. "What's your SQL proficiency? Write a query to find the top 10 users by revenue."</h3>
<p><strong>Be ready:</strong> Many growth roles require SQL. Practice basic queries: GROUP BY, JOINs, window functions, and cohort analysis queries. You don't need to be a data engineer, but you should be able to answer your own questions without filing a ticket.</p>

<h2>Channel-Specific Questions</h2>

<h3>10. "What would you do with a $50K/month paid media budget?"</h3>
<p><strong>Good answer:</strong> Start with channel allocation based on the ICP (B2B → LinkedIn + Google; B2C → Meta + TikTok). Mention testing budgets (10-20%), creative testing cadence, and how you'd measure ROAS vs CPA vs LTV.</p>

<h3>11. "How would you improve our onboarding flow?"</h3>
<p><strong>What they're testing:</strong> Product thinking. Ask about current metrics (activation rate, time-to-value). Propose specific changes you'd test, not a complete redesign. Growth is incremental, not revolutionary.</p>

<h3>12. "What's your experience with lifecycle/email marketing?"</h3>
<p><strong>Good answer:</strong> Reference specific tools (Braze, Customer.io, Klaviyo), metrics (open rate, CTR, conversion), and strategic concepts (segmentation, behavioral triggers, re-engagement sequences). Show you think about the full customer journey.</p>

<h2>Case Study Questions</h2>

<h3>13. "Here's our funnel data. Where's the biggest opportunity?"</h3>
<p><strong>Tip:</strong> Look for the biggest absolute drop-off, not the biggest percentage drop. A 50% drop from 100 users is less impactful than a 10% drop from 10,000 users. Always size the opportunity before proposing solutions.</p>

<h3>14. "Design a referral program for our product."</h3>
<p><strong>Good answer:</strong> Start with why someone would refer (incentive structure). Define the mechanics (one-sided vs two-sided rewards). Propose specific experiments to test. Reference successful referral programs in similar verticals.</p>

<h2>Culture & Fit Questions</h2>

<h3>15. "How do you handle disagreements with the product team?"</h3>
<p><strong>What they're testing:</strong> Collaboration. Growth often conflicts with product priorities. Show you can influence without authority, use data to make your case, and ultimately accept decisions you disagree with while maintaining the relationship.</p>

<h2>Questions YOU Should Ask</h2>

<ol>
<li>"What does the growth team own vs what does marketing/product own?"</li>
<li>"What's the current experiment velocity — how many experiments per quarter?"</li>
<li>"What's the biggest growth challenge you haven't been able to solve?"</li>
<li>"Who does this role report to, and how is growth measured at the leadership level?"</li>
<li>"What's the data infrastructure like? Can I run my own queries?"</li>
</ol>

<p><em>Questions sourced from growth hiring managers at 20+ startups and scale-ups. Updated for 2026 market.</em></p>`,
  },

  "how-to-become-growth-marketer": {
    slug: "how-to-become-growth-marketer",
    title: "How to Become a Growth Marketer: The Complete Career Guide",
    metaTitle: "How to Become a Growth Marketer: Career Path, Skills & First Steps (2026)",
    metaDescription: "Step-by-step guide to breaking into growth marketing. Skills to learn, tools to master, portfolio projects to build, and how to land your first growth role.",
    heroSubtitle: "Growth marketing is one of the most in-demand career paths in tech — but there's no university degree for it. Here's the practical guide to building the skills, experience, and portfolio you need to land your first (or next) growth role.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["how to become growth marketer", "growth marketing career", "growth marketing skills", "break into growth marketing"],
    author: "Growth.Talent",
    publishedDate: "2026-04-05",
    content: `<h2>What Growth Marketing Actually Is</h2>

<p>Growth marketing is the practice of using data-driven experimentation to drive user acquisition, activation, retention, and revenue. It sits at the intersection of marketing, product, and data — borrowing tools and techniques from all three.</p>

<p>Unlike traditional marketing (which focuses on awareness and brand), growth marketing is accountable to metrics. Every campaign, every experiment, every dollar spent is measured against its impact on the business.</p>

<h2>The Skills You Need</h2>

<h3>Tier 1: Must-Have (learn first)</h3>
<ul>
<li><strong>Analytics:</strong> Google Analytics, Amplitude or Mixpanel. You need to be able to set up tracking, build dashboards, and interpret data.</li>
<li><strong>SQL:</strong> Basic queries — SELECT, WHERE, GROUP BY, JOIN. This lets you answer your own questions without waiting for a data team.</li>
<li><strong>One paid channel:</strong> Get deep in Google Ads OR Meta Ads. Run real campaigns, even with $100 of your own money. Theory without practice is worthless.</li>
<li><strong>Copywriting:</strong> Writing ads, emails, and landing pages. Growth marketers who can write have a massive advantage.</li>
</ul>

<h3>Tier 2: Differentiators (learn next)</h3>
<ul>
<li><strong>Marketing automation:</strong> HubSpot, Customer.io, or Braze. Set up email sequences, lead scoring, and behavioral triggers.</li>
<li><strong>A/B testing:</strong> Understand statistical significance, sample sizes, and experiment design. Use tools like Statsig or LaunchDarkly.</li>
<li><strong>SEO basics:</strong> Keyword research, on-page optimization, content strategy. Even if SEO isn't your specialty, understanding it makes you a better generalist.</li>
<li><strong>Basic HTML/CSS:</strong> Enough to modify landing pages, set up tracking pixels, and debug email templates.</li>
</ul>

<h3>Tier 3: Advanced (learn on the job)</h3>
<ul>
<li><strong>Product analytics:</strong> Funnel analysis, cohort analysis, retention curves</li>
<li><strong>Python/R:</strong> For advanced analysis, data manipulation, and automation</li>
<li><strong>Growth modeling:</strong> Building financial models that connect marketing inputs to revenue outputs</li>
</ul>

<h2>Building Your Portfolio (Without a Job)</h2>

<p>The biggest challenge for aspiring growth marketers: you need experience to get hired, but you need a job to get experience. Here's how to break the cycle:</p>

<ol>
<li><strong>Run your own experiments.</strong> Start a blog, a newsletter, or a side project. Apply growth tactics to your own thing and document the results.</li>
<li><strong>Volunteer for a startup.</strong> Early-stage startups need help and can't afford agencies. Offer to run their Google Ads for 3 months in exchange for a case study.</li>
<li><strong>Get certified.</strong> Google Ads certification, HubSpot Academy, Reforge membership. These signal commitment, not expertise — but they open doors.</li>
<li><strong>Write about growth.</strong> Publish analyses of growth strategies you admire. "How [Company] grew from 0 to 10K users" posts demonstrate thinking, not just execution.</li>
</ol>

<h2>Landing Your First Growth Role</h2>

<h3>Where to Look</h3>
<ul>
<li><strong>Growth.Talent:</strong> Curated growth roles with real salaries</li>
<li><strong>Wellfound:</strong> Startup-focused, strong growth marketing section</li>
<li><strong>LinkedIn:</strong> Search "growth marketing" + your city. Set alerts.</li>
<li><strong>Company career pages:</strong> Target companies you admire — they often post roles before they hit job boards</li>
</ul>

<h3>The Application That Gets Noticed</h3>
<p>Don't send a generic resume. Instead:</p>
<ol>
<li>Research the company's current growth strategy (what channels are they using?)</li>
<li>Identify one specific opportunity they're missing</li>
<li>Write a 1-page "growth audit" with 3 actionable recommendations</li>
<li>Send it directly to the hiring manager on LinkedIn</li>
</ol>

<p>This approach takes 2 hours per application but converts 10x better than spray-and-pray.</p>

<h2>Key Takeaways</h2>

<ol>
<li><strong>Start with analytics and one paid channel.</strong> Everything else builds on this foundation.</li>
<li><strong>Build a portfolio through side projects and volunteering.</strong> Experience beats credentials.</li>
<li><strong>Write about growth.</strong> It demonstrates thinking, builds your network, and attracts opportunities.</li>
<li><strong>Apply with a growth audit, not a resume.</strong> Show what you can do, not what you've done.</li>
</ol>

<p><em>Career advice sourced from growth leaders and hiring managers across the Growth.Talent community.</em></p>`,
  },
};

export const GUIDE_SLUGS = Object.keys(GUIDE_PAGES);

export function getAllGuideSlugs(): string[] {
  return GUIDE_SLUGS;
}
