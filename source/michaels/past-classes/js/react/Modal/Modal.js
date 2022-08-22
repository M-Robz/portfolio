import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * An accessible modal window containing arbitrary content, with a
 * semi-transparent backdrop. The modal can be closed with the Escape key or by
 * clicking the backdrop (in addition to any mechanism that may be provided
 * within the modal's content, such as a close button).
 * @param {Object}   props
 * @param {Object}   props.openerRef - A ref to the element or component that
 *                     triggered the modal (focus will be returned to this when
 *                     the modal closes). Must be a DOM node or have a custom
 *                     `focus` method.
 * @param {string}   props.initialFocus - CSS selector for the element that
 *                     should initially receive focus when the modal is opened.
 * @param {function} [props.onFocusStart] - Callback to execute when keyboard
 *                     focus is moved backward past the first focusable element
 *                     in the modal.
 * @param {function} [props.onFocusEnd] - Callback to execute when keyboard
 *                     focus is moved forward past the last focusable element in
 *                     the modal.
 * @param {Object}   [props.aria] - ARIA attributes.
 * @param {string}   [props.aria.label]
 * @param {string}   [props.aria.labelledby]
 * @param {string}   [props.aria.describedby]
 * @param {Modal_closeModal} props.closeModal - See below.
 *
 * References:
 * https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
 * https://www.w3.org/WAI/GL/wiki/Using_ARIA_role%3Ddialog_to_implement_a_modal_dialog_box
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
 *
 * Notes:
 *   - Instead of passing `onFocusStart` and `onFocusEnd` callbacks, the first
 *     and last focusable elements could alternatively be determined by the
 *     modal. However, there's no API for that, and the robust solutions are
 *     messy (for example, see JS at https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html).
 */
export default function Modal({
    openerRef, initialFocus, closeModal, onFocusStart, onFocusEnd, aria,
    children
}) {

    // The dialog which appears in front of the backdrop
    const dialogRef = useRef(null);

    /*
     * Store the value of the `body` element's inline overflow style when the
     * modal is initially opened.
     *
     * Note: This ref plays the role of a class instance field.
     * Reference: https://17.reactjs.org/docs/hooks-reference.html#useref
     */
    const origBodyOverflow = useRef(
        document.querySelector('body').style.overflow
    );

    /**
     * Trap focus within the modal. Focus is trapped by dummy "bracket" divs at
     * the start and end of the modal. The brackets call this handler when
     * focused.
     * @param {SyntheticEvent} ev - The focus event.
     * @param {string}         bracket - (start|end) Identifier of the focused
     *                           bracket.
     */
    function trapFocus(ev, bracket) {
        switch (bracket) {
            case 'start': if (onFocusStart) { onFocusStart(); return; } break;
            case 'end':   if (onFocusEnd)   { onFocusEnd();   return; }
        }

        // If a callback was not provided, return focus to the previously
        // focused element by default
        ev.relatedTarget.focus();
    }

    /*
     * Manage focus and page background.
     */
    useEffect(() => {

        // Set initial focus within the modal
        const elToFocus = dialogRef.current.querySelector(initialFocus);
        if (elToFocus) elToFocus.focus();

        // Hide the rest of the page content from screen readers
        // NOTE: This must be done *after* moving focus to the modal
        _srHide('#wrapper');

        // Prevent the page from being scrolled in the background
        _preventBodyScroll();

        return () => {

            // Make the rest of the page content visible to screen readers again
            _srShow('#wrapper');

            // Allow the page to be scrolled again
            _allowBodyScroll(origBodyOverflow.current);

            // Return focus to the element or component that opened the modal
            openerRef.current.focus();
        };
    }, []);

    /*
     * Close modal on Escape key.
     */
    useEffect(() => {

        function handleKeyUp(ev) {
            if (ev.key === 'Escape') closeModal(ev);
        }

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    /*
     * Render
     */
    const modal = (
        <div className="c-Modal">
            <div
                className="c-Modal__backdrop"
                onClick={closeModal}
            ></div>
            <div
                className="c-Modal__dialog"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
                aria-label={aria.label}
                aria-labelledby={aria.labelledby}
                aria-describedby={aria.describedby}
                ref={dialogRef}
            >
                <div tabIndex="0" onFocus={ev => trapFocus(ev, 'start')}></div>
                <div className="c-Modal__content">
                    {children}
                </div>
                <div tabIndex="0" onFocus={ev => trapFocus(ev, 'end')}></div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        <div className="mel">{modal}</div>,
        document.querySelector('body')
    );
}

Modal.defaultProps = {
    aria: {}
};

/**
 * Hide an element from screen readers.
 * @private
 * @param {string} selector - CSS selector for the element to hide.
 */
function _srHide(selector) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('aria-hidden', 'true');
}

/**
 * Make an element visible to screen readers.
 * @private
 * @param {string} selector - CSS selector for the element to show.
 */
function _srShow(selector) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('aria-hidden', 'false');
}

/**
 * Prevent the document body from being scrolled.
 * @private
 */
function _preventBodyScroll() {
    document.querySelector('body').style.overflow = 'hidden';
}

/**
 * Restore the document body's inline `overflow` property to its previous value,
 * before the modal was opened.
 * @private
 * @param {string} overflowProp - The original value of the body element's
 *                   `overflow` property as set inline (not via stylesheet or
 *                   embedded CSS).
 */
function _allowBodyScroll(overflowProp) {
    document.querySelector('body').style.overflow = overflowProp;
}

/**
 * Callback to execute when the modal is closed via the Escape key or by
 * clicking the backdrop.
 * @callback Modal_closeModal
 * @param {SyntheticEvent} ev - The triggering event.
 */
