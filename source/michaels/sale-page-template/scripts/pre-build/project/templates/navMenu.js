module.exports = function (items) {
    const classes = [ 'mel-string', 'mel-string--center', 'mel-string-3-up' ];
    const len = items.length;

    // Avoid orphans in last row
    if (len < 5 || 6 < len) classes.push('mel-string-4-up-small');
    if (len < 7 || 8 < len) classes.push('mel-string-6-up-medium');
    if (len < 9 || (12 < len && len < 17) || 18 < len) classes.push('mel-string-8-up-large');

    return `
        <nav class="sale-nav-menu" aria-label="Jump to category">
            <div class="${ classes.join(' ') }">
                ${ items.join('') }
            </div>
        </nav>
    `;
}
