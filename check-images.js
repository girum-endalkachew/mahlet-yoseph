const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'images');

function scanDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true }).map(f => f.toString().replace(/\\/g, '/'));
}

console.log('--- 🔍 Scanning public/images directory ---');
const files = scanDir(baseDir);
console.log('Found files:');
files.forEach(f => console.log('  -> public/images/' + f));

// Auto-fix extensions if user saved as .png or .jpeg
const requiredImages = [
  'hero/hero-main.jpg',
  'collections/forgotten-gym-bag.jpg',
  'collections/2000s-athlete.jpg',
  'collections/90s-sports-club.jpg',
  'collections/aerobics-archive.jpg',
  'collections/sunday-morning-athlete.jpg',
  'collections/girls-locker-room.jpg',
  'products/capri-track-pant.jpg',
  'products/tear-away-track-pant.jpg',
  'products/warm-up-jacket.jpg',
  'products/tennis-skirt.jpg',
  'products/stirrup-leggings.jpg',
  'products/parachute-pants.jpg',
  'products/bodysuit.jpg',
  'products/mesh-jersey-set.jpg',
  'products/3d-product-story.jpg',
  'cta/move-differently.jpg'
];

console.log('\n--- 📋 Checking required files ---');
requiredImages.forEach(req => {
  const fullPath = path.join(baseDir, req);
  if (fs.existsSync(fullPath)) {
    console.log('✅ Found:', req);
  } else {
    // Check if equivalent exists with different extension
    const parsed = path.parse(fullPath);
    const altExts = ['.png', '.jpeg', '.JPG', '.PNG', '.webp'];
    let foundAlt = false;
    for (const ext of altExts) {
      const altPath = path.join(parsed.dir, parsed.name + ext);
      if (fs.existsSync(altPath)) {
        fs.copyFileSync(altPath, fullPath);
        console.log(`✨ Auto-converted: ${parsed.name}${ext} -> ${req}`);
        foundAlt = true;
        break;
      }
    }
    if (!foundAlt) {
      console.log('❌ Missing:', req);
    }
  }
});
