const fs = require('fs');
const path = require('path');

exports.readFile = (filePath) => {
    return fs.readFileSync(path.join(__dirname, '../' ,filePath), 'utf-8');
}
