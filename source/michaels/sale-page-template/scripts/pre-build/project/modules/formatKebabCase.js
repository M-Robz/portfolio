/* ---- formatKebabCase ----
 *
 * Version 2.0.0
 * 1/8/2021
 *
 * Converts a string to kebab case.
 *
 * Inputs:
 *   - str (string): The string to be formatted
 *
 * Output (string): The formatted string
 *
 * Note: All sequences of non-alphanumeric characters, including accented
 * letters, will be replaced with dashes.
 */
function formatKebabCase(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

module.exports = formatKebabCase;
