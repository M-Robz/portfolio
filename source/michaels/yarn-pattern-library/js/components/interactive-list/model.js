const arrayIncludes = require('../../modules/arrayIncludes');
const stripAccents = require('../../modules/stripAccents');


/* ==== model ====
 *
 * An abstract representation of list items, filter criteria, and conditional
 * content (i.e., filter-contingent content such as banners). Stores server
 * data, config data, and application state. Exposes methods for initializing,
 * getting, and setting the data.
 *
 * The setter methods allow items and conditional content to be filtered and
 * sorted. Filtering is accomplished by setting the `isActive` state of items
 * and conditional content in the data, and sorting is accomplished by
 * reordering the array of item data. The data model thereby represents the
 * state of the application. It does not directly update the DOM.
 *
 * Exported methods:
 *   - init.itemData
 *   - init.conditionalContentData
 *   - init.filterFields
 *   - get.itemData
 *   - get.conditionalContentData
 *   - get.filterFieldData
 *   - get.activeFieldValues
 *   - get.urlMapToFieldNames
 *   - set.itemOrder
 *   - set.filterStates
 *   - set.activeItems
 *   - set.activeItemsByNum
 *   - set.activeConditionalContent
 *
 * Private functions:
 *   - _setUniqueFilterValues
 *
 * Data model:
 *   - _data.items
 *   - _data.conditionalContent
 *   - _data.filterFields
 *
 * Data structure:
 * ```
 * _data = {
 *     items: [{
 *         ...(fields from source JSON),
 *         isActive
 *     }],
 *     conditionalContent: [{
 *         fieldName,
 *         values: [{
 *             name,
 *             elements: [{
 *                 container,
 *                 template,
 *                 data
 *             }],
 *             isActive
 *         }]
 *     }],
 *     filterFields: [{
 *         name,
 *         urlParam,
 *         defaultValue,
 *         activeValues,
 *         uniqueValues
 *     }]
 * }
 * ```
 *
 * Notes:
 *   - A filter field's `activeValues` property may equal any of the following:
 *       - `null`: all values are active (i.e., no filter is currently applied)
 *       - A non-empty array: only the values within the array are active
 *       - An empty array: no values are active
 *   - Although `_data` is scoped to this component, `_data.items`,
 *     `_data.conditionalContent`, and `_data.filterFields` are not protected,
 *     as references to them are exposed by the getter methods.
 *   - The data for conditional content and filter fields may contain additional
 *     properties beyond those identified above under "Data structure" if the
 *     project's config files include custom properties. The model will ignore
 *     those properties.
 *
 * IE bugfix: Use `arrayIncludes` to ponyfill `Array.prototype.includes`.
 */


/*---------------
     Variables
  ---------------*/

// Namespace objects
const init = {},
      get = {},
      set = {};

// Data model
const _data = {};


/*------------------
     Initializers
  ------------------*/

/*
 * Copy and store the item data, and set items to active by default. If the
 * filter field data has already been initialized, make a call to set unique
 * filter values.
 *
 * NOTE: The source data is expected to be an array of objects representing
 * tabular data. Each object represents a record (row), and its properties
 * correspond to the field (column) names in the table.
 *
 * TODO: If an item is listed twice in the data so that it appears under two
 * categories, it will appear twice on the page if both category filters are
 * active. Should duplicates be removed? How then would we list an item under
 * two categories?
 */
init.itemData = function (sourceData) {
    _data.items = sourceData.map(item => {
        let itemCopy = Object.assign({}, item);
        itemCopy.isActive = true;
        return itemCopy;
    });
    if (_data.filterFields) _setUniqueFilterValues();
};

/*
 * Store the configurations for conditional content from `config.js`.
 *
 * NOTE: This stores a reference to the input array, which is later modified.
 */
init.conditionalContentData = function (contentConfigs) {
    _data.conditionalContent = contentConfigs;
};

/*
 * Store the configurations for filter fields from `config.js`, and set active
 * values. If the item data has already been initialized, make a call to set
 * unique filter values.
 *
 * A field's active values will be set to its default if one was specified in
 * the config; otherwise all values will be made active.
 *
 * NOTE: This stores a reference to the input array, and modifies it.
 */
init.filterFields = function (fieldConfigs) {
    _data.filterFields = fieldConfigs;
    _data.filterFields.forEach(field => {
        if (field.defaultValue) {
            field.activeValues = [ field.defaultValue ];
        } else {
            field.activeValues = null;
        }
    });
    if (_data.items) _setUniqueFilterValues();
};


/*-------------
     Getters
  -------------*/

/*
 * Get a reference to the data for items.
 */
get.itemData = function () {
    return _data.items;
};

/*
 * Get a reference to the data for conditional content.
 */
get.conditionalContentData = function () {
    return _data.conditionalContent;
};

/*
 * Get a reference to the data for filter fields.
 */
get.filterFieldData = function () {
    return _data.filterFields;
};

/*
 * Get an array containing the values that are currently active for a specified
 * filter field.
 */
