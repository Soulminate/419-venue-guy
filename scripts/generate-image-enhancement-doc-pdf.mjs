import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'downloads');
const outFile = join(outDir, 'image-enhancement-playbook.pdf');

const ink = '#1c1712';
const bark = '#3d2e22';
const amber = '#c47a1a';

const sections = [
  {
    title: 'Goal',
    body:
      'Make on-site photos look cleaner, sharper, and more premium without changing composition, subjects, colors, mood, or text in the images.',
  },
  {
    title: 'What NOT to do',
    bullets: [
      'Do not run all images through generative AI image_edit — faces, food, and text can shift.',
      'Do not AI-enhance menu flyer graphics (menu-services-promo.jpg, menu-packages-flyer.jpg).',
      'Do not replace live files until before/after review is approved.',
    ],
  },
  {
    title: 'Recommended process',
    bullets: [
      '1. Backup originals to images/originals/',
      '2. Tag each file: photo | graphic | face | text',
      '3. Batch-enhance photos only with Sharp/ImageMagick (sharpen, denoise, mild contrast, web export)',
      '4. Manual review — especially face shots and any readable text',
      '5. Swap approved files in place (same filenames) and deploy',
    ],
  },
  {
    title: 'Priority tiers',
    bullets: [
      'Tier 1: Hero + Services cards',
      'Tier 2: Experiences section',
      'Tier 3: Gallery + social proof',
    ],
  },
  {
    title: 'Skip or handle separately',
    bullets: [
      'menu-services-promo.jpg — designed graphic',
      'menu-packages-flyer.jpg — designed graphic with pricing text',
      'photobooth-promo.jpg — illustration (not on live page)',
      'logo.png — not used in header currently',
    ],
  },
  {
    title: 'Open decisions',
    bullets: [
      'Scope: photos only vs include graphics?',
      'Face shots: auto-sharpen with review vs hands-off?',
      'Higher-res originals from Zach available?',
      'Approval workflow: Lucid only vs Zach sign-off?',
      'Preview -enhanced copies first vs in-place replace?',
    ],
  },
];

function drawHeader(doc) {
  doc.rect(0, 0, doc.page.width, 72).fill('#f8f4ec');
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(20).text('419 Venue Guy', 48, 24);
  doc.font('Helvetica').fontSize(10).fillColor(bark).text('Image Enhancement Playbook — Planning Doc', 48, 48);
  doc.moveTo(48, 80).lineTo(doc.page.width - 48, 80).strokeColor(amber).lineWidth(1.5).stroke();
  doc.y = 96;
}

function ensureSpace(doc, h = 60) {
  if (doc.y + h > doc.page.height - 48) {
    doc.addPage();
    drawHeader(doc);
  }
}

await mkdir(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 0, bottom: 48, left: 48, right: 48 } });
const stream = createWriteStream(outFile);
doc.pipe(stream);

drawHeader(doc);
doc.font('Helvetica-Oblique').fontSize(9).fillColor(bark)
  .text('Status: Not executed — review before running any batch enhancement.', 48, doc.y, { width: doc.page.width - 96 });
doc.y += 24;

sections.forEach((section) => {
  ensureSpace(doc, 80);
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(13).text(section.title, 48, doc.y);
  doc.y += 18;
  if (section.body) {
    doc.font('Helvetica').fontSize(10).fillColor(bark).text(section.body, 48, doc.y, { width: doc.page.width - 96, lineGap: 3 });
    doc.y += doc.heightOfString(section.body, { width: doc.page.width - 96, lineGap: 3 }) + 12;
  }
  if (section.bullets) {
    section.bullets.forEach((bullet) => {
      ensureSpace(doc, 24);
      doc.font('Helvetica').fontSize(10).fillColor(bark).text(`• ${bullet}`, 56, doc.y, { width: doc.page.width - 104, lineGap: 2 });
      doc.y += doc.heightOfString(`• ${bullet}`, { width: doc.page.width - 104, lineGap: 2 }) + 6;
    });
    doc.y += 8;
  }
});

ensureSpace(doc, 120);
doc.fillColor(ink).font('Helvetica-Bold').fontSize(12).text('On-page inventory (25 files)', 48, doc.y);
doc.y += 16;

const inventory = [
  'hero-zach-prep.jpg — Hero desktop (face)',
  'hero-chef-desserts.jpg — Hero mobile',
  'hero-hibachi-event.jpg — Hero + Experiences',
  'cater-1.jpg — Hero accent',
  'hibachi-wtol.jpg — Services (face)',
  'trailer-branded-side.jpg — Services + Gallery',
  'cater-buffet.jpg — Services, Gallery, Contact',
  'in-home-chef-dining.jpg — Services',
  'photobooth-event.jpg — Services',
  'cater-dessert-spread.jpg — Services + Gallery',
  'photobooth-inflatable.jpg — Experiences',
  'in-home-chef-porch.jpg — Experiences',
  'share-and-care.jpg — Reviews + Gallery',
  'Gallery: zach-grill, gallery-event, trailer-interior, gallery-charcuterie, gallery-plated-dinner, gallery-outdoor-dining, chowder-bread, cater-4, photobooth-setup',
  'Graphics (skip AI): menu-services-promo.jpg, menu-packages-flyer.jpg',
];

inventory.forEach((line) => {
  ensureSpace(doc, 18);
  doc.font('Helvetica').fontSize(9).fillColor(bark).text(`• ${line}`, 56, doc.y, { width: doc.page.width - 104 });
  doc.y += 14;
});

doc.y += 12;
doc.font('Helvetica').fontSize(9).fillColor(amber)
  .text('Full markdown source: docs/image-enhancement-playbook.md', 48, doc.y, { width: doc.page.width - 96, align: 'center' });

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log(`Wrote ${outFile}`);