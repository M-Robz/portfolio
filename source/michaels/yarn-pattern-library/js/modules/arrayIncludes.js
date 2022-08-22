/* ---- arrayIncludes ----
 *
 * Version 1.0.0
 * 9/30/2020
 *
 * Determines whether an array contains a given value.
 *
 * Inputs:
 *   - arr (array): The array to check
 *   - value (any type): Value to search for in the array
 *
 * Output (boolean): Whether the array contains the value
 */
function arrayIncludes(arr, value) {
    if (typeof arr === 'array' || arr instanceof Array) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === value) return true;
        }
        return false;
    } else {
        throw new TypeError('The argument provided to arrayIncludes is not an array');
    }
}

module.exports = arrayIncludes;
