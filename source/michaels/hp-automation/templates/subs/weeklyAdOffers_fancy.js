/*
    Tag IDs for reference:

    HP Labor Day Savings - 6439
    HP Online Top Offers - 6447
    HP Top Tech Offers - 6443
    HP Top Seasonal Offers - 6448
    HP Top MikPro Offers - 6444
    HP New Product Offerings - 6445
    HP Bundle Offers - 6446
*/

/*
 * A weekly ad carousel, but fancier
 */
module.exports = function ({
    department, // {string} [department or tag required] Weekly ad department
    tag,        // {string} [department or tag required] Weekly ad tag
    id,         // {string} Unique value used to generate ID and JS hook
    isInjected, // {boolean} [default=false] Whether this content will be
                //   injected into the page via JS; if true, you will need
                //   to initialize any weekly ad carousels after they are
                //   injected
    sectionId,  // {string} ID of the parent section
    colors,     // {object} [optional] Color scheme
        // colors.font {string} Color of heading and extra copy (see below)
        // colors.background {string} Background color of section
        // colors.outline {string} Color of outline around carousel items
        // colors.dots {string} Color of grayed-out carousel dots on mobile
    extraCopy   // {string} [optional] Copy line after the carousel
}) {
    colors = colors || {};
    colors.font = colors.font || '#000';
    colors.background = colors.background || '#fff';
    colors.outline = colors.outline || 'transparent';
    colors.dots = colors.dots || '#d9d9d9';

    const offerSource = tag ? `tag: '${tag}'` : `department: '${department}'`;

    return `
        <!-- WEEKLY AD OFFERS -->
        <style>
            #${sectionId}.mel-c-section {
                padding: 1em 0;
                background-color: ${colors.background};
            }
            ${ extraCopy ?
                `#${sectionId}.mel-c-section::after {
                    content: "${extraCopy}";
                    display: block;
                    margin: 1em 0.5em 0.5em;
                    font-weight: bold;
                    text-align: center;
                    color: ${colors.font};
                }
                @media (min-width: 480px) {
                    #${sectionId}.mel-c-section::after {
                        font-size: 1.2em;
                    }
                }` : ''
            }
            #${sectionId} .mel-c-section__header {
                margin-bottom: 1em;
            }
            #${sectionId} .mel-c-section__title {
                margin: 0 0.5em;
                color: ${colors.font};
            }
            #${sectionId} .mel-c-sale-card {
                background-color: transparent;
            }
            #${sectionId} .mel-c-sale-card__media .mel-c-sale-card__image {
                outline: 1px solid ${colors.outline};
                outline-offset: -1px;
            }
            #${sectionId} .mel-c-carousel__dot-nav li:not(.slick-active) button::before {
                background-color: ${colors.dots};
            }
        </style>
        <div class="hp_${id} js-${id}"></div>
        ${ !isInjected ?
            `<script>
                document.addEventListener('DOMContentLoaded', function () {
                    mapp.methods.weeklyAdOffers({
                        ${offerSource},
                        container: document.querySelector('.js-${id}'),
                        pageType: 'fullWidth'
                    });
                });
            </script>` : ''
        }
    `;
}
