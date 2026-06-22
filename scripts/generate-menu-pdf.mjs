import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'downloads');
const outFile = join(outDir, '419-venue-guy-menu.pdf');

const ink = '#1c1712';
const bark = '#3d2e22';
const amber = '#c47a1a';
const gold = '#e8b84a';
const cream = '#f8f4ec';

const sections = [
  {
    title: 'Appetizers',
    note: 'We can accommodate other needs — just ask.',
    items: [
      ['Charcuterie', 'Variety of meats, cheeses, fruits, and nuts.', '$8.50+'],
      ['Meatballs, franks, dips', 'Meatballs, franks, buffalo dip, spinach dip.', '$6–8'],
      ['Bruschetta toast points', '', '$6'],
      ['Fruit or veggie tray', '', 'Ask for pricing'],
      ['Sausage beer cheese dip', '', '$6.50'],
    ],
  },
  {
    title: 'Main Courses',
    items: [
      ['Home style', 'Up to 3 meats, 2 hot sides, cold side. Bread and salad.', '$14 / $18 / $22'],
      ['Italian', 'Chicken alfredo, spaghetti & meatballs, lasagna, marsala, parm. Salad and bread.', '$14–20'],
      ['BBQ', 'Up to 3 meats, 2 hot sides, and a cold side.', '$15–24'],
      ['Caprese chicken', 'Melt-away potatoes, vegetable, and salad.', '$18'],
      ['Italian BBQ chicken', 'Roasted potatoes, vegetable, and salad. Ask about toppings.', '$17'],
    ],
  },
  {
    title: 'Bars & Bowls',
    items: [
      ['Soup & salad', 'Up to 3 soups, 2 salads, assorted breads. Sandwiches optional.', '$15'],
      ['Taco bar', 'Chicken and beef, rice and beans, chips, salsa/guac, toppings, shells.', '$14.50'],
      ['Mac & cheese bar', 'Chicken, pork, shrimp, sauces, green onions, bacon bits, and more.', '$14+'],
    ],
  },
  {
    title: 'Desserts',
    note: 'We can accommodate other needs — just ask.',
    items: [
      ['419 Whips', "Reese's, lemon blueberry w/ white chocolate, caramel apple, chocolate.", '$4'],
      ['Cheesecake bites', '', '$3'],
      ['Macaroons', '', '$4'],
      ['Turtle brownies', '', '$3'],
      ['Cookies', '', '$2.50'],
      ['Mini pies', '', '$4'],
      ['Crisps & cobblers', '', '$3.50'],
    ],
  },
];

const experiences = [
  ['Traveling Hibachi', 'Backyard on-site cooking. Parties of 12+. Call for quote.'],
  ['In-Home Chef Experiences', 'Chef-inspired meal at your home. Custom menu. Call for quote.'],
  ['Photobooth — 2 hours', '$350'],
  ['Photobooth — 3 hours', '$500'],
  ['Photobooth — 5 hours', '$650'],
  ['On-site omelet bar', 'Call for quote'],
  ['Dessert cart rental', 'Call for quote'],
  ['Cannoli cart', 'Call for quote'],
  ['Food trailer nights', 'Call for quote'],
];

function drawHeader(doc) {
  doc.rect(0, 0, doc.page.width, 88).fill(cream);
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(26).text('419 Venue Guy', 48, 28);
  doc.font('Helvetica').fontSize(10).fillColor(bark)
    .text('419-208-5568  ·  Venueguy419@yahoo.com  ·  Fremont, Ohio', 48, 58);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(amber)
    .text('MENU — PRICED PER PERSON', 48, 72);
  doc.moveTo(48, 96).lineTo(doc.page.width - 48, 96).strokeColor(gold).lineWidth(2).stroke();
  doc.y = 112;
}

function ensureSpace(doc, height = 72) {
  if (doc.y + height > doc.page.height - 56) {
    doc.addPage();
    drawHeader(doc);
  }
}

function drawSection(doc, section) {
  ensureSpace(doc, 48);
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(14).text(section.title, 48, doc.y);
  doc.y += 6;
  doc.moveTo(48, doc.y + 14).lineTo(180, doc.y + 14).strokeColor(amber).lineWidth(1).stroke();
  doc.y += 22;

  if (section.note) {
    doc.font('Helvetica-Oblique').fontSize(9).fillColor(bark).text(section.note, 48, doc.y, { width: doc.page.width - 96 });
    doc.y += 18;
  }

  section.items.forEach(([name, desc, price]) => {
    ensureSpace(doc, 36);
    const rowY = doc.y;
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(ink).text(name, 48, rowY, { width: 340 });
    doc.font('Helvetica-Bold').fontSize(10).fillColor(amber).text(price, doc.page.width - 148, rowY, { width: 100, align: 'right' });
    if (desc) {
      doc.font('Helvetica').fontSize(9).fillColor(bark).text(desc, 48, rowY + 14, { width: 360 });
      doc.y = rowY + 30;
    } else {
      doc.y = rowY + 18;
    }
  });

  doc.y += 10;
}

await mkdir(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 0, bottom: 48, left: 48, right: 48 } });
const stream = createWriteStream(outFile);
doc.pipe(stream);

drawHeader(doc);

doc.font('Helvetica').fontSize(10).fillColor(bark)
  .text('Build the spread — Zach handles the rest. Custom menus welcome. Bundle packages make better pricing.', 48, doc.y, { width: doc.page.width - 96 });
doc.y += 28;

sections.forEach((section) => drawSection(doc, section));

ensureSpace(doc, 80);
doc.fillColor(ink).font('Helvetica-Bold').fontSize(14).text('Experiences & Add-Ons', 48, doc.y);
doc.y += 22;

experiences.forEach(([name, detail]) => {
  ensureSpace(doc, 34);
  const rowY = doc.y;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(ink).text(name, 48, rowY, { width: doc.page.width - 96 });
  const isPrice = detail.startsWith('$');
  if (isPrice) {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(amber).text(detail, 48, rowY + 14, { width: doc.page.width - 96, align: 'right' });
    doc.y = rowY + 30;
  } else {
    doc.font('Helvetica').fontSize(9.5).fillColor(bark).text(detail, 48, rowY + 14, { width: doc.page.width - 96 });
    doc.y = rowY + 30;
  }
});

ensureSpace(doc, 100);
doc.roundedRect(48, doc.y, doc.page.width - 96, 72, 8).fill('#f0e6d8');
doc.fillColor(ink).font('Helvetica-BoldOblique').fontSize(10)
  .text(
    "Catering is a luxury service — not just food. Zach brings culinary artistry, detail, and hospitality to every event. Let's talk about your day.",
    60,
    doc.y + 14,
    { width: doc.page.width - 120 }
  );

doc.y += 88;
doc.font('Helvetica-Bold').fontSize(11).fillColor(amber)
  .text('419-208-5568  ·  Venueguy419@yahoo.com', 48, doc.y, { width: doc.page.width - 96, align: 'center' });
doc.font('Helvetica').fontSize(10).fillColor(bark)
  .text('Find us on Facebook — search 419 Venue Guy', 48, doc.y + 16, { width: doc.page.width - 96, align: 'center' });

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log(`Wrote ${outFile}`);