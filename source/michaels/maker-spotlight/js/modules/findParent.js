/* ---- findParent ----
 *
 * Search an elmeent's parents for the specified selector, and return the parent node if found. The search is performed upward through the DOM tree. If the `elToStopAt` paramenter is supplied, the search will stop once that element is reached.
 *
 * Inputs:
 *   - element (DOM node): Child element whose parents will be searched
 *   - parentSelector (string): CSS selector to match parents against
 *   - elToStopAt (DOM node, optional): Stop searching if this element is reached
 *
 * Output: the specified parent node if found, or `undefined` if not found
 */
function findParent(element, parentSelector, elToStopAt) {
    var el = element;
    while (el !== elToStopAt) {
        try {
            el = el.parentNode;
        } catch (error) {
            return undefined;
        }
        if (el.matches(parentSelector)) {
            return el;
        }
    }
    return undefined;
}

module.exports = findParent;
