// Public modules
const appRoot = require('app-root-path');
const fs = require('fs-extra');
const xlsx = require('xlsx');

// Root path for `_xlsx` directory
const xlsxDir = `${appRoot}/scripts/pre-build/project/_xlsx`;

// Custom modules
const structureMSData = require('./structureMSData');
const workbookToJsObject = require('./modules/workbookToJsObject');


// Get name of first Excel workbook in `_xlsx` directory
const filesInXlsxDir = fs.readdirSync(xlsxDir);
const workbookName = filesInXlsxDir.find(fileName => /\.xlsx?$/.test(fileName));

// Read workbook and convert to object
var wb;
try {
    wb = xlsx.readFile(`${xlsxDir}/${workbookName}`);
} catch (e) {
    if (e.code === 'ENOENT') {
        console.log(`Error: Failed to load Excel workbook from "${xlsxDir}/${workbookName}".`);
    } else {
        console.log(`Error (code: ${e.code})`);
    }
    return;
}
const wbData = workbookToJsObject(wb);

// Consolidate worksheets into a custom data structure for Maker Spotlight
const structuredData = structureMSData(wbData);

// Write data to JSON file
fs.ensureDirSync(`${appRoot}/src/data`);
fs.writeJson(`${appRoot}/src/data/makers.json`, structuredData);
console.log(`---------------\nBuild complete. Output written to "${appRoot}/src/data/makers.json".`);
