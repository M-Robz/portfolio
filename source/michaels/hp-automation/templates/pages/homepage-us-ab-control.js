module.exports = function (data, date) {
    const { sections, subs , css} = global.templates;

    return /*html*/`
<!-- ${date}-homepage (US) -->
<!--#! MARKETING CONTENT -->
<style>
/* Used by marquee slideshow */
.mel-slideshow__image--outline {
    outline: 1px solid #000;
    outline-offset: -1px;
}
@media screen and (min-width: 1024px) {
    .wrapper_hp .slick-list {
        width: 100% !important;
    }
}

/* Used by tier3 and tier2 blocks */
.mel-promo__image.add-flag {
    position: relative;
}
.mel-promo__image.add-flag::before {
    background-color: #d30e2c;
    color: #fff;
    content: attr(data-flag);
    padding: 2px 10px;
    position: absolute;
    top: 20px;
    left: 0;
}

/* Used by tier3 blocks */
span.highlight-red {
    color: #d30e2c;
}
.mel .mel-promo--feature .mel-promo__offer.reward-offer {
    font-size: 2em;
}
.mel .mel-promo--feature .mel-promo__lead-in.canada {
    font-size: 1.2rem;
    height: auto;
}

/* Used by grid subsection */
.mel .mel-string {
    padding-top: 0;
}

/* Used by mel section in replacement from mel-tier */
.wrapper_hp {
  margin: 0 auto;
  max-width: 1320px;
  padding: 0 1.5vw;
}

@media (min-width: 1280px) {
    .wrapper_hp {
        padding: 0 20px;
    }
}

${ css.marquisBanner() }

</style>

<div class="mel wrapper_hp" id="hp-ab-container">

    ${ sections.mel(data, {
        ssKey: 'Story 1',
        body: (data, sectionId) => `

            <!-- A/B test content -->
            <div class="js-ab hidden">
                ${ subs.generic(data, {template: 'marquisBanner' , ssKey: 'MarquisTest'}, {bgColor: '#005287' , fontColor: '#FFF', sectionId}) }
            </div>
            <!-- End: A/B test content -->

            <!-- A/B control content -->
            <div class="js-ab">
                ${ subs.marquee(data) }
            </div>
            <!-- End: A/B control content -->

            ${ subs.pencil(data) }
            ${ subs.grid(data, { template: 'tier3' }) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'Story 2',
        body: (data, sectionId) => `

            <!-- A/B test content -->
            <div class="js-ab hidden">
                ${ subs.generic(data, {template: 'marquisBanner' , ssKey: 'MarquisTest'}, {bgColor: '#004f55', fontColor: '#FFF', sectionId}) }
            </div>
            <!-- End: A/B test content -->

            <!-- A/B control content -->
            <div class="js-ab">
                ${ subs.marquee(data) }
            </div>
            <!-- End: A/B control content -->

            ${ subs.grid(data, { template: 'tier3' }) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'Fday Hub',
        body: data => `
            ${ subs.grid(data, { template: 'tier4' }) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'Pride',
        body: data => `
            ${ subs.pencil(data) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'Rewards',
        body: data => `
            ${ subs.pencil(data) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'Tier 2',
        body: data => `
            ${ subs.grid(data) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'Classes',
        body: data => `
            ${ subs.grid(data, { template: 'tier4' }) }
        `
    }) }

</div>

<script>
window.onload = function() {
    var hpAnalytics = document.getElementById('main');
    hpAnalytics.className += ' analytics';
};
</script>
<script>
    (function () {
        if (window.location.search.indexOf('showtest=true') > -1) {
            injectHpTest();
        } else {
            window.injectHpTest = injectHpTest;
        }

        function injectHpTest() {

            const abContainer = document.querySelectorAll('.js-ab');
            for(let i = 0; i < abContainer.length; i++){
                abContainer[i].classList.toggle('hidden');
            }
        }
    })();
</script>
<!--#! MARKETING CONTENT -->`;
}
