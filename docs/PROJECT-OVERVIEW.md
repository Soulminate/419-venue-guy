# 419 Venue Guy — Project Overview

**Live site:** [https://419venueguy.com](https://419venueguy.com)  
**Client:** Zach Beckman — 419 Venue Guy (Fremont, OH)  
**Document date:** June 24, 2026  
**Status:** Live in production

---

## What this project is

A single-page marketing website for **419 Venue Guy**, an owner-operated catering and events business based in Fremont, Ohio. The site is designed to convert visitors into phone calls and messages — not to run bookings or payments online.

The page showcases six core services (banquet catering, food truck, in-home chef, desserts, backyard hibachi, photobooth), a full menu with downloadable PDF, press coverage, Google reviews, a photo gallery, and multiple contact paths.

**Positioning:** *“Banquet-style catering. Food truck nights. Events made easy.”*  
**Tagline:** *“We specialize in smiles!”*

---

## Business context

| Detail | Value |
|--------|-------|
| Owner | Zach Beckman |
| Phone | 419-208-5568 |
| Email | Venueguy419@yahoo.com |
| Location | Fremont, OH 43420 |
| Service area | 419 area, northwest Ohio, willing to travel |
| Facebook | [419 Venue Guy on Facebook](https://www.facebook.com/p/419-Venue-Guy-100088818851901/) |
| Google | 5.0 rating · 4 verified reviews |
| Press | WTOL 11 TV feature, The News-Messenger (2023) |

---

## Technical architecture

| Layer | Choice | Why |
|-------|--------|-----|
| Markup | Single `index.html` (~2,200 lines) | Fast to deploy, easy to host, no build step |
| Styling | Tailwind CSS (CDN) + custom CSS | Rapid iteration without a bundler |
| Fonts | Fraunces + Instrument Sans (Google Fonts) | Warm, premium feel matching brand |
| JavaScript | Vanilla JS only | Menu tabs, scroll reveals, mobile interactions |
| Hosting | Vercel (static) | Custom domain, previews, analytics |
| Backup host | GitHub Pages | Mirrors `main` automatically |
| Repo | `Soulminate/419-venue-guy` on GitHub | 46 commits, full history |

**There is no React, Next.js, or database.** The entire product is one HTML file, ~50 image assets, two PDFs, and config files (`vercel.json`, `robots.txt`, `sitemap.xml`).

---

## Site structure

| Section | Purpose |
|---------|---------|
| Hero | Headline, photo collage, Google/Facebook/WTOL trust badges, call CTA |
| Marquee | Scrolling service keywords |
| Services | Six interactive cards with photos and expandable details |
| On TV | Embedded WTOL 11 segment |
| Press | The News-Messenger articles |
| Menu | Tabbed categories, per-person pricing, PDF download |
| Extras | Photobooth + hibachi with live price picker |
| Why Us | Owner-operated value props, 3-step booking flow |
| Reviews | Three-card layout (Brea Held Google review, graduation quote, Share & Care) |
| Gallery | 13-photo masonry grid from real events |
| Contact | Phone, email, Facebook, Fremont location |
| Mobile sticky CTA | Fixed “Call Zach” bar on small screens |

---

## Design system

Custom Tailwind palette aligned to warm, food-forward branding:

- **cream** `#f8f4ec` — page background
- **ink** `#1c1712` — primary text
- **amber** `#c47a1a` — primary CTA
- **gold** `#e8b84a` — accents, stars
- **moss** `#2f4a3a` — secondary surfaces
- **rust** `#9e4b2f` — italic headline accent

Animations are intentionally light: scroll reveals, marquee, static gold stars. Heavy hero motion was removed for performance and readability.

---

## SEO and discoverability (current state)

| Element | Status |
|---------|--------|
| Canonical URL | `https://419venueguy.com/` |
| Open Graph / Twitter cards | Branded share image + full meta |
| `robots.txt` + `sitemap.xml` | Live on custom domain |
| JSON-LD schema | LocalBusiness, WebSite, Review, FAQPage (6 questions) |
| Aggregate rating in schema | 5.0 / 4 reviews (matches on-page copy) |
| Domain redirect | `419-venue-guy.vercel.app` → `419venueguy.com` (301) |
| Image alt text | All visible images described |
| LCP optimization | Hero image preloaded with `fetchpriority="high"` |

**Still recommended (manual):** Google Search Console property, Google Business Profile website URL update, Bing Webmaster Tools.

---

## Analytics (current state)

| Tool | What it tracks | Since |
|------|----------------|-------|
| Vercel Web Analytics | Visitors, page views, referrers | June 23, 2026 |
| Vercel Speed Insights | Core Web Vitals (LCP, INP, CLS) | June 23, 2026 |

No retroactive data exists before enablement. Google Analytics is not installed.

---

## Asset inventory

- **49 images** in `/images` (48 JPG + 1 PNG)
- **26 images** actively used on the page
- **2 PDFs** in `/downloads` (customer menu + image playbook)
- **1 SVG** favicon
- Image processing scripts (Sharp) for crops and logo cleanup — dev tooling only

An **image enhancement playbook** exists as a planning doc; batch sharpening has not been executed yet.

---

## Repository layout

| Path | Role |
|------|------|
| `C:\Users\Lucid\GrokStart-419-venue-guy` | Development sandbox (GrokStart monorepo, branch `419-venue-guy`) |
| `C:\Users\Lucid\419-venue-guy-public` | Production repo → GitHub → Vercel |

**Deploy flow:** Edit sandbox → copy changed files to public repo → `git push origin main` → Vercel auto-deploys.

**Recommended live-update flow:** Feature branch → Vercel preview URL → approve → merge to `main`.

---

## Build timeline (summary)

Intensive build sprint **June 2026** (46 commits across a focused push) covering:

1. Initial landing page with hero, services, gallery
2. Menu + experiences sections + downloadable PDF
3. Copy repositioning (catering & food truck first)
4. Press section, mobile fixes, image swaps
5. SEO Phase 1 (meta, schema, robots, sitemap, favicon)
6. Reviews section iterations + Brea Held full quote
7. Custom domain migration + deep SEO pass
8. Branded link-preview image
9. Vercel Analytics + Speed Insights

See `PROCESS-AND-STATUS.md` for phase-by-phase detail.

---

## Related documents

| Document | Audience |
|----------|----------|
| `PROCESS-AND-STATUS.md` | Detailed build process + current state |
| `FOR-ZACH.md` | Plain-language summary for Zach |
| `FOR-LUCID-INTERNAL.md` | Internal ops — **not for client** |
| `portfolio-case-study.html` | Portfolio / sales piece |
| `seo-audit-419-venue-guy.md` | Historical SEO baseline (pre-Phase 1) |
| `image-enhancement-playbook.md` | Planned photo optimization workflow |