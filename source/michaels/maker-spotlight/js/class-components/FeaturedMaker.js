// Custom modules
const customSlick = require('../modules/customSlick');
const encodeAngleQuotes = require('../modules/encodeAngleQuotes');
const onClickOrEnter = require('../modules/onClickOrEnter');
const stringToBoolean = require('../modules/stringToBoolean');
const urlQueryManager = require('../modules/urlQueryManager');

// Components
const productCarousel = require('../function-components/productCarousel');
const Modal = require('../class-components/Modal');


/* ---- FeaturedMaker ----
 *
 * This class represents a maker from the "Featured Makers" section of the Maker
 * Spotlight experience. It stores the maker's data, caches markup that has been
 * generated for the maker, and exposes methods for showing the maker's full
 * profile in a modal, and for hydrating the maker's "snippet" (a short-form
 * profile) with functionality to open the full profile. The class also hydrates
 * the full profile with functionality for the featured item carousels, product
 * carousel, and video modal.
 *
 * Additionally, this module...
 *   - Creates and controls two instances of the `Modal` class - one for the
 *     profile modal, and one for the video modal - and attaches them to the
 *     `FeaturedMaker` prototype
 *   - Uses the `customSlick` module to watch for the window resize event, and
 *     create or destroy the featured item carousels as needed in response
 *
 * When requiring this class as a module, immediately invoke the function
 * returned by `require`, and pass an object with these keys to configure the
 * prototype properties: {
 *   - projectPath (string): `projectPath` variable embedded in the HTML
 *   - isQuebec (boolean): Whether the page's locale is Quebec
 *   - isCanada (boolean): Whether the page's locale is Canada (English)
 *   - onArchivePage (boolean): Whether the current page is the Maker Spotlight
 *     archive page
 * }
 * The immediately-invoked function will return the `FeaturedMaker` class.
 *
 * Prototype properties:
 *   - projectPath: From config above
 *   - isQuebec: From config above
 *   - isCanada: From config above
 *   - onArchivePage: From config above
 *   - carouselConfig (object): Options for the featured item carousels
 *   - profileModal (object): Instance of `Modal` representing the profile modal
 *   - videoModal (object): Instance of `Modal` representing the video modal
 *
 * Instance properties:
 *   - data (object): Data for this maker from `makers.json`
 *   - cache (object): Cache for markup that has been generated for this maker
 *   - id (string): The maker's unique ID
 *   - makerType (string): Identifies this as a 'featured' maker
 *   - imgPath (string): Path to image assets for this maker
 *
 * Public prototype methods:
 *   - hydrateSnippet
 *   - showProfile
 *
 * Public static methods:
 *   - closeActiveProfile
 *
 * Private prototype methods:
 *   - _hydrateProfile
 *   - _showVideo
 *   - _getProfileMarkup
 *   - _buildProfileMarkup
 *   - _buildCardMarkup
 *   - _buildItemsMarkup
 *   - _buildLabelMarkup
 *
 * Note: The "private" methods above have been prefixed with an underscore to
 * indicate that they are intended to be called only by other methods of this
 * class.
 */

module.exports = function ({ projectPath, isQuebec, isCanada, onArchivePage }) {
    FeaturedMaker.prototype.projectPath = projectPath;
    FeaturedMaker.prototype.isQuebec = isQuebec;
    FeaturedMaker.prototype.isCanada = isCanada;
    FeaturedMaker.prototype.onArchivePage = onArchivePage;

    // Attach configuration for `customSlick` to prototype, and use
    //   `customSlick` to watch for, and handle, the window resize event
    FeaturedMaker.prototype.carouselConfig = {
        selector: '.js-featured-item-carousel',
        settings: {
            arrows: true,
            dots: false,
            infinite: true,
            lazyLoad:'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true,
            autoplay: false,
            swipe: true,
            draggable: true,
            fade: false
        },
        normallySlick: true,
        breakpointConfigs: [
            {
                breakpoint: 768,
                slick: false
            }
        ]
    };
    customSlick.watchForResize(FeaturedMaker.prototype.carouselConfig);

    // Instantiate `Modal` objects for the profile and video modals, and attach
    //   them to the `FeaturedMaker` prototype
    // NOTE: The `.js-profile-modal` and `.js-video-modal` elements must be
    //   present on the page
    FeaturedMaker.prototype.profileModal = new Modal({
        target: document.querySelector('.js-profile-modal'),
        body: document.querySelector('.js-profile-modal-body'),
        classList: 'mel c-profile-modal-container c-gray-titlebar',
        onClose: urlQueryManager.unsetParam,
        onCloseArgs: ['profile']
    });
    FeaturedMaker.prototype.videoModal = new Modal({
        target: document.querySelector('.js-video-modal'),
        body: document.querySelector('.js-video-modal-body'),
        classList: 'mel c-video-modal-container c-gray-titlebar',
        fixBackground: false
    });

    return FeaturedMaker;
};

