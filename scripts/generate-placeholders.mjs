import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outGallery = path.resolve("public/images/gallery");
const outCouple = path.resolve("public/images/couple");

const motif = `
  <g id="palmette" fill="none" stroke="#8f7373" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 0C7-22 7-44 0-62C-7-44-7-22 0 0Z"/>
    <g transform="rotate(32)"><path d="M0 0C5.5-19 5.5-38 0-54C-5.5-38-5.5-19 0 0Z"/></g>
    <g transform="rotate(-32)"><path d="M0 0C5.5-19 5.5-38 0-54C-5.5-38-5.5-19 0 0Z"/></g>
    <g transform="rotate(62)"><path d="M0 0C4.5-15 4.5-30 0-43C-4.5-30-4.5-15 0 0Z"/></g>
    <g transform="rotate(-62)"><path d="M0 0C4.5-15 4.5-30 0-43C-4.5-30-4.5-15 0 0Z"/></g>
    <path d="M0-6V-40" stroke-width="0.8"/>
    <circle cx="0" cy="-46" r="2.4" fill="#8f7373" stroke="none"/>
    <circle cx="0" cy="-20" r="9" stroke-width="0.7" stroke-dasharray="1 3.2"/>
    <circle cx="0" cy="-20" r="3.4" stroke-width="0.8"/>
    <path d="M0-2C15-8 25-22 21-35C18-45 8-48 3.5-42"/>
    <path d="M0-2C-15-8-25-22-21-35C-18-45-8-48-3.5-42"/>
    <path d="M21-35C26.5-38.5 31-34 28.6-29.2C26.6-25 21.4-26 19.8-29.6C18.9-31.8 19.6-33.7 21-35Z"/>
    <path d="M-21-35C-26.5-38.5-31-34-28.6-29.2C-26.6-25-21.4-26-19.8-29.6C-18.9-31.8-19.6-33.7-21-35Z"/>
    <path d="M-14 4C-10-4-4-4 0 2C4-4 10-4 14 4"/>
    <path d="M-9 8.5C-6 2.5 6 2.5 9 8.5"/>
  </g>`;

function svg({ width, height, from, to, inkOpacity, label, sub }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <g id="tile">${motif}</g>
    <pattern id="lace" width="240" height="240" patternUnits="userSpaceOnUse">
      <use href="#tile" transform="translate(120 95) scale(1.45)" opacity="0.9"/>
      <use href="#tile" transform="translate(0 215) scale(1.45)" opacity="0.9"/>
      <use href="#tile" transform="translate(240 215) scale(1.45)" opacity="0.9"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#lace)" opacity="${inkOpacity}"/>
  <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.34}" ry="${height * 0.3}" fill="none" stroke="#8a6d68" stroke-opacity="0.5" stroke-width="2"/>
  <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.3}" ry="${height * 0.26}" fill="none" stroke="#b79a96" stroke-opacity="0.8" stroke-width="1.5" stroke-dasharray="3 6"/>
  <text x="50%" y="49%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(width * 0.11)}" fill="#7a5f5a">${label}</text>
  <text x="50%" y="60%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(width * 0.035)}" letter-spacing="6" fill="#8a6d68">${sub}</text>
  <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="none" stroke="#b79a96" stroke-opacity="0.6" stroke-width="1.5"/>
</svg>`;
}

const palettes = [
  ["#f7f1ee", "#e8dcd8"],
  ["#efe6e2", "#dcc9c6"],
  ["#f2e9e4", "#e0cdca"],
  ["#ece0dd", "#d3bcb8"],
  ["#f5ece7", "#e5d2ce"],
  ["#e9dcd8", "#cbb2ae"],
];

await mkdir(outGallery, { recursive: true });
await mkdir(outCouple, { recursive: true });

for (let i = 0; i < 6; i += 1) {
  const [from, to] = palettes[i];
  const buffer = await sharp(
    Buffer.from(
      svg({
        width: 1200,
        height: 1200,
        from,
        to,
        inkOpacity: 0.2,
        label: `Photo ${i + 1}`,
        sub: "PLACEHOLDER",
      }),
    ),
  )
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(path.join(outGallery, `image-${i + 1}.jpg`), buffer);
}

const og = await sharp(
  Buffer.from(
    svg({
      width: 1200,
      height: 630,
      from: "#efe6e2",
      to: "#d9c3bf",
      inkOpacity: 0.16,
      label: "Tasnia &amp; Rajib",
      sub: "24 . 10 . 2025",
    }),
  ),
)
  .jpeg({ quality: 84, mozjpeg: true })
  .toBuffer();
await writeFile(path.join(outCouple, "og-image.jpg"), og);

console.log("placeholder images written");