get.activeFieldValues = function (fieldName) {
    if (!_data.filterFields) return null;

    let fieldData = _data.filterFields.find(field => field.name === fieldName);
    if (fieldData) {
        return fieldData.activeValues;
    } else {
        return null;
    }
};

/*
 * Get a Map object that maps the names of URL parameters to their corresponding
 * field names, as specified in `config.js`. The Map's keys are the URL params,
 * and its values are the field names.
 *
 * NOTE: This is needed because the names of the URL parameters (e.g.,
 * "category") may not exactly match the corresponding field names in the data
 * (e.g., "Category").
 */
get.urlMapToFieldNames = function () {
    if (!_data.filterFields) return null;

    let map = new Map();
    _data.filterFields.forEach(field => {
        map.set(field.urlParam, field.name);
    });
    return map;
};


/*-------------
     Setters
  -------------*/

/*
 * Sort the array of item data according to a specified key and ordering
 * criterion. The array is sorted in place (i.e., no copy is made).
 *
 * NOTE: `exceltojson` assigns '' as the default value for missing data. In the
 * sort function, '' will be coerced to `0` if an arithmetic operation is
 * applied.
 */
set.itemOrder = function (key, order) {
    if (!_data.items) return;

    var sortFnc;
    switch (order) {
        case 'a-z':
            sortFnc = (a, b) => {
                let valueA = stripAccents(a[key]).toLowerCase();
                let valueB = stripAccents(b[key]).toLowerCase();
                return (valueA < valueB) ? -1
                    : (valueA > valueB) ? 1
                    : 0
                ;
            };
            break;
        case 'z-a':
            sortFnc = (a, b) => {
                let valueA = stripAccents(a[key]).toLowerCase();
                let valueB = stripAccents(b[key]).toLowerCase();
                return (valueA < valueB) ? 1
                    : (valueA > valueB) ? -1
                    : 0
                ;
            };
            break;
        case 'ascending':
        case 'oldest':
            sortFnc = (a, b) => a[key] - b[key];
            break;
        case 'descending':
        case 'newest':
        default:
            sortFnc = (a, b) => b[key] - a[key];
    }
    _data.items.sort(sortFnc);
};

/*
 * Set the list of currently active values for the specified filter fields.
 *
 * The `filterCriteria` argument is an object that specifies active values for
 * any subset of the filter fields. The object's keys are the field names, and
 * its values are arrays containing the fields' active values.
 *
 * If a field is omitted from the `filterCriteria` object, its active values
 * will not be modified.
 */
set.filterStates = function (filterCriteria) {
    if (_data.filterFields) _data.filterFields.forEach(field => {
        switch (filterCriteria[field.name]) {
            case undefined:
                // Don't modify the state of this filter field
                break;
            case null:
                // Unset the filter (make all values active)
                field.activeValues = null;
                break;
            default:
                // Set active values to the array passed by argument
                field.activeValues = filterCriteria[field.name];
        }
    });
};

/*
 * Set the `isActive` state of items. Items are considered active (i.e., not
 * filtered out) if their value in each filter field is listed among that
 * field's active values.
 *
 * NOTE: If a field's active values are set to `null`, all values are considered
 * to be active.
 */
set.activeItems = function () {
    if (_data.items && _data.filterFields) _data.items.forEach(item => {
        item.isActive = _data.filterFields.every(field => {
            if (field.activeValues === null) {
                return true;
            } else {
                return arrayIncludes(field.activeValues, item[field.name]);
            }
        });
    });
};

/*
 * Filter items to show only a specified number of them, starting from the first
 * item in the data array.
 */
set.activeItemsByNum = function (numToShow) {
    if (_data.items) _data.items.forEach((item, i) => {
        item.isActive = i < numToShow;
    });
};

/*
 * Set the `isActive` state of conditional (filter-contingent) content. For each
 * filter field (e.g., "Category") that has conditional content, the content for
 * a given field value (e.g., "Yarn") is considered active if that value is
 * listed among the field's active values, or if the field's active values are
 * set to `null`.
 */
set.activeConditionalContent = function () {
    if (_data.conditionalContent) {
        _data.conditionalContent.forEach(field => {
            let activeValues = get.activeFieldValues(field.fieldName);
            if (activeValues === null) {
                field.values.forEach(value => {
                    value.isActive = true;
                });
            } else {
                field.values.forEach(value => {
                    value.isActive = arrayIncludes(activeValues, value.name);
                });
            }
        });
    }
};


/*-----------------------
     Private functions
  -----------------------*/

/*
 * Assemble a list of the unique values in a specified field of tabular data.
 *
 * NOTE: Falsy values will be omitted from the returned array.
 */
function _setUniqueFilterValues() {
    if (_data.filterFields && _data.items) {
        _data.filterFields.forEach(field => {
            let values = [];
            _data.items.forEach(item => {
                let valueInField = item[field.name];
                if (valueInField && !arrayIncludes(values, valueInField)) {
                    values.push(valueInField);
                }
            });
            field.uniqueValues = values;
        });
    }
}


module.exports = { init, get, set };
