import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

async function main() {
  const buffer = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
  const uint8 = new Uint8Array(buffer);
  const parser = new PDFParse(uint8);
  
  console.log('Parsing PDF...');
  const textResult = await parser.getText();
  console.log('Total characters extracted:', textResult.text.length);
  console.log('Pages count:', textResult.pages?.length || 'N/A');
  
  if (textResult.pages && textResult.pages.length > 0) {
    const summary = textResult.pages.map((p, idx) => ({
      page: idx + 1,
      textPreview: p.text.slice(0, 300).replace(/\s+/g, ' ')
    }));
    fs.writeFileSync('scripts/pdf_pages.json', JSON.stringify(summary, null, 2));
    console.log('Wrote scripts/pdf_pages.json');
  } else {
    fs.writeFileSync('scripts/pdf_full_text.txt', textResult.text);
    console.log('Wrote scripts/pdf_full_text.txt');
  }
}

main().catch(console.error);
