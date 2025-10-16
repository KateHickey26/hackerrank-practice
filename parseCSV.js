// parse a csv file and return an array of objects
const fs = require('fs');


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

module.exports = { parseCSV };