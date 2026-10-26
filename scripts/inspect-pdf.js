import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

async function inspect() {
  const dataBuffer = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
  
  const pagesText = [];
  const options = {
    pagerender: function(pageData) {
      return pageData.getTextContent().then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
          if (lastY == item.transform[5] || !lastY){
            text += ' ' + item.str;
          } else {
            text += '\n' + item.str;
          }
          lastY = item.transform[5];
        }
        pagesText.push(text);
        return text;
      });
    }
  };

  const data = await pdf(dataBuffer, options);
  console.log(`Total Pages: ${data.numpages}`);
  
  const summary = pagesText.map((pText, i) => {
    const lines = pText.split('\n').map(l => l.trim()).filter(Boolean);
    return {
      page: i + 1,
      firstLines: lines.slice(0, 10),
      rawLength: pText.length,
      sampleText: lines.slice(0, 30).join(' | ')
    };
  });

  fs.writeFileSync('scripts/pdf_summary.json', JSON.stringify(summary, null, 2));
  console.log('Saved summary to scripts/pdf_summary.json');
}

inspect().catch(console.error);
