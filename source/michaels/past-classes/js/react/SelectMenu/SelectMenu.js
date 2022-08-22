import React, { useContext } from 'react';

// Components
import Skeleton from 'react-loading-skeleton';

// Store
import LoadingContext from '../store/loading-context';

/**
 * A controlled select menu.
 * @param {Object} props
 * @param {string} props.label - The label to be displayed next to the menu.
 * @param {*[]}    props.options - The set of options in the menu.
 * @param {*}      props.value - The currently selected value from the menu's
 *                   options.
 * @param {SelectMenu_onChange} props.onChange - See below.
 *
 * TODO: Assign a unique ID to the `select` element (`useId` was introduced in
 * React 18)
 */
export default function SelectMenu({ label, options, value, onChange }) {
    const loading = useContext(LoadingContext);

    function handleChange(ev) {
        onChange(ev.target.value);
    }

    return (
        <form className="c-SelectMenu">
            { loading ? (
                <Skeleton width="16em" height="40px" />
            ) : (
                <>
                    <label htmlFor="SelectMenu-dropdown" className="c-SelectMenu__label">{label}</label>
                    <div className="c-SelectMenu__dropdown-wrapper">
                        <select
                            id="SelectMenu-dropdown"
                            className="c-SelectMenu__dropdown"
                            value={value}
                            onChange={handleChange}
                        >
                            { options.map(opt => (
                                <option
                                    key={opt}
                                    value={opt}
                                >
                                    {opt}
                                </option>
                            )) }
                        </select>
                    </div>
                </>
            ) }
        </form>
    );
}

/**
 * Callback to execute when the user selects a new option.
 * @callback SelectMenu_onChange
 * @param {*} value - The value of the newly selected option.
 */
