const stringToBoolean = require('../modules/stringToBoolean');


/* ---- microCard ----
 *
 * Assembles a string of markup for a "card" component containing
 * information about a Micro Maker. The contents of the card are configurable
 * for reuse in different contexts.
 *
 * Inputs:
 *   - makerId (string): The maker's ID
 *   - data (object): Data for the maker
 *   - imgPath (string): Path to image assets for Micro Makers
 *   - options (object): {
 *       - showQuote (boolean, default = false): Whether to include a quote
 *       - showComFlag (boolean, default = false): Whether to show a
 *         "Commissioned" flag
 *       - showMiscFlag (boolean, default = false): Whether to show a flag
 *         containing arbitrary content defined in the data
 *       - isCanada (boolean, default = false): Whether to build markup for the
 *         Canada English site
 *       - isQuebec (boolean, default = false): Whether to build markup for the
 *         Quebec site
 *     }
 *
 * Output (string): Card markup
 */
function microCard(makerId, data, imgPath, options = {}) {
    const defaults = {
        showQuote: false,
        showComFlag: false,
        showMiscFlag: false,
        isCanada: false,
        isQuebec: false
    };
    const { showQuote, showComFlag, showMiscFlag, isCanada, isQuebec } = Object.assign(defaults, options);

    const locale = isQuebec ? 'QU' : isCanada ? 'CA' : 'US';
    const link = data[`Link ${locale}`];
    const img = `${imgPath}img-${makerId}.jpg`;
    const firstName = isQuebec
        ? data['First name'].replace('&', 'et')
        : data['First name']
    ;
    const handle = data['Social handle'];
    const labels = data['Labels']
        ? data['Labels'].map(row => row[`Label ${locale}`]).join(' | ')
        : ''
    ;
    const quote = isQuebec
        ? `&laquo;&nbsp;${data['Quotation QU']}&nbsp;&raquo;`
        : `&ldquo;${data[`Quotation ${locale}`]}&rdquo;`
    ;
    const hasComFlag = stringToBoolean(data['Commissioned flag']);
    const miscFlag = data[`Misc flag ${locale}`];

    return `
        <div class="mel-c-micro-maker-card">
            <div class="mel-c-micro-maker-card__media">
                ${ link ? `<a href="${link}">` : '' }
                    <img class="mel-js-lazy" data-src="${img}" alt="">
                ${ link ? `</a>` : '' }
            </div>
            <div class="mel-c-micro-maker-card__body">
                <h3 class="mel-c-micro-maker-card__name">${firstName}</h3>
                <a class="mel-c-micro-maker-card__handle" href="https://www.instagram.com/${handle}/" target="_blank" rel="noopener">@${handle}</a>
                ${ labels ? `<p class="mel-c-micro-maker-card__labels">${labels}</p>` : '' }
                ${ showQuote ? `<p class="mel-c-micro-maker-card__quote">${quote}</p>` : '' }
                ${ showComFlag && hasComFlag
                    ? `<p class="mel-c-micro-maker-card__flag">${ isQuebec
                        ? `Suivez ${firstName} &agrave; l&rsquo;&eacute;mission <strong>&laquo;&nbsp;Commissioned&nbsp;&raquo;</strong> du r&eacute;seau The Design Network`
                        : `Watch ${firstName} on <strong>Commissioned</strong> by The Design Network`
                    }</p>`
                    : showMiscFlag && miscFlag
                    ? `<p class="mel-c-micro-maker-card__flag">${miscFlag}</p>`
                    : ''
                }
            </div>
        </div>
    `;
}

module.exports = microCard;
