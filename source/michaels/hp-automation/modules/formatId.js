const formatKebabCase = require('./formatKebabCase');
const stripAccents = require('./stripAccents');

/* ---- formatId ----
 *
 * Formats a string for use as an ID attribute.
 *
 * Inputs:
 *   - str (string): The string to be formatted
 *
 * Output (string): The formatted string
 */
function formatId(str) {
    return formatKebabCase(stripAccents(str));
}

module.exports = formatId;
