const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

module.exports = function (data, index) {
    let link = stripUrlOrigin(data['Link'], [
            'michaels.com',
            'michaels.ca',
            'demandware.net'
        ]),
        modalTarget = data['Modal Target'],
        image = data['Image File Name'],
        outlined = stringToBoolean(data['Outlined']),
        flag = encodeChars(data['Flag']),
        alt = encodeChars(data['Alt Tag']);

    return `
        <div class="mel-promo">
            ${ modalTarget ?
            `<a class="mel-promo__link mel-js-open-dialog" data-dialog="mel-js-modal--${modalTarget}" data-class="mel mel-modal" tabindex="0" role="button">` :
            `<a class="mel-promo__link" href="${link}">` }
                ${ flag ? `<div class="mel-promo__image add-flag" data-flag="${flag}">` : '' }
                    <img class="mel-js-lazy mel-promo__image${ outlined ? '--outline' : '' }" data-src="_hp/${image}.png?$staticlink$" alt="${alt}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E">
                ${ flag ? '</div>' : '' }
            </a>
        </div>`;
}
