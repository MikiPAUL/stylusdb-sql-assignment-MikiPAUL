const fs = require('fs');
const csv = require('csv-parser');

function readCSV(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .on('error', (error) => {
                if (error.code === 'ENOENT') {
                    reject(new Error('Invalid file path: ' + filePath));
                }
                reject(error);
            })
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            })
    });
}

module.exports = readCSV;