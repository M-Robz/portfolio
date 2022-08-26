// Public modules
const encodeUrl = require('encodeurl');

// Custom modules
const tagChars = require('../modules/tagChars');


module.exports = function (data, { bugOverlayImages, imgPath, useGrid, isQuebec }) {

    // Locale identifier in data fields
    const loc = isQuebec ? ' QU' : '';

    const url = data[`URL${loc}`]
        ? encodeUrl(data[`URL${loc}`].trim())
        : ''
    ;

    const image = useGrid ?
        `<img
            class="mel-c-sale-card__image mel-js-lazy"
            data-src="/dotcom/PROJECT_sale-image-bank_CATLP/dev/img/${data[`Image name${loc}`].trim()}"
            alt=""
        >`
        :
        `<img
            class="mel-c-sale-card__image"
            data-lazy="/dotcom/PROJECT_sale-image-bank_CATLP/dev/img/${data[`Image name${loc}`].trim()}"
            alt=""
        >`
    ;

    const calloutOverlay = data[`Callout overlay${loc}`] ?
        `<span class="mel-c-sale-card__callout-overlay">${
            tagChars(data[`Callout overlay${loc}`])
        }</span>`
        : ''
    ;

    const bugName = data[`Bug overlay${loc}`];
    const bugOverlay = bugName && bugOverlayImages && bugOverlayImages[bugName] ?
        `<img
            class="mel-c-sale-card__bug-overlay bug-${
                typeof bugName === 'string' ? bugName.replace(/\s/g, '-') : bugName
            }"
            src="${imgPath}${ bugOverlayImages[bugName].src || '' }"
            alt="${ bugOverlayImages[bugName].alt || '' }"
        >`
        : ''
    ;

    const calloutBar = data[`Callout bar${loc}`] ?
        `<span class="mel-c-sale-card__callout-bar">${
            tagChars(data[`Callout bar${loc}`])
        }</span>`
        : ''
    ;

    const priceSection = data[`Sale price${loc}`] ?
        `<p class="mel-c-sale-card__pricing">
            <span class="mel-c-sale-card__sale-price">${
                data[`Sale price${loc}`]
            }</span>
            ${ data[`Regular price${loc}`] ?
                `<span class="mel-c-sale-card__regular-price"><span class="sr-only">${
                    isQuebec ? 'Prix courant' : 'Regular Price'
                } </span><span aria-hidden="true">${
                    isQuebec ? 'Cour.' : 'Reg.'
                } </span>${
                    data[`Regular price${loc}`]
                }</span>`
                : ''
            }
        </p>`
        : ''
    ;

    const couponMessage = data[`Coupon messaging${loc}`] ?
        `<p class="mel-c-sale-card__coupon-message">${
            data[`Coupon messaging${loc}`]
        }</p>`
        : ''
    ;

    const title = data[`Product title${loc}`] ?
        `<p class="mel-c-sale-card__title">${
            tagChars(data[`Product title${loc}`])
        }${ data[`Brand${loc}`]
            ? `<br>by ${ tagChars(data[`Brand${loc}`]) }`
            : ''
        }</p>`
        : ''
    ;

    const addtlMessage = data[`Additional messaging${loc}`] ?
        `<p class="mel-c-sale-card__additional-message">${
            tagChars(data[`Additional messaging${loc}`])
        }</p>`
        : ''
    ;

    return `
        <div class="mel-c-sale-card${ data.Classes ? ` ${data.Classes}` : '' }">
            <a class="mel-c-sale-card__link" href="${url}">
                <div class="mel-c-sale-card__media">
                    ${image}
                    ${calloutOverlay}
                    ${bugOverlay}
                </div>
                <div class="mel-c-sale-card__body">
                    <div class="mel-c-sale-card__text">
                        <div class="mel-c-sale-card__callout-bar-contain">
                            ${calloutBar}
                        </div>
                        ${priceSection}
                        ${couponMessage}
                        ${title}
                        ${addtlMessage}
                    </div>
                </div>
            </a>
        </div>
    `;
};
