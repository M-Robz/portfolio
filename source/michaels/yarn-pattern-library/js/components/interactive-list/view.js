// Custom modules
const arrayIncludes = require('../../modules/arrayIncludes');
const makeNode = require('../../modules/makeNode');
const stripAccents = require('../../modules/stripAccents');
const urlQueryManager = require('../../modules/urlQueryManager');


/* ==== view ====
 *
 * Manages user input and the visual presentation of application data. Exposes
 * methods for populating and managing the state of sort and filter menus; for
 * reading input from menus and the URL query string; and for updating the DOM
 * to match the order and `isActive` states of the list items and conditional
 * content (i.e., filter-contingent content such as banners) in the data.
 *
 * Item and conditional elements are reordered, activated, or deactivated by
 * appending them to, or removing them from, the DOM. Nodes are cached once
 * created, so references to them persist even if they are removed from the DOM.
 *
 * Exported methods:
 *   - init.templates
 *   - register.filterMenu
 *   - read.sortMenu
 *   - read.filterMenu
 *   - read.url
 *   - sync.filterMenus
 *   - render.items
 *   - render.conditionalContent
 *   - render.filterMenuOptions
 *   - render.filterMenuUpdate
 *
 * Private functions:
 *   - _updateFilterCheckbox
 *   - _syncFilterCheckbox
 *   - _syncFilterRadio
 *   - _renderElement
 *   - _addNoResultsMessage
 *   - _removeNoResultsMessage
 *
 * Notes:
 *   - The view receives references to the model from the controller, but does
 *     not modify the model directly.
 *   - In filter menus, the string "all" is a reserved keyword representing all
 *     menu options. The data source for list items should not use this value in
 *     a filter field, or unexpected behavior may result.
 */


/*---------------
     Variables
  ---------------*/

// Namespace objects
const init = {},
      register = {},
      read = {},
      sync = {},
      render = {};

// Node caches
const _itemNodes = new WeakMap(),
      _contentNodes = new WeakMap();

// Menu registry
const _filterMenus = [];

// Markup templates
const _templates = {};


/*------------------
     Initializers
  ------------------*/

/*
 * Store the markup templates.
 */
init.templates = function (templates) {
    Object.assign(_templates, templates);
};

/*
 * Add a filter menu to a list of all filter menus on the page. The list is used
 * to synchronize the menus with application state.
 */
register.filterMenu = function (menu) {
    _filterMenus.push(menu);
};


/*---------------------
     Read user input
  ---------------------*/

/*
 * Read the currently selected criterion from a sort menu.
 *
 * TODO:
 *   - Handle case where no `option` elements are found?
 *   - Continue to check `menu.tagName`, or require `data-type` attribute as for
 *     filter menus?
 */
read.sortMenu = function (menu) {
    switch (menu.tagName) {

        // Dropdown
        case 'SELECT':
            let options = Array.from(menu.querySelectorAll('option'));
            let selected = options.find(option => option.selected) || options[0];
            return {
                key: selected.dataset.key,
                order: selected.dataset.order
            };

        // Radio
        // case 'FIELDSET':
    }
};

/*
 * Read the currently selected criteria from a filter menu.
 *
 * TODO: Handle case where no `input` elements are found, or no `data-field`
 * attribute is present? Currently sets active values to [] if no inputs found
 */
read.filterMenu = function (menu) {
    let selections = {};
    let fieldName = menu.dataset.field;
    switch (menu.dataset.type) {
        case 'checkbox':
        case 'radio':
            let activeValues = Array.from(menu.querySelectorAll('input'))
                .filter(option => option.checked)
                .map(option => option.value)
            ;
            if (arrayIncludes(activeValues, 'all')) {
                selections[fieldName] = null;
            } else {
                selections[fieldName] = activeValues;
            }
            // break;
        // case 'dropdown':
    }
    return selections;
};

/*
 * Read parameters from the URL query string, and return an object of key-value
 * pairs.
 *
 * Parameter values in the query string are treated as comma-separated lists,
 * which are split into arrays in the returned object.
 *
 * The `paramNameMap` argument is a Map object used to optionally rename the
 * parameters that will be returned. The Map's keys are the names from the query
 * string, and its values are the new names in the returned object. Any
 * parameter names omitted from the Map will remain unchanged.
 *
 * NOTES:
 *   - Parameter names and values are case-sensitive.
 *   - If no value is provided for a parameter, it will be ignored and omitted
 *     from the returned object.
 */
