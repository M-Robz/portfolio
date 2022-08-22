(function ($) {
    $(function() {
        'use strict';


        // Variables
        const dynamicImgs = projectPath + 'img/';
        const onArchivePage = !!document.querySelector('.page-makers-archive'); // Whether the current page is the Maker Spotlight archive
        const isCanada = !!document.querySelector('.mik-ca'); // Whether the locale is Canada
        const isQuebec = !!document.querySelector('.mik-qu'); // Whether the locale is Quebec


        // Custom modules
        const fetchJson = require('./modules/fetchJson');
        const stringToBoolean = require('./modules/stringToBoolean');
        const urlQueryManager = require('./modules/urlQueryManager');

        // Components
        const Loader = require('./class-components/Loader');
        const FeaturedMaker = require('./class-components/FeaturedMaker')({
            projectPath,
            isQuebec,
            isCanada,
            onArchivePage
        });
        const initTabs = require('./function-components/initTabs');


        // Instantiate loader and set state to "loading"
        let pageLoader = new Loader(
            document.querySelector('.js-page-loader'),
            { isFullPage: true }
        );
        pageLoader.setToLoading();

        // Fetch maker data
        fetchJson(projectPath + 'data/makers.json')
        .then(data => {

            // Instantiate an object for each maker from the FeaturedMaker class
            const featuredMakers = instantiateMakers(data.featuredMakers, FeaturedMaker);

            // Hydrate maker snippets
            hydrateSnippets(featuredMakers);

            // Set loader state to "loaded" and show page content
            pageLoader.setToLoaded();
            document.querySelector('.js-page-content').style.display = '';

            // Initialize tabs on archive page
            initTabs();

            // If a particular profile is specified by the URL query string,
            //   display it on page load
            let urlProfileId = urlQueryManager.getParam('profile');
            if (urlProfileId && featuredMakers[urlProfileId]) featuredMakers[urlProfileId].showProfile();

            // Show or close profiles as necessary when the user navigates
            //   forward or backward through the browsing history
            urlQueryManager.respondToNav(() => {
                let urlProfileId = urlQueryManager.getParam('profile');
                if (urlProfileId && featuredMakers[urlProfileId]) {
                    featuredMakers[urlProfileId].showProfile()
                } else {
                    FeaturedMaker.closeActiveProfile();
                }
            });

            // NOTE: `main.js` handles READING the `profile` param in the URL
            //   query string and taking actions in response, while
            //   FeaturedMaker handles UPDATING the `profile` param based on
            //   user actions.
        })
        .catch(err => {
            pageLoader.setToError('Oops! There must be a bad connection. Please try again later.');
        });


        /* ---- instantiateMakers ----
         *
         * Loops through a set of maker data, and instantiates an object
         * representing each maker from the specified class.
         *
         * Inputs:
         *   - makerData (object): Maker data from `makers.json`
         *   - classPrototype (class): Class from which to instantiate the
         *     makers
         *
         * Output (object): Collection of instantiated maker objects, keyed by
         * the maker IDs
         */
        function instantiateMakers(makerData, classPrototype) {
            let makerCollection = {};
            for (let makerId in makerData) {
                if (makerIsActive(makerData[makerId])) {
                    makerCollection[makerId] = new classPrototype(makerData[makerId], makerId);
                }
            }
            return makerCollection;
        }


        /* ---- hydrateSnippets ----
         *
         * Hydrate Featured Maker snippets with functionality. If a snippet does
         * not have a matching maker object, it is removed from the page.
         *
         * Inputs:
         *   - makers (object): Collection of objects instantiated from the
         *     `FeaturedMaker` class, keyed by the maker IDs
         *
         * Output: none
         */
        function hydrateSnippets(makers) {
            if (objectIsEmpty(makers)) return;

            const snippets = document.querySelectorAll('.js-featured-maker-snippet');
            Array.from(snippets).forEach(snippet => {

                // Read the `data-maker-id` attribute on the snippet
                const maker = makers[snippet.dataset.makerId];

                if (maker) {
                    // If there is a matching maker object, hydrate the snippet
                    //   with functionality
                    maker.hydrateSnippet(snippet);
                } else {
                    // If there is no matching maker object, remove the snippet
                    //   from the page
                    snippet.parentNode.removeChild(snippet);
                }
            });
        }

        /* ---- makerIsActive ----
         *
         * Checks a maker's data to see whether their information should be
         * shown, subject to locale.
         *
         * Inputs:
         *   - data (object): Data for an individual maker
         *
         * Output (boolean): Whether the maker is active
         */
        function makerIsActive(data) {
            let keyValue = isQuebec ? data['Active QU']
                :
                isCanada ? data['Active CA']
                    :
                    data['Active US'];
            if (keyValue === undefined) {
                return false;
            } else {
                return stringToBoolean(keyValue);
            }
        }

        /* ---- objectIsEmpty ----
         *
         * Checks to see whether an object is empty (i.e., has no non-inherited
         * properties).
         *
         * Inputs:
         *   - obj (object): The object to check
         *
         * Output (boolean): Whether the object is empty
         */
        function objectIsEmpty(obj) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) return false;
            }
            return true;
        }

    });
})(jQuery);
