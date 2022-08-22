import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';

/**
 * A button based on the pagination UI from PLPs.
 * @param {Object}  props
 * @param {string}  [props.addtlClasses] - Space-separated list of custom
 *                    classes to apply.
 * @param {boolean} [props.isDisabled=false] - Whether the button is disabled.
 * @param {Object}  [props.aria] - ARIA attributes.
 * @param {string}  [props.aria.label]
 * @param {string}  [props.aria.haspopup]
 * @param {boolean} [props.aria.expanded]
 * @param {PlpButton_onClick} props.onClick - See below.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
 *
 * Note: `defaultProps` and `propTypes` must be defined on the function returned
 * by `forwardRef` or `memo`.
 */
const PlpButton = memo( forwardRef( function (
    { onClick, addtlClasses, isDisabled, aria, children },
    ref
) {
    const buttonRef = useRef();

    function handleClick(ev) {
        if (isDisabled) {
            // Cancel events (including keyboard) if disabled
            ev.preventDefault();
        } else {
            onClick(ev);
        }
    }

    /*
     * Expose a custom interface for moving keyboard focus to the button element
     * within the PlpButton. A parent can call the `focus` method from a ref
     * passed to the PlpButton. This approach protects the button from direct
     * manipulation by the parent.
     */
    useImperativeHandle(ref, () => ({
        focus: () => void buttonRef.current.focus()
    }));

    const classes = ['c-PlpButton'];
    if (addtlClasses) classes.push(addtlClasses);
    if (isDisabled) classes.push('is-disabled');

    return (
        <button
            className={classes.join(' ')}
            type="button"
            onClick={handleClick}
            aria-disabled={isDisabled}
            aria-label={aria.label}
            aria-haspopup={aria.haspopup}
            aria-expanded={aria.expanded}
            ref={buttonRef}
        >
            {children}
        </button>
    );
}));

PlpButton.defaultProps = {
    aria: {}
};

PlpButton.displayName = 'PlpButton';

export default PlpButton

/**
 * Callback to execute when the user clicks the button.
 * @callback PlpButton_onClick
 * @param {SyntheticEvent} ev - The click event triggered by the button.
 */
