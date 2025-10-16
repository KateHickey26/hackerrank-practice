// parse a csv file and return an array of objects
const fs = require('fs');
const { parse } = require('path');

// function to parse CSV
function parseCSV(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = text.split('\n');
    if(lines.length === 0 || !text.trim()) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1);
    const result = rows.map(row => {
    
    const values = row.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((header, i) => {
        obj[header] = values[i] || '';
        });
        return obj;
    });

    return result;
}

//lambda-ready function to parse CSV text
function parseCSVText(text) {
    if (!text || !text.trim()) return [];
  
    // Normalize line endings and trim trailing blank lines
    const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(l => l.length > 0);
    if (lines.length === 0) return [];
  
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1);
  
    return rows.map(row => {
      const values = row.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] ?? ''; });
      return obj;
    });
  }

module.exports = { parseCSV, parseCSVText };