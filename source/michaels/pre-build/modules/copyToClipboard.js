const cp = require('child_process');

/* ---- copyToClipboard ----
 *
 * Version 1.0.0
 * 3/12/2021
 *
 * Copies a string to the clipboard in an OS X Node environment.
 *
 * Inputs:
 *   - str (string): Data to copy
 *
 * Output: none
 */
function copyToClipboard(str) {
    const proc = cp.spawn('pbcopy');
    proc.stdin.write(str);
    proc.stdin.end();
}

module.exports = copyToClipboard;
