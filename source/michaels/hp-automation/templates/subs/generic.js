const formatId = require('../../modules/formatId');
const renderBlocks = require('../../modules/renderBlocks');

/*
 * A generic subsection which can be used with an arbitrary block template. Note
 * that there are no defaults
 */
module.exports = function (data, {
    ssKey,    // {string} Key from Tier column
    template  // {string} Block template to use
} = {},
    ...args   // [optional] Additional arguments to pass to block template
) {
    const subData = data[ssKey];
    if (!subData) throw new Error(`No data found for subsection "${ssKey}".`);

    const blockTemplate = global.templates.blocks[template];
    if (!blockTemplate) throw new Error(`Block template "${template}" not found.`);

    const id = 'hp_' + formatId(ssKey);

    return `
        <!-- ${ ssKey.toUpperCase() } -->
        <div class="${id}">
            ${ renderBlocks(blockTemplate, subData, ...args) }
        </div>
    `;
}
