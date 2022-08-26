/* ---- slickEqualHeight ----
 *
 * Updated 11/11/2021
 *
 * Make all Slick slides as tall as the tallest slide.
 *
 * Inputs:
 *   - $carousel (object): jQuery object containing one or more Slick carousels
 *
 * Output: none
 *
 * NOTE: You will need to include CSS that assigns a height of 100% to the
 * following:
 *   - `.slick-slide > div`
 *   - Your carousel items (which Slick will place inside the above div)
 */
function slickEqualHeight($carousel) {
    $carousel.on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });
}

module.exports = slickEqualHeight;
