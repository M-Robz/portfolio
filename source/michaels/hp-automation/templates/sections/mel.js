const formatId = require('../../modules/formatId');

/*
 * Template for the mel section component
 *
 * Receives the data for all sections, and passes the data for its own
 * subsections to the provided `body` function. It also passes its ID in case
 * the subsections need to reference it.
 */
module.exports = function (
    allData,    // {object} Data for all sections
    {
        ssKey,  // {string} Key from "Section" column in spreadsheet
        body    // {function} Builds markup for subsections
                //   - Param: sectionData {object} Data for the subsections in
                //     this section
                //   - Param: sectionId {string} This section's ID
                //   - Returns: {string} Markup for subsections
    }
) {
    const sectionData = allData[ssKey];
    if (!sectionData) throw new Error(`No data found for section "${ssKey}".`);
    const { heading, subheading } = global.templates.blocks;

    const id = 'hp_' + formatId(ssKey);

    return `
        <!-- ${ ssKey.toUpperCase() } -->
        <section class="mel-c-section" id="${id}">
            ${ sectionData.Heading && sectionData.Heading.length ?
                `<div class="mel-c-section__header">
                    ${ heading(sectionData.Heading[0]) }
                    ${ sectionData.Subheading && sectionData.Subheading.length ?
                        subheading(sectionData.Subheading[0]) : ''
                    }
                </div>` : ''
            }
            <div class="mel-c-section__body">
                ${ body(sectionData, id) }
            </div>
        </section>
    `;
}
