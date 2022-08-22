/*
 * Custom pre-build config for Maker Spotlight
 *
 * Reference: `scripts/pre-build/app/readme.md`
 */
module.exports = {
    cliOptions: {
        landingpage: {
            alias: 'l',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to build for the landing page'
        },
        canada: {
            alias: 'c',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to build for the Canada English site'
        },
        quebec: {
            // Takes precedence over the `canada` flag if both are provided
            alias: 'q',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to build for the Quebec site'
        }
    },
    imgPath: '/dotcom/PROJECT_maker-spotlight_CATLP/dev/img/',

    // IDs of makers to show on the landing page, in the order in which they
    // should be displayed
    lpMakers: {

        // US locale
        US: {
            featured: [
                'hellowonderful_co',
                'sweettoothfairy',
                'houselarsbuilt',
                'craftylumberjacks',
                'lettersbyshells'
            ],
            micro: [
                'mandypeltierartist',
                'candlefromthehart',
                'combatcrochet',
                'artxmariah'
            ]
        },

        // Canada locale
        CA: {
            featured: [
                'hellowonderful_co',
                'sweettoothfairy',
                'houselarsbuilt',
                'craftylumberjacks',
                'lettersbyshells'
            ],
            micro: [
                'mandypeltierartist',
                'candlefromthehart',
                'artxmariah',
                'Humbyart'
            ]
        },

        // Quebec locale
        QU: {
            featured: [
                'hellowonderful_co',
                'sweettoothfairy',
                'houselarsbuilt',
                'craftylumberjacks',
                'lettersbyshells'
            ],
            micro: [
                'mandypeltierartist',
                'candlefromthehart',
                'artxmariah',
                'Humbyart'
            ]
        }
    }
}
