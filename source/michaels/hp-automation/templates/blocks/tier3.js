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
        flag = encodeChars(data['Flag']),
        alt = encodeChars(data['Alt Tag']),
        leading = tagChars(encodeChars(data['Leading'])),
        offer = tagChars(encodeChars(data['Offer'])),
        trailing = tagChars(encodeChars(data['Trailing'])),
        product = tagChars(encodeChars(data['Product'])),
        brand = tagChars(encodeChars(data['Brand'])),
        content1 = tagChars(encodeChars(data['Content 1'])),
        content2 = tagChars(encodeChars(data['Content 2'])),
        content3 = tagChars(encodeChars(data['Content 3'])),
        disclaimer = tagChars(encodeChars(data['Disclaimer']));

    return global.locale === 'CA' || global.locale === 'QU' ? `
        <div class="mel-promo mel-promo--feature">
            <a href="${link}">
                <div class="mel-promo__image${ flag ? ` add-flag" data-flag="${flag}"` : '"' }>
                    <img class="mel-js-lazy" data-src="_hp/${image}.png?$staticlink$" alt="${alt}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" />
                </div>
                <div class="mel-promo__content">
                    ${ offer ? `<p class="mel-promo__offer${leading?` mel-promo__offer--canada"><span class="mel-promo__lead-in">${leading}</span>`:'">'}${offer}</p>` : '' }
                    ${ product ? `<p class="mel-promo__product">${product}</p>` : '' }
                    ${ brand ? `<p class="mel-promo__brand">${brand}</p>` : '' }
                    ${ content1 ? `<p class="mel-promo__content">${content1}${content2?`<br>${content2}`:''}${content3?`<br>${content3}`:''}</p>` : '' }
                    ${ disclaimer ? `<p class="mel-promo__disclaimer">${disclaimer}</p>` : '' }
                </div>
            </a>
        </div>
    ` : `
        <div class="mel-promo mel-promo--feature">
            <a href="${link}">
                <div class="mel-promo__image${ flag ? ` add-flag" data-flag="${flag}"` : '"' }>
                    <img class="mel-js-lazy ${ outlined ? 'mel-promo__image--outline' : '' }" data-src="_hp/${image}.png?$staticlink$" alt="${alt}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" />
                </div>
                <div class="mel-promo__content">
                    ${offer.startsWith("Earn")? `<p class="mel-promo__offer reward-offer">${leading?`<span class="mel-promo__lead-in">${leading}</span>`: ''}${offer}${trailing?`<span class="mel-promo__lead-in">${trailing}</span>`: ''}</p>`: `<p class="mel-promo__offer">${leading?`<span class="mel-promo__lead-in">${leading}</span>`: ''}${offer}${trailing?`<span class="mel-promo__lead-in">${trailing}</span>`: ''}</p>`}
                    ${ product ? `<p class="mel-promo__product">${product}</p>` : '' }
                    ${ brand ? `<p class="mel-promo__brand">${brand}</p>` : '' }
                    ${content1?(content1.startsWith("Plus")?`<p class="mel-promo__content"><span class="highlight-red">${content1}</span></p>`:`<p class="mel-promo__content">${content1}${content2?(content2.startsWith("Plus")?`<br><span class="highlight-red">${content2}</span>`:`<br>${content2}`):''}${content3?(content3.startsWith("Plus")?`<br><span class="highlight-red">${content3}</span>`:`<br>${content3}`):''}</p>`): '' }
                    ${ disclaimer ? `<p class="mel-promo__disclaimer">${disclaimer}</p>` : '' }
                </div>
            </a>
        </div>
    `;
}