read.url = function (paramNameMap) {
    if (!paramNameMap) paramNameMap = new Map();
    let params = urlQueryManager.getAllParams();
    Object.keys(params).forEach(param => {
        if (params[param] === '') {
            delete params[param];
        } else {
            let values = params[param].split(',');
            let newKey = paramNameMap.get(param);
            if (newKey) {
                params[newKey] = values;
                delete params[param];
            } else {
                params[param] = values;
            }
        }
    });
    return params;
};


/*-------------------------------
     Synchronize menus and URL
  -------------------------------*/

/*
 * Synchronize all registered filter menus with application state.
 */
sync.filterMenus = function (filterFieldData) {
    if (!filterFieldData) return;

    _filterMenus.forEach(menu => {
        let fieldData = filterFieldData.find(field => {
            return field.name === menu.dataset.field;
        });
        if (fieldData) {
            switch (menu.dataset.type) {
                case 'checkbox':
                    _syncFilterCheckbox(menu, fieldData);
                    break;
                case 'radio':
                    _syncFilterRadio(menu, fieldData);
                    // break;
                // case 'dropdown':
            }
        }
    });
};

// TODO
// sync.url
// sync.sortMenu


/*----------------------
     Render DOM nodes
  ----------------------*/

/*
 * Render list items.
 *
 * NOTES:
 *   - DOM nodes are created and cached if they do not already exist.
 *   - If no items are active, a no-results message is shown.
 *
 * DEVELOPER NOTE: When the items contain iframes, it does not appear necessary
 * to empty the `src` attribute of the iframes when replacing the `lazyloaded`
 * class with `mel-js-lazy`, since it seems the `src` attribute is never set.
 * Testing verified that when the iframe is rewritten to the page, it contains
 * an empty document until it is lazy-loaded again.
 *
 * IE BUGFIX: Add/remove nodes directly to/from container instead of writing to
 * fragment first, and emptying container's `innerHTML` before appending
 * fragment.
 */
render.items = function (itemData) {
    let container = document.querySelector('.js-items-container');
    if (!itemData || !container) return;

    _removeNoResultsMessage(container);
    itemData.forEach(item => {
        if (item.isActive) {
            if (_itemNodes.get(item)) {
                Array.from(
                    _itemNodes.get(item).querySelectorAll('iframe.lazyloaded')
                ).forEach(el => {
                    el.classList.remove('lazyloaded');
                    el.classList.add('mel-js-lazy');
                });
            } else {
                _itemNodes.set(item, makeNode(
                    _templates.item(item)
                ));
            }
            container.appendChild(_itemNodes.get(item));
        } else {
            let cachedNode = _itemNodes.get(item);
            if (cachedNode && container.contains(cachedNode)) {
                container.removeChild(cachedNode);
            }
        }
    });
    if (!container.hasChildNodes()) _addNoResultsMessage(container);
};

/*
 * Render conditional content.
 *
 * NOTE: DOM nodes are created and cached if they do not already exist.
 *
 * TODO: If selected value of filter field isn't in `conditionalContentData`,
 * better to not show elements, or to keep what's already there (current
 * behavior)? Issue came up when testing filter menus populated from data
 */
render.conditionalContent = function (conditionalContentData) {
    if (!conditionalContentData || !_templates.conditionalContent) return;

    conditionalContentData.forEach(field => {
        let activeValue = field.values.find(value => value.isActive);
        if (activeValue) {
            activeValue.elements.forEach(element => {
                if (!_contentNodes.get(element)) {
                    _contentNodes.set(element, makeNode(
                        _templates.conditionalContent[element.template](element.data)
                    ));
                }
                _renderElement(element.container, _contentNodes.get(element));
            });
        }
    });
};

/*
 * Populate the options in a filter menu from the set of unique values for the
 * filter field in the data.
 *
 * DEVELOPER NOTE: Currently this works for checkbox and radio menus. It may
 * need to be updated if it also needs to handle dropdown filter menus.
 */
render.filterMenuOptions = function (menu, filterFieldData, hasAllOption = true, allOptionLabel = 'View All') {
    if (!menu || !filterFieldData) return;

    let fieldData = filterFieldData.find(field => {
        return field.name === menu.dataset.field;
    });
    if (!fieldData || !fieldData.uniqueValues) return;

    let container = menu.querySelector('.js-options-container'),
        fragment = document.createDocumentFragment(),
        type = menu.dataset.type,
        field = fieldData.name;

    // Make a copy of `fieldData.uniqueValues`, and sort A-Z
    let sortedValues = [].concat(fieldData.uniqueValues).sort((a, b) => {
        a = stripAccents(a).toLowerCase();
        b = stripAccents(b).toLowerCase();
        return (a < b) ? -1
            : (a > b) ? 1
            : 0
        ;
    });

    // Render menu options
    if (hasAllOption) {
        fragment.appendChild(
            makeNode(
                _templates.filterOption({
                    type,
                    field,
                    value: 'all',
                    label: allOptionLabel,
                    checked: true
                })
            )
        );
    }
    sortedValues.forEach((value, i) => {
        fragment.appendChild(
            makeNode(
                _templates.filterOption({
                    type,
                    field,
                    value: value,
                    label: value,
                    checked: false,
                    index: ++i
                })
            )
        );
    });
    container.appendChild(fragment);
};

