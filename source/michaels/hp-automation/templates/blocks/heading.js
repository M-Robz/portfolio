const encodeChars = require('../../modules/encodeChars');
const tagChars = require('../../modules/tagChars');

module.exports = function (data) {
    const text = tagChars(encodeChars(data['Alt Tag']));

    return `
        <h2 class="mel-c-section__title">${text}</h2>
    `;
}
