module.exports = function (data, date) {
    const { sections, subs } = global.templates;

    return /*html*/`
<!-- ${date}-homepage (US) -->
<!--#! MARKETING CONTENT -->
<style>
/* ACCESS/HOLI-DEALS LAYOUT */
.lpos-grid {
    display: flex;
    flex: 0 0 100%;
    flex-direction: row;
    margin-bottom: -1vw;
}
.lpos-grid--reverse {
    flex-direction: row-reverse;
}
.lpos-grid .tallbox {
    flex: 1 0 calc(25% + 0.25vw);
    padding: 0 1vw 0 0;
}
.lpos-grid--reverse .tallbox {
    padding: 0 0 0 1vw;
}
.lpos-grid .mel-promo {
    margin-bottom: 1vw;
}
@media screen and (max-width: 479px) {
    .lpos-grid {
        flex-direction: column;
    }
    /* .lpos-grid--reverse {
        flex-direction: column-reverse;
    }*/
    .lpos-grid .tallbox {
        margin: 0 0 calc(1vw + 0.2em) 0;
        padding: 0;
    }
}
/* END ACCESS/HOLI-DEALS LAYOUT */

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
    background-color: #0676BC; /* Different from homepage-us */
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

</style>

<div class="mel wrapper_hp">

    ${ sections.mel(data, {
        ssKey: 'LPOS 1',
        body: (data, sectionId) => `
            ${ subs.marquee(data) }
            <style>
                #${sectionId} .hp_grid .mel-promo {
                    margin-bottom: 1vw;
                }
            </style>
            ${ subs.grid(data, { stringClasses: 'mel-string-4-up-small' }) }
            ${ subs.lpos(data) }
        `
    })}

    ${ sections.mel(data, {
        ssKey: 'Rewards',
        body: data => `
            ${ subs.pencil(data) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'LPOS 2',
        body: (data, sectionId) => `
            <style>
                #${sectionId} .hp_grid .mel-promo {
                    margin-bottom: 1vw;
                }
            </style>
            ${ subs.grid(data, { stringClasses: 'mel-string-4-up-small' }) }
            ${ subs.lpos(data, { reverse: true }) }
        `
    }) }

    ${ sections.mel(data, {
        ssKey: 'LPOS Pencil',
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

</div>

<script>
window.onload = function() {
    var hpAnalytics = document.getElementById('main');
    hpAnalytics.className += ' analytics';
};
</script>
<!--#! MARKETING CONTENT -->`;
}
