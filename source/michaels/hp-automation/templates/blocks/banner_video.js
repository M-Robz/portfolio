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
        imageFormat = (data['Image Format'] || 'png').toLowerCase(),
        outlined = stringToBoolean(data['Outlined']),
        alt = encodeChars(data['Alt Tag']);

    return imageFormat === 'mp4' ? `
        <div class="mel-promo">
            <a class="mel-promo__link" href="${link}">
                <div class="mel-promo__image${ outlined ? ' mel-promo__image--outline' : '' }">
                    <video
                        class="tier1-video tier1-video--desktop"
                        preload="auto"
                        autoplay loop muted playsinline
                        src="_hp/${image}.mp4?$staticlink$"
                        poster="_hp/${image}.png?$staticlink$">
                    </video>
                    <video
                        class="tier1-video tier1-video--tablet"
                        preload="auto"
                        autoplay loop muted playsinline
                        src="_hp/${image}-t.mp4?$staticlink$"
                        poster="_hp/${image}-t.png?$staticlink$">
                    </video>
                    <video
                        class="tier1-video tier1-video--mobile"
                        preload="auto"
                        autoplay loop muted playsinline
                        src="_hp/${image}-m.mp4?$staticlink$"
                        poster="_hp/${image}-m.png?$staticlink$">
                    </video>
                </div>
            </a>
        </div>
    ` : `
        <div class="mel-promo">
            <a class="mel-promo__link" href="${link}">
                <div class="mel-promo__image${ outlined ? ' mel-promo__image--outline' : '' }">
                    <picture>
                        <source data-srcset="_hp/${image}.${imageFormat}?$staticlink$" media="(min-width: 801px)">
                        <source data-srcset="_hp/${image}-t.${imageFormat}?$staticlink$" media="(min-width: 480px)">
                        <img class="mel-js-lazy" data-src="_hp/${image}-m.${imageFormat}?$staticlink$" alt="${alt}">
                    </picture>
                </div>
            </a>
        </div>
    `;
}
