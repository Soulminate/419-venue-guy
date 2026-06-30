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
const margin = 48;
const contentWidth = 516;
const pageBottom = 744;

const sections = [
  {
    title: 'The short version',
    body:
      'Your website looks great and is set up right for Google. If more people are not finding you yet, it is not because something is broken — Google just needs time to pick up on a newer site, and local catering searches take a while to crack.\n\nMost of what actually helps is stuff you already do well: real event photos, happy clients, Facebook, word of mouth. This guide is just the Google side of that — a handful of habits that add up over a few weeks.',
  },
  {
    title: 'How people find caterers on Google',
    body:
      'When someone searches "caterer Fremont," "wedding catering 419," "food truck near me," or similar, Google usually shows two things:\n\n1. The map with local businesses (Google Business Profile — photos, stars, phone number)\n2. Regular website results below that\n\nWedding searches are especially competitive — lots of caterers have been at it for years — but they are still worth showing up for over time. You are already strong on Facebook and referrals. Google is another lane, and it rewards consistency, not one big fix.',
  },
  {
    title: '1. Google Business Profile — start here',
    subtitle: 'Think of it as a second storefront. Biggest bang for your buck.',
    bullets: [
      'Set website to https://419venueguy.com',
      'Primary category: Caterer (Food Truck or Event Planner as secondary if they fit)',
      'Description covers what you actually do: weddings, banquets, food truck, hibachi, photobooth, in-home chef, Fremont, 419 area',
      'Upload 10–20 photos from real events — weddings, graduations, truck nights, backyard parties, whatever you have',
      'Post every 2–4 weeks: a recent event photo, a menu highlight, or a seasonal note',
      'Reply to Google reviews when you can (even a quick thank you)',
    ],
    note: 'The map section gets a lot of clicks. A lot of people pick from there before they ever scroll to websites.',
  },
  {
    title: '2. Google reviews — steady beats sudden',
    body:
      'More reviews builds trust and visibility. You do not need hundreds — just keep adding them when you have a happy client.\n\nAfter a great event, something simple works:\n"If you have a minute, a Google review helps a ton. Mentioning what we did for your event is even better."\n\nAny event counts: weddings, banquets, food truck nights, hibachi, in-home dinners, graduations, fundraisers.',
  },
  {
    title: '3. Share 419venueguy.com the same way everywhere',
    bullets: [
      'Facebook page Website field',
      'Email signature',
      'Menus and quotes you send out',
      'Business cards',
      'Venues and planners you work with — ask if they will list you with your link',
    ],
    note: 'Same link, same info, everywhere. Google picks up on that over time.',
  },
  {
    title: '4. Local connections still matter',
    bullets: [
      'Venues you have worked with — a preferred vendor mention with your website link goes a long way (wedding venues, community halls, etc.)',
      'Photographers, DJs, wedding planners in the area — trade referrals like you already do in person',
      'Any local business directory you are already part of — make sure the link is current',
    ],
    note: 'One real link from a venue or local org beats a dozen tiny website tweaks.',
  },
  {
    title: 'Website ideas — only when you want them',
    body:
      'The site works great as one page right now. Down the road, if you want to target specific searches, we could add focused pages — for example wedding catering, food truck bookings, or backyard hibachi. Each one gives Google a clearer page to point people to for that type of event. Totally optional, no rush.\n\nOther behind-the-scenes stuff I can handle whenever:',
    bullets: [
      'Hook up Google Search Console so we can see what people are actually searching (e.g. "wedding catering Fremont," "food truck 419")',
      'Speed up images a bit for phones',
      'Refresh photos or menu pricing when you send updates',
    ],
  },
  {
    title: 'What usually does not help',
    bullets: [
      'Random "SEO packages" from cold emails or phone calls',
      'Expecting a flood of traffic in the first week — Google usually takes a month or two to reflect steady effort',
      'Paying for ads before the free basics (profile, photos, reviews) are in decent shape',
    ],
  },
  {
    title: 'Simple 30-day plan',
    weeks: [
      {
        label: 'Week 1 — Google Business Profile',
        items: [
          'Confirm website = 419venueguy.com',
          'Upload 10+ event photos',
          'Refresh your business description',
          'Make one profile post with a recent photo',
        ],
      },
      {
        label: 'Week 2 — Reviews',
        items: [
          'Reach out to 3 recent happy clients about a Google review',
          'Reply to any reviews you have not answered yet',
        ],
      },
      {
        label: 'Week 3 — Links',
        items: [
          'Double-check Facebook About has 419venueguy.com',
          'Add the link to your email signature if it is not there',
          'Ask one venue or contact about listing you as a vendor',
        ],
      },
      {
        label: 'Week 4 — Keep it visible',
        items: [
          'Facebook post with a few event photos and your site link',
          'Send me any new photos or menu changes worth adding',
        ],
      },
    ],
  },
  {
    title: 'Realistic expectations',
    bullets: [
      '2–4 weeks: profile starts getting traction if photos and a couple reviews come in',
      '1–3 months: more visibility for searches like "caterer Fremont" or people looking you up by name',
      '3–6 months: searches like wedding catering, food truck bookings, and general event catering start moving if you keep posting and collecting reviews',
      'Every event is another chance: photos, a review, a Facebook post',
    ],
    note: 'You built this on relationships. Google is the same thing — just slower and more public.',
  },
  {
    title: 'Quick checklist',
    bullets: [
      '☐ Google Business Profile has 419venueguy.com',
      '☐ 10+ photos uploaded to your Google profile',
      '☐ Asked a few recent clients for a review',
      '☐ Site link on Facebook and email signature',
      '☐ Sent any new event photos my way',
    ],
  },
  {
    title: 'That is it',
    body:
      'No rush on any of this — pick what fits your week. If you want help finding your Google Business Profile login or knocking out any of the above together, just let me know.',
  },
];

