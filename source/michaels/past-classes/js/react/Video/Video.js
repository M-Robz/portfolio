import React, { useContext, useRef } from 'react';

// Custom modules
const extractYtVideoId = require('../../modules/extractYtVideoId');

// Hooks
import useEffectOnUpdate from '../hooks/useEffectOnUpdate';

// Components
import Skeleton from 'react-loading-skeleton';

// Store
import GlobalContext from '../_template/store/global-context';
import LoadingContext from '../store/loading-context';

/**
 * An embedded YouTube video of a class, with additional information beneath.
 * @param {Object} props
 * @param {Object} props.data - Data for the video.
 *
 * Note: Using PureComponent avoids unnecessary re-rendering, but breaks the
 * lazyloading solution.
 */
export default function Video({ data }) {
    const iframeRef = useRef(null);
    const { region, locale } = useContext(GlobalContext);
    const loading = useContext(LoadingContext);

    /*
     * On every re-render, restore the `mel-js-lazy` class to the iframe so it
     * can be loaded again. Without this fix, the video would disappear and not
     * be reloaded when the component re-rendered.
     */
    useEffectOnUpdate(() => {
        if (iframeRef.current) {
            // Note: Using add/remove because IE doesn't support
            // `DOMTokenList.replace`
            iframeRef.current.classList.remove('lazyloaded');
            iframeRef.current.classList.add('mel-js-lazy');
        }
    });

    if (loading) {

        return (
            <div className="c-Video">
                <div className="c-Video__video mel-c-video">
                    <div className="mel-c-video__fluid">
                        <Skeleton className="c-Video__skeleton" />
                    </div>
                </div>
                <div className="c-Video__text">
                    <h3 className="c-Video__heading">
                        <Skeleton count={3} />
                    </h3>
                    <p className="c-Video__content">
                        <Skeleton width="5em" />
                    </p>
                </div>
            </div>
        );

    } else {

        // Read data
        const videoId = extractYtVideoId(data['Video ID']),
              title = data[`Title ${ locale.toUpperCase() }`],
              host = data['Hosted by'],
              displayDate = region.isQuebec
                  ? _formatQUDate(data['Class Date'])
                  : data['Class Date']
        ;

        return (
            <div className="c-Video">
                <div className="c-Video__video mel-c-video">
                    <div className="mel-c-video__fluid">
                        <iframe
                            className="mel-c-video__player mel-js-lazy"
                            data-src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                            allowFullScreen
                            width="412"
                            height="232"
                            title="Video"
                            ref={iframeRef}>
                        </iframe>
                    </div>
                </div>
                <div className="c-Video__text">
                    <h3 className="c-Video__heading">
                        {title}
                        { host && ' | ' }
                        { host &&
                            <span className="c-Video__host">{host}</span>
                        }
                    </h3>
                    { displayDate &&
                        <p className="c-Video__content">{displayDate}</p>
                    }
                </div>
            </div>
        );
    }
}

/**
 * Format a date for Quebec.
 * @private
 * @param {string} date - Date in the format M/D/Y
 * @returns {string} Date in the format D/M/Y
 */
function _formatQUDate(date) {
    const arr = date.split('/');
    return arr.length === 3 ? `${arr[1]}/${arr[0]}/${arr[2]}` : '';
}
