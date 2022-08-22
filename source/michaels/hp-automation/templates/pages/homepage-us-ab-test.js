module.exports = function (data, date) {
    const { sections, subs } = global.templates;;

    return /*html*/`
<!-- ${date}-homepage-test (US) -->
<!-- A/B test content -->

${ sections.mel(data, {
    ssKey: 'Tech',
    body: data => `
        ${ subs.marquee(data) }
        ${ subs.sliderGrid(data, { template: 'tier3' }) }
    `
}) }

${ sections.mel(data, {
    ssKey: 'Inspiration 1',
    body: data => `
        ${ subs.inspoBanner(data) }
    `
}) }

${ sections.mel(data, {
    ssKey: 'Misc',
    body: data => `
        ${ subs.marquee(data) }
        ${ subs.sliderGrid(data, { template: 'tier3' }) }
    `
}) }

${ sections.mel(data, {
    ssKey: 'Inspiration 2',
    body: data => `
        ${ subs.inspoBanner(data) }
    `
}) }

${ sections.mel(data, {
    ssKey: 'MDay Hub',
    body: data => `
        ${ subs.grid(data, { template: 'tier4' }) }
    `
}) }

${ sections.mel(data, {
    ssKey: 'Tier 2',
    body: data => `
        ${ subs.grid(data) }
    `
}) }

<!-- End: A/B test content -->`;
}
