/* ---- onLocalhost ----
 *
 * Updated 10/22/2020
 *
 * Determines whether the current page is being viewed on localhost.
 *
 * Inputs: none
 *
 * Output (boolean): Returns `true` if the page location contains "localhost" or
 * an IP address
 */
function onLocalhost() {
    return RegExp('localhost|(?:[0-9]{1,3}\\.){3}[0-9]{1,3}').test(window.location.href);
}

module.exports = onLocalhost;
