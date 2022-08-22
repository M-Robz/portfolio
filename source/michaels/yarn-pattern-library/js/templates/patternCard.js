// Public modules
const entities = require('entities');


module.exports = function (locale, { thumbnailPath, downloadPath }) {
    const isQuebec = locale === 'QUE';

    return function (data) {
        let displayName = entities.encodeHTML(
                data[`Pattern Name${ isQuebec ? ' QUE' : '' }`]
            ),
            weight = data[`Weight${ isQuebec ? ' QUE' : '' }`],
            pdfName = data[`PDF Filename ${locale}`] + '.pdf',
            thumbnailName = data['IMG'];

        let thumbnailUrl = thumbnailPath + encodeURIComponent(thumbnailName);
        let downloadUrl = downloadPath + encodeURIComponent(pdfName);

        return `
            <div class="c-pattern-card">
                <div class="c-pattern-card__figure">
                    <img class="mel-js-lazy" data-src="${thumbnailUrl}" alt="">
                </div>
                <div class="c-pattern-card__body">
                    <div class="c-pattern-card__copy">
                        <h3 class="c-pattern-card__heading">${displayName}</h3>
                        <p class="c-pattern-card__subhead">${ isQuebec
                            ? 'Poids du fil&nbsp;:'
                            : 'Weight:'
                        } ${weight}</p>
                    </div>
                    <a
                        class="c-pattern-card__cta mel-button mel-button--small"
                        href="${downloadUrl}"
                        target="_blank"
                        aria-label="${ isQuebec
                            ? 'T&eacute;l&eacute;charger'
                            : 'Download'
                        } ${displayName}"
                    >
                        <div class="mel-button__label">
                            <svg class="mel-icon" viewBox="0 0 24 24">
                                <path d="M5.016 18h13.969v2.016h-13.969v-2.016zM18.984 9l-6.984 6.984-6.984-6.984h3.984v-6h6v6h3.984z"></path>
                            </svg>
                            ${ isQuebec
                                ? 'T&eacute;l&eacute;charger'
                                : 'Download'
                            }
                        </div>
                    </a>
                </div>
            </div>
        `;
    };
};
