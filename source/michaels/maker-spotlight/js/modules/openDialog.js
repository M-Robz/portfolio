const findParent = require('./findParent');

/* ---- openDialog ----
 *
 * Updated 4/2/2020
 *
 * Initializes and opens a jQuery UI dialog using `app.dialog.create`.
 *
 * Inputs:
 *   - target (DOM node): Element to show as modal
 *   - options (object, required if onClose is provided): {
 *       - width (number or string, optional): Modal width in pixels (unitless)
 *         or 'auto'
 *       - height (number or string, optional): Modal height in pixels
 *         (unitless) or 'auto'
 *       - classList (string, optional): Space-separated list of classes to add
 *         to modal
 *       - fixBackground (boolean, optional): Prevent page from scrolling behind
 *         modal
 *     }
 *   - onClose (function, optional): Callback function to be executed when the
 *     modal is closed
 *   - ...onCloseArgs (variadic arguments, optional): Arguments to be passed to
 *     `onClose`
 *
 * Output: none
 *
 * Reference: https://api.jqueryui.com/dialog/
 */
function openDialog(target, options = {}, onClose, ...onCloseArgs) {
    let defaults = {
        width: 'auto',
        height: 'auto',
        classList: '',
        fixBackground: true
    };
    let { width, height, classList, fixBackground } = Object.assign(defaults, options);

    let $target = $(target);
    var body, bodyOverflowProp;

    // Initialize (or re-initialize) dialog
    app.dialog.create({
        target: $target,
        options: {
            autoOpen: true,
            width: width, // applied to .ui-dialog
            height: height, // applied to target
            dialogClass: classList
        }
    });

    // Fix page position behind dialog
    if (fixBackground) {
        body = document.querySelector('body');
        bodyOverflowProp = getComputedStyle(body).overflow;
        body.style.overflow = 'hidden';
    }

    // When dialog is closed...
    //   NOTE: using on() because addEventListener() doesn't seem to recognize
    //   custom 'dialogclose' event
    $target.on('dialogclose', function f() {
        $target.off('dialogclose', f);

        // Make page scrollable again
        if (fixBackground) body.style.overflow = bodyOverflowProp;

        // Execute callback if one was provided
        if (onClose) onClose(...onCloseArgs);
    });

    // Close dialog when the overlay behind it is clicked
    // NOTE: `.ui-widget-overlay` should be the next sibling of `.ui-dialog`
    let dialog = findParent(target, '.ui-dialog');
    let overlay = dialog ? dialog.nextElementSibling : undefined;
    if (overlay && overlay.classList.contains('ui-widget-overlay')) {
        overlay.addEventListener('click', function () {
            $target.dialog('close');
        });
    }
}

module.exports = openDialog;
