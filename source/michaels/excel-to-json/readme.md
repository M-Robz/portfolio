# Excel to JSON

Reads an Excel file, and converts the data to one or more JSON files.

### Steps

1. Save a local copy of the Excel file (in Office 365: `File > Save as > Download a copy`) in the `./scripts/_template/excel-to-json/_xlsx` directory. Files in this directory are not tracked by git
1. Run `npm run exceltojson` from any directory in the project, with the optional arguments described below

The output will be written to one or more JSON files, depending on the arguments supplied. Each file will contain an array of objects, each of which represents a row in the source spreadsheet.

### How to use the Node script

The script can perform three tasks:

1. Generate a single JSON file from a worksheet in the Excel file
1. Split a worksheet into multiple JSON files according to each row's value in a specified field
1. Join all worksheets into a single JSON file

To use the script, either run `npm run exceltojson` without arguments, or run `npm run exceltojson -- [arguments]`, and provide any of the arguments below. All are optional.

#### Basic options

##### --book, -b
Name of the Excel source file (include the file extension, but not the path).

* Defaults to the first Excel file the script finds in `./scripts/_template/excel-to-json/_xlsx`
* If you omit this argument, manually delete any other Excel files in the directory before running the script

##### --sheet, -s
Name of the worksheet (tab) in the Excel file to use as the master source.

* Defaults to the first worksheet the script finds in the workbook
* If joining sheets into a new master, this will be ignored

##### --output, -o
Name of the file you want the master JSON output written to (omit the path and `.json` file extension.

* Defaults to `'master'` if splitting or joining, and the `--all` flag is set
* Otherwise defaults to `'data'`

##### --notrack, -n (boolean flag)
Write the JSON output to the `./scripts/_template/excel-to-json/_build` directory, which is ignored by git.

* `_build` will be emptied before the new files are written
* If this option is omitted, files will be written to `./src/data` instead, overwriting any preexisting files by the same name

#### Options for splitting and joining worksheets

##### --spliton, -f
Split a worksheet into multiple JSON files according to the field (column) specified by this argument.

* The worksheet specified by `--sheet` will be treated as the master source

##### --join, -j (boolean flag)
Join all of the worksheets into a single JSON file.

* This option will be ignored if `--spliton` is provided, as the two are not meant to be used together

##### --all, -a (boolean flag)
Output JSON files for the master sheet as well as all partial sheets.

* If this option is omitted, only the JSON files resulting from the splitting/joining operation will be output, and not the source data
  * If splitting, this will be the partial JSON files
  * If joining, it will be the new master JSON file
* This option only applies if either `--spliton` or `--join` is provided

#### Example: Generate a single JSON file from a worksheet in the Excel file

The following example will read the "US Monday offers" worksheet of the first Excel file found in `./scripts/_template/excel-to-json/_xlsx`, and convert it to `./src/data/offers-us.json`.

```
npm run exceltojson -- --sheet="US Monday offers" --output="offers-us"
```

#### Example: Split a worksheet into multiple JSON files according to each row's value in a specified field

The following example will split the first worksheet in `./scripts/_template/excel-to-json/_xlsx/videos.xlsx` based on the `Category` column, and will write all of the partial JSON files, along with the master JSON file from the source sheet, to `./scripts/_template/excel-to-json/_build`. Since `--output` is not provided, the master file will be named `master.json` by default.

```
npm run exceltojson -- --book="videos.xlsx" --spliton=Category --all --notrack
```

#### Example: Join all worksheets into a single JSON file

The following example will consolidate all of the worksheets from the first Excel file found in `./scripts/_template/excel-to-json/_xlsx`, and write the combined JSON output to `./src/data/videos.json`. Since the `--all` flag is omitted, only the new master file will be written.

```
npm run exceltojson -- --output=videos --join
```

#### Help

You can run `npm run exceltojson -- --help` to see a list of options and usage notes within the terminal.

### Potential future enhancements

* The public module `deep-trim-node` could be replaced with a module that, in addition to trimming all of an object's property *values* that are strings, also trims all of the object's property *names* (`deep-trim-node` only trims values). This would help avoid issues caused by column headings in the Excel file that unintentionally contain leading/trailing whitespace. Currently that whitespace is preserved in the property names of the JSON output.
