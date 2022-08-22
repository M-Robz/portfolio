import React, { useContext, useEffect, useRef } from 'react';

// Components
import Video from '../Video/Video';

// Store
import LoadingContext from '../store/loading-context';

/**
 * A list of videos.
 * @param {Object}   props
 * @param {Object[]} props.data - Data for the videos in the list.
 * @param {number}   props.numPerPage - Number of items to show per page.
 */
export default function VideoList({ data, numPerPage }) {
    const loading = useContext(LoadingContext);
    const hasLoaded = useRef(false);
    const videoListRef = useRef();

    /*
     * When the video data has loaded and the data changes (except on initial
     * load), scroll the top of the list into view if the document has been
     * scrolled past it.
     *
     * TODO: move focus to first video?
     */
    useEffect(() => {
        if (!hasLoaded.current && !loading) {
            hasLoaded.current = true;
            return;
        }
        if (videoListRef.current.getBoundingClientRect().top < 0) {
            videoListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data]);

    let videos;
    if (loading) {
        // Render skeletons
        videos = [];
        for (let i = 0; i < numPerPage; i++) videos.push(
            <Video key={`skeleton-${i}`} />
        );
    } else {
        // Render actual videos
        videos = data.map(videoData => (
            <Video
                key={videoData.id}
                data={videoData}
            />
        ));
    }

    return (
        <div className="c-VideoList" ref={videoListRef}>
            <div className="mel-string mel-string-2-up mel-string-3-up-medium mel-string-4-up-large">
                { videos }
            </div>
        </div>
    );
}
