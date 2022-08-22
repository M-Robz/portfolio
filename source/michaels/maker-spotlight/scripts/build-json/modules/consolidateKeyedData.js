/* ---- consolidateKeyedData ----
 *
 * Consolidates data from a secondary table with data from a master table. Both
 * tables are expected to be JS objects keyed by a common identifier. For each
 * key in the master table, the module adds the data from the same key in the
 * secondary table to the key in master, under the new sub-key provided via
 * argument.
 *
 * Inputs:
 *   - masterObj (object): The master table
 *   - secondaryObj (object): The secondary table
 *   - newSubKey (string): The new sub-key in master under which to place the
 *     data from secondary
 *
 * Output: none
 */
function consolidateKeyedData(masterObj, secondaryObj, newSubKey) {

    // For each key in the master object
    for (let keyInMaster in masterObj) {

        // If there is an identical key in the secondary object
        if (secondaryObj[keyInMaster]) {

            // Add the value from the secondary table to the same key in master,
            // under the provided sub-key
            masterObj[keyInMaster][newSubKey] = secondaryObj[keyInMaster];
        }
    }
}

module.exports = consolidateKeyedData;
