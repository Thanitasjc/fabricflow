import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");

mkdirSync(outDir, { recursive: true });

function svgIcon(size, maskable = false) {
  const pad = maskable ? size * 0.18 : size * 0.12;
  const inner = size - pad * 2;
  const radius = maskable ? inner * 0.22 : size * 0.18;
  const fontSize = Math.round(size * (maskable ? 0.32 : 0.42));

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#031F3D"/>
  <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${radius}" fill="#073B73"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
    fill="#D9A441" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${fontSize}">F</text>
</svg>`;
}

async function writePng(name, size, maskable = false) {
  const png = await sharp(Buffer.from(svgIcon(size, maskable)))
    .png()
    .toBuffer();
  writeFileSync(join(outDir, name), png);
  console.log("Created", name);
}

await writePng("icon-192.png", 192);
await writePng("icon-512.png", 512);
await writePng("icon-maskable-192.png", 192, true);
await writePng("icon-maskable-512.png", 512, true);

console.log("PWA icons ready in public/icons");
