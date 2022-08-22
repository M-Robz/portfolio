/* ---- stripUrlOrigin ----
 *
 * Accepts a URL and strips everything up to, and including, any of the
 * specified domains if present. Returns a slash if there was nothing after the
 * domain.
 *
 * Inputs:
 *   - url (string): The URL from which to strip the domain
 *   - domains (string or array of strings): A domain or list of domains to
 *     match the URL against
 *
 * Output (string): The input URL with the domain stripped if there was a match,
 * or the original URL if there was not
 */
function stripUrlOrigin(url, domains) {
    if (domains instanceof Array) {
        domains = domains.join('|');
    } else if (typeof domains === 'string' || domains instanceof String) {
        domains = domains.replace(/\./g, '\.');
    } else {
        return url;
    }

    if (url && domains) {
        let regex = new RegExp(`.*(${domains})`);
        return url.replace(regex, '').padEnd(1, '/');
    } else {
        return url;
    }
}

module.exports = stripUrlOrigin;
