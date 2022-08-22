/*
    Tag IDs for reference:

    HP Labor Day Savings - 6439
    HP Online Top Offers - 6447
    HP Top Tech Offers - 6443
    HP Top Seasonal Offers - 6448
    HP Top MikPro Offers - 6444
    HP New Product Offerings - 6445
    HP Bundle Offers - 6446
*/

/*
 * A weekly ad carousel
 */
module.exports = function ({
    department, // {string} [department or tag required] Weekly ad department
    tag,        // {string} [department or tag required] Weekly ad tag
    id,         // {string} Unique value used to generate ID and JS hook
    isInjected  // {boolean} [default=false] Whether this content will be
                //   injected into the page via JS; if true, you will need
                //   to initialize any weekly ad carousels after they are
                //   injected
}) {

    const offerSource = tag ? `tag: '${tag}'` : `department: '${department}'`;

    return `
        <!-- WEEKLY AD OFFERS -->
        <div class="hp_${id} js-${id}"></div>
        ${ !isInjected ?
            `<script>
                document.addEventListener('DOMContentLoaded', function () {
                    mapp.methods.weeklyAdOffers({
                        ${offerSource},
                        container: document.querySelector('.js-${id}'),
                        pageType: 'fullWidth'
                    });
                });
            </script>` : ''
        }
    `;
}
