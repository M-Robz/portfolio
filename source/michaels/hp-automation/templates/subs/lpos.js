const formatId = require('../../modules/formatId');
const renderBlocks = require('../../modules/renderBlocks');

/*
 * Template for the "LPOS" layout, which includes two rows of blocks and a
 * double-tall block on the left or right
 */
module.exports = function (data, {
    ssKey,      // {string} [default=LPOS] Key from "Subsection" column
    reverse     // {boolean} [default=false] Put the tall box on the right
                //   instead of the left
} = {}) {
    ssKey = ssKey || 'LPOS';
    const { tier2, lposTallbox } = global.templates.blocks;

    const id = 'hp_' + formatId(ssKey);

    return `
        <!-- ${ ssKey.toUpperCase() } -->
        <div class="${id} lpos-grid${ reverse ? ' lpos-grid--reverse' : '' }">
            ${ renderBlocks(lposTallbox, data[`${ssKey} Tall Box`]) }
            <div class="mel-string mel-string-3-up-small">
                ${ renderBlocks(tier2, data[ssKey]) }
            </div>
        </div>
    `;
}
