import sharp from 'sharp';

const width = 2560;
const height = 1440;

async function run() {
  // 1. Training Background: volumetric top spotlights + center atmosphere + dust specks
  const trainingSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="centerGlow" cx="42%" cy="48%" r="50%">
          <stop offset="0%" stop-color="#404040" stop-opacity="0.65" />
          <stop offset="30%" stop-color="#262626" stop-opacity="0.4" />
          <stop offset="65%" stop-color="#141414" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="1" />
        </radialGradient>

        <linearGradient id="topSpot" x1="45%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14" />
          <stop offset="25%" stop-color="#ffffff" stop-opacity="0.07" />
          <stop offset="60%" stop-color="#ffffff" stop-opacity="0.015" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>

        <linearGradient id="angledBeam" x1="22%" y1="0%" x2="45%" y2="80%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10" />
          <stop offset="35%" stop-color="#ffffff" stop-opacity="0.03" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>

        <linearGradient id="topShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#040404" stop-opacity="0.9" />
          <stop offset="35%" stop-color="#040404" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#040404" stop-opacity="0" />
        </linearGradient>

        <filter id="blurSoft"><feGaussianBlur stdDeviation="40" /></filter>
        <filter id="blurHeavy"><feGaussianBlur stdDeviation="80" /></filter>
      </defs>

      <rect width="100%" height="100%" fill="#090909" />
      <rect width="100%" height="100%" fill="url(#centerGlow)" />

      <polygon points="600,-50 1450,-50 1250,1490 350,1490" fill="url(#topSpot)" filter="url(#blurSoft)" />
      <polygon points="100,-50 750,-50 1600,1490 800,1490" fill="url(#angledBeam)" filter="url(#blurHeavy)" />

      <ellipse cx="1050" cy="660" rx="580" ry="380" fill="#ffffff" opacity="0.045" filter="url(#blurHeavy)" />
      <ellipse cx="880" cy="520" rx="400" ry="250" fill="#ffffff" opacity="0.05" filter="url(#blurHeavy)" />

      <!-- Floating chalk dust particles catching the light -->
      <circle cx="820" cy="380" r="2.6" fill="#ffffff" opacity="0.55" />
      <circle cx="960" cy="440" r="1.8" fill="#ffffff" opacity="0.45" />
      <circle cx="1120" cy="490" r="2.8" fill="#ffffff" opacity="0.6" />
      <circle cx="750" cy="580" r="2.0" fill="#ffffff" opacity="0.4" />
      <circle cx="1050" cy="620" r="2.4" fill="#ffffff" opacity="0.65" />
      <circle cx="890" cy="710" r="1.7" fill="#ffffff" opacity="0.35" />
      <circle cx="1240" cy="540" r="1.9" fill="#ffffff" opacity="0.4" />
      <circle cx="680" cy="420" r="1.6" fill="#ffffff" opacity="0.3" />
      <circle cx="990" cy="310" r="3.0" fill="#ffffff" opacity="0.5" />
      <circle cx="1150" cy="390" r="2.2" fill="#ffffff" opacity="0.45" />
      <circle cx="790" cy="670" r="1.7" fill="#ffffff" opacity="0.35" />
      <circle cx="1080" cy="750" r="2.5" fill="#ffffff" opacity="0.4" />
      <circle cx="920" cy="820" r="1.5" fill="#ffffff" opacity="0.3" />

      <rect width="100%" height="300" fill="url(#topShadow)" />
      <rect y="1200" width="100%" height="240" fill="#080808" opacity="0.95" />
    </svg>
  `);

  await sharp(trainingSvg).webp({ quality: 95, effort: 6 }).toFile('public/images/training-bg.webp');
  console.log('Generated public/images/training-bg.webp');

  // 2. Goals Background: angled spotlight beam from top-left, atmospheric mist, dust particles
  const goalsSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goalsBeam" x1="0%" y1="0%" x2="55%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16" />
          <stop offset="25%" stop-color="#ffffff" stop-opacity="0.08" />
          <stop offset="60%" stop-color="#ffffff" stop-opacity="0.02" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>

        <radialGradient id="goalsCardGlow" cx="20%" cy="65%" r="38%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10" />
          <stop offset="35%" stop-color="#ffffff" stop-opacity="0.03" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="topAtmosphere" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stop-color="#2c2c2c" stop-opacity="0.5" />
          <stop offset="45%" stop-color="#161616" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#080808" stop-opacity="0" />
        </radialGradient>

        <filter id="gBlurSoft"><feGaussianBlur stdDeviation="45" /></filter>
        <filter id="gBlurHeavy"><feGaussianBlur stdDeviation="90" /></filter>
      </defs>

      <rect width="100%" height="100%" fill="#080808" />
      <rect width="100%" height="100%" fill="url(#topAtmosphere)" />

      <polygon points="-50,-80 500,-80 1600,1520 850,1520" fill="url(#goalsBeam)" filter="url(#gBlurSoft)" />
      <polygon points="80,-80 800,-80 1950,1520 1100,1520" fill="url(#goalsBeam)" opacity="0.7" filter="url(#gBlurHeavy)" />

      <rect width="100%" height="100%" fill="url(#goalsCardGlow)" />

      <circle cx="280" cy="180" r="2.8" fill="#ffffff" opacity="0.55" />
      <circle cx="420" cy="240" r="2.0" fill="#ffffff" opacity="0.5" />
      <circle cx="350" cy="320" r="2.5" fill="#ffffff" opacity="0.6" />
      <circle cx="560" cy="290" r="1.8" fill="#ffffff" opacity="0.4" />
      <circle cx="480" cy="420" r="3.0" fill="#ffffff" opacity="0.5" />
      <circle cx="290" cy="510" r="2.2" fill="#ffffff" opacity="0.4" />
      <circle cx="620" cy="460" r="1.9" fill="#ffffff" opacity="0.4" />
      <circle cx="750" cy="380" r="2.4" fill="#ffffff" opacity="0.45" />
      <circle cx="410" cy="620" r="2.3" fill="#ffffff" opacity="0.4" />
      <circle cx="520" cy="720" r="1.8" fill="#ffffff" opacity="0.3" />
      <circle cx="840" cy="530" r="1.6" fill="#ffffff" opacity="0.35" />
      <circle cx="670" cy="610" r="2.6" fill="#ffffff" opacity="0.4" />

      <rect y="1250" width="100%" height="190" fill="#080808" opacity="0.9" />
    </svg>
  `);

  await sharp(goalsSvg).webp({ quality: 95, effort: 6 }).toFile('public/images/goals-bg.webp');
  console.log('Generated public/images/goals-bg.webp');
}

run();