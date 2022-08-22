/* ===== PRODUCT CAROUSEL =====
 *
 * Updated 01/11/2021
 *
 * Populates and initializes any product carousels with the class
 * `js-product-carousel` or a custom selector.
 *
 * Exports:
 *   - init (function): Initializes the component
 *
 * Example usage:
 *   <div class="js-product-carousel" data-prod-ids="10576231 10576245 10576271 10576276 10590305"></div>
 *
 */


 /* ---- init ----
  *
  * Initializes the component.
  *
  * Inputs:
  *   - projectPath (string): Asset path variable from HTML
  *   - options (object, optional): {
  *       - selector (string, default = '.js-product-carousel'): CSS selector
  *         identifying the carousels to initialize
  *       - isCanada (boolean, default = false): Whether the current page is on
  *         the Canada site
  *       - isQuebec (boolean, default = false): Whether the current page is on
  *         the Quebec version of the Canada site
  *       - lazyLoad (boolean, default = true): Whether to lazy-load images in
  *         the carousel
  *       - slickConfig (object): Configuration options for Slick; the
  *         properties provided will override this component's defaults
  *     }
  *
  * Output: none
  */
function init(projectPath = '', options = {}) {
    let defaults = {
        selector: '.js-product-carousel',
        isCanada: false,
        isQuebec: false,
        lazyLoad: true,
        slickConfig: {}
    };
    let { selector, isCanada, isQuebec, lazyLoad, slickConfig } = Object.assign(defaults, options);

    // Locale for API request
    let locale = isQuebec ? 'fr-CA'
        :
        isCanada ? 'en-CA'
            :
            'en-US';

    let productCarousels = document.querySelectorAll(selector);
    Array.prototype.forEach.call(productCarousels, carousel => {

        if (!carousel.hasAttribute('data-prod-ids')) return;

        // Get product IDs from data attribute and store as array
        let prodIds = carousel.getAttribute('data-prod-ids').split(' ');

        if (prodIds.length) {

            // Fetch product data from API
            mapp.methods.fetchApiProducts(prodIds, {
                expandParams: ['prices', 'images', 'promotions'],
                locale: locale,
                localDataPath: projectPath + 'data/',
                debug: false
            })
            .then(data => {

                if (!data) return;

                // Read data received from API and store in array of objects
                // representing individual products
                let productsData = mapp.methods.readApiData(data);

                // Build carousel markup from data and initialize Slick
                buildCarousel(productsData, carousel, lazyLoad, isCanada, isQuebec);
                initSlick(carousel, lazyLoad, slickConfig);
            });
        }
    });
}


/* ---- buildCarousel ----
 *
 * Builds carousel markup and writes it to the page.
 *
 * Inputs:
 *   - productsData (array of objects): Data for products in the carousel
 *   - carousel (DOM node): The carousel element
 *   - lazyLoad (boolean): Whether to lazy-load images in the carousel
 *   - isCanada (boolean): Whether the current page is on the Canada site
 *   - isQuebec (boolean): Whether the current page is on the Quebec version of
 *     the Canada site
 *
 * Output: none
 */
function buildCarousel(productsData, carousel, lazyLoad, isCanada, isQuebec) {
    let range = document.createRange();

    // Create fragment to hold Slick carousel
    let fragment = range.createContextualFragment('<div class="slick-container"></div>');

    // Locale to prepend to PDP URL
    let pdpUrlPrefix = isQuebec ? '/fr'
        :
        isCanada ? '/en'
            :
            '';

    // For each slide, insert data into new markup and append to fragment
    productsData.forEach(productData => {

        let href = productData.pdpUrl ? pdpUrlPrefix + productData.pdpUrl : '';
        let src = productData.imgUrl || '';
        let name = productData.name || '';
        let message = productData.message || '';

        const includeDollarSign = true;
        let regPrice = mapp.methods.formatPrice(productData.regPrice, { includeDollarSign, isQuebec }) || '';
        let salePrice = mapp.methods.formatPrice(productData.salePrice, { includeDollarSign, isQuebec }) || '';
        let maxPrice = mapp.methods.formatPrice(productData.maxPrice, { includeDollarSign, isQuebec }) || '';

        // Set text and classes for price-sale and price-reg elements according
        // to whether product is on sale
        let salePriceTxt = '';
        let regPriceTxt = '';
        let regPriceClass = '';
        if (salePrice) {
            salePriceTxt = salePrice;
            let regAbbrev = isQuebec ? 'Cour.' : 'Reg.';
            regPriceTxt = regPrice ? `${regAbbrev} ${regPrice}` : '';
            regPriceClass = ' on-sale';
        } else if (regPrice) {
            regPriceTxt = regPrice;
            if (maxPrice) regPriceTxt += ` &ndash; ${maxPrice}`;
        }

        let slideMarkup = range.createContextualFragment(
            `<div class="carousel-item">
                <a href="${href}">
                    <div class="img-container">
                        <img ${lazyLoad ? 'data-lazy' : 'src'}="${src}" alt="">
                    </div>
                    <p class="promo-price">${ salePriceTxt ? `
                        <span class="price-sale">${salePriceTxt}</span>` : '' }
                        <span class="price-reg${regPriceClass}">${regPriceTxt}</span>
                    </p>
                    <p class="promo-text">${name}</p>
                    <p class="promo-disclaimer">${message}</p>
                </a>
            </div>`
        );

        // Add EDV and Free Shipping badges if applicable
        if (productData.edv) {
            slideMarkup.querySelector('.img-container').appendChild(
                range.createContextualFragment(`<div class="badge-edv${isQuebec ? '-fr' : ''}"></div>`)
            );
        }
        if (productData.freeShip && !isQuebec) {
            slideMarkup.querySelector('.img-container').appendChild(
                range.createContextualFragment('<div class="badge-shipping"></div>')
            );
        }
        if (productData.greatBuy) {
            slideMarkup.querySelector('.img-container').appendChild(
                range.createContextualFragment(`<div class="badge-great-buy${isQuebec ? '-fr' : ''}"></div>`)
            );
        }

        fragment.querySelector('.slick-container').appendChild(slideMarkup);
    });

    // Write Slick carousel and nav arrows to page
    carousel.appendChild(fragment);
}


/* ---- initSlick ----
 *
 * Initializes the Slick plugin.
 *
 * Inputs:
 *   - carousel (DOM node): The carousel element
 *   - lazyLoad (boolean): Whether to lazy-load images in the carousel
 *   - configOptions (object): Options to override the default config passed to
 *     Slick
 *
 * Output: none
 */
function initSlick(carousel, lazyLoad = true, configOptions = {}) {
    let defaultConfig = {
        dots: false,
        arrows: true,
        infinite: true,
        lazyLoad: lazyLoad ? 'ondemand' : 'progressive',
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        swipe: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    let config = Object.assign(defaultConfig, configOptions);

    $(carousel).find('.slick-container').slick(config);
}

exports.init = init;
