const encodeAngleQuotes = require('../modules/encodeAngleQuotes');


/* ---- featuredCard ----
 *
 * Assembles a string of markup for a "card" component containing
 * information about a Featured Maker. The contents of the card are configurable
 * for reuse in different contexts.
 *
 * Inputs:
 *   - makerId (string): The maker's ID
 *   - data (object): Data for the maker
 *   - imgPath (string): Path to image assets for Featured Makers
 *   - options (object): {
 *       - portraitType (string, default = 'profile'): The type of portrait
 *         image to show. The permissible values are: 'profile', 'lp', and
 *         'archive'
 *       - showLabels (boolean, default = false): Whether to include labels
 *       - showBio (boolean, default = false): Whether to include a bio
 *       - showBioExtra (boolean, default = false): Whether to include the
 *         "extra" bio section
 *       - showQuote (boolean, default = false): Whether to include a quote
 *       - showLink (boolean, default = false): Whether to include a link to
 *         open the maker's profile
 *       - showButton (boolean, default = false): Whether to include a
 *         button to open the video modal
 *       - isCanada (boolean, default = false): Whether to build markup for the
 *         Canada English site
 *       - isQuebec (boolean, default = false): Whether to build markup for the
 *         Quebec site
 *     }
 *
 * Output (string): Card markup
 *
 * Note: There is a corresponding template in
 * `src/js/class-components/FeaturedMaker.js`. If you update one of these, you
 * will likely need to update the other as well.
 */
function featuredCard(makerId, data, imgPath, options = {}) {
    const defaults = {
        portraitType: 'profile',
        showLabels: false,
        showBio: false,
        showBioExtra: false,
        showQuote: false,
        showLink: false,
        showButton: false,
        isCanada: false,
        isQuebec: false
    };
    const { portraitType, showLabels, showBio, showBioExtra, showQuote, showLink, showButton, isCanada, isQuebec } = Object.assign(defaults, options);

    const locale = isQuebec ? 'QU' : isCanada ? 'CA' : 'US';
    const img = `${imgPath}${makerId}/portrait-${portraitType}-${makerId}.jpg`;
    const firstName = isQuebec
        ? data['First name'].replace('&', 'et')
        : data['First name']
    ;
    const handle = data['Social handle'];
    const labels = data['Labels']
        ? data['Labels'].map(row => row[`Label ${locale}`]).join(' | ')
        : ''
    ;
    const bio = encodeAngleQuotes(data[`Bio ${locale}`]);
    const bioExtra = encodeAngleQuotes(data[`Bio extra ${locale}`]);
    const quote = isQuebec
        ? `&laquo;&nbsp;${data['Quotation QU']}&nbsp;&raquo;`
        : `&ldquo;${data[`Quotation ${locale}`]}&rdquo;`
    ;
    const hasVideo = !!data[`YouTube video ID ${locale}`];
    const videoCTA = data[`Video CTA text ${locale}`];

    return `
        <div class="c-featured-card">
            <div class="c-featured-card__portrait">
                <img class="mel-js-lazy" data-src="${img}" alt="">
            </div>
            <div class="c-featured-card__copy">
                <h3 class="c-featured-card__name">${firstName}</h3>
                <p class="c-featured-card__handle">
                    <a href="https://www.instagram.com/${handle}/" target="_blank" rel="noopener">@${handle}</a>
                </p>
                ${ showLabels && labels ? `<p class="c-featured-card__labels">${labels}</p>` : ''}
                ${ showBio ? `<p class="c-featured-card__bio">${bio}</p>` : '' }
                ${ showBioExtra && bioExtra ? `<p class="c-featured-card__bio"><strong>${bioExtra}</strong></p>` : '' }
                ${ showQuote ? `<p class="c-featured-card__quote">${quote}</p>` : '' }
                ${ showLink
                    ? `<p class="c-featured-card__link">
                        <a class="js-open-profile" role="button" tabindex="0">${ isQuebec
                            ? 'En savoir plus sur'
                            : 'More About'
                        } ${firstName}</a>
                    </p>`
                    : ''
                }
                ${ showButton && hasVideo
                    ? `<a class="c-featured-card__button mel-button js-open-video">
                        <div class="mel-button__label">${ videoCTA || (isQuebec
                            ? `Visionner la vid&eacute;o`
                            : `Watch ${firstName}'s Video`
                        ) }</div>
                    </a>`
                    : ''
                }
            </div>
        </div>
    `;
}

module.exports = featuredCard;
