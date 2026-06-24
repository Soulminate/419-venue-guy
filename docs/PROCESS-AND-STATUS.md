# 419 Venue Guy — Process & Current Status

**Last updated:** June 24, 2026

---

## How we built it

### Phase 0 — Discovery & positioning

- Identified Zach as owner-operator; site goal = **calls and messages**, not online ordering
- Chose single-page format: one scroll, every service visible, phone number always reachable
- Brand voice: warm, local, personal — *“We specialize in smiles!”*
- Trust anchors: Google reviews, WTOL 11, Facebook following, real event photos

### Phase 1 — Core landing page (June 21)

**Delivered:**
- Hero with photo collage (chef, food truck, appetizers)
- Six service cards with real photography
- Gallery from event photos
- Contact block with phone, email, Facebook
- Mobile-first layout with sticky call button
- Custom color system (cream, amber, moss, ink)

**Commits:** Initial hero/images, gallery cleanup, trailer and photobooth swaps

### Phase 2 — Menu & experiences (June 21)

**Delivered:**
- Tabbed menu (appetizers, mains, bars, desserts) with per-person pricing
- Downloadable 3-page PDF menu (`npm run menu-pdf`)
- Extras section: photobooth with duration price picker, hibachi card
- Philosophy quote from Zach

**Commits:** `d581c8c` menu/experiences, `c98757e` styling fixes

### Phase 3 — Copy & positioning (June 21)

**Delivered:**
- Repositioned from generic catering → **banquet-style catering + food truck first**
- Removed street address from public page (city-level only: Fremont, OH)
- Generalized service area language (419 + surrounding, willing to travel)
- Service card and gallery image refinements

**Commits:** `1166825`, `2206e71`, `71555f2`

### Phase 4 — Press, mobile, polish (June 22)

**Delivered:**
- Press section with The News-Messenger features (April & October 2023)
- WTOL hero card in press block
- Share & Care community catering card restored
- Mobile text overflow fixes, menu PDF preview hover
- Menu section visual separation (photo tint + moss overlay)

**Commits:** `d04b2c3`, `e9a3ff5` (partial)

### Phase 5 — Reviews & animations (June 22)

**Delivered:**
- Reviews reverted to **three-card layout** (Brea Held, graduation quote, Share & Care)
- Brea Held full Google review text
- Hibachi service card image → `hero-hibachi-event.jpg`
- Removed heavy hero animations (star twinkle, gradient shift, orb drift, float photos)
- Kept marquee + static gold stars

**Commits:** `e494531`, `591723f`, `e9a3ff5`

### Phase 6 — SEO Phase 1 (June 21–22)

**Delivered:**
- `robots.txt`, `sitemap.xml`, `favicon.svg`
- Title, meta description, canonical, OG/Twitter cards
- JSON-LD: LocalBusiness, WebSite, FAQPage
- Geo meta, theme-color, image alt audit

**Commits:** `cc29613`, `df66524`

### Phase 7 — Custom domain & deep SEO (June 22)

**Delivered:**
- Primary domain live: **419venueguy.com**
- All canonical/OG/schema URLs migrated from Vercel subdomain
- Enhanced schema: aggregateRating, Brea Held Review node, wedding catering FAQ
- `vercel.json` 301 redirect from old Vercel URL
- Hero LCP preload, footer NAP (Fremont, OH 43420)

**Commits:** `df66524`

### Phase 8 — Branding & analytics (June 23)

**Delivered:**
- Link-preview image → branded gold “419 VENUE GUY / WE MAKE SMILES HAPPEN” graphic
- Vercel Web Analytics (visitor tracking)
- Vercel Speed Insights (Core Web Vitals)

**Commits:** `6231e45`, `146bb19`, `4ac75eb`

---

## Where we are now

### Live and working

| Item | Status |
|------|--------|
| Custom domain `419venueguy.com` | ✅ Live |
| All page sections | ✅ Complete |
| Menu + PDF download | ✅ Complete |
| Google review (Brea Held) | ✅ Full quote on page |
| SEO technical layer | ✅ Phase 1 complete |
| Social share preview | ✅ Branded image |
| Vercel Analytics | ✅ Script live; data from enable date forward |
| Speed Insights | ✅ Script live; data from enable date forward |
| GitHub backup | ✅ `Soulminate/419-venue-guy` (46 commits) |
| GitHub Pages mirror | ✅ Auto-deploy on `main` push |

### Recommended next steps (not blocking)

| Item | Owner | Priority |
|------|-------|----------|
| Google Search Console — add property, submit sitemap | Zach or Lucid | High |
| Google Business Profile — update website URL | Zach | High |
| Vercel dashboard — confirm Analytics + Speed Insights enabled | Lucid | Medium |
| Set `419venueguy.com` as primary domain in Vercel | Lucid | Medium |
| Adopt branch → preview → merge workflow for future edits | Lucid | Medium |
| Execute image enhancement playbook (batch sharpen) | Lucid + Zach approval | Low |
| Google Analytics 4 (if deeper funnel tracking wanted) | Lucid | Optional |
| Dedicated service/location pages (SEO Phase 2) | Future scope | Optional |

### Known limitations

- **No retroactive analytics** — Vercel tracking starts from June 23, 2026 only
- **Tailwind via CDN** — convenient for iteration; a built CSS file would shave LCP marginally
- **Single HTML file** — scales fine for this scope; multi-page would need architecture change
- **SEO audit doc is historical** — written before Phase 1; current live state exceeds that baseline

---

## Future update workflow

```
1. Edit in sandbox (GrokStart-419-venue-guy)
2. Push to feature branch (not main)
3. Review Vercel preview URL
4. Zach approves
5. Merge to main → 419venueguy.com updates
6. Rollback available via Vercel Deployments if needed
```

For typos or urgent one-line fixes, direct `main` push is acceptable. For photos, menu changes, or layout work — use preview first.

---

## Skills & tools actually used

| Tool / skill | Used for |
|--------------|----------|
| Frontend UX / HTML/CSS | Entire page design and build |
| SEO audit skill | Phase 1 + domain migration audit |
| Image scripts (Sharp) | Hibachi crop, logo processing |
| PDFKit | Menu PDF generation |
| Vercel | Hosting, domain, analytics, speed insights |
| Git / GitHub | Version control, Pages backup |
| Grok Build (AI pair programming) | Iteration, copy, fixes across sessions |

**Not used:** Next.js, React, databases, payment systems, CMS, email marketing integrations.

---

## Commit reference (recent)

```
4ac75eb  Speed Insights
146bb19  Web Analytics
6231e45  Branded OG image
df66524  SEO domain migration
591723f  Brea review + hibachi photo
e494531  Reviews three-card revert
e9a3ff5  Lighter animations, menu backdrop
d04b2c3  Press section, mobile fixes
2206e71  Banquet catering copy
1166825  Catering-first repositioning
cc29613  SEO Phase 1 pack
```

Full history: `git log` in `419-venue-guy-public`.