function drawFirstPageHeader(doc) {
  doc.rect(0, 0, doc.page.width, 78).fill('#f8f4ec');
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(22).text('419 Venue Guy', margin, 22);
  doc.font('Helvetica').fontSize(10).fillColor(bark).text('Getting Found on Google — a few practical ideas', margin, 48);
  doc.moveTo(margin, 86).lineTo(doc.page.width - margin, 86).strokeColor(amber).lineWidth(1.5).stroke();
  doc.y = 100;
}

function ensureSpace(doc, h = 40) {
  if (doc.y + h > pageBottom) {
    doc.addPage();
    doc.y = margin;
  }
}

function writeBody(doc, text) {
  const h = doc.heightOfString(text, { width: contentWidth, lineGap: 4 });
  ensureSpace(doc, h + 14);
  doc.font('Helvetica').fontSize(10.5).fillColor(bark).text(text, margin, doc.y, { width: contentWidth, lineGap: 4 });
  doc.y += h + 14;
}

function writeBullets(doc, bullets) {
  bullets.forEach((bullet) => {
    const line = `•  ${bullet}`;
    const h = doc.heightOfString(line, { width: contentWidth - 8, lineGap: 3 });
    ensureSpace(doc, h + 8);
    doc.font('Helvetica').fontSize(10.5).fillColor(bark).text(line, margin + 8, doc.y, { width: contentWidth - 8, lineGap: 3 });
    doc.y += h + 6;
  });
  doc.y += 4;
}

function writeNote(doc, text) {
  const textW = contentWidth - 24;
  const textH = doc.heightOfString(text, { width: textW, lineGap: 3 });
  const boxH = textH + 16;
  ensureSpace(doc, boxH + 12);
  const y = doc.y;
  doc.roundedRect(margin, y, contentWidth, boxH, 6).fillAndStroke('#f0e8dc', amber);
  doc.fillColor(moss).font('Helvetica-Oblique').fontSize(9.5).text(text, margin + 12, y + 8, { width: textW, lineGap: 3 });
  doc.y = y + boxH + 12;
}

await mkdir(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'LETTER', margins: { top: margin, bottom: margin, left: margin, right: margin }, autoFirstPage: true });
const stream = createWriteStream(outFile);
doc.pipe(stream);

drawFirstPageHeader(doc);
doc.font('Helvetica').fontSize(10).fillColor(bark).text('For Zach · June 2026 · 419venueguy.com', margin, doc.y, { width: contentWidth });
doc.y += 22;

sections.forEach((section) => {
  ensureSpace(doc, 56);
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(14).text(section.title, margin, doc.y);
  doc.y += 20;

  if (section.subtitle) {
    const subH = doc.heightOfString(section.subtitle, { width: contentWidth });
    ensureSpace(doc, subH + 10);
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(amber).text(section.subtitle, margin, doc.y, { width: contentWidth });
    doc.y += subH + 10;
  }

  if (section.body) writeBody(doc, section.body);
  if (section.bullets) writeBullets(doc, section.bullets);
  if (section.note) writeNote(doc, section.note);

  if (section.weeks) {
    section.weeks.forEach((week) => {
      ensureSpace(doc, 40);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(ink).text(week.label, margin, doc.y);
      doc.y += 16;
      writeBullets(doc, week.items);
    });
  }

  doc.y += 6;
});

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log(`Wrote ${outFile}`);