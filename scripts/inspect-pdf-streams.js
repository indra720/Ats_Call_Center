import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('DOVIx-AI-CALL-CENTER_UI_SCREEN.pdf');
const str = buf.toString('latin1');

const matches = str.match(/\/Subtype\s*\/Image/g);
console.log('Total /Subtype /Image found:', matches?.length || 0);

const filterMatches = str.match(/\/Filter\s*\/([a-zA-Z0-9_]+)/g);
console.log('Sample filters:', Array.from(new Set(filterMatches || [])).slice(0, 10));
