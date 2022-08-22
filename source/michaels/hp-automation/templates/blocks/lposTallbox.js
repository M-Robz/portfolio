const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

module.exports = function (data, index) {
    let link = stripUrlOrigin(data['Link'], [
            'michaels.com',
            'michaels.ca',
            'demandware.net'
        ]),
        image = data['Image File Name'],
        outlined = stringToBoolean(data['Outlined']),
        alt = encodeChars(data['Alt Tag']);

    return `
        <div class="tallbox">
            <a href="${link}">
                <img
                    ${ outlined ? 'class="mel-promo__image--outline"' : '' }
                    src="_hp/${image}.png?$staticlink$"
                    alt="${alt}">
            </a>
        </div>
    `;
}
