/* ---- tagChars ----
 *
 * Source: `MIK/_js/modules/tagChars.js` (3/5/2021)
 *
 * Encloses certain characters and character codes within a string of HTML in
 * element tags. Refer to the module code below to see which characters/codes
 * are wrapped in which tags.
 *
 * Inputs:
 *   - string (string): The HTML string containing characters/codes to be tagged
 *
 * Output (string): The input string with characters tagged
 */
function tagChars(string) {
    if (typeof string !== 'string' && !(string instanceof String)) return string;

    return string.replace(/\u{00AE}|&reg;|&#174;/gu, '<sup>$&</sup>')
                 .replace(/\u{2122}|&trade;|&#8482;/gu, '<sup>$&</sup>')
                 .replace(/\*/g, '<sup>$&</sup>');
}

module.exports = tagChars;
