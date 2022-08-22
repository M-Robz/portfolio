/* ---- encodeChars ----
 *
 * Replaces special characters in a string of HTML with their HTML codes. The
 * search & replace is performed globally for each character.
 *
 * Inputs:
 *   - string (string): The HTML string containing characters to be replaced
 *
 * Output: The input string with characters replaced
 */
function encodeChars(string) {
    if (typeof string !== 'string' && !(string instanceof String)) return string;

    return string.replace(/®/g, '&reg;')
                 .replace(/™/g, '&trade;')
                 .replace(/©/g, '&copy;')
                 .replace(/¹/g, '&sup1;')
                 .replace(/‡/g, '&Dagger;')
                 .replace(/&(?=\s)/g, '&amp;')
                 .replace(/–/g, '&ndash;')
                 .replace(/—/g, '&mdash;')
                 .replace(/"/g, '&quot;')
                 .replace(/‘/g, '&lsquo;')
                 .replace(/’/g, '&rsquo;')
                 .replace(/“/g, '&ldquo;')
                 .replace(/”/g, '&rdquo;')
                 .replace(/«/g, '&laquo;')
                 .replace(/»/g, '&raquo;')
                 .replace(/À/g, '&#192;')
                 .replace(/Á/g, '&#193;')
                 .replace(/Â/g, '&#194;')
                 .replace(/Ã/g, '&#195;')
                 .replace(/Ä/g, '&#196;')
                 .replace(/Ç/g, '&#199;')
                 .replace(/È/g, '&#200;')
                 .replace(/É/g, '&#201;')
                 .replace(/Ê/g, '&#202;')
                 .replace(/Ë/g, '&#203;')
                 .replace(/Ì/g, '&#204;')
                 .replace(/Í/g, '&#205;')
                 .replace(/Î/g, '&#206;')
                 .replace(/Ï/g, '&#207;')
                 .replace(/Ń/g, '&#209;')
                 .replace(/Ò/g, '&#210;')
                 .replace(/Ó/g, '&#211;')
                 .replace(/Ô/g, '&#212;')
                 .replace(/Õ/g, '&#213;')
                 .replace(/Ö/g, '&#214;')
                 .replace(/Ù/g, '&#217;')
                 .replace(/Ú/g, '&#218;')
                 .replace(/Û/g, '&#219;')
                 .replace(/Ü/g, '&#220;')
                 .replace(/à/g, '&#224;')
                 .replace(/á/g, '&#225;')
                 .replace(/â/g, '&#226;')
                 .replace(/ã/g, '&#227;')
                 .replace(/ç/g, '&#231;')
                 .replace(/è/g, '&#232;')
                 .replace(/é/g, '&#233;')
                 .replace(/ê/g, '&#234;')
                 .replace(/ë/g, '&#235;')
                 .replace(/ì/g, '&#236;')
                 .replace(/í/g, '&#237;')
                 .replace(/î/g, '&#238;')
                 .replace(/ï/g, '&#239;')
                 .replace(/ñ/g, '&#241;')
                 .replace(/ò/g, '&#242;')
                 .replace(/ó/g, '&#243;')
                 .replace(/ô/g, '&#244;')
                 .replace(/õ/g, '&#245;')
                 .replace(/ù/g, '&#249;')
                 .replace(/ú/g, '&#250;')
                 .replace(/û/g, '&#251;')
                 .replace(/ü/g, '&#252;')
                 .replace(/oe/g, '&#339;')
                 .replace(/(\r\n|\n|\r)/gm," ");
}

module.exports = encodeChars;