class FeaturedMaker {

    /* ---- constructor ----
     *
     * Inputs:
     *   - data (object): Data for this maker from `makers.json`
     *   - makerId (string): The maker's unique ID from `makers.json`
     *
     * Output: none
     */
    constructor(data, makerId) {
        this.data = data;
        this.cache = {};
        this.id = makerId;
        this.makerType = 'featured';
        this.imgPath = `${this.projectPath}img/profiles/${this.id}/`;
    }

    /* ---- showProfile ----
     *
     * Shows the maker's full profile, updates the `profile` parameter in the
     * URL query, and makes a call to hydrate the profile.
     *
     * Inputs: none
     *
     * Output: none
     */
    showProfile() {
        this.videoModal.close();

        if (this.profileModal.isOpen()) {
            this.profileModal.setContent(
                this._getProfileMarkup()
            );
        } else {
            this.profileModal.open(
                this._getProfileMarkup()
            );
        }

        urlQueryManager.setParam('profile', this.id);

        this._hydrateProfile(this.profileModal.target);
    }

    /* ---- closeActiveProfile (static) ----
     *
     * Closes whichever profile is active, and closes the video modal.
     *
     * Inputs: none
     *
     * Output: none
     */
    static closeActiveProfile() {
        this.prototype.videoModal.close();
        this.prototype.profileModal.close();
    }

