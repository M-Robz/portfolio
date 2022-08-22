import React, { useContext } from 'react';

// Components
import AngleIcon from '../icons/AngleIcon/AngleIcon';
import PlpButton from '../PlpButton/PlpButton';
import SelectPage from './SelectPage';
import Skeleton from 'react-loading-skeleton';

// Store
import LoadingContext from '../store/loading-context';

/**
 * A rebuild of the pagination UI from PLPs.
 * @param {Object}   props
 * @param {number}   props.numItems - The total number of items in the list to
 *                     be paginated.
 * @param {number}   props.numPerPage - Number of items to show per page.
 * @param {number}   props.currentPage - The page to be displayed.
 * @param {Pagination_updateCurrentPage} props.updateCurrentPage - See below.
 */
export default function Pagination(props) {
    const { numItems, numPerPage, currentPage, updateCurrentPage } = props;
    const loading = useContext(LoadingContext);

    const numPages = Math.ceil(numItems / numPerPage);
    const prevPage = Math.max(currentPage - 1, 1);
    const nextPage = Math.min(currentPage + 1, numPages);

    return (
        <nav className="c-Pagination" aria-label="Pagination">
            { loading ? (
                <Skeleton width="20em" height="45px" />
            ) : (
                <>
                    <PlpButton
                        addtlClasses="c-Pagination__prev-button"
                        ariaLabel="Show previous page"
                        isDisabled={currentPage <= prevPage}
                        onClick={() => updateCurrentPage(prevPage)}
                    >
                        <AngleIcon direction="left" />
                        <span className="c-Pagination__button-text">Prev</span>
                    </PlpButton>
                    <SelectPage
                        numPages={numPages}
                        currentPage={currentPage}
                        updateCurrentPage={updateCurrentPage}
                    />
                    <PlpButton
                        addtlClasses="c-Pagination__next-button"
                        ariaLabel="Show next page"
                        isDisabled={currentPage >= nextPage}
                        onClick={() => updateCurrentPage(nextPage)}
                    >
                        <span className="c-Pagination__button-text">Next</span>
                        <AngleIcon direction="right" />
                    </PlpButton>
                </>
            ) }
        </nav>
    );
}

/**
 * Update the current page.
 * @callback Pagination_updateCurrentPage
 * @param {number} newPage - The number of the new page.
 */
