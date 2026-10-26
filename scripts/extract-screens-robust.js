import fs from 'fs';
import path from 'path';

function decodeAscii85(str) {
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

  if (count > 0) {
    for (let i = count; i < 5; i++) {
      tuple = tuple * 85 + 84;
    }
    for (let i = 0; i < count - 1; i++) {
      out.push((tuple >> (24 - i * 8)) & 0xff);
    }
  }

  return Buffer.from(out);
}

function extractAll() {
  const outputDir = path.resolve('reference-screens');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfBuf = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
  const pdfStr = pdfBuf.toString('latin1');

  let curPos = 0;
  let screenIndex = 0;

  while (true) {
    const imgPos = pdfStr.indexOf('/Subtype /Image', curPos);
    if (imgPos === -1) break;

    const streamKeyword = 'stream';
    const streamStartPos = pdfStr.indexOf(streamKeyword, imgPos);
    if (streamStartPos === -1) break;

    // Stream content starts after 'stream\r\n' or 'stream\n'
    let contentStart = streamStartPos + streamKeyword.length;
    if (pdfStr[contentStart] === '\r') contentStart++;
    if (pdfStr[contentStart] === '\n') contentStart++;

    const endstreamPos = pdfStr.indexOf('endstream', contentStart);
    if (endstreamPos === -1) break;

    const streamData = pdfStr.slice(contentStart, endstreamPos);
    const decodedJpg = decodeAscii85(streamData);

    screenIndex++;
    const screenName = `screen-${String(screenIndex).padStart(3, '0')}.jpg`;
    const outPath = path.join(outputDir, screenName);
    fs.writeFileSync(outPath, decodedJpg);

    const isJpeg = decodedJpg[0] === 0xFF && decodedJpg[1] === 0xD8;
    console.log(`Saved ${screenName}: ${(decodedJpg.length / 1024).toFixed(1)} KB (Valid JPEG: ${isJpeg})`);

    curPos = endstreamPos + 9;
  }

  console.log(`\nExtracted ${screenIndex} screenshots successfully!`);
}

extractAll();
