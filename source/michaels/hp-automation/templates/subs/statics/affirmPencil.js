module.exports = function () {
    return /*html*/`
        <!-- AFFIRM PENCIL -->
        <div class="hp_affirm-pencil">
            <!-- PENCIL -->
            <div class="mel-promo">
                <a class="mel-promo__link mel-js-open-dialog"
                    role="button"
                    tabindex="0"
                    data-dialog="mel-js-modal--affirm"
                    data-class="mel mel-modal c-affirm-modal">
                    <div class="mel-promo__image">
                        <picture>
                            <source srcset="images/220701-affirm-pencil-m.png?$staticlink$" media="(max-width: 480px)">
                            <source srcset="images/220701-affirm-pencil-t.png?$staticlink$" media="(max-width: 800px)">
                            <img src="images/220701-affirm-pencil.png?$staticlink$" alt="Pay over time with Affirm. Online &amp; now available in stores. Learn more">
                        </picture>
                    </div>
                </a>
            </div>
            <!-- MODAL -->
            <div class="c-affirm-modal__content mel-js-modal--affirm display-none">
                <div class="c-affirm-modal__body">
                    <div class="c-affirm-modal__main">
                        <div class="c-affirm-logos">
                            <img class="c-affirm-logos__affirm" src="images/220701-affirm-logo.png?$staticlink$" alt="Affirm">
                            <span class="c-affirm-logos__plus">+</span>
                            <img class="c-affirm-logos__mik" src="images/220701-michaels-logo.png?$staticlink$" alt="Michaels">
                        </div>
                        <h2 class="c-affirm-modal__heading">Your next purchase doesn’t have to wait.</h2>
                        <p class="c-affirm-modal__subhead">Shop online or in store today with Affirm, pay over time. To shop in-store:</p>
                        <a class="mel-button c-affirm-modal__cta" href="https://www.affirm.com/download" target="_blank" rel="noopener">
                            <div class="mel-button__label">Download the Affirm app</div>
                        </a>
                        <div class="c-step">
                            <div class="c-step__num-wrapper" aria-hidden="true">
                                <span class="c-step__num">1</span>
                            </div>
                            <div class="c-step__content">
                                <h3 class="c-step__headline">
                                    <span class="sr-only">Step 1: </span>Download the Affirm app.
                                </h3>
                                <p class="c-step__description">Create your account with a few pieces of info for a real time decision and upon approval select “shop in store.”</p>
                            </div>
                        </div>
                        <div class="c-step">
                            <div class="c-step__num-wrapper" aria-hidden="true">
                                <span class="c-step__num">2</span>
                            </div>
                            <div class="c-step__content">
                                <h3 class="c-step__headline">
                                    <span class="sr-only">Step 2: </span>Choose your payment plan.<br>
                                    <span class="c-step__subhead">(Including an interest-free option!)</span>
                                </h3>
                                <p class="c-step__description">Review the plan that’s right for you &ndash; no fees, gotchas, or surprises.</p>
                            </div>
                        </div>
                        <div class="c-step">
                            <div class="c-step__num-wrapper" aria-hidden="true">
                                <span class="c-step__num">3</span>
                            </div>
                            <div class="c-step__content">
                                <h3 class="c-step__headline">
                                    <span class="sr-only">Step 3: </span>Get a virtual card to check out.
                                </h3>
                                <p class="c-step__description">Add the virtual card to the digital wallet on your smartphone &ndash; and just tap to pay.</p>
                            </div>
                        </div>
                    </div>
                    <p class="c-affirm-modal__details">Your rate will be 0% APR or 10-30% APR. Payment options through Affirm are subject to eligibility, may not be available in all states, and are provided by these lending partners: affirm.com/lenders. Options depend on your purchase amount, and a down payment may be required. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Finance Lenders Law license.</p>
                </div>
            </div>
        </div>
    `;
}
