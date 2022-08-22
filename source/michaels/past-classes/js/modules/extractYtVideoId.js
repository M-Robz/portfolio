/* ---- extractYtVideoId ----
 *
 * Updated 9/25/2020
 *
 * Extracts the video ID from the full URL for a YouTube video.
 *
 * Inputs:
 *   - url (string): Full URL for the video, on the domain `youtu.be` or
 *     `youtube.com`
 *
 * Output (string or null): The video ID if found, else null
 *
 * NOTE: If the input is not a string, or does not contain a YouTube domain, the
 * input is returned unchanged.
 *
 * DEVELOPER NOTE: Because regex lookbehind assertions are not supported by IE,
 * capturing and non-capturing groups are used instead of a lookbehind and
 * lookahead.
 */
function extractYtVideoId(url) {
    if (
        (typeof url !== 'string' && !(url instanceof String))
        ||
        !RegExp('youtu.be|youtube.com').test(url)
    ) return url;

    let result = url.match(/(?:youtu.be\/|youtube.com\/watch\?v=)(.*?)(?:&|\/|$)/);
    if (result) {
        // Return the first capturing group
        return result[1];
    } else {
        return null;
    }
}

module.exports = extractYtVideoId;
