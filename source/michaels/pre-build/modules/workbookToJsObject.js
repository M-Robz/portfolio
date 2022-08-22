const deepTrim = require('deep-trim-node');
const xlsx = require('xlsx');

/* ---- workbookToJsObject ----
 *
 * Version 1.0.0
 * 3/12/2021
 *
 * Converts an Excel workbook parsed by the `xlsx` module to a JS object
 * containing the data from all worksheets.
 *
 * Inputs:
 *   - workbook (object): The Excel workbook, parsed by the `xlsx` module
 *
 * Output (object): Data from all worksheets; each key contains the data from an
 * individual sheet, as an array of objects representing rows
 */
function workbookToJsObject(workbook) {
    const data = {};
    for (const [key, sheet] of Object.entries(workbook.Sheets)) {

        // Convert the sheet to an array
        const sheetArray = xlsx.utils.sheet_to_json(sheet, {
            raw: false,
            defval: ''
        });

        // Trim leading/trailing whitespace chars, and assign to the returned
        // object
        data[key] = deepTrim(sheetArray);
    }
    return data;
}

module.exports = workbookToJsObject;
