/* ---- stringToBoolean ----
 *
 * Converts a string representation of a boolean value to a proper boolean.
 *
 * Returns `true` for the following case-insensitive inputs: "true", "t", "yes",
 * "y". All other input values are converted to `false`.
 *
 * Inputs:
 *   - string (string): Value to convert to a boolean
 *
 * Output (boolean): Boolean representation of the input
 */
function stringToBoolean(string) {
    if (typeof string !== 'string' && !(string instanceof String)) return string;

    switch (string.toLowerCase()) {
        case 'true': case 't': case 'yes': case 'y': return true;
        default: return false;
    }
}

module.exports = stringToBoolean;
