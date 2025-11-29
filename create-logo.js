const sharp = require('sharp');

const svg = `
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="128" height="128" rx="24" fill="url(#grad)"/>
  
  <circle cx="64" cy="64" r="45" fill="none" stroke="white" stroke-width="3"/>
  <circle cx="64" cy="64" r="4" fill="white"/>
  
  <line x1="64" y1="64" x2="64" y2="40" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="64" y1="64" x2="78" y2="64" stroke="white" stroke-width="3" stroke-linecap="round"/>
  
  <rect x="95" y="50" width="8" height="8" fill="white" opacity="0.8" rx="1"/>
  <rect x="95" y="62" width="8" height="8" fill="white" opacity="0.8" rx="1"/>
  <rect x="95" y="74" width="8" height="8" fill="white" opacity="0.8" rx="1"/>
  
  <path d="M 25 85 Q 25 95 35 95 L 45 95 M 35 85 L 35 95 L 25 90" fill="white" opacity="0.8" stroke="white" stroke-width="1.5"/>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('icon.png')
  .then(info => {
    console.log('✅ Logo created successfully!');
    console.log('File: icon.png');
    console.log('Size:', info.size, 'bytes');
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
