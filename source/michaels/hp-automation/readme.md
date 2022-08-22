# HP Automation

## Project structure

```
hp-automation/
    _build/         Output files are written here (untracked)
    _data/          Working space for your Excel source files (untracked)
    _leftovers/     Miscellaneous resources such as CLI commands and Excel formulas for generating image names
    modules/        JS modules used by the build script and templates
    templates/      JS templates which consume data and return a string of HTML
        blocks/     Individual blocks, such as a tier 3 block or banner; included in subsections
        pages/      Entire pages, such as the US homepage
        sections/   Sections of a page, such as the mel section component; included in pages
        subs/       Subsections, such as a grid or marquee; included in sections
    build.js        The automated build script you will run from the command line
    readme.md
```

## Process

Follow these steps when using the automated homepage process:

1. Edit the page template to change which sections should appear on the page, and their order.
   * When you are working ahead on future dates (such as the upcoming week), you may want to temporarily duplicate the page template if the future date has different sections. You can delete duplicate templates once their live dates have passed and they are no longer needed.
1. If necessary, edit or add section, subsection, and block templates.
   * You will likely need to change these templates less frequently than page templates.
   * Old templates can be deleted if we don't expect to use them again. We'll still have their history in source control.
1. Make any necessary edits to the shared Excel file.
   1. Verify that the values in the "Section" and "Subsection" columns match the names expected by the templates you are using.
      * Note that although leading and trailing whitespace will be trimmed from the values in these columns, the rest of the characters must be an exact match.
      * Column names must also match the keys expected by the templates.
   1. Add image names to the "Image File Name" column for any rows in which the column is blank.
   1. Add the value `YES` or `TRUE` to the "Outlined" column for any blocks that should be outlined.
   1. When a block opens a modal instead of linking to another page, enter the name of the modal in the "Modal Target" column, and leave the "Link" column empty. Note that this functionality is currently configured for Tier 2 (coupon) blocks only.
      * If the modal has the class `.mel-js-modal--ecom`, enter `ecom`.
      * Other modals should follow the same format: `.mel-js-modal--[name]`.
   1. If you want the build tool to ignore a row, you can delete the value in the "Section" or "Subsection" column for that row, although in most cases it's preferable to delete the entire row.
1. Download a local copy of the Excel file (it will be saved in XLSX format) by going to `File` > `Save As` > `Download a Copy`.
1. Move your copy of the Excel file to `/_data`.
1. Run the CLI tool (see **Command Line Interface** below).
1. If there are HTML validation errors reported, you will need to review the errors output to the terminal and fix them in the code. Keep in mind that the errors are reported off of the built HTML file, so specific line numbers will need to be reviewed from the built file. Once the errors are fixed, rerun the CLI tool.
1. The output HTML file will be written to `/_build`. From there it can be moved into the dated folders where homepage code is archived.
1. Once you have run an initial build of the page, you have the option to make additional edits by either: (a) downloading a new copy of the Excel file and rerunning the CLI tool, or (b) manually editing the previously generated code. If you choose option B, be sure to also make your edits in the spreadsheet if the HP Team hasn't already done so. That way the changes will be reflected on any subsequent builds (by you or another Dev team member), and when the HP Team duplicates the spreadsheet for the following day.

## Command line interface

Run `npm run build -- [arguments]` from any directory in the repository, or `cd` into `hp-automation` and run `node build [arguments]`, and supply the arguments below (all are required). Omit the file extension from file names.

* `--template` (`-t`): File name of the page template in `/templates/pages`.
* `--book` (`-b`): Name of the XLSX source file in `/_data`.
* `--sheet` (`-s`): Name of the worksheet tab in the Excel file.
* `--date` (`-d`): Six-digit date in the format `YYMMDD` to be used in the output markup and file name.
* `--output` (`-o`): Name of the file to write HTML output to. The value of the `--date` argument will be prepended to the HTML file name, separated by a dash.
  * Example: `-d=200110 -o=homepage` will result in a file named `200110-homepage.html`.

Examples:

`npm run build -- -t=homepage-us -b="HP_Brief_US_Febwk3v3" -o=homepage -s="Thursday 2.20" -d=200220`

`node build -t=homepage-can -b="HP_Brief_CAN_FebWk3v3" -o=homepage-en -s="Tuesday 2.18" -d=200218`

You can also run `npm run build -- --help` or `node build --help` to see a list of the required arguments while you're working in Terminal.

## Templates

### Background

In the context of this project, *templates* are JS files that consume content data generated from an Excel spreadsheet, and return a string of HTML markup. The project is organized into *block templates* (such as a banner or tier 3 block), which are included in *subsection templates* (such as a grid or marquee), which are included in *section templates* (such as the mel section component), which are included in *page templates* (such as the US homepage).

When you run the build tool, it reads the data from the Excel file and converts it to a JS object (keyed according to the "Section" and "Subsection" columns), and then passes the data to the page template you specify. The page template in turn calls section templates, which call subsection templates, which usually (though not always) call block templates. Each template generates markup and returns it to its caller, and the build script writes the markup for the entire page to an HTML file.

Here is a diagram of the information flow:

```
(1) Data:       XLSX file --> build.js --> page template --> section templates --> subsection templates --> block templates
(2) Markup:     HTML file <-- build.js <-- page template <-- section templates <-- subsection templates <-- block templates
```

### Managing templates

For changes to a template that are expected to be permanent, you can modify the existing template file. For changes that are expected to be temporary (perhaps for a day or a few weeks), you can save a copy of the existing template under a new name and modify the copy. When the temporary template is no longer needed, it can either be deleted (we will still have a record of it in source control), or it can be preserved alongside the normal templates for future use.

## Tips

* You may find it helpful to keep a scratch pad containing recent CLI commands you have run. You can start with the examples in `hp-automation/_leftovers/snippets.html`, edit the parameters, and paste the entire strings into Terminal.
* It may also be helpful to use the Excel formulas in `hp-automation/_leftovers/snippets.html` to generate image names at the beginning of each new week. Note that the relative cell references may need to be modified when you paste a formula into the Excel formula bar.
  * When you have finished entering formulas for the image names, it is recommended that you convert the formulas to static values so that the names will not change if rows are subsequently reordered or the cells are copied. Follow these steps:
    1. Select all cells in the "Image File Name" column.
    1. Copy them.
    1. While keeping the same cells selected, choose `Home > Clipboard > Paste Values` or hit `cmd+v` and choose `Paste Values` from the context menu that appears. This will overwrite the formulas with static values.
