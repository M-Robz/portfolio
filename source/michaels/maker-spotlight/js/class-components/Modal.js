const openDialog = require('../modules/openDialog');


/* ---- Modal ----
 *
 * Updated 4/22/2020
 *
 * This class represents a modal that uses the global `app.dialog.create` method
 * (via the `openDialog` module) for instantiating a jQuery UI Dialog component.
 * The class provides methods for opening and closing the modal, setting its
 * content, and checking to see whether it is currently open.
 *
 * The wrapper methods for `close` and `isOpen` are necessary because
 * `app.dialog` appears to destroy the Dialog instance when the modal is closed,
 * which prevents Dialog's `close` and `isOpen` methods from being called.
 *
 * Constructor input (object): {
 *   - target (DOM node): Element to open in a modal
 *   - body (DOM node, optional): Container inside the target element which
 *     holds the modal's content. Defaults to the target itself if omitted
 *   - width (number or string, optional): Modal width in pixels (unitless) or
 *     'auto'
 *   - height (number or string, optional): Modal height in pixels (unitless) or
 *     'auto'
 *   - classList (string, optional): Space-separated list of classes to add to
 *     modal
 *   - fixBackground (boolean, optional): Prevent page from scrolling behind
 *     modal
 *   - onClose (function, optional): Callback function to be executed when the
 *     modal is closed
 *   - onCloseArgs (array, optional): Arguments to be passed to `onClose`
 * }
 *
 * Properties:
 *   - target: From constructor input
 *   - body: From constructor input
 *   - options (object): Contains `width`, `height`, `classList`, and
 *     `fixBackground` properties from the constructor input if defined. Will be
 *     passed as `options` parameter to `openDialog`
 *   - onClose: From constructor input
 *   - onCloseArgs: From constructor input
 *
 * Methods:
 *   - open
 *   - close
 *   - setContent
 *   - isOpen
 *
 * Output: none
 */
class Modal {
    constructor({ target, body, width, height, classList, fixBackground, onClose, onCloseArgs }) {
        this.target = target;
        this.body = body || this.target;
        this.options = {};
        if (width !== undefined) this.options.width = width;
        if (height !== undefined) this.options.height = height;
        if (classList !== undefined) this.options.classList = classList;
        if (fixBackground !== undefined) this.options.fixBackground = fixBackground;
        this.onClose = onClose;
        this.onCloseArgs = onCloseArgs || [];
    }

    /* ---- open ----
     *
     * Sets the modal's content and opens it.
     *
     * Inputs:
     *   - markup (string): Modal content
     *
     * Output: none
     */
    open(markup) {
        this.setContent(markup);
        openDialog(this.target, this.options, this.onClose, ...this.onCloseArgs);
    }

    /* ---- close ----
     *
     * Closes the modal. If the modal is already closed, no action is taken.
     * This method is a wrapper around the jQuery UI Dialog's `close` method.
     *
     * Inputs: none
     *
     * Output: none
     */
    close() {
        try {
            $(this.target).dialog('close');
        } catch (e) {}
    }

    /* ---- setContent ----
     *
     * Updates the content of the modal.
     *
     * Inputs:
     *   - markup (string): Modal content
     *
     * Output: none
     */
    setContent(markup) {
        this.body.innerHTML = markup;
    }

    /* ---- isOpen ----
     *
     * Checks whether the modal is open. This method is a wrapper around the
     * jQuery UI Dialog's `isOpen` method.
     *
     * Inputs: none
     *
     * Output (boolean): Whether the modal is open
     */
    isOpen() {
        try {
            return $(this.target).dialog('isOpen');
        } catch (e) {
            return false;
        }
    }
}


module.exports = Modal;
