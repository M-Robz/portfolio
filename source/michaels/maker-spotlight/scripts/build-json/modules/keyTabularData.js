/* ---- keyTabularData ----
 *
 * Updated 3/23/2020
 *
 * Converts tabular data into an object keyed by a specified field in the data.
 *
 * The input is expected to be an array of objects, each of which represents a
 * row of data sourced from a tabular format (e.g., a spreadsheet). The keys of
 * each object should correspond to the fields in the original data source.
 *
 * This module will group the rows according to the value of a specified field.
 * Each unique field value will become a key in the returned object, containing
 * an array of objects representing the rows grouped under that field value.
 *
 * For example, say we start with the following data:
 *
 * ```
 * [
 *     {name: "Bob", age: 52, birthplace: "Jakarta"},
 *     {name: "Gertrude", age: 112, birthplace: "Elkhart"},
 *     {name: "Bartholomew", age: 8, birthplace: "Elkhart"}
 * ]
 * ```
 *
 * If we key the data by "birthplace", the resulting output will be:
 *
 * ```
 * {
 *     Jakarta: [
 *         {name: "Bob", age: 52}
 *     ],
 *     Elkhart: [
 *         {name: "Gertrude", age: 112},
 *         {name: "Bartholomew", age: 8}
 *     ]
 * }
 * ```
 *
 * An optional flag can be supplied when the key field in the source table has a
 * unique value in each row (i.e., values are not repeated). The flag indicates
 * that the top-level keys should contain objects as their values, rather than
 * arrays of objects (since there is only one row per key, there is no need for
 * an array with a single member).
 *
 * Using the above example, if there were no row for "Bartholomew", we could
 * supply `keysAreUnique: true`, and the output would be as follows:
 *
 * ```
 * {
 *     Jakarta: {name: "Bob", age: 52},
 *     Elkhart: {name: "Gertrude", age: 112}
 * }
 * ```
 *
 * When the flag is set to `true`, if there are multiple rows with the same
 * value in the key field, only the first row will be included in the output.
 * The additional rows will be ignored.
 *
 * Inputs:
 *   - tabularData (array of objects): Data to be converted
 *   - keyField (string): Name of the field by which to key the data
 *   - options (object, optional): {
 *       - keysAreUnique (boolean, default = false): Whether each row has a
 *         unique value in the key field
 *     }
 *
 * Output (object): Keyed data
 */
function keyTabularData(tabularData, keyField, options = {}) {
    let keysAreUnique = !!options.keysAreUnique;

    let keyedData = {};
    tabularData.forEach(row => {
        let key = row[keyField];
        if (key) {
            if (!keysAreUnique) {
                keyedData[key] = keyedData[key] || [];
                let rowCopy = Object.assign({}, row);
                delete rowCopy[keyField];
                keyedData[key].push(rowCopy);
            } else if (keysAreUnique && !keyedData[key]) {
                let rowCopy = Object.assign({}, row);
                delete rowCopy[keyField];
                keyedData[key] = rowCopy;
            }
        }
    });
    return keyedData;
}

module.exports = keyTabularData;
