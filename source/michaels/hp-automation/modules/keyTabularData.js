/* ---- keyTabularData ----
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
 * Inputs:
 *   - tabularData (array of objects): Data to be converted
 *   - keyField (string): Name of the field by which to key the data
 *
 * Output (object): Keyed data
 */
function keyTabularData(tabularData, keyField) {
    let keyedData = {};
    tabularData.forEach(row => {
        let key = row[keyField];
        if (key) {
            keyedData[key] = keyedData[key] || [];
            let rowCopy = Object.assign({}, row);
            delete rowCopy[keyField];
            keyedData[key].push(rowCopy);
        }
    });
    return keyedData;
}

module.exports = keyTabularData;
