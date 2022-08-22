import React, { useEffect, useRef, useState } from 'react';

// Components
import Option from './Option';

/**
 * The list of options that appears in a modal when the custom select menu is
 * opened.
 * @param {Object} props
 * @param {*}      props.value - The currently selected option.
 * @param {*[]}    props.options - The set of all options.
 * @param {Object} [props.aria] - ARIA attributes.
 * @param {string} [props.aria.label]
 * @param {string} [props.aria.labelledby]
 * @param {string} [props.aria.describedby]
 * @param {string} [props.aria.current] - This will be applied to the currently
 *                   selected option.
 * @param {Option_onClick}       props.onClick - See Option.
 * @param {Menu_transformOption} [props.transformOption] - See below.
 *
 * References:
 * https://www.w3.org/TR/wai-aria-practices-1.1/#menu
 * https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_within
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
 */
export default function Menu({
    value, options, onClick, transformOption, aria
}) {

    // The option that should have focus
    const focusedRef = useRef(null);

    // Index of the option that should have focus
    // TODO: is findIndex polyfilled?
    const [ focusedIndex, setFocusedIndex ] = useState(
        options.findIndex(opt => opt === value)
    );

    // Focus the option indicated by state
    useEffect(() => {
        focusedRef.current.focus();
    }, [focusedIndex]);

    // Move focus in response to arrow keys
    useEffect(() => {

        function handleKeyDown(ev) {
            const isArrowDown = ev.key === 'ArrowDown';
            const isArrowUp = ev.key === 'ArrowUp';

            if (isArrowDown || isArrowUp) {
                const len = options.length;
                const delta = isArrowDown ? 1 : -1;

                setFocusedIndex(prevIndex => (prevIndex + delta + len) % len);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className="c-CustomSelect-Menu"
            tabIndex="-1"
            role="menu"
            aria-label={aria.label}
            aria-labelledby={aria.labelledby}
            aria-describedby={aria.describedby}
        >
            { options.map((option, i) => {
                const isSelected = option === value;
                const isFocused = i === focusedIndex;
                return (
                    <Option
                        key={option}
                        value={option}
                        isSelected={isSelected}
                        isFocused={isFocused}
                        onClick={onClick}
                        ariaCurrent={ isSelected ? aria.current : null }
                        ref={ isFocused ? focusedRef : null }
                    >
                        { transformOption
                            ? transformOption(option)
                            : option
                        }
                    </Option>
                );
            }) }
        </div>
    );
}

Menu.defaultProps = {
    aria: {}
};

/**
 * A custom function to transform each option's value into text that will be
 * displayed to the user. If omitted, the original value will be used as the
 * text.
 * @callback Menu_transformOption
 * @param   {*} option - The original value.
 * @returns {*} The transformed value (this will ultimately be coerced to a
 *              string).
 */
