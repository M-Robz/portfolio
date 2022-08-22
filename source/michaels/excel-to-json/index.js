// Public modules
const appRoot = require('app-root-path');
const deepTrim = require('deep-trim-node');
const fse = require('fs-extra');
const xlsx = require('xlsx');
const yargs = require('yargs');

// Root path for `excel-to-json` script
const excelToJsonRoot = `${appRoot}/scripts/_template/excel-to-json`;


// Read CLI args and configure their options; add a CLI man page
// NOTE: A `default` property can be included in these config objects
const argv = yargs
    .option('book', {
        alias: 'b',
        type: 'string',
        demandOption: false,
        describe: 'Name of the Excel source file (include the file extension, but not the path)',
        group: 'Basic options:'
    })
    .option('sheet', {
        alias: 's',
        type: 'string',
        demandOption: false,
        describe: 'Name of the worksheet (tab) in the Excel file to use as the master source',
        group: 'Basic options:'
    })
    .option('output', {
        alias: 'o',
        type: 'string',
        demandOption: false,
        describe: 'Name of the file to write the master JSON output to (omit the path and file extension)',
        group: 'Basic options:'
    })
    .option('notrack', {
        alias: 'n',
        type: 'boolean',
        demandOption: false,
        describe: '(flag) If this option is specified, write JSON output to the untracked `scripts/_template/excel-to-json/_build` directory instead of `src/data`',
        group: 'Basic options:'
    })
    .option('spliton', {
        alias: 'f',
        type: 'string',
        demandOption: false,
        describe: 'Name of the field (column) according to which the data should be split',
        group: 'Splitting/joining worksheets:'
    })
    .option('join', {
        alias: 'j',
        type: 'boolean',
        demandOption: false,
        describe: '(flag) If this option is specified and `spliton` is not provided, join all of the worksheets into a single master sheet',
        group: 'Splitting/joining worksheets:'
    })
    .option('all', {
        alias: 'a',
        type: 'boolean',
        demandOption: false,
        describe: '(flag) If this option is specified and either `spliton` or `join` is provided, output JSON for the master sheet and all partial sheets',
        group: 'Splitting/joining worksheets:'
    })
    .help()
    .argv;
let workbookName = argv.book,
    masterName = argv.sheet,
    outputFileName = argv.output,
    splitField = argv.spliton,
    joinSheets = argv.join,
    writeAllFiles = argv.all,
    dontTrack = argv.notrack;

// If workbook name was not provided, get name of first Excel workbook in
// `_xlsx` directory
if (workbookName === undefined) {
    let filesInXlsxDir = fse.readdirSync(`${excelToJsonRoot}/_xlsx`);
    workbookName = filesInXlsxDir.find(fileName => /\.xlsx?$/.test(fileName));
}

// Read workbook and convert to JS object
var wb;
try {
    wb = xlsx.readFile(`${excelToJsonRoot}/_xlsx/${workbookName}`);
} catch (e) {
    if (e.code === 'ENOENT') {
        console.error(`Error: Failed to load Excel workbook from "${excelToJsonRoot}/_xlsx/${workbookName}".`);
    } else {
        console.error(`Error (code: ${e.code})`);
    }
    return;
}
let wbData = workbookToJsObject(wb);

if (masterName) {
    // Error if specified master sheet is not found
    if (!wb.Sheets[masterName]) {
        console.error(`Error: Failed to find worksheet "${masterName}" in Excel workbook.`);
        return;
    }
} else {
    // If no master was specified, set first sheet as master
    masterName = Object.keys(wb.Sheets)[0];
}

if (splitField) {
    // If a field to split the data on was provided, split the master sheet into
    // partial sheets

    // Assign rows in master sheet to a new object, grouped according to their
    // values in the split field
    let splitData = {};
    wbData[masterName].forEach(row => {
        let value = row[splitField];
        if (value) {
            if (!splitData[value]) splitData[value] = [];
            splitData[value].push(row);
        }
    });

    // Write JSON output
    writeFiles({
        compositeData: writeAllFiles ? wbData[masterName] : null,
        dataPartials: splitData
    });

} else if (joinSheets) {
    // If the `join` option was specified, consolidate the sheets into a new
    // master

    // Concatenate all sheets into a new master sheet
    let joinedData = [];
    Object.values(wbData).forEach(sheet => {
        joinedData = joinedData.concat(sheet);
    });

    // Write JSON output
    writeFiles({
        compositeData: joinedData,
        dataPartials: writeAllFiles ? wbData : null
    });

} else {
    // Write the master sheet to a single JSON file
    writeFiles({
        compositeData: wbData[masterName]
    });
}


/* ---- workbookToJsObject ----
 *
 * Convert an Excel workbook parsed by the `xlsx` module to a JS object
 * containing the data from all worksheets.
 *
 * Inputs:
 *   - workbook (object): The Excel workbook, parsed by the `xlsx` module
 *
 * Output (object): Data from all worksheets; each key contains the data from an
 * individual sheet, as an array of objects representing rows
 */
function workbookToJsObject(workbook) {
    let data = {};
    for (let [key, sheet] of Object.entries(workbook.Sheets)) {

        // Convert the sheet to an array
        let sheetArray = xlsx.utils.sheet_to_json(sheet, {
            raw: false,
            defval: ''
        });

        // Trim leading/trailing whitespace chars, and assign to the returned
        // object
        data[key] = deepTrim(sheetArray);
    }
    return data;
}

/* ---- writeFiles ----
 *
 * Write data from the master sheet and all partial sheets to JSON files.
 *
 * Inputs:
 *   - compositeData (array of objects): Data from the master sheet
 *   - dataPartials (object): Data from the partial sheets
 *
 * Output: none
 */
function writeFiles({ compositeData, dataPartials }) {
    if (!compositeData && !dataPartials) return;

    let outputDir = dontTrack ? `${excelToJsonRoot}/_build`
        :
        `${appRoot}/src/data`
    ;

    if (dontTrack) fse.emptyDirSync(outputDir);

    if (compositeData) {
        let fileName = outputFileName ? formatForFileName(outputFileName)
            :
            dataPartials ? 'master'
            :
            'data'
        ;
        fse.writeJson(
            `${outputDir}/${fileName}.json`,
            compositeData
        );
    }

    if (dataPartials) {
        for (let [key, partial] of Object.entries(dataPartials)) {
            fse.writeJson(
                `${outputDir}/${formatForFileName(key)}.json`,
                partial
            );
        }
    }

    console.log(`---------------\nConversion complete. Output file(s) written to "${outputDir}".`);
}

/* ---- formatForFileName ----
 *
 * Convert sequences of special characters within a string, and convert it to
 * lowercase, so that it can be used as the name of a file.
 *
 * Inputs:
 *   - str (string): The string to be formatted
 *
 * Output (string): The formatted string
 */
function formatForFileName(str) {
    return str
        .toLowerCase()
        .replace(/\u00E9/g, 'e')
        .replace(/[^a-z0-9]+/g, '-')
    ;
}
