const yargs = require('yargs');

/* ---- readArgs ----
 *
 * Reads the command line arguments provided to `pre-build`. Configures the
 * CLI options, and adds a man page.
 *
 * Inputs:
 *   - customOpts (object, optional): Custom options defined in `config.js`
 *
 * Output (object): An object containing argument-value pairs
 */
function readArgs(customOpts) {
    let yargsObj = yargs.option('book', {
        alias: 'b',
        type: 'string',
        demandOption: false,
        describe: 'Name of the Excel source file (include the file extension, but not the path)'
    });

    // Configure any custom options defined in `config.js`
    if (customOpts) {
        for (const [name, config] of Object.entries(customOpts)) {
            yargsObj = yargsObj.option(name, config);
        }
    }

    return yargsObj.help().argv;
}

module.exports = readArgs;
