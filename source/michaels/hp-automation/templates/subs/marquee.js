const formatId = require('../../modules/formatId');
const renderBlocks = require('../../modules/renderBlocks');

/*
 * A single marquee banner or a slideshow of banners
 *
 * TODO: which js-slideshow class is used?
 */
module.exports = function (data, {
    ssKey   // {string} [default=Marquee] Key from "Subsection" column
} = {}) {
    ssKey = ssKey || 'Marquee';
    const { tier1 } = global.templates.blocks;

    const id = 'hp_' + formatId(ssKey);

    return `
        <!-- ${ ssKey.toUpperCase() } -->
        <div class="${id} js-slideshow">
            <div class="mel-slideshow mel-js-slideshow">
                ${ renderBlocks(tier1, data[ssKey]) }
            </div>
        </div>
    ` ;
}
