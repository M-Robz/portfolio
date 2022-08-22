const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

// TODO: could this be consolidated with the banner template?

module.exports = function (data, index, {
    hasTabletImage  // {boolean} [default=true] Whether the image has a tablet version
} = {}) {
    if (hasTabletImage === undefined) hasTabletImage = true;

    let link = stripUrlOrigin(data['Link'], [
            'michaels.com',
            'michaels.ca',
            'demandware.net'
        ]),
        image = data['Image File Name'],
        imageFormat = (data['Image Format'] || 'png').toLowerCase(),
        outlined = stringToBoolean(data['Outlined']),
        alt = encodeChars(data['Alt Tag']);

    return `
        <div class="mel-promo">
            ${link ? `<a class="mel-promo__link" href="${link}">` : ``}
                <div class="mel-promo__image${ outlined ? ' mel-promo__image--outline' : '' }">
                    <picture>
                        <source data-srcset="_hp/${image}-m.${imageFormat}?$staticlink$" media="(max-width:500px)">
                        ${ hasTabletImage ? `<source data-srcset="_hp/${image}-t.${imageFormat}?$staticlink$" media="(max-width:800px)">` : '' }
                        <img class="mel-js-lazy" data-src="_hp/${image}.${imageFormat}?$staticlink$" alt="${alt}">
                    </picture>
                </div>
            ${ link ? `</a>` : `` }
        </div>
    `;
}
