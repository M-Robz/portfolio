// NOTE: Use version 5.1.1 of `query-string` in production. Version 6 dropped
// support for IE.
const queryStringMod = require('query-string');


/* ===== `urlQueryManager` module =====
 *
 * Version 1.1.0
 * 10/13/2020
 *
 * Provides methods for working with URL query strings and the History API.
 * These include getting, setting, and unsetting the values of query parameters
 * without leaving the current page, as well as taking actions when the user
 * navigates through the session history.
 *
 * Exported methods:
 *   - getParam
 *   - getAllParams
 *   - setParam
 *   - unsetParam
 *   - respondToNav
 *
 * Private functions:
 *   - _updateLocation
 */


/* ---- getParam ----
 *
 * Reads the value of a parameter in the URL query string.
 *
 * Inputs:
 *   - key (string): Name of the parameter to read
 *
 * Output (string): Value of the parameter, or `undefined` if not found
 */
function getParam(key) {
    return queryStringMod.parse(window.location.search)[key];
}

/* ---- getAllParams ----
 *
 * Reads the values of all parameters in the URL query string.
 *
 * Inputs: none
 *
 * Output (object): Values of all parameters, keyed by the names of the
 * parameters
 */
function getAllParams() {
    return queryStringMod.parse(window.location.search);
}

/* ---- setParam ----
 *
 * Sets the value of a parameter in the URL query string.
 *
 * Inputs:
 *   - key (string): Name of the parameter to set
 *   - value (string): Value for the parameter
 *
 * Output: none
 *
 * TODO: This could technically accept a `value` argument with a type other than
 * `string`, but the conditional would always evaluate to `true` without type
 * conversion. Update to accept other types?
 */
function setParam(key, value) {
    let queryObj = queryStringMod.parse(window.location.search);
    if (queryObj[key] === undefined || queryObj[key] !== value) {
        queryObj[key] = value;
        _updateLocation(queryObj, key, value);
    }
}

/* ---- unsetParam ----
 *
 * Removes a parameter's key and value from the URL query string.
 *
 * Inputs:
 *   - key (string): Name of the parameter to remove
 *
 * Output: none
 */
function unsetParam(key) {
    let queryObj = queryStringMod.parse(window.location.search);
    if (queryObj[key] !== undefined) {
        delete queryObj[key];
        _updateLocation(queryObj);
    }
}

/* ---- respondToNav ----
 *
 * Listens for user navigation through the session history, and executes the
 * provided callback in response.
 *
 * Inputs:
 *   - callback (function): Function to execute in response to a navigation
 *     event
 *   - ...callbackArgs (variadic arguments, optional): Arguments to be passed to
 *     the callback
 *
 * Output: none
 */
function respondToNav(callback, ...callbackArgs) {
    window.addEventListener('popstate', () => {
        callback(...callbackArgs);
    });
}

/* ---- _updateLocation ----
 *
 * Modifies the URL query string without leaving the page, and creates a new
 * entry in session history.
 *
 * Inputs:
 *   - queryObj (object): Represents a query string in the format recognized by
 *     the `query-string` module
 *   - key (string): Name of the parameter to set
 *   - value (string): Value for the parameter to set
 *
 * Output: none
 *
 * NOTE: Although this function sets the `state` property of the history entry
 * it creates to an object literal containing the provided key and value, the
 * state property is not subsequently accessed by this module.
 */
function _updateLocation(queryObj, key, value) {
    let stringifiedQuery = queryStringMod.stringify(queryObj);
    let state = key && value ? { [key]: value } : {};
    history.pushState(state, '', `${window.location.protocol}//${window.location.hostname}${window.location.pathname}?${stringifiedQuery}`);
}

module.exports = {
    getParam,
    getAllParams,
    setParam,
    unsetParam,
    respondToNav
};