    /* ---- hydrateSnippet ----
     *
     * Adds functionality to the maker's snippet:
     *   - Attaches an event handler to `.js-open-profile` to show the maker's
     *     profile on click (or `Enter` keypress)
     *
     * Inputs:
     *   - snippet (DOM node): The maker's snippet
     *
     * Output: none
     */
    hydrateSnippet(snippet) {
        let profileOpener = snippet.querySelector('.js-open-profile');
        if (profileOpener) onClickOrEnter(profileOpener, (function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.showProfile();
        }).bind(this));
    }

    /* ---- _hydrateProfile ----
     *
     * Adds functionality to the maker's profile:
     *   - Attaches an event handler to `.js-open-video` to open the video modal
     *   - Initializes Slick carousels on the collections of featured items (if
     *     on desktop)
     *   - Initializes the product carousel
     *
     * Inputs:
     *   - container (DOM node): The element containing the maker's profile
     *
     * Output: none
     */
    _hydrateProfile(container) {

        // Video button
        let videoOpener = container.querySelector('.js-open-video');
        if (videoOpener) onClickOrEnter(videoOpener, (function (e) {
            e.preventDefault();
            e.stopPropagation();
            this._showVideo();
        }).bind(this));

        // Item carousels (desktop only)
        let itemCarousels = container.querySelectorAll(this.carouselConfig.selector);
        Array.prototype.forEach.call(itemCarousels, carousel => {
            customSlick.slick({
                target: carousel,
                ...this.carouselConfig
            });
        });

        // Product carousel
        // TODO: Ideally the carousel's markup would be cached
        productCarousel.init(projectPath, {
            isCanada: this.isCanada,
            isQuebec: this.isQuebec
        });
    }

    /* ---- _showVideo ----
     *
     * Shows the main video in a modal.
     *
     * Inputs: none
     *
     * Output: none
     */
    _showVideo() {
        let data = this.data,
            locale = this.isQuebec ? 'QU' : this.isCanada ? 'CA' : 'US',
            firstName = data['First name'],
            videoId = data[`YouTube video ID ${locale}`];

        this.videoModal.open(
            `
                <div class="mel-c-video">
                    <div class="mel-c-video__fluid">
                        <iframe class="mel-c-video__player" src="https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0" title="${ this.isQuebec ? 'Vid&eacute;o avec' : 'Video featuring'} ${firstName}" allowfullscreen></iframe>
                    </div>
                </div>
            `
        );
    }

    /* ---- _getProfileMarkup ----
     *
     * Gets this maker's profile markup from the cache. If the markup is not yet
     * cached, it is built and cached before being returned.
     *
     * Inputs: none
     *
     * Output (string): Profile markup
     */
    _getProfileMarkup() {
        if (!this.cache.profileMarkup) {
            this.cache.profileMarkup = this._buildProfileMarkup();
        }
        return this.cache.profileMarkup;
    }

    /* ---- _buildProfileMarkup ----
     *
     * Assembles a string of markup for this maker's profile.
     *
     * Inputs: none
     *
     * Output (string): Profile markup
     */
    _buildProfileMarkup() {
        let data = this.data,
            locale = this.isQuebec ? 'QU' : this.isCanada ? 'CA' : 'US',
            firstName = data['First name'],
            bannerImg = `${this.imgPath}header-${this.id}${this.isQuebec ? '-qu' : ''}`,
            quote = this.isQuebec ? `&laquo;&nbsp;${data['Quotation QU']}&nbsp;&raquo;`
                :
                `&ldquo;${data[`Quotation ${locale}`]}&rdquo;`,
            productIds = data[`Product SKUs ${locale}`],
            spaces = data['My space'],
            projects = data['My projects'];

        return `
            <div class="c-featured-banner">
                <div class="c-featured-banner__img">
                    <picture>
                        <source srcset="${bannerImg}-m.jpg" media="(max-width: 640px)">
                        <img src="${bannerImg}.jpg" alt="${ this.isQuebec ? 'Fait par' : 'Made by' } ${firstName}.">
                    </picture>
                </div>
                <!--<p class="c-featured-banner__quote">${quote}</p>-->
            </div>
            ${ this._buildCardMarkup({
                portraitType: 'profile',
                showLabels: true,
                showBio: true,
                showBioExtra: true,
                showButton: true
            }) }
            ${ spaces && spaces.length ?
                `<div class="c-featured-items">
                    <h4 class="c-profile-modal__heading">${ this.isQuebec ? 'L&rsquo;endroit o&ugrave; je cr&eacute;e' : 'Where I Make' }</h4>
                    <div class="c-featured-items__block-container js-featured-item-carousel">
                        ${ this._buildItemsMarkup(spaces, 'creative-space') }
                    </div>
                </div>`
                    :
                    ''
            }
            ${ projects && projects.length ?
                `<div class="c-featured-items">
                    <h4 class="c-profile-modal__heading">${ this.isQuebec ? 'Ce que je cr&eacute;e' : 'What I Make' }</h4>
                    <div class="c-featured-items__block-container js-featured-item-carousel">
                        ${ this._buildItemsMarkup(projects, 'working-on') }
                    </div>
                </div>`
                    :
                    ''
            }
            ${ productIds ?
                `<div class="c-featured-products">
                    <h4 class="c-profile-modal__heading c-featured-products__heading">${ this.isQuebec ? 'Les fournitures dont je ne saurai me passer' : 'Supplies I Love' }</h4>
                    <div class="c-product-carousel js-product-carousel" data-prod-ids="${productIds}"></div>
                </div>`
                    :
                    ''
            }
        `;
    }

    /* ---- _buildCardMarkup ----
     *
     * Assembles a string of markup for a "card" component containing
     * information about this maker. The contents of the card are configurable
     * for reuse in different contexts.
     *
     * Inputs:
     *   - options (object): {
     *       - portraitType (string, default = 'profile'): The type of portrait
     *         image to show. The permissible values are: 'profile', 'lp', and
     *         'archive'
     *       - showLabels (boolean, default = false): Whether to include labels
     *       - showBio (boolean, default = false): Whether to include a bio
     *       - showBioExtra (boolean, default = false): Whether to include the
     *         "extra" bio section
     *       - showQuote (boolean, default = false): Whether to include a quote
     *       - showLink (boolean, default = false): Whether to include a link to
     *         open the maker's profile
     *       - showButton (boolean, default = false): Whether to include a
     *         button to open the video modal
     *     }
     *
     * Output (string): Card markup
     *
     * Note: This method has a corresponding template in
     * `scripts/pre-build/project/templates/featuredCard.js`. If you update one
     * of these, you will likely need to update the other as well.
     */
    _buildCardMarkup(options = {}) {
        let defaults = {
            portraitType: 'profile',
            showLabels: false,
            showBio: false,
            showBioExtra: false,
            showQuote: false,
            showLink: false,
            showButton: false
        };
        let { portraitType, showLabels, showBio, showBioExtra, showQuote, showLink, showButton } = Object.assign(defaults, options);

        let data = this.data,
            locale = this.isQuebec ? 'QU' : this.isCanada ? 'CA' : 'US',
            img = `${this.imgPath}portrait-${portraitType}-${this.id}.jpg`,
            firstName = this.isQuebec ? data['First name'].replace('&', 'et')
                :
                data['First name'],
            handle = data['Social handle'],
            labels = this._buildLabelMarkup(),
            bio = encodeAngleQuotes(data[`Bio ${locale}`]),
            bioExtra = encodeAngleQuotes(data[`Bio extra ${locale}`]),
            quote = this.isQuebec ? `&laquo;&nbsp;${data['Quotation QU']}&nbsp;&raquo;`
                :
                `&ldquo;${data[`Quotation ${locale}`]}&rdquo;`,
            hasVideo = !!data[`YouTube video ID ${locale}`],
            videoCTA = data[`Video CTA text ${locale}`];

        return `
            <div class="c-featured-card">
                <div class="c-featured-card__portrait">
                    <img class="mel-js-lazy" data-src="${img}" alt="">
                </div>
                <div class="c-featured-card__copy">
                    <h3 class="c-featured-card__name">${firstName}</h3>
                    <p class="c-featured-card__handle">
                        <a href="https://www.instagram.com/${handle}/" target="_blank" rel="noopener">@${handle}</a>
                    </p>
                    ${ showLabels && labels ? `<p class="c-featured-card__labels">${labels}</p>` : ''}
                    ${ showBio ? `<p class="c-featured-card__bio">${bio}</p>` : '' }
                    ${ showBioExtra && bioExtra ? `<p class="c-featured-card__bio"><strong>${bioExtra}</strong></p>` : '' }
                    ${ showQuote ? `<p class="c-featured-card__quote">${quote}</p>` : '' }
                    ${ showLink ? `<p class="c-featured-card__link">
                        <a class="js-open-profile" role="button" tabindex="0">${ this.isQuebec ? 'En savoir plus sur' : 'More About' } ${firstName}</a>
                    </p>` : '' }
                    ${ showButton && hasVideo ? `<a class="c-featured-card__button mel-button js-open-video">
                        <div class="mel-button__label">${ videoCTA || (this.isQuebec ? `Visionner la vid&eacute;o` : `Watch ${firstName}'s Video`) }</div>
                    </a>` : '' }
                </div>
            </div>`;
    }

    /* ---- _buildItemsMarkup ----
     *
     * Assembles a string of markup for a collection of items within a
     * "featured-items" component. The item data is sourced from a secondary
     * table in the original Excel file.
     *
     * Inputs:
     *   - items (array): Items data
     *   - imgDir (string): Name of the directory containing images for the
     *     items
     *
     * Output (string): Items markup
     */
    _buildItemsMarkup(items, imgDir) {
        if (items) {
            return items.map(item => {
                let locale = this.isQuebec ? 'QU' : this.isCanada ? 'CA' : 'US',
                    imgName = item[`Image name ${locale}`],
                    img = `${this.imgPath}${imgDir}/${imgName}`,
                    quote = item[`Quotation ${locale}`],
                    link = item[`Link ${locale}`],
                    videoId = item[`YouTube video ID ${locale}`],
                    hasMakeThisOverlay = stringToBoolean(item[`Make-this overlay ${locale}`]),
                    overlaySrc = `${this.projectPath}img/makethis${ this.isQuebec ? '-qu' : '' }.png`,
                    overlayAlt = this.isQuebec ? 'Faites ce projet' : 'Make this';

                // NOTE: Img markup includes required classes and attributes for
                //   both lazysizes (via `.mel-js-lazy`) and Slick's
                //   lazy-loader, as the items could be displayed in a carousel
                //   or free-scrolling div at any given time
                return videoId ?
                    `<div class="c-featured-items__block">
                        <iframe src="https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0" title="${ this.isQuebec ? 'Vid&eacute;o avec' : 'Video featuring'} ${this.data['First name']}" allowfullscreen></iframe>
                    </div>`
                        :
                        imgName ?
                        `<div class="c-featured-items__block">
                            ${ link ? `<a href="${link}">` : '' }
                                <img class="c-featured-items__img mel-js-lazy" data-src="${img}" data-lazy="${img}" alt="${quote}">
                                ${ hasMakeThisOverlay ? `<img class="c-featured-items__overlay mel-js-lazy" data-src="${overlaySrc}" data-lazy="${overlaySrc}" alt="${overlayAlt}">` : '' }
                            ${ link ? `</a>` : '' }
                        </div>`
                            :
                            '';
            }).join('');
        } else {
            return '';
        }
    }

    /* ---- _buildLabelMarkup ----
     *
     * Assembles a string of markup for this maker's labels. The label data is
     * sourced from a secondary table in the original Excel file.
     *
     * Inputs: none
     *
     * Output (string): Label markup
     */
    _buildLabelMarkup() {
        let labels = this.data['Labels'],
            locale = this.isQuebec ? 'QU' : this.isCanada ? 'CA' : 'US';

        if (labels) {
            return labels.map(row => row[`Label ${locale}`]).join(' | ');
        } else {
            return '';
        }
    }
}
