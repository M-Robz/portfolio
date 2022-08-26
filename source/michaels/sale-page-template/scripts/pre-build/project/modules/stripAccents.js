/* ---- stripAccents ----
 *
 * Version 1.1.0
 * 7/20/2021
 *
 * Replaces accented characters within a string with their unaccented
 * equivalents.
 *
 * Inputs:
 *   - str (string): The string to be modified
 *
 * Output (string): The modified string
 *
 * Notes:
 *   - This approach is incompatible with IE unless `String.prototype.normalize`
 *     is polyfilled.
 *   - Supplying the argument "NFKD" to `normalize()` will decompose some
 *     ligatures, but will not decompose the ligatures "œ" and "æ" into "oe" and
 *     "ae".
 */
function stripAccents(str) {
    return str
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\u00C6/g, 'AE')
        .replace(/\u00E6/g, 'ae')
        .replace(/\u0152/g, 'OE')
        .replace(/\u0153/g, 'oe')
    ;
}

module.exports = stripAccents;
