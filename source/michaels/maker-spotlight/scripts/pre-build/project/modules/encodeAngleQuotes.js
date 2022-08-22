/* ---- encodeAngleQuotes ----
 *
 * Version 1.0.0
 * 3/24/2021
 *
 * Encode double-angle quotation marks, and convert adjacent space characters to
 * non-breaking spaces.
 *
 * Inputs:
 *   - str (string): String to encode
 *
 * Output (string): Encoded string
 */
function encodeAngleQuotes(str) {
    return str
        .replace(/\u00AB\s+/g, '&laquo;&nbsp;')
        .replace(/\s+\u00BB/g, '&nbsp;&raquo;')
    ;
}

module.exports = encodeAngleQuotes;
