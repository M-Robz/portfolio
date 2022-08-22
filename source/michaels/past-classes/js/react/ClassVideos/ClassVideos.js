import React, { useContext, useEffect, useRef, useState } from 'react';

// Custom modules
const fetchJson = require('../../modules/fetchJson');

// Model
import VideoData from '../../model/VideoData';

// Components
import Heading from '../Heading/Heading';
import Pagination from '../Pagination/Pagination';
import SelectMenu from '../SelectMenu/SelectMenu';
import TitleBar from '../TitleBar/TitleBar';
import VideoList from '../VideoList/VideoList';

// Store
import ConfigContext from '../store/config-context';
import GlobalContext from '../_template/store/global-context';
import LoadingContext from '../store/loading-context';

/**
 * A stateful wrapper around the entire UI for the grid of class videos,
 * including the heading, video list, and controls for sorting and pagination.
 * @param {object} props
 * @param {string} props.dataPath - URL path to the video data.
 * @param {string} props.heading - Text content of the heading.
 * @param {FilterCriteria} props.filters - Active filter criteria by field (see
 *                           `utils.js` for type definition).
 */
export default function ClassVideos({ dataPath, filters, heading }) {
    const global = useContext(GlobalContext);
    const config = useContext(ConfigContext);

    // Holds filtered video data so it persists between renders
    const activeVideos = useRef(new VideoData());

    /*
     * State
     */
    const [ sortOrder, setSortOrder ] = useState(
        config.misc.sortOptions.find(opt => opt.default).value
    );
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ loadStatus, setLoadStatus ] = useState({
        loaded: false,
        success: false
    });

    /**
     * Update the sort order of the videos.
     * @param {string} order - The new order to sort by. Permissible values are
     *                   defined in the application config.
     */
    function updateSortOrder(order) {
        setSortOrder(order);
        setCurrentPage(1);
    }

    /**
     * Update the currently visible page of video results.
     * @param {(number|string)} page - Number of the new page.
     */
    function updateCurrentPage(page) {
        setCurrentPage(+page);
    }

    /*
     * After the component mounts, fetch and store video data.
     */
    useEffect(() => {
        const numFilters = Object.keys(filters).length;
        const catFilterValue = filters[`Category ${global.locale.toUpperCase()}`];

        // If videos are to be shown for a single category, use the
        // corresponding partial JSON file as the data source. Else, use the
        // master JSON
        const jsonFileName = catFilterValue && catFilterValue.length === 1
            ? config.jsonFiles[catFilterValue[0]] || 'master.json'
            : 'master.json'
        ;

        // Fetch video data
        fetchJson(dataPath + jsonFileName).then(response => {
            let videoData = new VideoData(response);

            // Filter the data if the master JSON is being used, or if
            // additional filter fields besides category are configured
            if (jsonFileName === 'master.json' || numFilters > 1) {
                videoData = videoData.filter(filters);
            }

            // Add properties to data
            videoData.assignIDs();
            videoData.addDateStamps('Class Date');

            activeVideos.current = videoData;

            setLoadStatus({ loaded: true, success: true });

        }, () => {

            setLoadStatus({ loaded: true, success: false });
        });
    }, []);

    /*
     * Render
     */
    if (loadStatus.loaded) {
        if (!loadStatus.success) return (
            <p>Oops! There must be a bad connection. Please try again later.</p>
        );
        if (!activeVideos.current.count) return <p>No results found.</p>;
    }

    const { resultsPerPage, sortOptions } = config.misc;

    // Sort video data
    // Type of `sortedVideos`: VideoData
    const sortedVideos = activeVideos.current.sort(
        sortOptions.find(opt => opt.value === sortOrder).criteria
    );

    // Extract raw data for the videos to be shown as indicated by pagination
    // Type of `visibleVideos`: Object[]
    const visibleVideos = sortedVideos.data.slice(
        resultsPerPage * (currentPage - 1),
        Math.min(
            sortedVideos.count,
            resultsPerPage * currentPage
        )
    );

    return (
        <LoadingContext.Provider value={!loadStatus.loaded}>
            <TitleBar>
                <Heading text={heading} />
                <SelectMenu
                    label="Sort By"
                    options={ sortOptions.map(opt => opt.value) }
                    value={sortOrder}
                    onChange={updateSortOrder}
                />
            </TitleBar>
            <VideoList data={visibleVideos} numPerPage={resultsPerPage} />
            { (!loadStatus.loaded || sortedVideos.count > resultsPerPage) &&
                <Pagination
                    numItems={sortedVideos.count}
                    numPerPage={resultsPerPage}
                    currentPage={currentPage}
                    updateCurrentPage={updateCurrentPage}
                />
            }
        </LoadingContext.Provider>
    );
}
