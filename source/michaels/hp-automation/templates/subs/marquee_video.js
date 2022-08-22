const formatId = require('../../modules/formatId');
const renderBlocks = require('../../modules/renderBlocks');

/*
 * Marquee template when at least one slide contains a video
 *
 * TODO: which js-slideshow class is used?
 */
module.exports = function (data, {
    ssKey   // {string} [default=Marquee] Key from "Subsection" column
} = {}) {
    ssKey = ssKey || 'Marquee';
    const { banner_video, tier1_video } = global.templates.blocks;

    const id = 'hp_' + formatId(ssKey);

    return data[ssKey].length > 1 ? `
        <!-- ${ ssKey.toUpperCase() } -->
        <style>
            .mel-slideshow__image--outline {
                outline: 1px solid #000;
                outline-offset: -1px;
            }
            @media screen and (min-width: 1024px) {
                .wrapper_hp .slick-list {
                    width: 100% !important;
                }
            }
            .mel .tier1-video {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            @media (max-width: 479px) {
                .mel .tier1-video--mobile {
                    display: block;
                }
            }
            @media (min-width: 480px) and (max-width: 800px) {
                .mel .tier1-video--tablet {
                    display: block;
                }
            }
            @media (min-width: 801px) {
                .mel .tier1-video--desktop {
                    display: block;
                }
            }
        </style>
        <div class="${id} js-slideshow">
            <div class="mel-slideshow mel-js-slideshow">
                ${ renderBlocks(tier1_video, data[ssKey]) }
            </div>
        </div>
    ` : `
        <!-- ${ ssKey.toUpperCase() } -->
        <div class="${id}">
            ${ renderBlocks(banner_video, data[ssKey]) }
        </div>
    `;
}
