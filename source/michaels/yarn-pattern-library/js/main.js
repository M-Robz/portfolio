(function ($) {
    $(function() {
        'use strict';

        // Custom modules
        const fetchJson = require('./modules/fetchJson');
        const stringToBoolean = require('./modules/stringToBoolean');

        // Components
        const Loader = require('./components/Loader');
        const iList = require('./components/interactive-list');

        // Variables
        const dynamicImgs = projectPath + 'img/';
        const isQuebec = !!document.querySelector('.mik-qu');
        const isCanada = !!document.querySelector('.mik-ca');
        const locale = isQuebec ? 'QUE' : isCanada ? 'CAN' : 'US';

        // Configuration options
        const config = require('./config')(isQuebec, dynamicImgs);

        // Templates
        const templates = require('./templates')(locale, config.custom.itemConfig);


        // Instantiate loader and set state to "loading"
        let pageLoader = new Loader(
            document.querySelector('.js-loader'),
            { isFullPage: true }
        );
        pageLoader.setToLoading();

        // Fetch item data
        fetchJson(dataUrl)
        .then(itemData => {

            // Filter out inactive items, and reverse item order
            const activeItems = filterActive(itemData).reverse();

            // Render items in the featured section
            const featuredContainer = document.querySelector('.js-featured');
            if (featuredContainer) renderFeatured(activeItems, featuredContainer);

            // Load templates
            iList.initTemplates(templates);

            // Load data
            iList.initData({
                items: activeItems,
                filterFields: config.filterFields
            });

            // Init filter menu
            let filterMenu = document.querySelector('.js-filter-menu');
            iList.initFilterMenu(filterMenu, {
                // populate: false,
                allOptionLabel: isQuebec ? 'Voir toutes' : 'View All'
            });

            // Filter items according to URL query string
            iList.updateModel.filterFromUrl();

            // Populate items, set loader state to "loaded", and show hidden
            //   content
            iList.updateView();
            pageLoader.setToLoaded();
            Array.from(
                document.querySelectorAll('.js-show-on-load-success')
            ).forEach(el => el.classList.remove('hidden'));

        }, () => {

            // If fetching the JSON fails, set loader state to "error", and
            //   show error message
            pageLoader.setToError('Oops! There must be a bad connection. Please try again later.');
        });


        /*
         * Filter the data to include only active records.
         */
        function filterActive(data) {
            return data.filter(record => {
                return stringToBoolean(record[`Active ${locale}`]);
            });
        }

        /*
         * Render items in the "featured" section.
         */
        function renderFeatured(data, container) {
            const featuredData = data.filter(record => {
                return stringToBoolean(record[`Featured ${locale}`]);
            });

            const itemMarkup = featuredData
                .map(record => templates.item(record))
                .join('')
            ;

            container.appendChild(
                document.createRange().createContextualFragment(itemMarkup)
            );
        }
    });
})(jQuery);
