const tagChars = require('../modules/tagChars');


module.exports = function ({ sectionName, id, imagePath, locale }) {
    return `
        <a class="mel-o-media-stack" href="#${id}">
            <div class="mel-o-media-stack__figure">
                <img src="${imagePath}nav/${locale.toLowerCase()}/${id}.png" alt="">
            </div>
            <div class="mel-o-media-stack__body">
                <p>${tagChars(sectionName)}</p>
            </div>
        </a>
    `;
}
