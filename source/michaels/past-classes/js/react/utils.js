// Public modules
const queryString = require('query-string'); // v5.1.1


/**
 * Utility functions and type definitions.
 * @module utils
 */

/**
 * Look up the first matching property of an object from a list of property
 * names.
 * @param {Object}   object
 * @param {string[]} list
 * @returns {?*} The property value, or `null` if no match.
 */
export function findPropertyFromList(object, list) {
    for (const property of list) {
        if (object.hasOwnProperty(property)) return object[property];
    }
    return null;
}

/**
 * Read filter parameters from the URL query string.
 * @param {FilterConfig} filterFieldConfig - Config for filterable data fields.
 * @returns {FilterCriteria} A new `FilterCriteria` object.
 */
export function readUrlFilters(filterFieldConfig) {
    const urlQueryParams = queryString.parse(window.location.search);
    const filters = {};

    filterFieldConfig.forEach(field => {
        filters[field.name] = urlQueryParams[field.urlParam]
            ? urlQueryParams[field.urlParam].split(',')
            : field.defaultValue
            ? [ field.defaultValue ]
            : null
        ;
    });

    return filters;
}

/**
 * Active filter criteria by field. The object's property names are field names,
 * and the property values are arrays of active filter values.
 * @typedef {Object.<string, *[]>} FilterCriteria
 */

/**
 * Configuration for a collection of fields that the data can be filtered by.
 * Imported from `config/{region}/filterFields.js`.
 * @typedef {Object[]} FilterConfig
 * @property {string} name - Name of the field.
 * @property {string} urlParam - Name of the corresponding URL parameter.
 * @property {*}      defaultValue - The default value to filter by.
 */
