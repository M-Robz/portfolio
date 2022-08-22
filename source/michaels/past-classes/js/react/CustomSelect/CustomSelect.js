import React, { useRef, useState } from 'react';

// Components
import Menu from './Menu';
import Modal from '../Modal/Modal';
import PlpButton from '../PlpButton/PlpButton';

/**
 * A custom implementation of a select menu, based on the pagination menu on
 * PLPs.
 * @param {Object}  props
 * @param {*[]}     props.options - The set of options in the menu.
 * @param {*}       props.value - The currently selected value from the menu's
 *                    options.
 * @param {boolean} props.isDisabled - Whether the menu is disabled.
 * @param {Object}  [props.aria] - ARIA attributes.
 * @param {string}  [props.aria.buttonLabel]
 * @param {string}  [props.aria.menuLabel]
 * @param {string}  [props.aria.menuLabelledby]
 * @param {string}  [props.aria.menuDescribedby]
 * @param {string}  [props.aria.menuCurrent] - This will be applied to the
 *                    currently selected menu option.
 * @param {CustomSelect_onChange} props.onChange - See below.
 * @param {Menu_transformOption}  [props.transformOption] - See Menu.
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
 * https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
 */
export default function CustomSelect({
    options, value, isDisabled, aria, onChange, transformOption, children
}) {

    const buttonRef = useRef(null);
    const [ isOpen, setIsOpen ] = useState(false);

    function openMenu() {
        setIsOpen(true);
    }

    function closeMenu() {
        setIsOpen(false);
    }

    function handleSelection(ev) {
        ev.preventDefault();
        if (!ev.target.classList.contains('is-selected')) {
            onChange(ev.target.dataset.value);
        }
        closeMenu();
    }

    return (
        <>
            <PlpButton
                addtlClasses="c-CustomSelect__button"
                onClick={openMenu}
                isDisabled={isDisabled}
                aria={{
                    label: aria.buttonLabel,
                    haspopup: 'menu',
                    expanded: isOpen
                }}
                ref={buttonRef}
            >
                {children}
            </PlpButton>
            { isOpen && (
                <Modal
                    closeModal={closeMenu}
                    openerRef={buttonRef}
                    initialFocus=".c-CustomSelect-Option.is-selected"
                    aria={{ label: 'Dialog containing menu' }}
                >
                    <Menu
                        value={value}
                        options={options}
                        onClick={handleSelection}
                        transformOption={transformOption}
                        aria={{
                            label: aria.menuLabel,
                            labelledby: aria.menuLabelledby,
                            describedby: aria.menuDescribedby,
                            current: aria.menuCurrent
                        }}
                    />
                </Modal>
            ) }
        </>
    );
}

CustomSelect.defaultProps = {
    aria: {}
};

/**
 * Callback to execute when the user selects a new option.
 * @callback CustomSelect_onChange
 * @param {*} value - The value of the newly selected option.
 */
