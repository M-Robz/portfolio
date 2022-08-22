import React, { useContext } from 'react';

// Custom modules
import * as u from '../utils';

// Components
import ClassVideos from '../ClassVideos/ClassVideos';

// Store
import ConfigContext from '../store/config-context';
import GlobalContext from '../_template/store/global-context';

/**
 * @param {Object} props
 * @param {string} props.dataPath - URL path to the video data.
 */
export default function App({ dataPath }) {
    const global = useContext(GlobalContext);
    const config = useContext(ConfigContext);

    // Read filters from URL query string
    const filters = u.readUrlFilters(config.filterFields);

    // Find the corresponding category config for the active filter value(s)
    const categoryConfig = u.findPropertyFromList(
        config.conditionalContent,
        filters[`Category ${global.locale.toUpperCase()}`] || []
    ) || {};
    const { elements, heading } = categoryConfig;

    // Render the conditional content defined in the config
    const conditionalContent = (
        <div className="u-mb-1r u-med-mb-2r">
            { elements && elements.map(({ Component, props }, i) => (
                <Component key={i} {...props} />
            )) }
        </div>
    );

    return (
        <>
            { conditionalContent }
            <ClassVideos
                dataPath={dataPath}
                filters={filters}
                heading={heading}
            />
        </>
    );
}
