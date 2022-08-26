const formatKebabCase = require('./modules/formatKebabCase');
const stringToBoolean = require('./modules/stringToBoolean');
const stripAccents = require('./modules/stripAccents');
const templates = require('./templates');


/*
 * Custom markup builder for the Sale page template
 *
 * Reference: `scripts/pre-build/readme.md`
 */
module.exports = function (workbook, args, config) {
    const sheetName = args.sheet;
    const useGrid = args.grid;
    const hasNav = args.nav;
    const isCanada = args.canada;
    const isQuebec = args.quebec;
    const locale = isQuebec ? 'QU' : isCanada ? 'CA' : 'US';

    // Get data for the sheet specified by command line argument, or the first
    // sheet by default
    const sheet = _getSheetData(workbook, sheetName);

    // Build markup for offers
    const offersBySection = _buildOfferMarkup(sheet, config, useGrid, isQuebec);

    // Assign an ID to each section
    const idMap = _assignSectionIDs(offersBySection, config, locale);

    // Build markup for sections
    const sectionMarkup = _buildSectionMarkup(offersBySection, idMap, useGrid);

    // Build markup for nav menu
    const navMenuMarkup = _buildNavMarkup(offersBySection, idMap, config, hasNav, locale);

    // Return page markup
    return navMenuMarkup + sectionMarkup.join('');
};


/*
 * Get data for the specified sheet, or the first sheet by default.
 */
function _getSheetData(workbook, sheetName) {
    if (sheetName) {
        if (!workbook[sheetName]) {
            throw new Error(`Failed to find worksheet "${sheetName}" in Excel workbook.`);
        } else {
            return workbook[sheetName];
        }
    } else {
        // If no sheet was specified, use the first sheet
        return Object.values(workbook)[0];
    }
}

/*
 * Build markup for offers.
 */
function _buildOfferMarkup(sheet, config, useGrid, isQuebec) {
    const offersBySection = {};

    sheet.forEach(row => {
        const section = isQuebec ? row['Section QU'] : row.Section;
        if (stringToBoolean(row.Active) !== true || !section) return;

        const offerMarkup = useGrid
            ? templates.offer(row, { useGrid, isQuebec, ...config })
            : templates.carouselItem(
                templates.offer(row, { useGrid, isQuebec, ...config })
            )
        ;

        if (!offersBySection[section]) offersBySection[section] = [];
        offersBySection[section].push(offerMarkup);
    });

    if (!Object.keys(offersBySection).length) {
        throw new Error('All rows are either inactive or do not have a section specified.');
    }

    return offersBySection;
}

/*
 * Assign an ID to each section.
 *
 * If an ID for the section was specified in the config, it will be used;
 * otherwise, an ID will be generated from the section name.
 */
function _assignSectionIDs(offersBySection, config, locale) {
    const sectionConfig = config.sectionIDs && config.sectionIDs[locale]
        ? config.sectionIDs[locale]
        : {}
    ;
    const idMap = new Map();

    for (const sectionName of Object.keys(offersBySection)) {
        const id = sectionConfig[sectionName] || formatKebabCase(stripAccents(sectionName));
        idMap.set(sectionName, id);
    }

    return idMap;
}

/*
 * Build markup for sections.
 */
function _buildSectionMarkup(offersBySection, idMap, useGrid) {
    const sectionMarkup = [];

    for (const [sectionName, offers] of Object.entries(offersBySection)) {
        sectionMarkup.push(
            templates.section({
                sectionName,
                id: idMap.get(sectionName),
                offers,
                useGrid
            })
        );
    }

    return sectionMarkup;
}

/*
 * Build markup for nav menu.
 */
function _buildNavMarkup(offersBySection, idMap, config, hasNav, locale) {
    if (hasNav) {
        const navItemMarkup = [];

        for (const sectionName of Object.keys(offersBySection)) {
            navItemMarkup.push(
                templates.navItem({
                    sectionName,
                    id: idMap.get(sectionName),
                    imagePath: config.imgPath,
                    locale
                })
            );
        }

        return templates.navMenu(navItemMarkup);

    } else {
        return '';
    }
}
