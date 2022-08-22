module.exports = function (data, index) {
    let videoId = data['Video ID'];

    return `
    <div class="c-video-block">
        <div class="c-video-block__video mel-c-video">
            <div class="mel-c-video__fluid">
                <iframe class="mel-c-video__player mel-js-lazy" title="video" data-src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" width="412" height="232"  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" allowfullscreen></iframe>
            </div>
        </div>
    </div>`;
}

/*
    TODO: these styles may be needed if using this template

    <style>
    .mel video {
        height:auto;
        max-width: 1280px;
        width: initial;
    }
    .mel .videoMobilePoster {
        display: none;
    }

    @media only screen and (max-width: 480px) {
        .mel video {
            display: none;
        }
        .mel .videoMobilePoster {
            display: inline-block;
        }
    }
    </style>
*/
