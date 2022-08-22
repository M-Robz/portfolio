const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

// TODO: lazy-load

module.exports = function (data, index) {
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
        <a class="mel-slideshow__link" href="${link}">
            <picture>
                <source srcset="_hp/${image}.${imageFormat}?$staticlink$" media="(min-width: 801px)">
                <source srcset="_hp/${image}-t.${imageFormat}?$staticlink$" media="(min-width: 480px)">
                <img src="_hp/${image}-m.${imageFormat}?$staticlink$" ${ outlined ? 'class="mel-slideshow__image--outline" ' : '' } alt="${alt}">
            </picture>
        </a>`;
}
