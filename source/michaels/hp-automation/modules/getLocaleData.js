/* ---- getLocaleData ----
 *
 * Filters the Excel data (after it has been keyed) to include only the data for
 * the specified locale.
 *
 * Use this module in CAN/QUE page templates to filter the data by locale. This
 * simplifies the reuse of section templates across US, CAN, and QUE.
 *
 * Inputs:
 *   - srcData (object): Excel data keyed by section and subsection
 *   - locale (string): Identifier from the "Locale" field (e.g., "CA" or "QU")
 *
 * Output (object): Data for the specified locale
 */
function getLocaleData(srcData, locale) {
    const newData = {};

    for (const [section, sectionData] of Object.entries(srcData)) {
        newData[section] = {};
        for (const [subsection, subsectionData] of Object.entries(sectionData)) {
            newData[section][subsection] = subsectionData.filter(block => block.Locale === locale);
        }
    }

    return newData;
}

module.exports = getLocaleData;
