module.exports = function (makerId, imgPath, isLandingPage, cardMarkup) {
    return `
        <div
            class="c-featured-maker-snippet js-featured-maker-snippet"
            data-maker-id="${makerId}"
            ${ isLandingPage
                ? `style="background-image:url('${imgPath}${makerId}/${makerId}-bg.jpg')"`
                : ''
            }
        >
            ${cardMarkup}
        </div>
    `;
}
