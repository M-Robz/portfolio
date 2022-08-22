import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';

/**
 * An option in the custom select menu.
 * @param {Object}  props
 * @param {*}       props.value - The value of the option.
 * @param {boolean} props.isSelected - Whether the option is selected.
 * @param {boolean} props.isFocused - Whether the option has keyboard focus.
 * @param {string}  [props.ariaCurrent] - Value of the `aria-current` attribute.
 * @param {Option_onClick} props.onClick - See below.
 */
function Option(
    { value, isSelected, isFocused, onClick, ariaCurrent, children },
    ref
) {
    const anchorRef = useRef();

    /*
     * Expose a custom interface for moving keyboard focus to the anchor element
     * within the Option. A parent can call the `focus` method from a ref
     * passed to the Option. This approach protects the anchor from direct
     * manipulation by the parent.
     */
    useImperativeHandle(ref, () => ({
        focus: () => void anchorRef.current.focus()
    }));

    // Note: Keep the `href` attribute on the menu options so they're focusable,
    // and so the Enter key can be used to select them.
    return (
        <a
            key={value}
            className={`c-CustomSelect-Option${
                isSelected ? ' is-selected' : ''
            }`}
            href="#"
            onClick={onClick}
            data-value={value}
            tabIndex={ isFocused ? '0' : '-1' }
            role="menuitem"
            aria-current={ariaCurrent}
            ref={anchorRef}
        >
            {children}
        </a>
    );
}

export default memo( forwardRef(Option) )

/**
 * Callback to execute when the user clicks the option.
 * @callback Option_onClick
 * @param {SyntheticEvent} ev - The click event triggered by the option.
 */
