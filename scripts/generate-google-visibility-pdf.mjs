import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'downloads');
const outFile = join(outDir, 'google-visibility-guide.pdf');

const ink = '#1c1712';
const bark = '#3d2e22';
const amber = '#c47a1a';
const moss = '#2f4a3a';
const contentWidth = 516;

const sections = [
  {
    title: 'The short version',
    body:
      'Your website looks great and is set up correctly for Google. The reason more people are not finding you yet is not because the site is broken — Google needs time and signals to trust a newer site, and wedding searches are crowded with caterers who have been at it for years.\n\nMost of what moves the needle from here is stuff you can do in your normal week: reviews, photos, Google Business Profile, and sharing your link. We can handle the website upgrades on our side.',
  },
  {
    title: 'How people find caterers on Google',
    body:
      'When someone searches "wedding catering Fremont" or "caterer near me," Google usually shows two things:\n\n1. The map with local businesses (Google Business Profile — photos, stars, phone number)\n2. Regular website results below that\n\nFor weddings, people also check The Knot and WeddingWire before they visit a caterer\'s own site.\n\nYou are strong on Facebook and word of mouth. Google is the next channel — and it rewards consistency over time, not one big fix.',
  },
  {
    title: '1. Google Business Profile — do this first',
    subtitle: 'Treat it like a second website. This is the #1 thing for local searches.',
    bullets: [
      'Set website to https://419venueguy.com',
      'Primary category: Caterer (add Food Truck or Event Planner as secondary if they fit)',
      'Description mentions: weddings, banquets, food truck, hibachi, photobooth, Fremont, 419 area',
      'Upload 10–20 new photos from real events (weddings, graduations, food truck nights)',
      'Post every 2–4 weeks — a recent event photo, menu highlight, or "booking fall weddings"',
      'Reply to every Google review (even a short thank you helps)',
    ],
    note: 'The map pack gets more clicks than most websites. Couples often pick from the map before they scroll down.',
  },
  {
    title: '2. Ask for Google reviews',
    body:
      'More reviews = more trust = more visibility. You need steady growth and reviews that mention what you did.\n\nWhen you follow up after an event, try:\n"If you have a minute, a Google review really helps small businesses like mine. Mentioning the type of event (wedding, graduation, etc.) is a bonus."\n\nGood topics: wedding catering, food truck parties, backyard hibachi, in-home chef dinners, graduations.\n\nYou already have a 5-star rating. The goal is more reviews over time.',
  },
  {
    title: '3. Share 419venueguy.com everywhere',
    bullets: [
      'Facebook page Website field',
      'Email signature',
      'Quote PDFs and menus you send clients',
      'Business cards',
      'WeddingWire and The Knot profiles',
      'Venues and planners — ask to list you as a preferred caterer with your link',
    ],
    note: 'Google notices when real people click your link from trusted places. Slow burn, but it adds up.',
  },
  {
    title: '4. Wedding directories',
    body:
      'You have a WeddingWire listing. Keep it updated with the same phone, email, and website; fresh wedding photos (not just food truck shots); and quick replies to inquiries.\n\nConsider The Knot if wedding work is a growth priority.\n\nThese sites often show above individual caterer websites for "wedding catering Fremont" searches.',
  },
  {
    title: '5. Partner with venues and planners',
    bullets: [
      'Venues you have catered at — ask for a preferred vendors page with a link to 419venueguy.com',
      'Wedding planners, photographers, DJs in Fremont / Toledo / Tiffin — trade referrals',
      'Local chamber or small-business groups — directory listing with your website',
    ],
    note: 'One link from a local venue page is worth more than tweaking a sentence on your homepage.',
  },
  {
    title: 'What we can build on the website',
    body:
      'Your site is one page today. Wedding searches want a page clearly about weddings — photos, packages, Fremont/419 in the text.\n\nPlanned upgrades (in order):',
    bullets: [
      'Wedding catering page — targets "wedding catering Fremont / 419"',
      'Food truck page — private bookings and festival searches',
      'Hibachi / private chef page — backyard parties, less competition than weddings',
      'Search Console — see which searches bring people in',
      'Faster images — small mobile speed boost',
    ],
    note: 'None of these replace Google Business Profile or reviews. They support them. Wedding page is the right first pick.',
  },
  {
    title: 'What will not help much',
    bullets: [
      'Obsessing over tiny homepage wording every week',
      'Paying for random SEO packages from cold emails',
      'Expecting results in 48 hours — Google usually takes 4–12 weeks',
      'Listing a street address if you do not want one public (we kept it city-level on purpose)',
    ],
  },
  {
    title: '30-day plan',
    weeks: [
      {
        label: 'Week 1 — Google Business Profile',
        items: [
          'Confirm website = 419venueguy.com',
          'Upload 10+ event photos',
          'Refresh business description (weddings + food truck + 419)',
          'Make one profile post with a recent event photo',
        ],
      },
      {
        label: 'Week 2 — Reviews',
        items: [
          'Text or call 3 happiest recent clients for a Google review',
          'Reply to any existing Google reviews',
        ],
      },
      {
        label: 'Week 3 — Directories and links',
        items: [
          'Update WeddingWire photos and website link',
          'Add 419venueguy.com to Facebook About if needed',
          'Email one venue or planner — ask for a vendor listing',
        ],
      },
      {
        label: 'Week 4 — Content',
        items: [
          'Facebook post with 3–4 event photos and link to the site',
          'Send us new photos or menu changes',
          'Tell us if you want the wedding catering page built next',
        ],
      },
    ],
  },
  {
    title: 'Realistic expectations',
    bullets: [
      '2–4 weeks: GBP traction if you post photos and get 2–3 new reviews',
      '1–3 months: More map visibility for "caterer Fremont" and "419 venue guy"',
      '3–6 months: Wedding and food truck keywords move with dedicated pages + steady reviews',
      'Ongoing: Every event = photos, a review, and a Facebook post with your link',
    ],
    note: 'You built the business on relationships. Google works the same way — just slower and in public.',
  },
  {
    title: 'Your action list',
    bullets: [
      '☐ Google Business Profile updated with 419venueguy.com',
      '☐ 10+ new photos on Google Business Profile',
      '☐ Ask 3 recent clients for a Google review',
      '☐ WeddingWire profile refreshed',
      '☐ Share site link on Facebook and email signature',
      '☐ Tell us when you want the wedding page built',
      '☐ Send new event photos when you have them',
    ],
  },
];

