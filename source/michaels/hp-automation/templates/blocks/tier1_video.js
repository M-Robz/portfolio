const encodeChars = require('../../modules/encodeChars');
const stringToBoolean = require('../../modules/stringToBoolean');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');

// TODO: lazy-load image

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

    return imageFormat === 'mp4'
        ? `
        <a class="mel-slideshow__link" href="${link}">
            <video
                class="tier1-video tier1-video--desktop"
                preload="auto"
                autoplay loop muted playsinline
                src="_hp/${image}.mp4?$staticlink$"
                poster="_hp/${image}.png?$staticlink$"
            ></video>
            <video
                class="tier1-video tier1-video--tablet"
                preload="auto"
                autoplay loop muted playsinline
                src="_hp/${image}-t.mp4?$staticlink$"
                poster="_hp/${image}-t.png?$staticlink$"
            ></video>
            <video
                class="tier1-video tier1-video--mobile"
                preload="auto"
                autoplay loop muted playsinline
                src="_hp/${image}-m.mp4?$staticlink$"
                poster="_hp/${image}-m.png?$staticlink$"
            ></video>
        </a>`
        : `
        <a class="mel-slideshow__link" href="${link}">
            <picture>
                <source srcset="_hp/${image}.${imageFormat}?$staticlink$" media="(min-width: 801px)">
                <source srcset="_hp/${image}-t.${imageFormat}?$staticlink$" media="(min-width: 480px)">
                <img src="_hp/${image}-m.${imageFormat}?$staticlink$" ${ outlined ? 'class="mel-slideshow__image--outline" ' : '' } alt="${alt}">
            </picture>
        </a>`;
}
