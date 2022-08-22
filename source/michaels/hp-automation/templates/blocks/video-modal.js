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
        alt = encodeChars(data['Alt Tag']),
        videoId = data['Video ID'];

    return `
        <div class="mel-promo">
            <a href="#"
                class="mel-promo__link mel-js-open-dialog"
                data-dialog="mel-js-modal--${modalTarget}"
                data-class="mel mel-modal mel-modal--video"
                data-video-id="${videoId}">
                <img class="mel-js-lazy mel-promo__image${ outlined ? '--outline' : '' }" data-src="_hp/${image}.png?$staticlink$" alt="${alt}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E">
            </a>
        </div>
        <!-- VIDEO MODAL -->
        <div class="mel-js-modal--${modalTarget} display-none">
            <div class="mel-c-video">
                <div class="mel-c-video__fluid">
                    <iframe class="mel-js-video__player mel-c-video__player" src="" allowfullscreen title="Video"></iframe>
                </div>
            </div>
        </div>`;
}
