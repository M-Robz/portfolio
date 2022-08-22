const encodeChars = require('../../modules/encodeChars');
const tagChars = require('../../modules/tagChars');

module.exports = function (data, index) {
    let disclaimer = tagChars(encodeChars(data['Alt Tag']))

    return `
    <div class="mel-js-modal--disclaimers mel-modal__content mel-text--center display-none" style="text-align: center;">
        <div class="mel-modal__body">
            <p><strong><sup>*</sup> IMPORTANT STUFF WE HAVE TO TELL YOU</strong></p>
            <ul>
                <li>${disclaimer}</li>
            </ul>
        </div>

    </div>`;
}
