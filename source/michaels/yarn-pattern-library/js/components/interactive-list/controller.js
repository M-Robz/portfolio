const model = require('./model');
const view = require('./view');


/* ==== controller ====
 *
 * The controller serves two primary purposes:
 *
 *   1. It functions as an adapter between the model and view, which are not
 *      directly aware of each other, although the view does receive references
 *      to the model from the controller.
 *   2. It provides an API to `main.js` by exporting methods for high-level
 *      tasks for managing control flow, and exposing some lower-level methods
 *      from the model and view.
 *
 * Exported methods:
 *   - initData
 *   - initTemplates (re-exported from view)
 *   - initSortMenu
 *   - initFilterMenu
 *   - updateModel: {
 *       - sortFromMenu
 *       - filterFromUrl
 *       - filterFromMenu
 *       - sortItems (re-exported from model)
 *       - filterByNumToShow (re-exported from model)
 *       - getActiveFieldValues (deprecated)
 *     }
 *   - updateView
 *   - utilities: {
 *       - getActiveFieldValues (re-exported from model)
 *     }
 *
 * Private functions:
 *   - _listenToSortMenu
 *   - _listenToFilterMenu
 *   - _populateFilterMenu
 */


/*
 * Initialize the data model for list items, filter fields, and/or conditional
 * content (such as banners) from the source data provided.
 *
 * NOTES:
 *   - The data model will only be initialized for whichever keys are passed in
 *     the options argument. This allows the three data arrays
 *     (`conditionalContent`, `filterFields`, and `items`) to be initialized at
 *     different times (e.g., on page load or after fetching the item data).
 *   - Pass the source data for `conditionalContent` and `filterFields` from the
 *     config. The item data is typically sourced from a JSON file.
 */
function initData({ conditionalContent, filterFields, items } = {}) {
    if (conditionalContent) model.init.conditionalContentData(conditionalContent);
    if (filterFields) model.init.filterFields(filterFields);
    if (items) model.init.itemData(items);
}

/*
 * Initialize a sort menu.
 */
function initSortMenu(menu) {
    _listenToSortMenu(menu);
}

/*
 * Initialize a filter menu.
 */
function initFilterMenu(menu, { populate, hasAllOption, allOptionLabel } = {}) {
    if (populate === undefined) populate = true;

    view.register.filterMenu(menu);
    if (populate) _populateFilterMenu(menu, hasAllOption, allOptionLabel);
    _listenToFilterMenu(menu);
}

/*
 * Sort items according to the criterion selected in a sort menu.
 */
function sortFromMenu(menu) {
    let { key, order } = view.read.sortMenu(menu);
    model.set.itemOrder(key, order);
}

/*
 * Filter items and conditional content according to parameters in the URL query
 * string.
 *
 * DEVELOPER NOTE: Methods in the controller for filtering should both update
 * the filter states and set the active items/content, as the latter step is a
 * necessary part of the filtering process (by contrast, the sorting process
 * does not require a change to active state).
 */
function filterFromUrl() {
    let urlParams = view.read.url(
        model.get.urlMapToFieldNames()
    );
    model.set.filterStates(urlParams);
    model.set.activeConditionalContent();
    model.set.activeItems();
}

/*
 * Filter items and conditional content according to options selected in a
 * filter menu.
 */
function filterFromMenu(menu) {
    let menuSelections = view.read.filterMenu(menu);
    model.set.filterStates(menuSelections);
    model.set.activeConditionalContent();
    model.set.activeItems();
}

/*
 * Update items and conditional content in the view, and synchronize filter
 * menus with the data model.
 */
function updateView() {
    view.render.items(
        model.get.itemData()
    );
    view.render.conditionalContent(
        model.get.conditionalContentData()
    );
    view.sync.filterMenus(
        model.get.filterFieldData()
    );
    // view.sync.url(); // Add if the URL query string also needs to be synced
}


/*-----------------------
     Private functions
  -----------------------*/

/*
 * Add a listener to a sort menu for the "change" event. The callback sorts the
 * items and updates the view based on the new menu selection.
 */
function _listenToSortMenu(menu) {
    menu.addEventListener('change', () => {
        sortFromMenu(menu);
        view.render.items(
            model.get.itemData()
        );
    });
}

/*
 * Add a listener to a filter menu for the "change" event. The callback updates
 * the menu in response to the option that was clicked, and then filters the
 * items and conditional content, and updates the view, based on the new menu
 * selections.
 */
function _listenToFilterMenu(menu) {
    menu.addEventListener('change', ev => {
        view.render.filterMenuUpdate(menu, ev.target);
        filterFromMenu(menu);
        updateView();
    });
}

/*
 * Populate the options within a filter menu based on the filter field data.
 *
 * NOTE: The `hasAllOption` and `allOptionLabel` arguments are optional.
 */
function _populateFilterMenu(menu, hasAllOption, allOptionLabel) {
    view.render.filterMenuOptions(
        menu,
        model.get.filterFieldData(),
        hasAllOption,
        allOptionLabel
    );
}

/*
 * For testing: this function can be called from `main.js` to test filtering
 * without reloading the page. It allows a list of active categories to be
 * passed in from the console.
 */
// function filterForTesting(filterField, activeValues) {
//     model.set.filterStates({
//         [filterField]: activeValues
//     });
//     model.set.activeConditionalContent();
//     model.set.activeItems();
//     updateView();
// }


module.exports = {
    initData,
    initTemplates: view.init.templates,
    initSortMenu,
    initFilterMenu,
    updateModel: {
        sortFromMenu,
        filterFromUrl,
        filterFromMenu,
        sortItems: model.set.itemOrder,
        filterByNumToShow: model.set.activeItemsByNum,
        // TODO: remove in next major release
        getActiveFieldValues: model.get.activeFieldValues
    },
    updateView,
    utilities: {
        getActiveFieldValues: model.get.activeFieldValues
    }
};
