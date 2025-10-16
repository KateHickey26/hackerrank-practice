// parse a csv file and return an array of objects
const fs = require('fs');


// function to parse CSV
export function parseCSV(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = text.split('\n');
    if(lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1);
    
}