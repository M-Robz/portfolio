const tagChars = require('../modules/tagChars');


// TODO: value for aria-label
module.exports = function ({ sectionName, id, offers, useGrid }) {
    return `
        <section id="${id}" class="mel-c-section">
            <div class="mel-c-section__header sale-heading ${
                useGrid
                    ? 'margin-align-strings'
                    : 'margin-align-carousel'
            }">
                <h2 class="mel-c-section__title">${tagChars(sectionName)}</h2>
            </div>
            <div class="mel-c-section__body">
                ${ useGrid ?
                    `<div class="offers mel-string mel-string--center mel-string-2-up mel-string-3-up-medium mel-string-4-up-large">
                        ${offers.join('')}
                    </div>`
                    :
                    `<div
                        class="mel-c-carousel offers offers--carousel js-slick-container"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label=""
                    >
                        ${offers.join('')}
                    </div>`
                }
            </div>
        </section>
    `;
};
