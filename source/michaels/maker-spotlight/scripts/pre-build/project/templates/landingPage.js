/* ---- landingPage ----
 *
 * Assembles a string of markup for the landing page.
 *
 * Inputs:
 *   - featuredSnippets, microSnippets (array of strings): Arrays of makers'
 *     HTML snippets
 *   - isCanada, isQuebec (boolean): Locale identifiers
 *
 * Output (string): Page markup
 */
function landingPage(featuredSnippets, microSnippets, isCanada, isQuebec) {
    return `
        <!-- Featured Makers section -->
        <section class="sect-featured-makers">
            <h1>${ isQuebec
                ? 'Pleins feux sur l&rsquo;artisanat'
                : 'Maker Spotlight'
            }</h1>
            <p>${ isQuebec
                ? `Les amateurs d&rsquo;artisanat transforment des fournitures ordinaires en formidables cr&eacute;ations qui brillent de mille feux. Nous mettons ici leurs projets et leurs espaces de travail &agrave; l&rsquo;avant-plan pour vous offrir de nouvelles id&eacute;es et sources d&rsquo;inspiration.`
                : `Makers take ordinary supplies and turn them into amazing, one-of-a-kind, original things that shine, sparkle, and glow. Here, we'll spotlight their projects and workspaces to help you find inspiration and new ideas.`
            }</p>
            <div>
                ${featuredSnippets.join('')}
            </div>
            <a class="mel-button" href="$url(Link-Category,cgid,makerspotlight-all)$">
                <div class="mel-button__label">${ isQuebec
                    ? 'Pleins feux sur l&rsquo;artisanat'
                    : 'More Maker Spotlight'
                }</div>
            </a>
            <a class="mel-button" href="$url(Link-Category,cgid,makerspotlight-all,section,${
                isQuebec ? 'parminous' : 'amongus'
            })$">
                <div class="mel-button__label">${ isQuebec
                    ? 'Les amateurs d&rsquo;artisanat parmi nous'
                    : 'Makers Among Us'
                }</div>
            </a>
            <a class="mel-button" href="$url(Link-Category,cgid,makerspotlight-all,section,${
                isQuebec ? 'festifs' : 'holi-diy'
            })$">
                <div class="mel-button__label">${ isQuebec
                    ? 'Projets festifs à faire soi-même d’amateurs d’artisanat'
                    : 'Holi-DIY Makers'
                }</div>
            </a>
            <a class="mel-button" href="$url(Link-Category,cgid,makerspotlight-all,section,madeit)$">
                <div class="mel-button__label">${ isQuebec
                    ? 'Amateurs d’artisanat «&nbsp;Made it&nbsp;»'
                    : '“Made It” Makers'
                }</div>
            </a>
        </section>

        <!-- Micro Makers section -->
        <section class="sect-micro-makers">
            <h2>${ isQuebec
                ? 'Plus d&rsquo;amateurs d&rsquo;artisanat'
                : 'More Makers We Love'
            }</h2>
            <div class="mel-string mel-string-4-up-medium">
                ${microSnippets.join('')}
            </div>
            <a class="mel-button" href="$url(Link-Category,cgid,makerspotlight-all)$">
                <div class="mel-button__label">${ isQuebec
                    ? 'Voir tous les amateurs d&rsquo;artisanat Michaels'
                    : 'See All the Michaels Makers'
                }</div>
            </a>
        </section>
    `;
}

module.exports = landingPage;
