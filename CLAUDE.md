@AGENTS.md

# GrowthTalent.org — Growth Marketing Job Board

## Product
- Growth marketing job board across 3 markets: USA, France, LatAm (+ Brazil/PT)
- Jobs are scraped (Mantiks.io + Apify) AND posted by companies
- Candidates browse free, login via LinkedIn OAuth to apply
- Two apply paths: redirect to ATS (v1) or one-click apply (v2)
- Companies post for FREE, can claim scraped pages, pay to BOOST ($299-399)
- Boost = featured placement + unlock candidate profiles
- AI moderation (Claude Haiku) on all posted jobs

## Stack
- Next.js 16 (App Router) + TypeScript
- Prisma 7 + Supabase PostgreSQL
- Tailwind CSS v4 + shadcn/ui
- Auth.js v5 (LinkedIn OAuth)
- Stripe (USD/EUR/BRL)
- Resend (transactional email)
- Plausible Analytics
- Vercel hosting

## Architecture
- Separate route trees for i18n: (en)/jobs, (fr)/emplois, (es)/empleos, (pt)/empregos
- Prisma 7 with @prisma/adapter-pg (driver adapter pattern)
- ISR: revalidate 1800 for listings, generateStaticParams for top 200
- Webhook endpoint at /api/ingest/webhook for scraped jobs

## Brand
- Fonts: GT Super Display (headings, /public/fonts/) + Inter (body, Google Fonts)
- Colors: purple #A8AAD8, yellow #FFE495, pink #FEB9CE, cream #F8EADD, black #000, dark #161616
- CSS vars: gt-purple, gt-purple-light, gt-yellow, gt-pink, gt-cream, gt-black, gt-dark
- Font class: font-display for GT Super, font-sans for Inter
- Light mode only

## Commands
```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm db:push      # push schema to Supabase
pnpm db:generate  # generate Prisma client
pnpm db:migrate   # create migration
pnpm seed         # seed database
```

## Key Files
- prisma/schema.prisma — data model
- prisma.config.ts — Prisma 7 config with migration URL
- src/lib/db.ts — Prisma client (adapter-pg pattern)
- src/lib/categories.ts — job category taxonomy
- src/dictionaries/ — i18n strings (en, fr, es, pt)