/*
 * When the `change` event has fired for a filter menu, update the state of its
 * options depending on which option was selected or deselected.
 */
render.filterMenuUpdate = function (menu, target) {
    switch (menu.dataset.type) {
        case 'checkbox':
            _updateFilterCheckbox(menu, target);
            break;
        case 'radio':
            // No action needed
        // case 'dropdown':
    }
};


/*-----------------------
     Private functions
  -----------------------*/

/*
 * Update the state of a checkbox-type filter menu's options depending on which
 * option was selected or deselected.
 */
function _updateFilterCheckbox(menu, target) {
    let options = Array.from(menu.querySelectorAll('input'));
    let allOption = options.find(option => option.value === 'all');
    let otherOptions = options.filter(option => option.value !== 'all');
    if (target.value === 'all') {
        if (target.checked) {
            otherOptions.forEach(option => {
                option.checked = false;
            });
            allOption.disabled = true;
        } else {
            // This condition shouldn't occur, but re-check and disable 'all'
            //   just in case
            // TODO: is this necessary?
            allOption.checked = true;
            allOption.disabled = true;
        }
    } else {
        if (target.checked) {
            if (allOption) {
                allOption.checked = false;
                allOption.disabled = false;
            }
        } else {
            let someChecked = otherOptions.some(option => option.checked);
            if (allOption && !someChecked) {
                allOption.checked = true;
                allOption.disabled = true;
            }
        }
    }
}

/*
 * Synchronize the state of a checkbox-type filter menu with application state.
 */
function _syncFilterCheckbox(menu, fieldData) {
    let options = Array.from(menu.querySelectorAll('input'));
    let allOption = options.find(option => option.value === 'all');
    let otherOptions = options.filter(option => option.value !== 'all');
    if (fieldData.activeValues === null) {
        if (allOption) {
            otherOptions.forEach(option => {
                option.checked = false;
            });
            allOption.checked = true;
            allOption.disabled = true;
        } else {
            otherOptions.forEach(option => {
                option.checked = true;
            });
        }
    } else  {
        otherOptions.forEach(option => {
            if (arrayIncludes(fieldData.activeValues, option.value)) {
                option.checked = true;
            } else {
                option.checked = false;
            }
        });
        if (allOption) {
            allOption.checked = false;
            allOption.disabled = false;
        }
    }
}

/*
 * Synchronize the state of a radio-type filter menu with application state.
 *
 * TODO: If multiple values are passed via URL, items will be shown for all of
 * them, but only the first radio option will be checked. Is this the best way
 * to handle? Ideally menu state would always reflect app state
 */
function _syncFilterRadio(menu, fieldData) {
    let options = Array.from(menu.querySelectorAll('input'));
    let allOption = options.find(option => option.value === 'all');
    let otherOptions = options.filter(option => option.value !== 'all');
    if (fieldData.activeValues === null) {
        if (allOption) {
            allOption.checked = true;
        } else {
            otherOptions.forEach(option => option.checked = false);
        }
    } else {
        let activeOption = otherOptions.find(option => {
            return arrayIncludes(fieldData.activeValues, option.value);
        });
        if (activeOption) {
            activeOption.checked = true;
        } else {
            options.forEach(option => option.checked = false);
        }
    }
}

/*
 * Render an element inside a container, replacing the previous contents of the
 * container.
 *
 * IE BUGFIX: Use `removeChild` to empty container instead of setting `innerHTML = ''`.
 */
function _renderElement(containerSelector, node) {
    if (node) {
        let container = document.querySelector(containerSelector);
        if (container && !container.contains(node)) {
            Array.from(container.children).forEach(child => container.removeChild(child));
            container.appendChild(node);
        }
    }
}

/*
 * Render a no-results message.
 *
 * TODO: Use a template for this?
 */
function _addNoResultsMessage(container) {
    let newMessage = makeNode(
        '<p class="js-no-results" style="width:100%">No results found.</p>'
    );
    container.appendChild(newMessage);
}

/*
 * If a no-results message is currently displayed, remove it.
 */
function _removeNoResultsMessage(container) {
    let message = container.querySelector('.js-no-results');
    if (message) container.removeChild(message);
}


module.exports = { init, register, read, sync, render };
