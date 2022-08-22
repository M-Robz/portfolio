/* ---- Loader ----
 *
 * Updated 3/16/2020
 *
 * Icon displayed while waiting for content to load.
 *
 * Constructor inputs:
 *   - container (DOM node): Element in which to place the loader
 *   - options (object, optional): {
 *       - isFullPage (boolean, default = false): Set to `true` if the
 *         loader is displayed before the entire page is rendered
 *     }
 *
 * Properties:
 *   - loader (DOM node): A reference to the element with class 'loader',
 *     written to the page by the constructor
 *
 * Methods:
 *   - setToLoading
 *   - setToError
 *   - setToLoaded
 *
 * Note: This class is intended to be used in conjunction with `_loader.scss`.
 */
class Loader {
    constructor(container, options = {}) {
        let isFullPage = !!options.isFullPage;

        container.innerHTML = `<div class="c-loader${isFullPage?' c-loader--full-page':''}">
            <div class="c-loader__icon"></div>
            <p class="c-loader__error"></p>
        </div>`;

        this.loader = container.querySelector('.c-loader');
    }

    /* ---- setToLoading ----
     *
     * Sets the state of the loader to "loading".
     *
     * Inputs: none
     *
     * Output: none
     */
    setToLoading() {
        this.loader.classList.remove('is-error', 'is-loaded');
        this.loader.classList.add('is-loading');
    }

    /* ---- setToError ----
     *
     * Sets the state of the loader to "error", and displays the provided error
     * message on the page.
     *
     * Inputs:
     *   - message (string): Error message to display
     *
     * Output: none
     */
    setToError(message = '') {
        this.loader.querySelector('.c-loader__error').innerHTML = `<p>${message}</p>`;
        this.loader.classList.remove('is-loading', 'is-loaded');
        this.loader.classList.add('is-error');
    }

    /* ---- setToLoaded ----
     *
     * Sets the state of the loader to "loaded".
     *
     * Inputs: none
     *
     * Output: none
     */
    setToLoaded() {
        this.loader.classList.remove('is-loading', 'is-error');
        this.loader.classList.add('is-loaded');
    }
}

module.exports = Loader;
