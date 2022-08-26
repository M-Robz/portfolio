# Pre-Build

_Package version: 1.0.1_

Reads an Excel file, and uses a project-specific custom function to convert the data into a string of HTML markup, which is copied to the clipboard.

## Dependencies

The Pre-Build tool has the following dev dependency, which is not included in the dotcom project template as of version 5.4.0:

* `js-beautify@1.13.5`

When you run `grunt updatetemplate` to upgrade the project template, this dependency will be removed from `package.json`. You will need to manually discard that change before committing or running `npm install`.

## Usage

### Initial setup

1. Copy the following files into your dotcom project (see "Project setup" below):
   1. The core app files under `scripts/pre-build/app/`
   1. `scripts/pre-build/project/_xlsx/.gitkeep`
1. Set up a custom "builder" script and config file for your project under `scripts/pre-build/project/` (see "Project setup" below)
1. Add `"prebuild": "node ./scripts/pre-build/app"` to the `scripts` key in your project's `package.json` file
1. Run `npm install -D js-beautify@1.13.5`

### Running the script

1. Place your source Excel file in `scripts/pre-build/project/_xlsx/`
1. Run `npm run prebuild` or `npm run prebuild -- [arguments]` from any directory in your project. The app is set up to receive the following argument (you can also set up custom arguments as discussed below):
   * `--book`, `-b` (optional): Name of the Excel source file (include the file extension, but not the path)
     * Defaults to the first Excel file found in the `_xlsx` directory
1. The output will be copied to your clipboard. Paste the contents into `src/content.html` or another HTML file in `src/`

## Project setup

### Directory structure

```
scripts/pre-build/
    app/
        modules/
            copyToClipboard.js
            readArgs.js
            workbookToJsObject.js
        changelog.md
        index.js
        readme.md
    project/
        _xlsx/
            .gitkeep
        builder.js
        config.js
```

### The core `app` directory

You will not need to modify the files in this directory unless you are developing changes to the Pre-Build core application. When these files are changed, the package version should be bumped.

#### `app/index.js`

This is the script that is executed when you run `npm run prebuild`. It parses the command line arguments and reads the Excel file, and then passes data from the three sources of input — Excel file, CLI args, and config file — to the custom _builder_ script for your project. Your builder should return a string of HTML markup, which `app/index.js` will beautify and copy to the clipboard.

### The custom `project` directory

This directory contains the custom files for your project, as well as the `_xlsx` working directory where you will place your Excel source file. The files `builder.js` and `config.js` are required. You can add additional JS files and subdirectories (such as a `modules` folder) as desired.

#### `project/builder.js`

Your _builder_ script should contain your custom code to generate HTML markup. It should export a function that receives three arguments from `app/index.js`:

1. The Excel workbook data. This will be an object keyed by the names of the worksheets. The values are arrays of objects representing spreadsheet rows.
1. The arguments provided via the command line. This will be an object containing argument-value pairs.
1. The data from your custom config file.

The builder script should return a string of HTML markup.

You can throw an error from your builder to terminate script execution. `app/index.js` will log the error to the console.

#### `project/config.js`

This file should export an object containing:

1. A `cliOptions` key if your project requires custom command line options besides `--book`. This should define the options in the format expected by the `yargs` npm package. It should be an object whose keys are the option names, and whose values are config objects to be passed to `yargs.option()`.
   * Some properties you may want to include in your config objects: `alias`, `type`, `demandOption`, `default`, `describe`
1. Any other configuration data needed by your builder script.

If your project does not require any configuration, export an empty object.

Example:

```
module.exports = {
    cliOptions: { // required key if custom args are needed
        sheet: {
            alias: 's',
            type: 'string',
            demandOption: false,
            describe: 'Name of the worksheet (tab) in the Excel file to use'
        },
        quebec: {
            alias: 'q',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Whether to build for the Quebec site'
        },
        // additional options
    },
    imgPath: '/dotcom/PROJECT_lpos_CATLP/dev/img/', // a custom key
    // other custom config
}
```

Reference: https://www.npmjs.com/package/yargs
