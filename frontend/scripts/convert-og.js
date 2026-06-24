const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assets = path.join(__dirname, '..', 'assets');
const svgs = [
  'og-index.svg','og-info-security.svg','og-quality.svg','og-design.svg','og-ai.svg','og-webinars.svg','og-login.svg'
];

async function convert(name){
  const inPath = path.join(assets, name);
  const outName = name.replace(/\.svg$/,'') + '.png';
  const outPath = path.join(assets, outName);
  if(!fs.existsSync(inPath)) return console.warn('Missing', inPath);
  try{
    await sharp(inPath).png().resize(1200,630).toFile(outPath);
    console.log('Wrote', outPath);
  }catch(e){
    console.error('Failed', name, e.message);
  }
}

(async ()=>{
  for(const s of svgs) await convert(s);
})();
