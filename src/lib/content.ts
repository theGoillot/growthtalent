export interface ContentPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  content: string;
  relatedCategory: string;
  targetKeywords: string[];
}

export const CONTENT_PAGES: Record<string, ContentPage> = {
  "fiche-metier-growth-operations": {
    slug: "fiche-metier-growth-operations",
    title: "Growth Operations : fiche metier",
    metaTitle: "Growth Operations : fiche metier, salaire, competences (2026)",
    metaDescription:
      "Tout savoir sur le metier de Growth Ops : missions, competences, salaire en France, outils et evolution de carriere. Le guide complet pour devenir Growth Operator.",
    heroSubtitle:
      "Le Growth Ops est le cerveau operationnel d'une equipe growth. C'est la personne qui connecte les outils, automatise les process et transforme la data en decisions. Sans lui, le growth reste du bricolage.",
    relatedCategory: "marketing-ops",
    targetKeywords: ["growth operator", "growth ops", "growth operations"],
    content: `<h2>C'est quoi un Growth Ops, concretement ?</h2>
<p>Le Growth Operator, c'est celui ou celle qui fait tourner la machine growth. Pas en lancant des campagnes ou en ecrivant du contenu — mais en construisant l'infrastructure qui permet a toute l'equipe d'aller plus vite.</p>
<p>Tu geres le CRM, tu branches les outils entre eux, tu automatises les workflows, tu nettoies la data. Quand un Sales dit "je perds 2h par jour a faire du reporting", c'est toi qui fixes ca.</p>

<h2>Les missions principales</h2>
<ul>
<li><strong>Stack technique :</strong> choix, implementation et maintenance des outils (CRM, enrichment, automation, analytics)</li>
<li><strong>Automatisation :</strong> creer des workflows qui eliminent les taches manuelles repetitives</li>
<li><strong>Data quality :</strong> s'assurer que la donnee dans le CRM est propre, structuree et exploitable</li>
<li><strong>Reporting :</strong> construire les dashboards et metriques qui aident l'equipe a prendre des decisions</li>
<li><strong>Process :</strong> documenter et optimiser les process entre marketing, sales et product</li>
</ul>

<h2>Les competences cles</h2>
<p>Un bon Growth Ops maitrise un mix technique et business assez rare :</p>
<ul>
<li>CRM avance (HubSpot, Salesforce) — pas juste l'utiliser, le configurer</li>
<li>Automation (Zapier, Make, n8n) et APIs</li>
<li>SQL pour aller chercher la data directement</li>
<li>Un peu de code (Python ou JavaScript) pour les cas limites</li>
<li>Sens business : comprendre pourquoi on automatise, pas juste comment</li>
</ul>

<h2>Salaire d'un Growth Ops en France (2025-2026)</h2>
<h3>En fixe brut annuel</h3>
<ul>
<li><strong>Junior (0-2 ans) :</strong> 35K - 45K euros</li>
<li><strong>Confirme (2-5 ans) :</strong> 50K - 70K euros</li>
<li><strong>Senior (5+ ans) :</strong> 65K - 85K euros</li>
<li><strong>Lead / Head of Growth Ops :</strong> 75K - 100K euros</li>
</ul>
<p>En startup, ajoute de l'equity (BSPCE) qui peut representer 10 a 30% du package total.</p>

<h2>Evolution de carriere</h2>
<p>Le Growth Ops peut evoluer dans plusieurs directions :</p>
<ul>
<li><strong>Head of Growth Ops</strong> — tu manages une equipe et tu definis la strategie outillage</li>
<li><strong>Head of RevOps</strong> — tu elargis ton scope a tout le revenue (marketing + sales + CS)</li>
<li><strong>Head of Growth</strong> — si tu combines tes skills ops avec de la strategie acquisition</li>
<li><strong>CTO/CPO en startup early-stage</strong> — ton profil technique + business est precieux</li>
</ul>
<p>C'est un des roles les plus demandes en 2026. Les entreprises ont compris que sans ops solides, la croissance stagne.</p>`,
  },

  "fiche-metier-growth-outbound": {
    slug: "fiche-metier-growth-outbound",
    title: "Growth Outbound : fiche metier",
    metaTitle: "Growth Outbound : fiche metier, salaire et competences (2026)",
    metaDescription:
      "Le guide du metier Growth Outbound : missions, outils, salaire en France et parcours. Comment devenir Outbound Manager et generer du pipeline B2B.",
    heroSubtitle:
      "Le Growth Outbound est la personne qui va chercher les clients au lieu d'attendre qu'ils viennent. Cold email, LinkedIn, sequences automatisees — c'est le moteur de la prospection B2B.",
    relatedCategory: "demand-generation",
    targetKeywords: ["growth outbound", "outbound manager"],
    content: `<h2>Le role du Growth Outbound</h2>
<p>En B2B, attendre que les leads tombent du ciel ne suffit pas. Le Growth Outbound construit des sequences de prospection qui generent du pipeline de maniere previsible et scalable.</p>
<p>Tu identifies les bons comptes, tu trouves les bons contacts, tu rediges des messages qui accrochent, et tu optimises chaque etape du funnel outbound.</p>

<h2>Missions quotidiennes</h2>
<ul>
<li><strong>Ciblage :</strong> definir les ICP (Ideal Customer Profile) et construire des listes de prospects qualifies</li>
<li><strong>Sequences :</strong> creer et optimiser des campagnes multicanal (email, LinkedIn, telephone)</li>
<li><strong>Copywriting :</strong> rediger des cold emails qui se demarquent dans une inbox saturee</li>
<li><strong>A/B testing :</strong> tester les objets, les accroches, les CTA, les timings</li>
<li><strong>Enrichment :</strong> utiliser des outils pour completer les donnees de contact (email, telephone, poste)</li>
<li><strong>Reporting :</strong> suivre les metriques — open rate, reply rate, meeting booked rate</li>
</ul>

<h2>La stack outbound typique</h2>
<p>Un bon Growth Outbound connait ces outils :</p>
<ul>
<li>Sequencing : Lemlist, La Growth Machine, Apollo, Outreach</li>
<li>Enrichment : Dropcontact, Kaspr, Lusha, Apollo</li>
<li>LinkedIn : Sales Navigator + extension d'automatisation</li>
<li>CRM : HubSpot ou Salesforce pour tracker le pipeline</li>
<li>Deliverabilite : Mailreach, Warmup Inbox</li>
</ul>

<h2>Salaire en France (2025-2026)</h2>
<ul>
<li><strong>Junior (0-2 ans) :</strong> 35K - 42K euros + variable</li>
<li><strong>Outbound Manager (2-4 ans) :</strong> 45K - 60K euros + variable</li>
<li><strong>Senior / Lead (5+ ans) :</strong> 60K - 80K euros + variable</li>
</ul>
<p>Le variable peut aller de 10 a 30% du fixe selon la structure. En startup, tu auras souvent des BSPCE en plus.</p>

<h2>Parcours et evolution</h2>
<p>Beaucoup de Growth Outbound viennent du SDR/BDR. C'est un passage logique : tu passes de l'execution a la strategie.</p>
<p>Apres, tu peux evoluer vers :</p>
<ul>
<li><strong>Head of Demand Gen</strong> — tu pilotes toute la generation de pipeline</li>
<li><strong>Head of Growth</strong> — si tu combines inbound + outbound + product-led</li>
<li><strong>VP Sales</strong> — si tu te rapproches du closing</li>
</ul>
<p>Le marche est tendu sur ce profil. Les boites B2B cherchent toutes des gens capables de construire une machine outbound qui tourne.</p>`,
  },

  "fiche-metier-head-of-growth": {
    slug: "fiche-metier-head-of-growth",
    title: "Head of Growth : fiche metier",
    metaTitle: "Head of Growth : fiche metier, salaire et missions (2026)",
    metaDescription:
      "Devenir Head of Growth en 2026 : missions, salaire (75K-120K euros), competences et parcours. Le guide pour comprendre ce role strategique en startup et scale-up.",
    heroSubtitle:
      "Le Head of Growth est responsable de la croissance. Pas juste du marketing, pas juste de l'acquisition — de la croissance totale, du premier contact jusqu'a la retention.",
    relatedCategory: "head-of-growth",
    targetKeywords: ["head of growth", "head of growth salaire"],
    content: `<h2>Qu'est-ce qu'un Head of Growth ?</h2>
<p>Le Head of Growth a un scope large : acquisition, activation, retention, monetisation. C'est la personne qui regarde le funnel dans son ensemble et decide ou mettre l'energie pour avoir le plus d'impact.</p>
<p>Ce n'est pas un role de marketing classique. Tu touches au produit, a la data, au sales, au pricing. Tu as une vision transversale et tu prends des decisions basees sur les chiffres, pas sur l'intuition.</p>

<h2>Les missions</h2>
<ul>
<li><strong>Strategie d'acquisition :</strong> definir et executer les canaux de croissance (paid, organic, outbound, partnerships)</li>
<li><strong>Experimentation :</strong> mettre en place une culture du test — hypothese, test, mesure, iteration</li>
<li><strong>Funnel optimization :</strong> identifier les goulots d'etranglement et les corriger</li>
<li><strong>Product-led growth :</strong> travailler avec le produit pour integrer des mecaniques virales ou de retention</li>
<li><strong>Management :</strong> recruter et gerer une equipe growth (ops, outbound, content, paid)</li>
<li><strong>Budget :</strong> gerer le budget acquisition et maximiser le ROI</li>
</ul>

<h2>Salaire d'un Head of Growth en France</h2>
<p>C'est un des postes les mieux payes du growth. Voici les fourchettes 2025-2026 :</p>
<ul>
<li><strong>Head of Growth junior (premier poste) :</strong> 75K - 90K euros</li>
<li><strong>Head of Growth confirme :</strong> 90K - 120K euros</li>
<li><strong>VP Growth / CMO :</strong> 100K - 150K+ euros</li>
</ul>
<p>En startup Series A/B, ajoute des BSPCE qui peuvent valoir 50K a 200K+ sur 4 ans si la boite performe. Le package total est souvent bien au-dessus du fixe.</p>

<h2>Competences requises</h2>
<ul>
<li>Vision strategique : voir le big picture et prioriser</li>
<li>Data : etre a l'aise avec les chiffres, SQL, analytics</li>
<li>Execution : savoir passer de la strategie a l'action rapidement</li>
<li>Management : recruter, coacher, garder une equipe motivee</li>
<li>Technique : comprendre assez de tech pour dialoguer avec les devs et les ops</li>
</ul>

<h2>Comment devenir Head of Growth ?</h2>
<p>Il n'y a pas un seul chemin. Les profils qui arrivent a ce poste viennent souvent de :</p>
<ul>
<li>Growth Manager qui a scale une equipe</li>
<li>Product Manager avec un ADN acquisition</li>
<li>Consultant en strat qui a rejoint une startup</li>
</ul>
<p>Le point commun : une obsession pour les resultats mesurables et une capacite a toucher a tout sans se disperser.</p>`,
  },

  "fiche-metier-product-growth-manager": {
    slug: "fiche-metier-product-growth-manager",
    title: "Product Growth Manager : fiche metier",
    metaTitle: "Product Growth Manager : fiche metier, salaire et missions (2026)",
    metaDescription:
      "Le guide complet du Product Growth Manager : a l'intersection du produit et du growth. Missions, competences, salaire en France et parcours de carriere.",
    heroSubtitle:
      "Le Product Growth Manager vit entre le produit et le growth. Il utilise le produit comme levier de croissance — onboarding, activation, retention, viralite. C'est le role qui fait la difference entre une bonne app et une app qui explose.",
    relatedCategory: "product-marketing",
    targetKeywords: ["product growth manager", "product growth"],
    content: `<h2>Product Growth Manager : le role</h2>
<p>Ce role est ne dans la Silicon Valley quand les boites SaaS ont realise que le marketing seul ne suffisait pas. La croissance passe par le produit. Le Product Growth Manager est la personne qui fait le pont entre les deux mondes.</p>
<p>Tu ne fais pas de la pub, tu ne fais pas de l'outbound. Tu travailles sur le produit pour que les utilisateurs restent, invitent leurs collegues et upgradent leur plan.</p>

<h2>Missions principales</h2>
<ul>
<li><strong>Onboarding :</strong> optimiser les premiers instants de l'experience pour amener l'utilisateur au "aha moment"</li>
<li><strong>Activation :</strong> transformer un inscrit en utilisateur actif</li>
<li><strong>Retention :</strong> reduire le churn en identifiant les signaux de desengagement</li>
<li><strong>Monetisation :</strong> optimiser les paywalls, le pricing, les upsells dans le produit</li>
<li><strong>Viralite :</strong> creer des boucles de partage naturelles (referral, invite, collaboration)</li>
<li><strong>Experimentation :</strong> A/B tests dans le produit, feature flags, cohortes</li>
</ul>

<h2>Competences cles</h2>
<ul>
<li>Forte culture produit — tu sais penser UX et user journey</li>
<li>Data analytics — Amplitude, Mixpanel, SQL sont tes outils quotidiens</li>
<li>Experimentation — tu maitrises les methodes statistiques des A/B tests</li>
<li>Collaboration — tu bosses avec les PMs, les devs, les designers au quotidien</li>
<li>Business acumen — tu comprends les metriques SaaS (MRR, LTV, churn, NRR)</li>
</ul>

<h2>Salaire en France (2025-2026)</h2>
<ul>
<li><strong>Junior (0-2 ans) :</strong> 40K - 50K euros</li>
<li><strong>Confirme (3-5 ans) :</strong> 55K - 75K euros</li>
<li><strong>Senior / Lead :</strong> 70K - 95K euros</li>
</ul>
<p>Ce role est plus courant dans les scale-ups (Series B+) qui ont deja un produit avec du volume. En early-stage, c'est souvent le Head of Growth qui porte cette casquette.</p>

<h2>Evolution</h2>
<p>Le Product Growth Manager peut evoluer vers :</p>
<ul>
<li><strong>Head of Growth</strong> — avec un ADN product-led</li>
<li><strong>Director of Product</strong> — si tu te rapproches du produit pur</li>
<li><strong>VP Growth</strong> — dans les grosses scale-ups</li>
</ul>
<p>C'est un profil rare et recherche. Si tu combines une vraie sensibilite produit avec de la rigueur data, tu es en or.</p>`,
  },

  "fiche-metier-demand-generation": {
    slug: "fiche-metier-demand-generation",
    title: "Demand Generation Manager : fiche metier",
    metaTitle: "Demand Generation Manager : fiche metier et salaire (2026)",
    metaDescription:
      "Le guide du Demand Generation Manager : missions, competences, salaire et outils. Comment generer de la demande qualifiee en B2B SaaS.",
    heroSubtitle:
      "Le Demand Generation Manager cree de la demande qualifiee pour l'equipe commerciale. Son obsession : generer du pipeline de qualite, pas juste des leads au kilo.",
    relatedCategory: "demand-generation",
    targetKeywords: ["demand generation manager"],
    content: `<h2>Demand Generation : c'est quoi ?</h2>
<p>La demand gen, c'est l'art de creer de la demande pour un produit B2B. Pas juste capter des leads — creer un interet reel chez les bons prospects avant meme qu'ils soient en phase d'achat.</p>
<p>C'est different du lead gen old school. Tu ne chasses pas les MQL bidons avec des ebooks. Tu construis une machine qui attire des prospects qualifies et les amene naturellement vers ton produit.</p>

<h2>Les missions du Demand Gen Manager</h2>
<ul>
<li><strong>Strategie :</strong> definir les canaux et les campagnes pour alimenter le pipeline</li>
<li><strong>Paid acquisition :</strong> gerer les campagnes LinkedIn Ads, Google Ads, Meta Ads avec un objectif de CAC</li>
<li><strong>Content marketing :</strong> piloter la creation de contenu qui eduque et attire (webinars, guides, podcasts)</li>
<li><strong>ABM :</strong> orchestrer des campagnes ciblees sur les comptes strategiques</li>
<li><strong>Nurturing :</strong> construire des sequences qui gardent les prospects engages jusqu'au moment d'achat</li>
<li><strong>Attribution :</strong> mesurer l'impact de chaque canal et optimiser le mix</li>
</ul>

<h2>Stack et outils</h2>
<ul>
<li>Marketing automation : HubSpot, Marketo, Brevo</li>
<li>Paid : LinkedIn Campaign Manager, Google Ads, Meta Business Suite</li>
<li>Intent data : Bombora, 6sense, Clearbit</li>
<li>Analytics : Google Analytics, Looker, Metabase</li>
<li>ABM : Terminus, Demandbase</li>
</ul>

<h2>Salaire en France (2025-2026)</h2>
<ul>
<li><strong>Junior Demand Gen (0-2 ans) :</strong> 38K - 48K euros</li>
<li><strong>Demand Gen Manager (3-5 ans) :</strong> 55K - 70K euros</li>
<li><strong>Senior / Head of Demand Gen :</strong> 70K - 95K euros</li>
</ul>

<h2>Profil et parcours</h2>
<p>Les Demand Gen Managers viennent souvent du paid acquisition ou du content marketing B2B. Ce qui les distingue : ils comprennent tout le funnel, pas juste leur canal.</p>
<p>C'est un role strategique. Tu es le lien entre le marketing, les sales et la finance. Si le pipeline est en dessous de l'objectif, c'est toi qui sonnes l'alarme et trouves des solutions.</p>
<p>Evolution naturelle : Head of Marketing, VP Marketing, ou CMO dans une boite B2B.</p>`,
  },

  "fiche-metier-growth-inbound": {
    slug: "fiche-metier-growth-inbound",
    title: "Growth Inbound : fiche metier",
    metaTitle: "Growth Inbound : fiche metier, salaire et competences (2026)",
    metaDescription:
      "Le guide du Growth Inbound : comment attirer des prospects grace au contenu, au SEO et au social. Missions, outils et salaire en France.",
    heroSubtitle:
      "Le Growth Inbound fait venir les clients a toi au lieu d'aller les chercher. SEO, contenu, social media, referral — tu construis un aimant a prospects qualifies.",
    relatedCategory: "content-marketing",
    targetKeywords: ["growth inbound", "inbound marketing"],
    content: `<h2>Growth Inbound : le role</h2>
<p>L'inbound, c'est la strategie qui consiste a attirer les prospects naturellement. Plutot que d'envoyer 500 cold emails, tu crees du contenu qui repond aux questions de ta cible. Quand ils sont prets a acheter, tu es deja dans leur tete.</p>
<p>Le Growth Inbound est la personne qui orchestre cette strategie. SEO, blog, newsletters, social media, webinars — tout ce qui genere du trafic qualifie et des leads sans payer par clic.</p>

<h2>Missions principales</h2>
<ul>
<li><strong>SEO :</strong> recherche de mots-cles, optimisation on-page, strategie de contenu organique</li>
<li><strong>Content :</strong> piloter la creation d'articles, guides, etudes de cas qui rankent et convertissent</li>
<li><strong>Lead capture :</strong> optimiser les landing pages, les CTAs et les formulaires</li>
<li><strong>Email marketing :</strong> newsletters, sequences de nurturing, drip campaigns</li>
<li><strong>Social media :</strong> LinkedIn, Twitter — distribuer le contenu la ou la cible est active</li>
<li><strong>Analytics :</strong> mesurer le trafic organique, les conversions, le CAC inbound</li>
</ul>

<h2>Competences</h2>
<ul>
<li>SEO technique et editorial — tu maitrises les deux</li>
<li>Copywriting — tu sais ecrire du contenu qui engage et convertit</li>
<li>Analytics — Google Search Console, GA4, Ahrefs, Semrush</li>
<li>Marketing automation — pour les sequences de nurturing</li>
<li>Un oeil design — pour les landing pages et le branding</li>
</ul>

<h2>Salaire en France (2025-2026)</h2>
<ul>
<li><strong>Junior (0-2 ans) :</strong> 35K - 43K euros</li>
<li><strong>Growth Inbound Manager (3-5 ans) :</strong> 48K - 65K euros</li>
<li><strong>Senior / Lead :</strong> 60K - 80K euros</li>
</ul>

<h2>Inbound vs Outbound</h2>
<p>Ce n'est pas une question de mieux ou moins bien. L'inbound prend du temps a decoller (6-12 mois pour le SEO) mais coute moins cher a long terme. L'outbound genere du pipeline immediatement mais ne scale pas aussi bien.</p>
<p>Les meilleures equipes growth combinent les deux. Et si tu maitrises l'inbound, tu seras toujours demande — parce que c'est le canal le plus rentable quand il tourne.</p>

<h2>Evolution</h2>
<p>Growth Inbound peut devenir Head of Content, Head of Marketing, ou Head of Growth s'il elargit son scope a l'outbound et au paid.</p>`,
  },

  "analyse-des-salaires-growth": {
    slug: "analyse-des-salaires-growth",
    title: "Salaires Growth en France : l'analyse complete",
    metaTitle: "Salaires Growth en France 2026 : grille complete par poste et seniorite",
    metaDescription:
      "Grille de salaires growth en France 2026 : Junior, Manager, Senior, Head of. Fixe, variable et equity par role. Donnees reelles du marche.",
    heroSubtitle:
      "Combien gagne un profil growth en France en 2026 ? On a compile les donnees du marche pour te donner une vision claire par poste, seniorite et type de boite.",
    relatedCategory: "head-of-growth",
    targetKeywords: ["salaire growth", "head of growth salaire"],
    content: `<h2>Grille de salaires growth en France (2026)</h2>
<p>Les salaires growth ont augmente de 10-15% en 3 ans. La raison : la demande explose, les profils competents sont rares. Voici les fourchettes reelles, pas les chiffres fantasmes des articles clickbait.</p>

<h3>Par niveau de seniorite</h3>
<ul>
<li><strong>Junior Growth (0-2 ans) :</strong> 35K - 45K euros brut/an</li>
<li><strong>Growth Manager (2-5 ans) :</strong> 50K - 70K euros</li>
<li><strong>Senior Growth (5-8 ans) :</strong> 65K - 85K euros</li>
<li><strong>Head of Growth (8+ ans) :</strong> 75K - 120K euros</li>
<li><strong>VP Growth / CMO :</strong> 100K - 150K+ euros</li>
</ul>

<h3>Par specialite</h3>
<ul>
<li><strong>Growth Ops :</strong> +5-10% vs un Growth Manager generaliste (le marche manque d'ops)</li>
<li><strong>Growth Outbound :</strong> salaire + variable (10-30% du fixe lie au pipeline genere)</li>
<li><strong>Product Growth :</strong> aligne sur les salaires Product Manager, souvent +5%</li>
<li><strong>Demand Gen :</strong> dans la fourchette standard, avec variable lie au pipeline</li>
</ul>

<h2>Startup vs Scale-up vs Grand groupe</h2>
<ul>
<li><strong>Startup (Seed-Series A) :</strong> fixe -10 a -20% vs marche MAIS equity significative (0.1% a 1%)</li>
<li><strong>Scale-up (Series B+) :</strong> meilleurs packages totaux — fixe marche + equity qui a de la valeur</li>
<li><strong>Grand groupe :</strong> fixe +10% vs marche mais pas d'equity, moins d'impact, progression plus lente</li>
</ul>

<h2>L'equity, le game-changer</h2>
<p>En startup, l'equity (BSPCE en France) peut transformer un package moyen en package exceptionnel. Un Head of Growth a 90K fixe avec 0.5% de BSPCE dans une boite qui vaut 50M, c'est 250K d'equity potentielle.</p>
<p>Le piege : l'equity ne vaut rien si la boite ne fait pas de sortie. Regarde le business model, la traction, le runway avant de negocier moins de fixe contre plus d'equity.</p>

<h2>Comment negocier ?</h2>
<ul>
<li>Connais ta valeur marche — utilise cette grille comme reference</li>
<li>Negocie le package total (fixe + variable + equity), pas juste le fixe</li>
<li>Demande le cliff et le vesting de l'equity (standard : 1 an cliff, 4 ans vesting)</li>
<li>Si la boite ne peut pas monter le fixe, negocie un signing bonus ou plus d'equity</li>
</ul>
<p>Le marche est en ta faveur. Les bons profils growth recoivent 3 a 5 offres en parallele. Ne brade pas tes competences.</p>`,
  },

  "a-quoi-sert-lequity": {
    slug: "a-quoi-sert-lequity",
    title: "A quoi sert l'equity en startup ?",
    metaTitle: "Equity en startup : BSPCE, stock options, vesting - le guide (2026)",
    metaDescription:
      "Comprendre l'equity en startup : BSPCE, stock options, vesting, cliff. Comment evaluer et negocier ses parts quand on rejoint une startup growth.",
    heroSubtitle:
      "L'equity, c'est ce qui peut transformer un salaire de 70K en un package de 300K+ si la boite reussit. Mais c'est aussi le truc le plus mal compris dans l'ecosysteme startup. On t'explique tout.",
    relatedCategory: "head-of-growth",
    targetKeywords: ["equity startup", "equity c'est quoi"],
    content: `<h2>L'equity, c'est quoi ?</h2>
<p>L'equity, c'est ta part du gateau. Quand tu rejoins une startup, on te donne le droit d'acheter des actions a un prix fixe (le strike price). Si la boite vaut 10x plus quand tu les exerces, tu captures la difference.</p>
<p>En France, le vehicule principal c'est les BSPCE (Bons de Souscription de Parts de Createur d'Entreprise). C'est un mecanisme fiscal avantageux cree specifiquement pour les startups.</p>

<h2>BSPCE vs Stock Options vs AGA</h2>
<ul>
<li><strong>BSPCE :</strong> le standard en startup francaise. Fiscalite avantageuse (flat tax 30% si tu as 3+ ans d'anciennete). Reserve aux societes de moins de 15 ans.</li>
<li><strong>Stock options :</strong> plus courant dans les grosses boites. Fiscalite moins favorable que les BSPCE.</li>
<li><strong>AGA (Actions Gratuites) :</strong> on te donne des actions directement. Souvent utilise dans les scale-ups pour les profils seniors.</li>
</ul>

<h2>Les mecaniques a connaitre</h2>
<h3>Vesting</h3>
<p>Tu ne recois pas tout d'un coup. L'equity vest (se debloque) sur une periode, generalement 4 ans. Ca veut dire : si tu pars apres 2 ans, tu gardes 50% de tes BSPCE.</p>

<h3>Cliff</h3>
<p>Le cliff, c'est la periode minimum avant de debloquer quoi que ce soit. Standard : 1 an. Si tu pars avant 1 an, tu repars avec 0 equity.</p>

<h3>Strike price</h3>
<p>Le prix auquel tu peux acheter tes actions. Plus tu arrives tot dans la boite, plus ce prix est bas — et plus ton upside est grand.</p>

<h2>Comment evaluer une offre d'equity ?</h2>
<p>Les questions a poser en entretien :</p>
<ul>
<li>Combien de BSPCE ? Quel % du capital ca represente (fully diluted) ?</li>
<li>Quel est le strike price et la derniere valorisation ?</li>
<li>Quel est le vesting schedule et le cliff ?</li>
<li>Que se passe-t-il en cas de depart (good leaver / bad leaver) ?</li>
<li>Quelle est la runway actuelle et la trajectoire de fundraise ?</li>
</ul>

<h2>L'equity pour les profils growth</h2>
<p>En tant que profil growth, tu peux negocier entre 0.05% et 1% du capital selon le stage :</p>
<ul>
<li><strong>Seed :</strong> 0.3% - 1% pour un Head of Growth</li>
<li><strong>Series A :</strong> 0.1% - 0.5%</li>
<li><strong>Series B+ :</strong> 0.05% - 0.2%</li>
</ul>
<p>Le calcul est simple : pourcentage x valorisation potentielle a la sortie. Si tu as 0.3% d'une boite qui sort a 200M euros, ca fait 600K brut. Retire les taxes et le strike price, et tu as une belle somme.</p>
<p>Attention : 90% des startups ne font pas de sortie. L'equity est un pari. Ne sacrifie jamais un fixe correct pour de l'equity dans une boite bancale.</p>`,
  },

  "zoom-sur-le-metier-de-growth-ops": {
    slug: "zoom-sur-le-metier-de-growth-ops",
    title: "Zoom sur le metier de Growth Ops",
    metaTitle: "Growth Ops en 2026 : role, outils, journee type et conseils",
    metaDescription:
      "Deep dive dans le quotidien d'un Growth Ops : journee type, outils, defis et conseils pratiques. Tout ce que la fiche metier ne te dit pas.",
    heroSubtitle:
      "La fiche metier te dit quoi. Ici, on te dit comment. A quoi ressemble vraiment la vie d'un Growth Ops, les galeres quotidiennes, les outils et les reflexes qui font la difference.",
    relatedCategory: "marketing-ops",
    targetKeywords: ["growth ops", "growth operations"],
    content: `<h2>La journee type d'un Growth Ops</h2>
<p>Oublie les descriptions de poste generiques. Voici a quoi ressemble une vraie journee :</p>
<ul>
<li><strong>9h :</strong> check des dashboards — les campagnes de la nuit ont-elles tourne ? Des erreurs dans les workflows ?</li>
<li><strong>10h :</strong> standup avec l'equipe growth — les Outbound ont un probleme de deliverabilite, tu investigues</li>
<li><strong>11h :</strong> un Sales te demande un rapport custom. Tu ecris la requete SQL, tu sors les chiffres</li>
<li><strong>14h :</strong> tu branches un nouvel outil d'enrichment au CRM. API, mapping de champs, tests</li>
<li><strong>16h :</strong> tu documentes un nouveau workflow d'automatisation pour que l'equipe puisse l'utiliser</li>
<li><strong>17h :</strong> tu optimises une sequence Zapier qui bug depuis 2 jours</li>
</ul>

<h2>Les 3 defis du Growth Ops</h2>
<h3>1. La data quality</h3>
<p>Ton plus gros combat. Les Sales entrent des donnees n'importe comment, les outils dupliquent des contacts, les imports CSV cassent les champs. Tu passes un temps fou a nettoyer la data. Et c'est normal — c'est ton job le plus critique.</p>

<h3>2. La dette technique</h3>
<p>Tu empiles les automations, les integrations, les scripts. Au bout d'un an, tu as un systeme fragile ou tout est connecte a tout. Il faut regulierement prendre du recul et refactorer — sinon tu passes d'une stack a un chateau de cartes.</p>

<h3>3. Les demandes ad hoc</h3>
<p>Tout le monde veut un dashboard, un export, un nouveau champ dans le CRM. Tu dois apprendre a dire non (ou "pas maintenant") et prioriser ce qui a le plus d'impact business.</p>

<h2>Les outils qui font la difference</h2>
<p>Au-dela du CRM et de Zapier, les Growth Ops qui se demarquent maitrisent :</p>
<ul>
<li><strong>n8n / Make :</strong> pour les automations complexes que Zapier ne gere pas</li>
<li><strong>SQL + dbt :</strong> pour transformer la data et construire des pipelines fiables</li>
<li><strong>Retool / Superblocks :</strong> pour construire des outils internes sans dev</li>
<li><strong>Census / Hightouch :</strong> pour la reverse ETL (envoyer la data warehouse vers les outils)</li>
</ul>

<h2>Conseils pour reussir en Growth Ops</h2>
<ul>
<li>Documente tout. Le toi du futur te remerciera quand un workflow cassera a 23h</li>
<li>Automatise les taches repetitives — si tu fais quelque chose 3 fois, automatise-le</li>
<li>Parle le langage business. Ton CEO se fiche de ton workflow Zapier — il veut savoir que ca a genere 20% de leads en plus</li>
<li>Reste curieux sur les nouveaux outils. Le paysage ops change tous les 6 mois</li>
<li>Construis des relations avec les Sales et le Marketing. Tu es un enabler, pas un gatekeeper</li>
</ul>`,
  },

  "6-reussir-son-entretien-dans-le-growth": {
    slug: "6-reussir-son-entretien-dans-le-growth",
    title: "Reussir son entretien dans le Growth",
    metaTitle: "Reussir son entretien Growth : preparation, questions et erreurs (2026)",
    metaDescription:
      "Comment reussir un entretien pour un poste growth : les questions classiques, le case study, les erreurs a eviter et comment se demarquer.",
    heroSubtitle:
      "Un entretien growth, ce n'est pas un entretien marketing classique. On teste ta capacite a structurer un probleme, a proposer des actions concretes et a raisonner avec de la data. Voici comment te preparer.",
    relatedCategory: "growth-marketing",
    targetKeywords: ["entretien growth", "recrutement growth"],
    content: `<h2>Le process typique d'un entretien growth</h2>
<p>La plupart des startups suivent ce format :</p>
<ul>
<li><strong>Call de screening (30 min) :</strong> fit culturel, motivation, parcours</li>
<li><strong>Entretien manager (45-60 min) :</strong> questions techniques + discussions sur tes experiences</li>
<li><strong>Case study (1-2h) :</strong> un exercice pratique — c'est la ou ca se joue</li>
<li><strong>Entretien fondateur / C-level (30 min) :</strong> vision, culture, dernieres questions</li>
</ul>

<h2>Les questions classiques</h2>
<h3>Questions generales</h3>
<ul>
<li>"Decris une campagne growth que tu as lancee. Quels resultats ?"</li>
<li>"Comment priorises-tu tes actions quand tu as 10 idees et 1 semaine ?"</li>
<li>"Quel framework utilises-tu pour structurer une strategie d'acquisition ?"</li>
</ul>

<h3>Questions techniques</h3>
<ul>
<li>"Comment calculer un CAC ? Un LTV ? Pourquoi le ratio LTV/CAC est important ?"</li>
<li>"Tu as un budget de 10K euros/mois. Comment tu l'alloues entre les canaux ?"</li>
<li>"Ton taux de conversion landing page est de 2%. Comment tu l'ameliores ?"</li>
</ul>

<h3>Questions comportementales</h3>
<ul>
<li>"Raconte un echec. Qu'est-ce que tu en as tire ?"</li>
<li>"Comment tu geres un desaccord avec un Sales sur la qualite des leads ?"</li>
</ul>

<h2>Le case study : comment le reussir</h2>
<p>C'est le moment decisif. On te donne un probleme reel et tu dois proposer un plan d'action. Les regles d'or :</p>
<ul>
<li><strong>Structure ta reponse.</strong> Commence par le contexte, definis les objectifs, propose les actions, explique comment tu mesures</li>
<li><strong>Sois concret.</strong> Pas de "on pourrait tester des choses". Donne des exemples precis : quel canal, quel message, quel budget, quel KPI</li>
<li><strong>Priorise.</strong> Ne donne pas 15 idees. Donne 3 actions a fort impact et explique pourquoi celles-la</li>
<li><strong>Montre ta rigueur data.</strong> Parle en chiffres, en taux de conversion, en cohorts</li>
<li><strong>Anticipe les objections.</strong> "Si ca ne marche pas, mon plan B est..."</li>
</ul>

<h2>Les erreurs qui tuent ta candidature</h2>
<ul>
<li><strong>Rester vague :</strong> "Je faisais du growth" ne veut rien dire. Donne des metriques</li>
<li><strong>Ne pas connaitre la boite :</strong> tu dois avoir teste le produit, lu le blog, compris le business model</li>
<li><strong>Surestimer les vanity metrics :</strong> "J'ai genere 1M d'impressions" — personne s'en fiche si ca n'a pas converti</li>
<li><strong>Ignorer le business :</strong> un bon growth comprend le P&L, pas juste le funnel</li>
</ul>

<h2>Comment te demarquer</h2>
<p>Avant l'entretien, prepare un "audit rapide" : analyse le site, le funnel d'acquisition, les pubs de la boite. Arrive avec 2-3 observations concretes et des suggestions. Ca montre que tu es deja dans le role.</p>
<p>Et surtout : sois honnete sur ce que tu ne sais pas. Les recruteurs growth preferent quelqu'un qui dit "je ne connais pas ce sujet mais voici comment j'apprendrais" plutot que du bullshit.</p>`,
  },
};

export const CONTENT_SLUGS = Object.keys(CONTENT_PAGES);
