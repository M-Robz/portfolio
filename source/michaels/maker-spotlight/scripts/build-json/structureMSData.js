// Public modules
const xlsx = require('xlsx');

// Custom modules
const consolidateKeyedData = require('./modules/consolidateKeyedData');
const keyTabularData = require('./modules/keyTabularData');


/* ---- structureMSData ----
 *
 * Convert data from an Excel workbook to the data structure required by the
 * Maker Spotlight project.
 *
 * Inputs:
 *   - wbData (object): Workbook data in the format returned by
 *     `workbookToJsObject`
 *
 * Output (object): Restructured data
 */
function structureMSData(wbData) {
    const primaryTables = {
        featuredMakers: _keySheetData(wbData, 'Featured makers', 'Maker ID', true),
        microMakers: _keySheetData(wbData, 'Micro makers', 'Maker ID', true)
    };
    const secondaryTables = {
        labelsFeatured: _keySheetData(wbData, 'Labels - featured', 'Maker ID', false),
        mySpaceFeatured: _keySheetData(wbData, 'My space - featured', 'Maker ID', false),
        myProjectsFeatured: _keySheetData(wbData, 'My projects - featured', 'Maker ID', false),
        labelsMicro: _keySheetData(wbData, 'Labels - micro', 'Maker ID', false)
    };

    // Add secondary tables to primary tables
    consolidateKeyedData(primaryTables.featuredMakers, secondaryTables.labelsFeatured, 'Labels');
    consolidateKeyedData(primaryTables.featuredMakers, secondaryTables.mySpaceFeatured, 'My space');
    consolidateKeyedData(primaryTables.featuredMakers, secondaryTables.myProjectsFeatured, 'My projects');
    consolidateKeyedData(primaryTables.microMakers, secondaryTables.labelsMicro, 'Labels');

    return primaryTables;
}

/* ---- _keySheetData ----
 *
 * Checks to make sure a specified sheet exists in data from an Excel workbook,
 * then keys the sheet's data by a specified field.
 *
 * Inputs:
 *   - wbData (object): Workbook data in the format returned by
 *     `workbookToJsObject`
 *   - sheetName (string): Name of the sheet
 *   - keyField (string): Name of the field by which to key the data
 *   - keysAreUnique (boolean): Whether each row has a unique value in the key
 *     field
 *
 * Output (object): Keyed data for the sheet
 */
function _keySheetData(wbData, sheetName, keyField, keysAreUnique) {
    let sheetData = wbData[sheetName];
    if (!sheetData) {
        console.log(`Warning: Failed to find worksheet "${sheetName}" in Excel workbook.`);
        return keysAreUnique ? {} : [];
    }
    return keyTabularData(sheetData, keyField, { keysAreUnique });
}

module.exports = structureMSData;
