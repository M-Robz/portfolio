// Custom modules
const arrayIncludes = require('../modules/arrayIncludes');
const stripAccents = require('../modules/stripAccents');

/**
 * A wrapper around video data which provides methods for manipulating the data.
 */
export default class VideoData {
    #data;

    /**
     * Instantiate a `VideoData` wrapper.
     * @param {Object[]} rawData - Tabular video data as an array of JS objects.
     */
    constructor(rawData = []) {
        this.#data = [ ...rawData ];
    }

    /**
     * Get the number of records.
     * @returns {number}
     */
    get count() {
        return this.#data.length;
    }

    /**
     * Access the raw data as a new array.
     * @returns {Object[]}
     */
    get data() {
        return [ ...this.#data ];
    }

    /**
     * Add a datestamp property (as a JS timestamp) to each record.
     * @param {string} sourceField - Name of the field containing the formatted
     *                   date to be parsed.
     */
    addDateStamps(sourceField) {
        this.#data.forEach(record => {
            record.datestamp = _parseDate(record[sourceField]);
        });
    }

    /**
     * Assign a unique ID (as a simple integer) to each record.
     */
    assignIDs() {
        this.#data.forEach((record, i) => record.id = i);
    }

    /**
     * Filter the data according to the specified criteria.
     * @param {FilterCriteria} filters - Active filter criteria by field (see
     *                           `utils.js` for type definition).
     * @returns {VideoData} A new instance containing a subset of the original
     *                      records.
     */
    filter(filters) {
        const fields = Object.keys(filters);

        const filtered = this.#data.filter(video => fields.every(
            field => filters[field] === null
                ? true
                : arrayIncludes(filters[field], video[field])
        ));

        return new VideoData(filtered);
    }

    /**
     * Sort the data according to the specified criteria (field and order).
     * @param {Object} criteria
     * @param {string} criteria.field - The field to sort by.
     * @param {string} criteria.order - (a-z|z-a|ascending|descending|oldest|
     *                   newest) The order in which to sort.
     * @returns {VideoData} A new instance containing the sorted data.
     */
    sort({ field, order }) {
        let sortFnc;

        switch (order) {
            case 'a-z':
                sortFnc = (a, b) => {
                    const valueA = stripAccents(a[field]).toLowerCase();
                    const valueB = stripAccents(b[field]).toLowerCase();
                    return (valueA < valueB) ? -1
                        : (valueA > valueB) ? 1
                        : 0
                    ;
                };
                break;
            case 'z-a':
                sortFnc = (a, b) => {
                    const valueA = stripAccents(a[field]).toLowerCase();
                    const valueB = stripAccents(b[field]).toLowerCase();
                    return (valueA < valueB) ? 1
                        : (valueA > valueB) ? -1
                        : 0
                    ;
                };
                break;
            case 'ascending':
            case 'oldest':
                sortFnc = (a, b) => a[field] - b[field];
                break;
            case 'descending':
            case 'newest':
            default:
                sortFnc = (a, b) => b[field] - a[field];
        }

        const sorted = this.data.sort(sortFnc);

        return new VideoData(sorted);
    }
}

/**
 * Parse a date in the format "M/D/YY", and return a JS timestamp.
 * @private
 * @param {string} input - Date in the format "M/D/YY".
 * @returns {number} JS timestamp (number of milliseconds since 1 January 1970
 *                   UTC).
 *
 * NOTE: When the video data is viewed in Excel, the dates are formatted as
 * "M/D/YYYY". However, it appears that the `excel-to-json` script is storing
 * them in the format "M/D/YY" in the JSON output.
 */
function _parseDate(input) {
    let arr = input.split('/').map(item => parseInt(item, 10));
    return new Date(2000 + arr[2], arr[0] - 1, arr[1]).valueOf();
}