function drawHeader(doc, subtitle = 'Getting More People to Find You on Google') {
  doc.rect(0, 0, doc.page.width, 78).fill('#f8f4ec');
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(22).text('419 Venue Guy', 48, 22);
  doc.font('Helvetica').fontSize(10).fillColor(bark).text(subtitle, 48, 48);
  doc.moveTo(48, 86).lineTo(doc.page.width - 48, 86).strokeColor(amber).lineWidth(1.5).stroke();
  doc.y = 100;
}

function drawFooter(doc) {
  const y = doc.page.height - 36;
  doc.font('Helvetica').fontSize(8).fillColor(bark)
    .text('419 Venue Guy · We specialize in smiles! · 419-208-5568 · Venueguy419@yahoo.com', 48, y, {
      width: contentWidth,
      align: 'center',
    });
}

function ensureSpace(doc, h = 60) {
  if (doc.y + h > doc.page.height - 64) {
    drawFooter(doc);
    doc.addPage();
    drawHeader(doc);
  }
}

function writeBody(doc, text) {
  ensureSpace(doc, 40);
  doc.font('Helvetica').fontSize(10.5).fillColor(bark).text(text, 48, doc.y, { width: contentWidth, lineGap: 4 });
  doc.y += doc.heightOfString(text, { width: contentWidth, lineGap: 4 }) + 14;
}

function writeBullets(doc, bullets) {
  bullets.forEach((bullet) => {
    ensureSpace(doc, 28);
    const line = `•  ${bullet}`;
    doc.font('Helvetica').fontSize(10.5).fillColor(bark).text(line, 56, doc.y, { width: contentWidth - 8, lineGap: 3 });
    doc.y += doc.heightOfString(line, { width: contentWidth - 8, lineGap: 3 }) + 5;
  });
  doc.y += 6;
}

function writeNote(doc, text) {
  ensureSpace(doc, 36);
  doc.roundedRect(48, doc.y, contentWidth, doc.heightOfString(text, { width: contentWidth - 24, lineGap: 3 }) + 16, 6)
    .fillAndStroke('#f0e8dc', amber);
  doc.fillColor(moss).font('Helvetica-Oblique').fontSize(9.5)
    .text(text, 60, doc.y + 8, { width: contentWidth - 24, lineGap: 3 });
  doc.y += doc.heightOfString(text, { width: contentWidth - 24, lineGap: 3 }) + 24;
}

await mkdir(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 0, bottom: 56, left: 48, right: 48 } });
const stream = createWriteStream(outFile);
doc.pipe(stream);

drawHeader(doc);
doc.font('Helvetica').fontSize(10).fillColor(bark)
  .text('Prepared June 2026 · Your website: 419venueguy.com', 48, doc.y, { width: contentWidth });
doc.y += 22;

sections.forEach((section) => {
  ensureSpace(doc, 72);
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(14).text(section.title, 48, doc.y);
  doc.y += 20;

  if (section.subtitle) {
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(amber).text(section.subtitle, 48, doc.y, { width: contentWidth });
    doc.y += doc.heightOfString(section.subtitle, { width: contentWidth }) + 10;
  }

  if (section.body) writeBody(doc, section.body);
  if (section.bullets) writeBullets(doc, section.bullets);
  if (section.note) writeNote(doc, section.note);

  if (section.weeks) {
    section.weeks.forEach((week) => {
      ensureSpace(doc, 48);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(ink).text(week.label, 48, doc.y);
      doc.y += 16;
      writeBullets(doc, week.items);
      doc.y += 4;
    });
  }
});

ensureSpace(doc, 80);
doc.fillColor(ink).font('Helvetica-Bold').fontSize(12).text('Questions?', 48, doc.y);
doc.y += 18;
writeBody(
  doc,
  'Call or message us anytime. If you are not sure where your Google Business Profile login is, or you want help with the wedding page copy, we will walk through it step by step.',
);

drawFooter(doc);
doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log(`Wrote ${outFile}`);