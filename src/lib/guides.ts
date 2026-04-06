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
};

export const GUIDE_SLUGS = Object.keys(GUIDE_PAGES);

export function getAllGuideSlugs(): string[] {
  return GUIDE_SLUGS;
}
