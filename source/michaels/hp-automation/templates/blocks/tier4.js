const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');
const tagChars = require('../../modules/tagChars');

module.exports = function (data, index) {
    let link = stripUrlOrigin(data['Link'], [
            'michaels.com',
            'michaels.ca',
            'demandware.net'
        ]),
        image = data['Image File Name'],
        outlined = stringToBoolean(data['Outlined']),
        alt = encodeChars(data['Alt Tag']),
        title = tagChars(encodeChars(data['Title'])),
        description1 = tagChars(encodeChars(data['Description 1'])),
        description2 = tagChars(encodeChars(data['Description 2']));

    return `
    <div class="mel-event">
        <a class="mel-event__link" href="${link}">
            <div class="mel-event__image">
                <img class="mel-promo__image${ outlined ? '--outline' : '' } mel-js-lazy" data-src="_hp/${image}.png?$staticlink$" alt="${alt}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" />
            </div>
            <p class="mel-event__title">${title}</p>
            <p class="mel-event__description">${description1}${description2?`<br>${description2}`:''}</p>
        </a>
    </div>`;
}
