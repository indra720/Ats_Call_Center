import fs from 'fs';

const buf = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
const str = buf.toString('latin1');

let idx = 0;
for (let i = 0; i < 3; i++) {
  idx = str.indexOf('/Subtype /Image', idx + 1);
  if (idx === -1) break;
  // Look 200 characters before and after
  const snippet = str.slice(Math.max(0, idx - 150), Math.min(str.length, idx + 250));
  console.log(`--- Image ${i + 1} snippet ---`);
  console.log(snippet);
}
