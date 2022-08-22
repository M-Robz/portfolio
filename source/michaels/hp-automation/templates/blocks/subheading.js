const encodeChars = require('../../modules/encodeChars');
const stripUrlOrigin = require('../../modules/stripUrlOrigin');
const tagChars = require('../../modules/tagChars');

module.exports = function (data) {
    const text = tagChars(encodeChars(data['Alt Tag'])),
          link = stripUrlOrigin(data['Link'], [
              'michaels.com',
              'michaels.ca',
              'demandware.net'
          ]);

    return `
        <p style="margin-top: 0">${ link
            ? `<a href="${link}">${text}</a>`
            : text
        }</p>
    `;
}
