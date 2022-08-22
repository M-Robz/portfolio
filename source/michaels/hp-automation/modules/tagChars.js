/* ---- tagChars ----
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

    return string.replace(/®/g, '<sup>$&</sup>')
                .replace(/&reg;/g, '<sup>$&</sup>')
                 .replace(/&Dagger;/g, '<sup>$&</sup>')
                 .replace(/™/g, '<sup>$&</sup>')
                 .replace(/&trade;/g, '<sup>$&</sup>')
                 .replace(/¹/g, '<sup>$&</sup>')
                 .replace(/\*/g, '<sup>$&</sup>')
                 .replace(/(\r\n|\n|\r)/gm," ");
}

module.exports = tagChars;
