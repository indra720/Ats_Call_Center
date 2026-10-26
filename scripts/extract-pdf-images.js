import fs from 'fs';
import path from 'path';

// Extract embedded JPEGs from PDF
async function extractJpegs() {
  const outputDir = path.resolve('reference-screens');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfBuf = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
  console.log(`PDF size: ${(pdfBuf.length / (1024 * 1024)).toFixed(2)} MB`);

  let count = 0;
  let pos = 0;

  // Search for JPEG magic bytes FF D8 FF ... FF D9
  const jpegStart = Buffer.from([0xFF, 0xD8, 0xFF]);
  const jpegEnd = Buffer.from([0xFF, 0xD9]);

  while (pos < pdfBuf.length) {
    const startIdx = pdfBuf.indexOf(jpegStart, pos);
    if (startIdx === -1) break;

    const endIdx = pdfBuf.indexOf(jpegEnd, startIdx + 3);
    if (endIdx === -1) break;

    const imageLength = (endIdx + 2) - startIdx;
    
    // Only capture reasonable UI screenshot size (> 20KB)
    if (imageLength > 20000) {
      count++;
      const screenNum = String(count).padStart(3, '0');
      const filename = path.join(outputDir, `screen-${screenNum}.jpg`);
      const imgBuffer = pdfBuf.subarray(startIdx, endIdx + 2);
      fs.writeFileSync(filename, imgBuffer);
      console.log(`Extracted screen-${screenNum}.jpg (${(imageLength / 1024).toFixed(1)} KB)`);
    }

    pos = endIdx + 2;
  }

  console.log(`\nExtracted ${count} images into ${outputDir}`);
}

extractJpegs().catch(console.error);
