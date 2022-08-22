const formatId = require('../../modules/formatId');
const renderBlocks = require('../../modules/renderBlocks');

/*
 * In this variant of the grid template, the blocks are displayed in a
 * horizontal slider on mobile.
 */
module.exports = function (data, {
    ssKey,          // {string} [default=Slider Grid] Key from "Subsection" column
    template,       // {string} [default=tier2] Block template to use
    numUp,          // {number} [optional] Number of blocks per row (3|4); will
                    //   be ignored if `stringClasses` is provided
    stringClasses   // {string} [optional] A space-delimited list of mel-string
                    //   classes which will override the defaults
} = {}) {
    ssKey = ssKey || 'Slider Grid';
    template = template || 'tier2';
    numUp = numUp || (
        (data[ssKey].length % 3 > 0 || data[ssKey].length % 4 === 0) ? 4 : 3
    );
    stringClasses = stringClasses || (numUp === 4
        ? 'mel-string-2-up-small mel-string-4-up-medium'
        : 'mel-string-3-up-small'
    );

    const id = 'hp_' + formatId(ssKey);

    return `
        <!-- ${ ssKey.toUpperCase() } -->
        <div class="${id}">
            <div class="c-slider-grid mel-string mel-string--slider ${stringClasses}">
                ${ renderBlocks(global.templates.blocks[template], data[ssKey]) }
            </div>
        </div>
    `;
}
