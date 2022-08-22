const encodeChars = require('../../modules/encodeChars');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

/*
 * Marquee from the new site
 */
module.exports = function (data, index, {
    fontColor,   // {string} [optional] Font color of the text overlay
    bgColor,     // {string} [optional] Background color of the text overlay
    sectionId    // {string} [optional] ID of the parent section; required if
                 //   `bgColor` is provided
} = {}) {
    let link = stripUrlOrigin(data['Link'], [
        'michaels.com',
        'michaels.ca',
        'demandware.net'
    ]),
    image = data['Image File Name'],
    imageFormat = (data['Image Format'] || 'png').toLowerCase(),
    alt = encodeChars(data['Alt Tag']);

    let headline = data['Title'];
    let subhead = data['Description 1'];
    let disclaimer = data['Description 2'];
    let label = data['CTA'];

    return /*html*/`
        ${ bgColor ? `
            <style>
                #${sectionId} .c-marquis-banner__overlay::before {
                    background: ${bgColor};
                }
            </style>
        ` : '' }
        <div class="c-marquis-banner">
            <a class="c-marquis-banner__link" href="${link}">
                <div class="c-marquis-banner__media">
                    <picture>
                        <source data-srcset="_hp/${image}-m.${imageFormat}?$staticlink$" media="(max-width:480px)">
                        <img class="mel-js-lazy" data-src="_hp/${image}.${imageFormat}?$staticlink$" alt="${alt}">
                    </picture>
                </div>
                <div class="c-marquis-banner__overlay">
                    <div class="c-marquis-banner__text"${fontColor ? ` style="color: ${fontColor}"` : ""}>
                        <h2 class="c-marquis-banner__headline">${headline}</h2>
                        <p class="c-marquis-banner__subhead">${subhead}</p>
                        ${disclaimer ?
                            `<p class="c-marquis-banner__disclaimer"><small>${disclaimer}</small></p>`
                            :
                            ``
                        }
                        <div class="c-marquis-banner__cta">
                            <button class="mel-button">
                                <div class="mel-button__label">${label}</div>
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}
