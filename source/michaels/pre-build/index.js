// Public modules
const appRoot = require('app-root-path');
const beautify = require('js-beautify').html;
const fse = require('fs-extra');
const xlsx = require('xlsx');

// Custom modules
const copyToClipboard = require('./modules/copyToClipboard');
const readArgs = require('./modules/readArgs');
const workbookToJsObject = require('./modules/workbookToJsObject');

// Project-specific config and builder script
const config = require('../project/config');
const builder = require('../project/builder');


// Root path for `pre-build` script
const preBuildRoot = `${appRoot}/scripts/pre-build`;

// Read options passed via command line
const args = readArgs(config.cliOptions);
let workbookName = args.book;

// If workbook name was not provided, get name of first Excel workbook in
// `_xlsx` directory
if (!workbookName) {
    const filesInXlsxDir = fse.readdirSync(`${preBuildRoot}/project/_xlsx`);
    workbookName = filesInXlsxDir.find(fileName => /\.xlsx?$/.test(fileName));
    if (!workbookName) {
        console.error(`Error: Did not find any Excel workbooks in "${preBuildRoot}/project/_xlsx".`);
        return;
    }
}

// Read workbook and convert to object
let wb;
try {
    wb = xlsx.readFile(`${preBuildRoot}/project/_xlsx/${workbookName}`);
} catch (e) {
    if (e.code === 'ENOENT') {
        console.error(`Error: Failed to load Excel workbook from "${preBuildRoot}/project/_xlsx/${workbookName}".`);
    } else {
        console.error(e);
    }
    return;
}
const wbData = workbookToJsObject(wb);

// Generate markup with project-specific builder script
let markup;
try {
    markup = builder(wbData, args, config);
} catch (e) {
    console.error(e);
    return;
}

// Copy output to clipboard
copyToClipboard(
    beautify(markup, { 'preserve-newlines': false })
);

console.log('---------------\nFinished pre-build. HTML output copied to clipboard.');
