const formatId = require('../../modules/formatId');
const renderBlocks = require('../../modules/renderBlocks');

/*
 * A full-width pencil banner
 */
module.exports = function (data, {
    ssKey,          // {string} [default=Pencil] Key from Tier column
    hasTabletImage  // {boolean} [default=true] Whether the image has a tablet
                    //   version
} = {}) {
    ssKey = ssKey || 'Pencil';
    const { pencil } = global.templates.blocks;

    const id = 'hp_' + formatId(ssKey);

    return `
        <!-- ${ ssKey.toUpperCase() } -->
        <div class="${id}">
            ${ renderBlocks(pencil, data[ssKey], { hasTabletImage }) }
        </div>
    `;
}
