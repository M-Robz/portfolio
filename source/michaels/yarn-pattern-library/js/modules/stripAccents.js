/* ---- stripAccents ----
 *
 * Version 1.0.0
 * 11/18/2020
 *
 * Replaces accented characters within a string with their unaccented
 * equivalents.
 *
 * Inputs:
 *   - str (string): The string to be modified
 *
 * Output (string): The modified string
 */
function stripAccents(str) {
    return str
        .replace(/\u00C0|\u00C1|\u00C2|\u00C3|\u00C4/g, 'A')
        .replace(/\u00C6/g, 'AE')
        .replace(/\u00C7/g, 'C')
        .replace(/\u00C8|\u00C9|\u00CA|\u00CB/g, 'E')
        .replace(/\u00CC|\u00CD|\u00CE|\u00CF/g, 'I')
        .replace(/\u00D1/g, 'N')
        .replace(/\u00D2|\u00D3|\u00D4|\u00D5|\u00D6/g, 'O')
        .replace(/\u00D9|\u00DA|\u00DB|\u00DC/g, 'U')
        .replace(/\u00E0|\u00E1|\u00E2|\u00E3|\u00E4/g, 'a')
        .replace(/\u00E6/g, 'ae')
        .replace(/\u00E7/g, 'c')
        .replace(/\u00E8|\u00E9|\u00EA|\u00EB/g, 'e')
        .replace(/\u00EC|\u00ED|\u00EE|\u00EF/g, 'i')
        .replace(/\u00F1/g, 'n')
        .replace(/\u00F2|\u00F3|\u00F4|\u00F5|\u00F6/g, 'o')
        .replace(/\u00F9|\u00FA|\u00FB|\u00FC/g, 'u')
        .replace(/\u0152/g, 'OE')
        .replace(/\u0153/g, 'oe')
    ;
}

module.exports = stripAccents;
