const { parseCSV } = require('../parseCSV');
const fs = require('fs');

jest.mock('fs');

describe('parseCSV', () => {
    it('should return an empty array if the file is empty', () => {
        fs.readFileSync.mockReturnValue('');
        const result = parseCSV('empty.csv');
        expect(result).toEqual([]);
    });

    it('should parse a CSV file with a single row of data', () => {
        const csvContent = 'name,age\nJohn,30';
        fs.readFileSync.mockReturnValue(csvContent);

        const result = parseCSV('singleRow.csv');
        expect(result).toEqual([{ name: 'John', age: '30' }]);
    });

    it('should parse a CSV file with multiple rows of data', () => {
        const csvContent = 'name,age\nJohn,30\nJane,25';
        fs.readFileSync.mockReturnValue(csvContent);

        const result = parseCSV('multipleRows.csv');
        expect(result).toEqual([
            { name: 'John', age: '30' },
            { name: 'Jane', age: '25' },
        ]);
    });

    it('should trim whitespace from headers and values', () => {
        const csvContent = ' name , age \n John , 30 ';
        fs.readFileSync.mockReturnValue(csvContent);

        const result = parseCSV('trimmed.csv');
        expect(result).toEqual([{ name: 'John', age: '30' }]);
    });

    it('should handle missing values in rows', () => {
        const csvContent = 'name,age\nJohn,30\nJane,';
        fs.readFileSync.mockReturnValue(csvContent);

        const result = parseCSV('missingValues.csv');
        expect(result).toEqual([
            { name: 'John', age: '30' },
            { name: 'Jane', age: '' },
        ]);
    });
});