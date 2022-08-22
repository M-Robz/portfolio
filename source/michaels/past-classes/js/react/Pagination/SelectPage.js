import React from 'react';

// Components
import AngleIcon from '../icons/AngleIcon/AngleIcon';
import CustomSelect from '../CustomSelect/CustomSelect';

/**
 * An interface for jumping to any page in the pagination. Provides a custom
 * select menu, and displays the total number of pages.
 * @param {Object}   props
 * @param {number}   props.numPages - The total number of pages.
 * @param {number}   props.currentPage - The currently visible page.
 * @param {SelectPage_updateCurrentPage} props.updateCurrentPage - See below.
 */
export default function SelectPage({ numPages, currentPage, updateCurrentPage }) {
    const isDisabled = numPages < 2;

    const options = [];
    for (let i = 1; i <= numPages; i++) options.push(i);

    return (
        <div className="c-Pagination-SelectPage">
            <CustomSelect
                value={currentPage}
                options={options}
                transformOption={option => `Page ${option}`}
                onChange={updateCurrentPage}
                isDisabled={isDisabled}
                aria={{
                    buttonLabel: `Select page. Current page: ${currentPage}`,
                    menuLabel: 'Select page',
                    menuCurrent: 'page'
                }}
            >
                Page {currentPage} <AngleIcon direction="down" />
            </CustomSelect>
            <span className={`c-Pagination-SelectPage__text${
                isDisabled ? ' is-disabled' : ''
            }`}>of {numPages}</span>
        </div>
    );
}

/**
 * Update the current page.
 * @callback SelectPage_updateCurrentPage
 * @param {number} newPage - The number of the new page.
 */
