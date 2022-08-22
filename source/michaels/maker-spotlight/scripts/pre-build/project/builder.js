const stringToBoolean = require('./modules/stringToBoolean');
const structureMSData = require('../../build-json/structureMSData');
const templates = require('./templates');


/*
 * Custom markup builder for Maker Spotlight
 *
 * Reference: `scripts/pre-build/app/readme.md`
 */
module.exports = function (workbook, args, config) {
    const isLandingPage = args.landingpage;
    const isQuebec = args.quebec;
    const isCanada = isQuebec ? false : args.canada;
    const locale = isQuebec ? 'QU' : isCanada ? 'CA' : 'US';
    const featuredImgPath = `${config.imgPath}profiles/`;
    const microImgPath = `${config.imgPath}micro-makers/`;
    const featuredCardOpts = isLandingPage ? {
        portraitType: 'lp',
        showLabels: false,
        showBio: true,
        showLink: true,
        isCanada,
        isQuebec
    } : {
        portraitType: 'archive',
        showLabels: true,
        showBio: false,
        showLink: true,
        isCanada,
        isQuebec
    };
    const microCardOpts = isLandingPage ? {
        showQuote: false,
        showComFlag: false,
        showMiscFlag: false,
        isCanada,
        isQuebec
    } : {
        showQuote: true,
        showComFlag: true,
        showMiscFlag: true,
        isCanada,
        isQuebec
    };

    // Structure workbook data as required for Maker Spotlight
    const data = structureMSData(workbook);

    if (isLandingPage) {

        // Filter and order maker data according to config
        const featuredToRender = _mapDataToIds(
            config.lpMakers[locale].featured,
            Object.entries(data.featuredMakers)
        );
        const microToRender = _mapDataToIds(
            config.lpMakers[locale].micro,
            Object.entries(data.microMakers)
        );

        // Build HTML snippets for makers
        const featuredSnippets = buildSnippetsForLP(featuredToRender, buildFeaturedSnippet);
        const microSnippets = buildSnippetsForLP(microToRender, buildMicroSnippet);

        // Build page markup from snippets
        return templates.landingPage(featuredSnippets, microSnippets, isCanada, isQuebec);

    } else {

        // Key the maker data by the "Group" field
        const featuredToRender = _keyDataByGroup(
            Object.entries(data.featuredMakers)
        );
        const microToRender = _keyDataByGroup(
            Object.entries(data.microMakers)
        );

        // Build HTML snippets for makers
        const featuredSnippets = buildSnippetsForArchive(featuredToRender, buildFeaturedSnippet);
        const microSnippets = buildSnippetsForArchive(microToRender, buildMicroSnippet);

        // Build page markup from snippets
        return templates.archivePage(featuredSnippets, microSnippets, isCanada, isQuebec);
    }

    /*
     * Build HTML snippets for a set of makers on the landing page
     */
    function buildSnippetsForLP(dataEntries, buildSnippet) {
        return dataEntries.map(buildSnippet);
    }

    /*
     * Build HTML snippets for a set of makers on the archive page
     */
    function buildSnippetsForArchive(groupedData, buildSnippet) {
        const snippets = {};
        Object.entries(groupedData).forEach(([groupId, groupData]) => {
            snippets[groupId] = groupData.map(buildSnippet);
        });
        return snippets;
    }

    /*
     * Build an HTML snippet for an individual Featured Maker
     */
    function buildFeaturedSnippet([makerId, makerData]) {
        if (!makerData || !_makerIsActive(makerData, locale)) return '';

        return templates.featuredSnippet(
            makerId,
            featuredImgPath,
            isLandingPage,
            templates.featuredCard(makerId, makerData, featuredImgPath, featuredCardOpts)
        );
    }

    /*
     * Build an HTML snippet for an individual Micro Maker
     */
    function buildMicroSnippet([makerId, makerData]) {
        if (!makerData || !_makerIsActive(makerData, locale)) return '';

        return templates.microSnippet(
            templates.microCard(makerId, makerData, microImgPath, microCardOpts)
        );
    }
};

/* ---- _makerIsActive ----
 *
 * Checks a maker's data to see whether their information should be shown,
 * subject to locale.
 *
 * Inputs:
 *   - data (object): Data for an individual maker
 *   - locale (string): Locale identifier used in field names; permissible
 *     values: 'US', 'CA', 'QU'
 *
 * Output (boolean): Whether the maker is active
 */
function _makerIsActive(data, locale) {
    return stringToBoolean(data[`Active ${locale}`]);
}

/* ---- _mapDataToIds ----
 *
 * Filters an array of maker data (as ID-data pairs) by mapping it onto a list
 * of maker IDs, so that the order of the listed IDs is reflected in the
 * filtered array. If a given ID is not found in the data, the corresponding
 * index in the returned array will have the value `[null, null]`.
 *
 * Inputs:
 *   - idList (array of strings): List of maker IDs whose data should be
 *     included in the returned array
 *   - dataEntries (array of arrays): Two-dimensional array of maker data as
 *     ID-data pairs
 *
 * Output (array of arrays): Two-dimensional array of filtered maker data as
 * ID-data pairs
 */
function _mapDataToIds(idList, dataEntries) {
    return idList.map(listId => {
        const result = dataEntries.find(([makerId]) => makerId === listId);
        if (!result) {
            console.warn(`Warning: no data found for maker ID "${listId}".`);
            return [null, null];
        }
        return result;
    });
}

/* ---- _keyDataByGroup ----
 *
 * Accepts an array of maker data (as ID-data pairs), and groups the data
 * records by their value in the "Group" field. Returns an object whose property
 * names are the set of unique group names, plus an `ungrouped` property for
 * makers not assigned to a group, and whose property values are arrays of
 * ID-data pairs.
 *
 * Inputs:
 *   - dataEntries (array of arrays): Two-dimensional array of maker data as
 *     ID-data pairs
 *
 * Output (object): Maker data keyed by group
 */
function _keyDataByGroup(dataEntries) {
    const keyedData = {};
    dataEntries.forEach(entry => {
        const [, makerData] = entry;
        const group = makerData.Group;
        if (group) {
            if (!keyedData[group]) keyedData[group] = [];
            keyedData[group].push(entry);
        } else {
            if (!keyedData.ungrouped) keyedData.ungrouped = [];
            keyedData.ungrouped.push(entry);
        }
    });
    return keyedData;
}
