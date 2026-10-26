import fs from 'fs';
import path from 'path';

// Adobe Ascii85 Decoder
function decodeAscii85(str) {
  // Strip whitespace and optional <~ and ~>
  str = str.replace(/\s+/g, '');
  if (str.startsWith('<~')) str = str.slice(2);
  const endIdx = str.indexOf('~>');
  if (endIdx !== -1) str = str.slice(0, endIdx);

  const out = [];
  let tuple = 0;
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (str[i] === 'z' && count === 0) {
      out.push(0, 0, 0, 0);
      continue;
    }
    if (c < 33 || c > 117) continue;

    tuple = tuple * 85 + (c - 33);
    count++;

    if (count === 5) {
      out.push((tuple >> 24) & 0xff);
      out.push((tuple >> 16) & 0xff);
      out.push((tuple >> 8) & 0xff);
      out.push(tuple & 0xff);
      tuple = 0;
      count = 0;
    }
  }

  // Handle remaining characters
  if (count > 0) {
    for (let i = count; i < 5; i++) {
      tuple = tuple * 85 + 84; // pad with 'u' (117 - 33 = 84)
    }
    for (let i = 0; i < count - 1; i++) {
      out.push((tuple >> (24 - i * 8)) & 0xff);
    }
  }

  return Buffer.from(out);
}

// Test extraction of all 87 images
function extractAllImages() {
  const outputDir = path.resolve('reference-screens');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfBuf = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
  const pdfStr = pdfBuf.toString('latin1');

  // Regex to find image objects with stream
  const imgRegex = /<<[^>]*\/Subtype\s*\/Image[^>]*>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/g;

  let match;
  let screenIndex = 0;

  while ((match = imgRegex.exec(pdfStr)) !== null) {
    screenIndex++;
    const rawStream = match[1];
    const decodedJpg = decodeAscii85(rawStream);

    const screenName = `screen-${String(screenIndex).padStart(3, '0')}.jpg`;
    const outPath = path.join(outputDir, screenName);
    fs.writeFileSync(outPath, decodedJpg);

    console.log(`Saved ${screenName}: ${(decodedJpg.length / 1024).toFixed(1)} KB (Magic: ${decodedJpg[0].toString(16)} ${decodedJpg[1].toString(16)} ${decodedJpg[2].toString(16)})`);
  }

  console.log(`\nSuccessfully extracted ${screenIndex} screenshots to ${outputDir}!`);
}

extractAllImages();
