// Public modules
const appRoot = require('app-root-path');
const beautify = require('js-beautify').html;
const fs = require('fs-extra');
const xlsx = require('xlsx');
const yargs = require('yargs');

// Custom modules
const importTemplates = require(`${appRoot}/hp-automation/modules/importTemplates`);
const keyTabularData = require(`${appRoot}/hp-automation/modules/keyTabularData`);
const trimTabularData = require(`${appRoot}/hp-automation/modules/trimTabularData`);


// Import templates and attach to global object
global.templates = importTemplates(`${appRoot}/hp-automation/templates`);

// Read CLI args
//   This also configures aliases, designates all args as required, and adds a
//   CLI man page
const argv = yargs
    .option('template', {
        alias: 't',
        describe: 'File name of the page template'
    })
    .option('book', {
        alias: 'b',
        describe: 'Name of the XLSX source file'
    })
    .option('sheet', {
        alias: 's',
        describe: 'Name of the worksheet tab in the Excel file'
    })
    .option('date', {
        alias: 'd',
        describe: 'Six-digit date in the format `YYMMDD`'
    })
    .option('output', {
        alias: 'o',
        describe: 'Name of the file to write HTML output to (omit the date substring)'
    })
    .demandOption(['template', 'book', 'sheet', 'date', 'output'])
    .help()
    .argv;
const templateName = argv.template;
const workbookName = argv.book;
const worksheetName = argv.sheet;
const outputFileName = argv.output;
const date = argv.date;

// Store reference to specified page template
const pageTemplate = global.templates.pages[templateName];
if (!pageTemplate) {
    console.log(`Error: Failed to load page template from "${appRoot}/hp-automation/templates/pages/${templateName}.js".`);
    return;
}

// Read from XLSX file to array of objects representing tabular data
let wb;
try {
    wb = xlsx.readFile(`${appRoot}/hp-automation/_data/${workbookName}.xlsx`);
} catch (e) {
    if (e.code === 'ENOENT') {
        console.log(`Error: Failed to load Excel workbook from "${appRoot}/hp-automation/_data/${workbookName}.xlsx".`);
    } else {
        console.log(`Error (code: ${e.code})`);
    }
    return;
}
const ws = wb.Sheets[worksheetName];
if (!ws) {
    console.log(`Error: Failed to find worksheet "${worksheetName}" in Excel workbook.`);
    return;
}
let data = xlsx.utils.sheet_to_json(ws, {
    raw: false,
    range: 'A1:BZ999', // Limit range because sheets have sometimes had thousands of empty rows
    defval: ''
});

// Trim leading/trailing whitespace chars from data
data = trimTabularData(data);

// Convert data to an object keyed first by section, and then subsection
data = structureData(data);

// Pass data to template, which returns markup string
let markup = pageTemplate(data, date);

// Make it pretty
markup = beautify(markup, {
    'preserve-newlines': false
});

// Write markup to output HTML file
fs.ensureDirSync(`${appRoot}/hp-automation/_build`);
fs.writeFileSync(`${appRoot}/hp-automation/_build/${date}-${outputFileName}.html`, markup);
console.log(`---------------\nBuild complete. Output written to "${appRoot}/hp-automation/_build/${date}-${outputFileName}.html".`);

console.log('---------------\nHTML Validation');

(async () => {
    const validator = require('html-validator')
    const { readFileSync } = require('fs')
    const options = {
      url: '',
      format: 'html',
      data: readFileSync(`${appRoot}/hp-automation/_build/${date}-${outputFileName}.html`, 'utf8'),
      isFragment: true,
      validator: 'WHATWG',
      ignore: [
          'heading-level',
          'no-raw-characters'
      ]
    }

    try {
      const result = await validator(options)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  })()


/*
 * Convert the Excel data to an object keyed first by section, and then
 * subsection.
 *
 * Structure of output:
 *
 * ```
 * {
 *     SECTION_NAME: {
 *         SUBSECTION_NAME: [
 *             // block data
 *         ],
 *         // additional subsections
 *     },
 *     // additional sections
 * }
 * ```
 */
function structureData(data) {

    // Key by section
    const keyedBySection = keyTabularData(data, 'Section');

    // Key each section by subsection
    const keyedBySub = {};
    for (const [sectionName, sectionData] of Object.entries(keyedBySection)) {
        keyedBySub[sectionName] = keyTabularData(sectionData, 'Subsection');
    }

    return keyedBySub;
}
