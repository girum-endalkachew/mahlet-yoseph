const fs = require('fs');
const path = require('path');

const cssContent = `@import "tailwindcss";

::selection {
  background-color: #B89DA4;
  color: #E7DED5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), serif;
  font-weight: 400;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

fs.writeFileSync(path.join(__dirname, 'app', 'globals.css'), cssContent, { encoding: 'utf8' });

const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('✅ Next.js build cache cleared.');
  } catch (err) {
    console.log('⚠️ Note: Stop "npm run dev" before running this if .next is locked.');
  }
}

console.log('✅ app/globals.css written cleanly without BOM!');
