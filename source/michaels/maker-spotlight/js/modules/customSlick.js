const debounce = require('../modules/debounce');


/* ===== `customSlick` module =====
 *
 * Updated 4/22/2020
 *
 * PURPOSE
 * ----------------------
 * This module extends the Slick carousel plugin via wrapper methods to fix the
 * following issues/bugs:
 *
 *   1. ISSUE: Slick allows you to destroy ("unslick") a carousel at certain
 *      breakpoints, which works when the viewport transitions from a width at
 *      which the carousel is active to one at which it is not. However, if the
 *      viewport transitions back to a width at which the carousel should be
 *      active, the plugin does not re-initialize.
 *      SOLUTION: This module can conditionally initialize the carousel
 *      depending on the viewport width. It can also listen for the window
 *      resize event and initialize, re-initialize, or destroy the carousel as
 *      appropriate in response.
 *
 *   2. ISSUE: Carousels displayed with Slick's `centerMode` setting enabled do
 *      not always center on the first slide upon initialization. Instead, the
 *      carousel items may be shifted to the right, leaving whitespace on the
 *      left.
 *      SOLUTION: For carousels in center mode, this module waits 500 ms
 *      to give the plugin enough time to initialize, then calls Slick's
 *      `slickGoTo` method to navigate to the first slide, which correctly
 *      centers the carousel.
 *
 * EXPORTED METHODS
 * ----------------------
 *   - slick
 *   - watchForResize
 *
 * USAGE
 * ----------------------
 * Call the `slick` method for each element that should be displayed as a
 * carousel at some or all viewport widths, then call the `watchForResize`
 * method once per selector to set up a listener for all collections with that
 * selector.
 *
 * Do not use Slick's `responsive` setting to "unslick" at any breakpoints
 * (although you may still use it for other responsive settings). Instead, pass
 * an array of breakpoint configs to the `slick` and `watchForResize` methods
 * to indicate whether the element should be "slicked" at particular
 * breakpoints. Example:
 *
 * ```
 * breakpointConfigs: [
 *     {
 *         breakpoint: 768,
 *         slick: false
 *     }
 * ]
 * ```
 *
 * This works the same way as Slick's `responsive` setting: the example above
 * means the element will not be displayed as a carousel at viewport widths
 * below 768px. The `normallySlick` boolean passed to `slick` and
 * `watchForResize` indicates whether the element should be "slicked" at widths
 * greater than or equal to 768px.
 */


/* ---- slick ----
 *
 * Custom wrapper for the Slick plugin's `slick` method. The wrapper method will
 * instantiate or destroy a carousel if needed, depending on the breakpoint
 * configuration. It will also correctly center a carousel upon initialization
 * if the carousel is in "center mode."
 *
 * Input (object; all keys are required): {
 *   - target (DOM node): Element containing the collection; the Slick plugin's
 *     `slick` method will be called on this element
 *   - settings (object): Settings to pass to the Slick plugin
 *   - normallySlick (boolean): Whether the collection should be a carousel at
 *     any screen width not covered by the breakpoint configs
 *   - breakpointConfigs (array of objects): Configurations for breakpoints at
 *     which the carousel should be instantiated or destroyed
 * }
 *
 * Output: none
 */
function slick({target, settings, normallySlick, breakpointConfigs}) {
    let windowWidth = window.innerWidth;
    let applicableConfig = breakpointConfigs.find(config => windowWidth < config.breakpoint);
    let shouldBeSlicked = applicableConfig ? applicableConfig.slick : normallySlick;
    let isInitialized = target.classList.contains('slick-initialized');

    if (shouldBeSlicked && !isInitialized) {
        let $target = $(target);
        $target.slick(settings);

        // Bugfix: navigate to first slide so Slick will correctly center it
        if (settings.centerMode) setTimeout(() => $target.slick('slickGoTo', 0), 500);
    } else if (!shouldBeSlicked && isInitialized) {
        $(target).slick('unslick');
    }
}

/* ---- watchForResize ----
 *
 * On window resize, calls this module's custom `slick` method for collections
 * with the specified selector in case they need to have their carousels
 * instantiated or destroyed at the new screen width.
 *
 * Note that all collections with the specified selector should share the same
 * Slick settings and breakpoint configurations.
 *
 * Input (object; all keys are required): {
 *   - selector (string): CSS selector for the collections
 *   - settings (object): Settings to pass to the Slick plugin
 *   - normallySlick (boolean): Whether the collections should be carousels at
 *     any screen width not covered by the breakpoint configs
 *   - breakpointConfigs (array of objects): Configurations for breakpoints at
 *     which the carousels should be instantiated or destroyed
 * }
 *
 * Output: none
 */
function watchForResize({selector, settings, normallySlick, breakpointConfigs}) {
    breakpointConfigs.sort((a, b) => a.breakpoint - b.breakpoint); // sort ascending

    const onWindowResize = debounce(function () {
        let targets = document.querySelectorAll(selector);
        Array.prototype.forEach.call(targets, target => {
            slick({target, settings, normallySlick, breakpointConfigs});
        });
    }, 300);

    window.addEventListener('resize', onWindowResize);
}

module.exports = { watchForResize, slick };
