const fs = require('fs');
const path = require('path');

/* ---- importTemplates ----
 *
 * Imports all templates in the specified directory into an object representing
 * the directory tree. The value for each key in the output will be either an
 * imported template or an object representing a subdirectory.
 *
 * Inputs:
 *   - srcPath (string): Path to the top-level directory
 *
 * Output (object): Object containing the imported templates
 *
 * Reference: https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
 */
function importTemplates(srcPath) {
    const regex = /(.+)\.js/;

    return f(srcPath);

    /*
     * Recursive function to build the object representing the templates
     * directory tree.
     */
    function f(currentPath) {

        // Object to represent the current directory
        const o = {};

        // Read contents of directory to an array of Node Dirent objects
        const dirents = fs.readdirSync(currentPath, { withFileTypes: true });

        dirents.forEach(dirent => {

            // If the entry is a JS template, load the template into `o`, keyed
            // by the template name
            if (dirent.isFile()) {
                const fileName = regex.exec(dirent.name);
                if (fileName) {
                    const fileNameNoExt = fileName[1];
                    o[fileNameNoExt] = require(
                        path.join(currentPath, fileNameNoExt)
                    );
                }

            // If the entry is a subdirectory, build an object within `o` to
            // represent it, keyed by the subdirectory name
            } else if (dirent.isDirectory()) {
                o[dirent.name] = f(
                    path.join(currentPath, dirent.name)
                );
            }
        });

        return o;
    }
}

module.exports = importTemplates;
