/* ---- trimTabularData ----
 *
 * Trims leading and trailing whitespace characters from tabular data using
 * `String.prototype.trim()`. Every field in the data whose value is a string
 * will be trimmed.
 *
 * The input is expected to be an array of objects, each of which represents a
 * row of data sourced from a tabular format (e.g., a spreadsheet).
 *
 * NOTE: This modifies objects in the input array directly (without creating a
 * copy), and returns a reference to the input array.
 *
 * Inputs:
 *   - data (array of objects): Data to be trimmed
 *
 * Output (array of objects): A reference to the input data with values trimmed
 */
function trimTabularData(data) {
    data.forEach(row => {
        Object.keys(row).forEach(key => {
            if (typeof row[key] === 'string') row[key] = row[key].trim();
        });
    });
    return data;
}

module.exports = trimTabularData;
