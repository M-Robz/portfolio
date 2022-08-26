/*
 * Custom config for the Sale page template
 *
 * Reference: `scripts/pre-build/readme.md`
 */
module.exports = {
    cliOptions: {
        sheet: {
            alias: 's',
            type: 'string',
            demandOption: false,
            describe: 'Name of the worksheet (tab) in the Excel file to use'
            // Defaults to the first sheet in the workbook
        },
        grid: {
            alias: 'g',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to display the offers in mel-string grids'
            // If false (the default), the offers will be displayed in carousels
        },
        nav: {
            alias: 'n',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to include an in-page navigation menu'
        },
        canada: {
            alias: 'c',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to build for the Canada locale'
        },
        quebec: {
            alias: 'q',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to build for the Quebec locale'
        }
    },
    imgPath: '/dotcom/PROJECT_my-project_CATLP/dev/img/',
    bugOverlayImages: {
        "Great Buy": {
            src: 'bug-overlays/great-buy.png',
            alt: 'Great buy!'
        },
        "EDV": {
            src: 'bug-overlays/edv.png',
            alt: 'Everyday value'
        },
        "EDV-FR": {
            src: 'bug-overlays/edv-fr.png',
            alt: 'Bas prix de tous les jours'
        }
    },

    // OPTIONAL: MANUAL SECTION ID ASSIGNMENTS
    // sectionIDs: {
    //     US: {
    //         'SECTION NAME FROM EXCEL': 'ID TO USE',
    //         ...
    //     },
    //     CA: {
    //         ...
    //     },
    //     QU: {
    //         ...
    //     }
    // }
};
