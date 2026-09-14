import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const wingSvg = `
  <g id="wing-crest">
    <!-- Center vertex -->
    <circle cx="100" cy="155" r="4" fill="#f2ca50" />
    <!-- Main stem curves -->
    <path d="M100 155 C94 125 70 70 30 25" stroke="#f2ca50" stroke-width="3.5" stroke-linecap="round" fill="none" />
    <path d="M100 155 C106 125 130 70 170 25" stroke="#f2ca50" stroke-width="3.5" stroke-linecap="round" fill="none" />
    <!-- Outer primary feather -->
    <path d="M80 120 C64 90 44 55 38 42" stroke="#e0ba55" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M120 120 C136 90 156 55 162 42" stroke="#e0ba55" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- Intermediate feather accents -->
    <path d="M88 135 C66 105 54 80 50 70" stroke="#f2ca50" stroke-width="2.6" stroke-linecap="round" fill="none" />
    <path d="M112 135 C134 105 146 80 150 70" stroke="#f2ca50" stroke-width="2.6" stroke-linecap="round" fill="none" />
    <path d="M72 105 C60 90 52 75 48 68" stroke="#cca138" stroke-width="2.4" stroke-linecap="round" fill="none" />
    <path d="M128 105 C140 90 148 75 152 68" stroke="#cca138" stroke-width="2.4" stroke-linecap="round" fill="none" />
    <!-- Upper delicate tips -->
    <path d="M60 80 C50 62 44 48 38 38" stroke="#f2ca50" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M140 80 C150 62 156 48 162 38" stroke="#f2ca50" stroke-width="2" stroke-linecap="round" fill="none" />
  </g>
`;

