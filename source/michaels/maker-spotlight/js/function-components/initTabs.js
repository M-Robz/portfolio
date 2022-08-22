const onClickOrEnter = require('../modules/onClickOrEnter');
const urlQueryManager = require('../modules/urlQueryManager');


/* ---- initTabs ----
 *
 * Initialize tab functionality for the Maker Spotlight archive page.
 *
 * Output: none
 */
function initTabs() {

    const tabs = document.querySelectorAll('.js-tab');

    // Return if current page does not have tabs (e.g., on landing page)
    if (!tabs.length) return;

    // Map tabs to their corresponding maker sections; listen to tabs
    const sections = new Map();
    for (const tab of tabs) {
        sections.set(
            tab,
            document.querySelector(`.js-section[data-section=${tab.dataset.section}]`)
        );
        onClickOrEnter(tab, () => {
            if (!tabIsActive(tab)) {
                showTab(tab);
                updateUrlQuery(tab);
            }
        });
    }

    // Show the appropriate tab when the user navigates forward or backward
    // through the browsing history
    urlQueryManager.respondToNav(() => {
        const urlSectionId = urlQueryManager.getParam('section');
        const tabToShow = findTab(urlSectionId) || tabs[0];
        if (!tabIsActive(tabToShow)) showTab(tabToShow);
    });

    // Initially show tab specified by the URL query string, or first tab by
    // default
    const initialSection = urlQueryManager.getParam('section');
    showTab(
        findTab(initialSection) || tabs[0]
    );


    /*
     * Find the tab specified by a given section ID
     */
    function findTab(sectionId) {
        return sectionId
            ? Array.from(tabs).find(tab => tab.dataset.section === sectionId) || null
            : null
        ;
    }

    /*
     * Show a specified tab
     */
    function showTab(target) {
        for (const tab of tabs) {
            if (tab.isSameNode(target)) {
                tab.classList.add('tabIsActive');
                sections.get(tab).classList.remove('tabIsHidden');
            } else {
                tab.classList.remove('tabIsActive');
                sections.get(tab).classList.add('tabIsHidden');
            }
        }
    }

    /*
     * Determine whether a given tab is currently active
     */
    function tabIsActive(tab) {
        return tab.classList.contains('tabIsActive');
    }

    /*
     * Update the URL query string to match the specified tab
     */
    function updateUrlQuery(tab) {
        urlQueryManager.setParam('section', tab.dataset.section);
    }
}

module.exports = initTabs;
