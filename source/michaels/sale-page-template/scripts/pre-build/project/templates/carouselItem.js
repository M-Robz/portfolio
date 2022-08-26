// TODO: value for aria-label
module.exports = function (contents) {
    return `
        <div
            class="mel-c-carousel__item"
            role="group"
            aria-roledescription="slide"
            aria-label=""
        >
            ${contents}
        </div>
    `;
};
