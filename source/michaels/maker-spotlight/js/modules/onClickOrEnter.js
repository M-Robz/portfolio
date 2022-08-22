/* ---- onClickOrEnter ----
 *
 * Updated 4/22/2020
 *
 * Wrapper for `addEventListener` that jointly adds listeners for both the click
 * and Enter-keypress events, with the same callback. This ensures that a
 * keyboard user can access the same functionality as a mouse user.
 *
 * Inputs:
 *   - target (DOM node): Element on which to listen for the events
 *   - callback (function): Callback to execute when either event is triggered
 *
 * Output: none
 */
function onClickOrEnter(target, callback) {

    // Listen for click
    target.addEventListener('click', callback);

    // Listen for Enter key
    target.addEventListener('keyup', function(e) {
        let key = e.key || e.keyCode;
        if (key === 'Enter' || key === 13) callback(e);
    });
}

module.exports = onClickOrEnter;
