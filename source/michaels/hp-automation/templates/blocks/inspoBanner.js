const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

module.exports = function (data, index, {
    reverse  // {boolean} [default=true] Whether to reverse the order of the
             //   image and text on desktop
} = {}) {
    if (reverse === undefined) reverse = true;

    let link = stripUrlOrigin(data['Link'], [
        'michaels.com',
        'michaels.ca',
        'demandware.net'
    ]),
    image = data['Image File Name'],
    imageFormat = (data['Image Format'] || 'png').toLowerCase(),
    outlined = stringToBoolean(data['Outlined']),
    alt = encodeChars(data['Alt Tag']);

    let headline = data['Title'];
    let subhead = data['Description 1'];
    let body = data['Description 2'];
    let body2 = data['Description 3'];
    let label = data['CTA'];

    return `
        <div class="c-inspiration-banner${
            !reverse ? ' c-inspiration-banner--no-reverse' : ''
        }">
            <div class="c-inspiration-banner__media${ outlined ? ' c-inspiration-banner__media--outline' : '' }">
                <picture>
                    <source data-srcset="_hp/${image}-m.${imageFormat}?$staticlink$" media="(max-width:480px)">
                    <img class="c-inspiration-banner__image mel-js-lazy" data-src="_hp/${image}.${imageFormat}?$staticlink$" alt="${alt}">
                </picture>
            </div>
            <div class="c-inspiration-banner__content">
                <h2 class="c-inspiration-banner__headline">${headline}</h2>
                <p class="c-inspiration-banner__subhead">${subhead}</p>
                <p class="c-inspiration-banner__body">${body}</p>
                ${ body2 ? `<p class="c-inspiration-banner__body">${body2}</p>` : '' }
                <div class="c-inspiration-banner__cta">
                    <a class="mel-button" href="${link}">
                        <div class="mel-button__label">${label}</div>
                    </a>
                </div>
            </div>
        </div>
    `;
}
