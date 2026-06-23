import PDFDocument from 'pdfkit';
import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'downloads');
const imagesDir = join(root, 'images');
const outFile = join(outDir, '419-venue-guy-menu.pdf');

const ink = '#1c1712';
const bark = '#3d2e22';
const amber = '#c47a1a';
const gold = '#e8b84a';
const cream = '#f8f4ec';

const pageImages = {
  banquet: join(imagesDir, 'cater-soup-bread-station.jpg'),
  foodTruck: join(imagesDir, 'gallery-event.jpg'),
  photobooth: join(imagesDir, 'photobooth-event.jpg'),
};

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
      ['Banquet style', 'Up to 3 meats, 2 hot sides, cold side. Bread and salad.', '$14 / $18 / $22'],
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
  ['Backyard Hibachi', 'On-site cooking in your yard. Parties of 12+. Call for quote.'],
  ['In-Home Chef Experiences', 'Chef-inspired meal at your home. Custom menu. Call for quote.'],
  ['Photobooth — 2 hours', '$350'],
  ['Photobooth — 3 hours', '$500'],
  ['Photobooth — 5 hours', '$650'],
  ['Dessert cart rental', 'Call for quote'],
  ['Cannoli cart', 'Call for quote'],
  ['Food truck nights', 'Call for quote'],
];

function drawHeader(doc, compact = false) {
  const headerHeight = compact ? 72 : 88;
  doc.rect(0, 0, doc.page.width, headerHeight).fill(cream);
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(compact ? 22 : 26).text('419 Venue Guy', 48, compact ? 20 : 28);
  doc.font('Helvetica').fontSize(10).fillColor(bark)
    .text('419-208-5568  ·  Venueguy419@yahoo.com  ·  Fremont, Ohio', 48, compact ? 46 : 58);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(amber)
    .text('BANQUET MENU — PRICED PER PERSON', 48, compact ? 58 : 72);
  doc.moveTo(48, headerHeight + 8).lineTo(doc.page.width - 48, headerHeight + 8).strokeColor(gold).lineWidth(2).stroke();
  doc.y = headerHeight + 24;
}

function drawImageIfExists(doc, imagePath, x, y, width, height, options = {}) {
  if (!existsSync(imagePath)) return false;
  doc.image(imagePath, x, y, { width, height, ...options });
  return true;
}

function drawSection(doc, section) {
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(14).text(section.title, 48, doc.y);
  doc.y += 6;
  doc.moveTo(48, doc.y + 14).lineTo(180, doc.y + 14).strokeColor(amber).lineWidth(1).stroke();
  doc.y += 22;

  if (section.note) {
    doc.font('Helvetica-Oblique').fontSize(9).fillColor(bark).text(section.note, 48, doc.y, { width: 340 });
    doc.y += 18;
  }

  section.items.forEach(([name, desc, price]) => {
    const rowY = doc.y;
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(ink).text(name, 48, rowY, { width: 250 });
    doc.font('Helvetica-Bold').fontSize(10).fillColor(amber).text(price, 300, rowY, { width: 100, align: 'right' });
    if (desc) {
      doc.font('Helvetica').fontSize(9).fillColor(bark).text(desc, 48, rowY + 14, { width: 340 });
      doc.y = rowY + 30;
    } else {
      doc.y = rowY + 18;
    }
  });

  doc.y += 8;
}

function drawSidebarImage(doc, imagePath, caption) {
  const x = 400;
  const y = 130;
  const width = 164;
  const height = 118;
  if (drawImageIfExists(doc, imagePath, x, y, width, height)) {
    doc.roundedRect(x, y, width, height, 6).lineWidth(1).strokeColor('#e8dcc8').stroke();
    doc.font('Helvetica').fontSize(7.5).fillColor(bark).text(caption, x, y + height + 8, { width, align: 'center' });
  }
}

await mkdir(outDir, { recursive: true });

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 0, bottom: 48, left: 48, right: 48 } });
const stream = createWriteStream(outFile);
doc.pipe(stream);

// Page 1 — appetizers + banquet photo
drawHeader(doc);
drawSidebarImage(doc, pageImages.banquet, 'Banquet-style catering spread');

doc.font('Helvetica').fontSize(10).fillColor(bark)
  .text('Build the banquet spread — Zach handles the rest. Custom menus welcome. Bundle packages make better pricing.', 48, doc.y, { width: 340 });
doc.y += 28;

drawSection(doc, sections[0]);
drawSection(doc, sections[1]);

// Page 2 — bars, desserts + food truck photo
doc.addPage();
drawHeader(doc, true);
drawSidebarImage(doc, pageImages.foodTruck, 'Food truck event nights');

drawSection(doc, sections[2]);
drawSection(doc, sections[3]);

doc.y += 6;
doc.roundedRect(48, doc.y, 340, 54, 8).fill('#f0e6d8');
doc.fillColor(ink).font('Helvetica-BoldOblique').fontSize(9.5)
  .text('Banquet catering is a luxury service — culinary artistry, detail, and hospitality that makes every guest feel valued.', 60, doc.y + 12, { width: 316 });

// Page 3 — experiences + photobooth photo + footer
doc.addPage();
drawHeader(doc, true);

const photoY = 118;
if (drawImageIfExists(doc, pageImages.photobooth, 48, photoY, 516, 150)) {
  doc.roundedRect(48, photoY, 516, 150, 8).lineWidth(1).strokeColor('#e8dcc8').stroke();
  doc.font('Helvetica').fontSize(8).fillColor(bark).text('Photobooth rentals pair well with banquet catering and receptions.', 48, photoY + 158, { width: 516, align: 'center' });
}

doc.y = photoY + 182;
doc.fillColor(ink).font('Helvetica-Bold').fontSize(14).text('Experiences & Add-Ons', 48, doc.y);
doc.y += 22;

experiences.forEach(([name, detail]) => {
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

doc.y += 12;
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