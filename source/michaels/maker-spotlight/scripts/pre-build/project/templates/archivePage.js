/* ---- archivePage ----
 *
 * Assembles a string of markup for the archive page.
 *
 * Inputs:
 *   - featuredSnippets, microSnippets (object): Objects containing arrays of
 *     makers' HTML snippets, keyed by their group as specified in the "Group"
 *     field of the Excel data source
 *       - Makers not assigned to a group can be found under the `ungrouped` key
 *   - isCanada, isQuebec (boolean): Locale identifiers
 *
 * Output (string): Page markup
 *
 * Usage examples:
 *
 * ```
 * // Join the snippets for Featured Makers not assigned to a group
 * featuredSnippets.ungrouped.join('')
 *
 * // Join the snippets for Featured Makers in the "Makers Among Us" group
 * featuredSnippets['Makers Among Us'].join('')
 * ```
 */
function archivePage(featuredSnippets, microSnippets, isCanada, isQuebec) {
    return `
        <!-- Featured Makers section -->
        <section class="sect-featured-makers js-section" data-section="${
            isQuebec ? 'envedette' : 'featured'
        }">
            <div class="maker-snippets mel-string mel-string-3-up-medium">
                ${featuredSnippets.ungrouped.join('')}
            </div>
        </section>

        <!-- Micro Makers section -->
        <section class="sect-micro-makers js-section" data-section="${
            isQuebec ? 'plus' : 'more'
        }">
            <div class="maker-snippets mel-string mel-string-3-up-medium">
                ${microSnippets.ungrouped.join('')}
            </div>
        </section>

        <!-- Makers Among Us section -->
        <section class="sect-makers-among-us js-section" data-section="${
            isQuebec ? 'parminous' : 'amongus'
        }">
            <div class="maker-snippets mel-string mel-string-3-up-medium">
                ${featuredSnippets['Makers Among Us'].join('')}
            </div>
        </section>

        <!-- Holi-DIY Makers section -->
        <section class="sect-holi-diy-makers js-section" data-section="${
            isQuebec ? 'festifs' : 'holi-diy'
        }">
            <div class="maker-snippets mel-string mel-string-3-up-medium">
                ${featuredSnippets['Holi-DIY'].join('')}
            </div>
        </section>

        <!-- TDN Makers section -->
        <section class="sect-tdn-makers js-section" data-section="madeit">
            <div class="maker-snippets mel-string mel-string-3-up-medium">
                ${featuredSnippets['TDN'].join('')}
            </div>
        </section>
    `;
}

module.exports = archivePage;
