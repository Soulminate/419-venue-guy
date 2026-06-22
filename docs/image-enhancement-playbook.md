# 419 Venue Guy — Image Enhancement Playbook

**Status:** Planning document (not yet executed)  
**Site:** https://419-venue-guy.vercel.app/  
**Last updated:** June 2026

---

## Goal

Make on-site photos look cleaner, sharper, and more premium **without changing** composition, subjects, colors, mood, or any text in the images.

---

## What NOT to do

- Do **not** run all images through generative AI `image_edit` — it can alter faces, food, text, and colors (same class of risk as the Canva checkerboard/logo issues).
- Do **not** AI-enhance menu flyer graphics (`menu-services-promo.jpg`, `menu-packages-flyer.jpg`) — prices and wording will drift.
- Do **not** replace live files until before/after review is approved.

---

## Recommended approach

### 1. Backup

Copy all originals to `images/originals/` before any processing.

### 2. Tag each on-page asset

| Tag | Meaning |
|-----|---------|
| `photo` | Safe for deterministic enhancement |
| `graphic` | Designed layout with text — skip or re-export from source |
| `face` | Contains Zach — requires manual approval |
| `text` | Readable signage/menu — manual approval only |

### 3. Process photos with deterministic tools

Use Sharp / ImageMagick (already in repo scripts) for:

- Mild sharpen
- Noise reduction
- Subtle contrast
- Web export (JPEG quality ~82–88, or WebP with JPG fallback)
- Optional upscale only when source is genuinely low-res

**Exclude:** menu graphics, logos, illustrations (`photobooth-promo.jpg`).

### 4. Review

Present before/after pairs. Zach or Lucid approves per file.

### 5. Deploy

Replace files **in place** (same filenames) to avoid HTML churn, then push to `419-venue-guy-public`.

---

## On-page inventory (25 unique files)

| File | Section | Notes |
|------|---------|-------|
| `hero-zach-prep.jpg` | Hero desktop | Face — manual review |
| `hero-chef-desserts.jpg` | Hero mobile | Food |
| `hero-hibachi-event.jpg` | Hero + Experiences | Outdoor event |
| `cater-1.jpg` | Hero accent | Food |
| `hibachi-wtol.jpg` | Services | Face — manual review |
| `trailer-branded-side.jpg` | Services + Gallery | Trailer/branding |
| `cater-buffet.jpg` | Services, Gallery, Contact | Food |
| `in-home-chef-dining.jpg` | Services | Table setting |
| `photobooth-event.jpg` | Services | Event |
| `cater-dessert-spread.jpg` | Services + Gallery | Food |
| `photobooth-inflatable.jpg` | Experiences | Indoor setup |
| `in-home-chef-porch.jpg` | Experiences | Outdoor table |
| `share-and-care.jpg` | Reviews + Gallery | Community event |
| `zach-grill.jpg` | Gallery | Face — manual review |
| `gallery-event.jpg` | Gallery | Event |
| `trailer-interior.jpg` | Gallery | Trailer interior |
| `gallery-charcuterie.jpg` | Gallery | Food |
| `gallery-plated-dinner.jpg` | Gallery | Food |
| `gallery-outdoor-dining.jpg` | Gallery | Event |
| `chowder-bread.jpg` | Gallery | Food |
| `cater-4.jpg` | Gallery | Food |
| `photobooth-setup.jpg` | Gallery | Photobooth |
| `menu-services-promo.jpg` | Gallery | **Graphic — skip AI** |
| `menu-packages-flyer.jpg` | Gallery | **Graphic — skip AI** |

---

## Priority tiers

1. **Tier 1:** Hero trio + Services cards (highest visibility)
2. **Tier 2:** Experiences section
3. **Tier 3:** Gallery + social proof images

---

## Open decisions (fill in before running)

- [ ] Scope: photos only, or include graphics?
- [ ] Face shots: auto-sharpen OK with review, or hands-off?
- [ ] Higher-res originals available from Zach?
- [ ] Approval: Lucid only, or Zach sign-off?
- [ ] Delivery: in-place replace vs `-enhanced` preview copies first?

---

## Related files

- Menu PDF generator: `scripts/generate-menu-pdf.mjs`
- Image tooling: `scripts/process-images.mjs` (Sharp)
- Live deploy folder: `C:\Users\Lucid\419-venue-guy-public`