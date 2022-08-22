/* ---- makeNode ----
 *
 * Version 1.0.0
 * 9/1/2020
 *
 * Creates a DOM node from a string of markup, and returns a reference to the
 * node. The node initially exists within an unreferenced document fragment
 * until it is appended/inserted into the DOM.
 *
 * Note that the markup string must contain exactly one top-level element. If
 * there are multiple siblings at the top level, only a reference to the first
 * will be returned.
 *
 * Inputs:
 *   - markup (string): String of HTML markup
 *
 * Output (DOM node): Reference to the newly created node
 */
function makeNode(markup) {
    let fragment = document.createRange().createContextualFragment(markup);
    return fragment.querySelector('*');
}

module.exports = makeNode;
