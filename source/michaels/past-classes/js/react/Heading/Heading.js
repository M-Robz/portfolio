import React, { useContext } from 'react';

// Components
import Skeleton from 'react-loading-skeleton';

// Store
import LoadingContext from '../store/loading-context';

/**
 * Yep, a heading.
 * @param {Object} props
 * @param {string} props.text - Text content.
 */
export default function Heading({ text }) {
    const loading = useContext(LoadingContext);

    return (
        <h2 className="c-Heading">
            { loading
                ? <Skeleton width="12em" />
                : text
            }
        </h2>
    );
}