async function generateAssets() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Horizontal Logo Dark (Transparent background, perfectly aligned with navbar)
  const logoDarkSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1300" height="220" viewBox="0 0 1300 220" fill="none">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&amp;family=Montserrat:wght@600;700&amp;display=swap');
        .title-dark { font-family: 'Cinzel', 'Liberation Serif', 'Times New Roman', serif; font-size: 76px; font-weight: 800; fill: #ffffff; letter-spacing: 0.16em; }
        .subtitle-dark { font-family: 'Montserrat', 'Liberation Sans', sans-serif; font-size: 22px; font-weight: 700; fill: #f2ca50; letter-spacing: 0.22em; }
      </style>
      <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffe699" stop-opacity="0.9" />
        <stop offset="35%" stop-color="#f2ca50" stop-opacity="1" />
        <stop offset="70%" stop-color="#d4af37" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#8c6c21" stop-opacity="0" />
      </linearGradient>
    </defs>
    <!-- 100% Transparent Background - No bounding rectangle or border box -->
    <g transform="translate(15, 20) scale(1.1)">
      ${wingSvg}
    </g>
    <g transform="translate(235, 0)">
      <text x="0" y="112" class="title-dark">ZEENAT KURESHI</text>
      <line x1="0" y1="134" x2="1000" y2="134" stroke="url(#goldLineGrad)" stroke-width="2.5" stroke-linecap="round" />
      <text x="4" y="172" class="subtitle-dark">FILM PRODUCER  •  TRADE COMMISSIONER  •  NATIONAL PRESIDENT</text>
    </g>
  </svg>
  `;

  // 2. Horizontal Logo Light (Transparent background)
  const logoLightSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1300" height="220" viewBox="0 0 1300 220" fill="none">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&amp;family=Montserrat:wght@600;700&amp;display=swap');
        .title-light { font-family: 'Cinzel', 'Liberation Serif', 'Times New Roman', serif; font-size: 76px; font-weight: 800; fill: #0b0a08; letter-spacing: 0.16em; }
        .subtitle-light { font-family: 'Montserrat', 'Liberation Sans', sans-serif; font-size: 22px; font-weight: 700; fill: #b89345; letter-spacing: 0.22em; }
      </style>
      <linearGradient id="goldLineLight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#d4af37" stop-opacity="0.9" />
        <stop offset="40%" stop-color="#b89345" stop-opacity="1" />
        <stop offset="75%" stop-color="#735515" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#735515" stop-opacity="0" />
      </linearGradient>
    </defs>
    <!-- 100% Transparent Background - No bounding rectangle or border box -->
    <g transform="translate(15, 20) scale(1.1)">
      ${wingSvg}
    </g>
    <g transform="translate(235, 0)">
      <text x="0" y="112" class="title-light">ZEENAT KURESHI</text>
      <line x1="0" y1="134" x2="1000" y2="134" stroke="url(#goldLineLight)" stroke-width="2.5" stroke-linecap="round" />
      <text x="4" y="172" class="subtitle-light">FILM PRODUCER  •  TRADE COMMISSIONER  •  NATIONAL PRESIDENT</text>
    </g>
  </svg>
  `;

  // 3. Monogram Dark
  const monogramDarkSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&amp;display=swap');
        .mono-dark-text { font-family: 'Cinzel', 'Liberation Serif', 'Times New Roman', serif; font-size: 240px; font-weight: 700; fill: #ffffff; letter-spacing: 0.04em; }
      </style>
      <linearGradient id="goldCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5dc8e" />
        <stop offset="50%" stop-color="#d4af37" />
        <stop offset="100%" stop-color="#937227" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="#09090a" />
    <!-- Outer Gold Ring -->
    <circle cx="400" cy="400" r="372" fill="none" stroke="url(#goldCircleGrad)" stroke-width="7" />
    <!-- Inner White Hairline Ring -->
    <circle cx="400" cy="400" r="348" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.85" />
    <!-- Top Wing Crest -->
    <g transform="translate(325, 45) scale(0.75)">
      ${wingSvg}
    </g>
    <!-- ZK Initials -->
    <text x="400" y="520" text-anchor="middle" class="mono-dark-text">ZK</text>
  </svg>
  `;

  // 4. Monogram Light
  const monogramLightSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&amp;display=swap');
        .mono-light-text { font-family: 'Cinzel', 'Liberation Serif', 'Times New Roman', serif; font-size: 240px; font-weight: 700; fill: #0d0c0a; letter-spacing: 0.04em; }
      </style>
      <linearGradient id="goldCircleLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#dfbe6c" />
        <stop offset="50%" stop-color="#b89345" />
        <stop offset="100%" stop-color="#80611a" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="#ffffff" />
    <!-- Outer Gold Ring -->
    <circle cx="400" cy="400" r="372" fill="none" stroke="url(#goldCircleLight)" stroke-width="7" />
    <!-- Inner Black Hairline Ring -->
    <circle cx="400" cy="400" r="348" fill="none" stroke="#0d0c0a" stroke-width="2" opacity="0.85" />
    <!-- Top Wing Crest -->
    <g transform="translate(325, 45) scale(0.75)">
      ${wingSvg}
    </g>
    <!-- ZK Initials -->
    <text x="400" y="520" text-anchor="middle" class="mono-light-text">ZK</text>
  </svg>
  `;

  // Save SVG files for infinite vector fidelity
  fs.writeFileSync(path.join(publicDir, 'zeenat_kureshi_logo_dark.svg'), logoDarkSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'zeenat_kureshi_logo_light.svg'), logoLightSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'zeenat_kureshi_monogram_dark.svg'), monogramDarkSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'zeenat_kureshi_monogram_light.svg'), monogramLightSvg.trim());
  console.log('Saved SVG brand assets.');

  await sharp(Buffer.from(logoDarkSvg)).png({ quality: 100 }).toFile(path.join(publicDir, 'zeenat_kureshi_logo_dark.png'));
  console.log('Created zeenat_kureshi_logo_dark.png');

  await sharp(Buffer.from(logoLightSvg)).png({ quality: 100 }).toFile(path.join(publicDir, 'zeenat_kureshi_logo_light.png'));
  console.log('Created zeenat_kureshi_logo_light.png');

  await sharp(Buffer.from(monogramDarkSvg)).png({ quality: 100 }).toFile(path.join(publicDir, 'zeenat_kureshi_monogram_dark.png'));
  console.log('Created zeenat_kureshi_monogram_dark.png');

  await sharp(Buffer.from(monogramLightSvg)).png({ quality: 100 }).toFile(path.join(publicDir, 'zeenat_kureshi_monogram_light.png'));
  console.log('Created zeenat_kureshi_monogram_light.png');

  // Favicon (64x64 and 32x32 crisp PNG)
  await sharp(Buffer.from(monogramDarkSvg)).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(Buffer.from(monogramDarkSvg)).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon.png and favicon-32x32.png');
}

generateAssets().catch(console.error);
