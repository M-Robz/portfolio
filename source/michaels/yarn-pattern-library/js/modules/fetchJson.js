/* ---- fetchJson ----
 *
 * Updated 9/1/2020
 *
 * Requests and parses a JSON resource using the fetch API. Returns a promise
 * which resolves to the JSON response, parsed as an object, if successful. The
 * promise is rejected if there is a network/HTTP error, or if the response
 * cannot be parsed as JSON.
 *
 * Inputs:
 *   - path (string): URL path to the resource
 *   - debug (boolean, optional): Whether to log errors to the console for
 *     debugging (default: `false`)
 *
 * Output (promise): On fulfillment, resolves to the JSON response, parsed as an
 * object
 */
function fetchJson(path, debug = false) {
    return fetch(path, { method: 'GET' })
        .then(response => {
            if (response.ok) {
                // Parse response as JSON if successful
                return response.json()
                    .catch(err => {
                        if (debug) console.error(`Response to request for \`${path}\` is not JSON: `, err);
                        throw err;
                    })
                ;
            } else {
                if (debug) console.error(`HTTP error in request for \`${path}\`: `, response.status);
                throw new Error('HTTP error: ' + response.status);
            }
        }, err => {
            if (debug) console.error(`Network error in request for \`${path}\`: `, err);
            throw err;
        })
    ;
}

module.exports = fetchJson;
