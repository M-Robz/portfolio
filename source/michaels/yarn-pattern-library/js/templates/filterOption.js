// Custom modules
const formatKebabCase = require('../modules/formatKebabCase');
const stripAccents = require('../modules/stripAccents');


module.exports = function () {

    return function ({ type, field, value, label, checked, index }) {
        let formattedField = formatKebabCase(stripAccents(field));
        let id = value === 'all'
            ? `filter-${formattedField}--option-all`
            : `filter-${formattedField}--option-${index}`
        ;

        return `
            <div class="c-filter-menu__option">
                <input
                    type="${type}"
                    id="${id}"
                    name="filter-${formattedField}"
                    value="${value}"
                    ${ checked ? 'checked' : '' }>
                <label for="${id}">${label}</label>
            </div>
        `;
    };
};
