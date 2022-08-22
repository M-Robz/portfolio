# Interactive List

Package version: 3.1.0

Dynamically renders a list of items from a data source, and provides sorting and filtering functionality in response to user input and URL parameters. Renders additional content such as banners and headings according to filter selections.

**Table of contents**

  * I. Terminology
  * II. Architecture
  * III. Required files
  * IV. Usage
  * V. Markup requirements

## I. Terminology

  * _List item_: In the context of the Interactive List component, this refers to an item within the interactive list, which could be any component, such as a card or video. It does not refer to an `<li>` element (although the item could be an `<li>`).
  * _Conditional content_: A component such as a banner, heading, etc. whose content varies depending on how the interactive list is currently filtered. For instance, if your list is filtered by category, you may want to display a different banner for each category.
  * _Field_: A database term that refers to a column in a tabular data source, or a property of the object representing a row once the data has been converted to JSON.

## II. Architecture

The Interactive List component loosely follows a model-view-controller (MVC) pattern, with some deviations:

  * The model and view are not directly aware of each other. The controller mediates between them, as in a model-view-adapter pattern.
  * The model and view are passive, and it is the controller that actively listens for events and dispatches commands to the model and view in response. The MVC triad is a hierarchy, in which the controller holds references to the model and view, but they do not hold references to the controller or each other.
  * The controller exports an API to `main.js` for managing control flow. It does this by abstracting from the lower-level methods of the model and view in order to accomplish higher-level tasks. These typically involve the execution of sequences of model/view methods.

## III. Required files

### Package sub-components
Include these files in your project under `js/components/interactive-list`:

  * `index`
  * `controller`
  * `model`
  * `view`
  * `changelog.md`
  * `readme.md`

These files constitute the Interactive List application. You should not normally need to modify them for your project. Do not add files to this directory unless you are developing changes to the application. When changes are made to these files, the package version should be bumped.

### Dependencies
Include these custom modules in your project under `js/modules`:

  * `arrayIncludes` (1.0.0)
  * `formatKebabCase` (2.0.0)
  * `makeNode` (1.0.0)
  * `stripAccents` (1.0.0)
  * `urlQueryManager` (1.1.0)

The dependencies above may have additional dependencies of their own, which can also be placed in `js/modules`. When the dependencies above are updated, the package version should be bumped.

### Custom configuration and templates
Your project will need to include a set of project-specific configuration files and markup templates, which you will import into `main.js` and pass to the Interactive List component.

It is recommended that you put all of your templates in a `js/templates` directory, and your configs in a `js/config` directory, and include an `index.js` file in each directory that aggregates and re-exports all of the files in the directory as a single object which can be imported into `main.js`.

Refer to section _"IV. Usage"_ for more information about these files.

### Sample folder structure

```
js/
    components/
        interactive-list/
            changelog.md
            controller.js
            index.js
            model.js
            readme.md
            view.js
    config/
        conditionalContent.js
        filterFields.js
        index.js
    modules/
        arrayIncludes.js
        makeNode.js
        formatKebabCase.js
        stripAccents.js
        urlQueryManager.js
    templates/
        banner.js (conditional content)
        filterOption.js
        heading.js (conditional content)
        index.js
        video.js (list item)
```

## IV. Usage
The methods exported by the `controller` form the API for the Interactive List component. You can use them in different combinations to accomplish the tasks required by your project. Before you can use the API, you will need to set up and import your config and template files.

In general, you will follow these steps:

  1. Create your markup templates
  1. Create your configuration files
  1. Import the package, templates, and config into `main.js`
  1. Use the API to initialize the templates and data
  1. Use the API to initialize any sort and filter menus
  1. Use the API to sort and/or filter the data model as needed on page load
  1. Use the API to update the view to initially show items and conditional content

Subsequent updates to the model and view will usually be driven by user input, which the Interactive List component will handle by itself. In some cases, such as when you want to show conditional content before the item data has been downloaded, you may repeat some of the API calls more than once.

The following is a more detailed description of the above steps.

### 1. Create your markup templates
Templates are functions that consume data and return a string of HTML markup for a particular component in your project (e.g., a list item, filter option, or banner).

Template files export a wrapper function that returns the template function. If you need to configure a template at runtime with information like the locale or a path to image assets, you can pass arguments to the wrapper function when you import the template, which creates a closure and binds those arguments to the template function that is returned.

The index file exports a function that accepts any parameters that need to be passed to the templates as described above; imports and invokes the template wrappers with those parameters; and returns an object containing the template functions. If your project has multiple pages or locales, you can include logic to conditionally return a different set of templates depending on which page/locale the user is on.

Example:

```
// js/main.js
const templates = require('./templates')(dynamicImgs);

// js/templates/index.js
module.exports = function (dynamicImgs) {
    return {
        item: require('./productCard')(dynamicImgs),
        filterOption: require('./filterOption')(),
        conditionalContent: {
            banner: require('./banner')(),
            heading: require('./heading')()
        }
    };
};

// js/templates/productCard.js
module.exports = function (dynamicImgs) {  // Wrapper function

    // Template function
    return function (data) {
        // Template returns markup built from `data` and `dynamicImgs`
    };
};
```

#### Deciding which templates to include in `js/templates/index.js`

  * You will always need an `item` template in `index.js`. This is for the items that will be displayed in the interactive list.
    * Your template function should accept a single parameter, which will be an object containing the item's data from the model.
  * If you are dynamically populating the options in a filter menu, you will need a `filterOption` template for the options.
    * Because the view expects a certain markup structure and specific data attributes, it is recommended that you use the template code in the _"Recommended `filterOption` template"_ section of this readme.
    * The template function accepts a single parameter, which is an object with these keys: `{ type, field, value, label, checked, index }`.
  * If you have any content that will be shown conditionally depending on the current filter selections, include a `conditionalContent` object as illustrated in the example above, keyed by the template names.
    * Your template functions should accept a single parameter, which will be a `data` object from your config (see the following section).

### 2. Create your configuration files
Your config files hold information about filter fields, conditional content, and any other configuration needed for your project.

Config files export a wrapper function like template files do, but in this case the wrapper returns configuration data, which may be an object or array rather than a function. If you need to include information in your config data at runtime like the locale or a path to image assets, you can pass arguments to the wrapper function when you import the config, and use those arguments in the data that is returned.

The index file works the same way as the index for templates (see the preceding section).

Example:

```
// js/main.js
const config = require('./config')(dynamicImgs);

// js/config/index.js
module.exports = function (dynamicImgs) {
    return {
        filterFields: require('./filterFields')(),
        conditionalContent: require('./conditionalContent')(dynamicImgs),
        custom: {
            itemConfig: require('./itemConfig')(dynamicImgs)
        }
    };
};
```

#### Required structure of config files

##### `filterFields`
You will need this config if you are doing any filtering. It specifies the fields by which the items can be filtered, and contains information about those fields. It should have the following structure:

```
// js/config/filterFields.js
module.exports = function () {
    return [
        {
            name: // Name of the filter field in the tabular (JSON) data source (required)
            urlParam: // Name of the URL parameter used to filter by this field (required if you allow filtering from the URL)
            defaultValue: // Value of the filter field that will be made active by default (optional; if omitted, all items will be shown by default)
        },
        // Additional filter fields
    ];
};
```

##### `conditionalContent`
You will need this config if you have any content (e.g., banners, headings) that should be shown only when a certain field value is active. It is an array containing an object for each filter field; each of these objects contains another array of objects for each possible value of the field. It should have the following structure:

```
// js/config/conditionalContent.js
module.exports = function () {
    return [ // Array of filter fields that have conditional content associated
        {
            fieldName: // Name of the filter field in the tabular (JSON) data source
            values: [ // Array of possible values in the field
                {
                    name: // A value in the tabular (JSON) data source
                    elements: [ // Array of elements to be conditionally shown
                        {
                            container: // CSS selector for the container in which the element should be rendered
                            template: // Name of the template to use when rendering the element
                            data: {
                                // Data that will be passed to the template (customizable for your project)
                            }
                        },
                        // Additional elements
                    ]
                },
                // Additional field values
            ]
        },
        // Additional filter fields
    ];
};
```

##### Custom configs
You can include custom config files in `js/config/index.js`. It is recommended that you group them under a `custom` key in `index.js` as in the example above. Custom configs could contain info that you use in `main.js`, or that you pass to your templates when importing them.

Here is an example of the latter, in which `custom.itemConfig` is passed to `js/templates/index.js`:

```
// Configuration options
const config = require('./config')();

// Templates
const templates = require('./templates')(config.custom.itemConfig);
```

You can also add additional custom keys to `js/config/filterFields.js` or `js/config/conditionalContent.js` if it makes sense for your project.

### 3. Import the package, templates, and config into `main.js`
Example:

```
const iList = require('./components/interactive-list');

// Configuration options
const config = require('./config')();

// Templates
const templates = require('./templates')();
```

### 4. Use the API to initialize the templates and data

#### initTemplates
Call this method to load the templates that the view will use to render content. You can pass the entire templates object that you imported, as long as it has an `item` key, as well as `filterOption` and `conditionalContent` keys if needed.

Example:

```
iList.initTemplates(templates);
```

#### initData
Use this to load item and config data into the model. Pass an object with any of the properties below.

The model will only be initialized for whichever data is passed, which allows the three data arrays to be initialized at different times (e.g., on page load or after fetching the item data) if needed by calling the method more than once. The standard usage is to initialize all at the same time.

Properties:

  * `items`: Data for the items to be displayed in the list. Typically sourced from a JSON file
    * **Type:** Array of objects representing tabular data
    * **Required if:** you are displaying list items on the page
    * **When to initialize:** You will need to load this data before you can filter, sort, or render the items
  * `filterFields`: Information about the fields by which the items and conditional content can be filtered
    * **Type:** Array of objects (see _"Required structure of config files"_)
    * **Required if:** filter functionality is needed
    * **When to initialize:** You will need to load this data before you can filter items or conditional content
  * `conditionalContent`: Data for content to be shown only when a certain field value is active
    * **Type:** Array of objects (see _"Required structure of config files"_)
    * **Required if:** your page has conditional content
    * **When to initialize:** You will need to load this data before you can filter or render conditional content

Example:

```
iList.initData({
    items: serverResponse,
    filterFields: config.filterFields,
    conditionalContent: config.conditionalContent
});
```

### 5. Use the API to initialize any sort and filter menus

#### initFilterMenu
Use this method to initialize a filter menu. If you have more than one filter menu on the page, call the method once for each.

The method registers the menu with the view and adds an event listener for user input. It can dynamically populate the menu options based on the item data, or you can hard-code the options in your HTML file.

Currently two types of filter menus are supported: checkbox and radio. See section _"V. Markup requirements"_ for the required markup structure and data attributes.

Parameters:

  * `menu` (DOM node): The menu to initialize
  * `options` (object, optional): {
    * `populate` (boolean): Whether to dynamically populate the menu options (default = true)
    * `hasAllOption` (boolean): Whether the menu should have an option to show all items (default = true; only applies if dynamically populating)
    * `allOptionLabel` (string): Text label for the option to show all items (default = "View All"; only applies if dynamically populating)

Example:

```
let filterMenu = document.querySelector('.js-filter-menu'); // Selector is customizable
iList.initFilterMenu(filterMenu, {
    populate: true,
    hasAllOption: true,
    allOptionLabel: isQuebec ? 'Voir toutes' : 'View All'
});
```

#### initSortMenu
This method initializes a sort menu by adding an event listener for user input.

Currently the Interactive List component supports only one sort menu per page. See section _"V. Markup requirements"_ for the required markup structure and data attributes.

Parameters:

  * `menu` (DOM node): The menu to initialize

Example:

```
let sortMenu = document.querySelector('.js-sort-menu'); // Selector is customizable
iList.initSortMenu(sortMenu);
```

### 6. Use the API to sort and/or filter the data model as needed on page load
Before showing items and conditional content, you may wish to filter or sort the data model based on the initial state of a menu or the URL query string, or according to criteria you hard-code in `main.js`. The following methods are available:

#### updateModel.sortFromMenu
Sort items according to the criterion selected in a sort menu.

Parameters:

  * `menu` (DOM node)

#### updateModel.filterFromUrl
Filter items and conditional content according to the URL query string.

Parameters: none

#### updateModel.filterFromMenu
Filter items and conditional content according to options selected in a filter menu.

Parameters:

  * `menu` (DOM node)

#### updateModel.sortItems
Sort items according to a specified key and ordering criterion.

Parameters:

  * `key` (string): Name of the field on which to sort the data
  * `order` (string): The sort rule to apply. Permissible values:
    * `a-z`, `z-a`
    * `ascending`, `descending`
    * `oldest`, `newest`

#### updateModel.filterByNumToShow
Filter items to show only a specified number of them, starting from the first item in the data array. You may wish to sort the data before applying this filter.

Parameters:

  * `numToShow` (integer): Number of items to show

### 7. Use the API to update the view to initially show items and conditional content
Once you have finished your operations on the data model, you can instruct the Interactive List component to render list items and conditional content with the `updateView` method below.

Note that the view will be automatically updated in response to subsequent user input; you will not need to manually call `updateView` at that point.

#### updateView
Use this method to update items and conditional content in the view, and synchronize filter menus with the data model.

This method will only update items and conditional content if the data for `items` and `conditionalContent`, respectively, has been initialized with the `initData` method. Only menus that have been registered with the view via `initFilterMenu` will be synced.

Parameters: none

### API utility methods

#### utilities.getActiveFieldValues
Get an array containing the values that are currently active for a specified filter field.

This method may be useful if you need to know the active values for a custom purpose in your script. For instance, the Classes project uses this to know which category to show in the AnyRoad widget.

Parameters:

  * `fieldName` (string): Name of the field

Return value (array of strings): The active values

## V. Markup requirements

### Items container
Include the class `js-items-container` on the element that will contain your list items.

### Menus
Use the sample markup below to add a filter or sort menu to your HTML file. The mustache-style curly braces denote placeholders which you should replace with code specific to your project.

You can add classes to the elements below for styling purposes. The examples only include the required JS hooks and attributes.

#### Filter menus
Use the markup below to add a filter menu. The menu's options can be dynamically populated from the data, or you can pre-populate (hard-code) the options in your HTML file.

If you are pre-populating your menu options, and your menu includes an option to select all, give that option the attribute `value="all"`. The value "all" is a reserved keyword which the Interactive List component will recognize. For that reason, make sure none of the items in your data have the value "all" in the filter field, or unexpected behavior may result.

```
<!-- Use if your menu is dynamically populated -->
<form>
    <fieldset
        class="{{ YOUR CUSTOM HOOK TO SELECT THE MENU IN MAIN.JS }}"
        data-type="{{ `radio`|`checkbox` }}"
        data-field="{{ FIELD TO FILTER BY }}">
        <legend>{{ MENU TITLE }}</legend>
        <div class="js-options-container"></div>
    </fieldset>
</form>

<!-- Use if you pre-populate your menu -->
<form>
    <fieldset
        class="{{ YOUR CUSTOM HOOK TO SELECT THE MENU IN MAIN.JS }}"
        data-type="{{ `radio`|`checkbox` }}"
        data-field="{{ FIELD TO FILTER BY }}">
        <legend>{{ TEXT FOR MENU TITLE }}</legend>
        <div class="js-options-container">
            <div>
                <input
                    type="{{ `radio`|`checkbox` }}"
                    id="{{ UNIQUE ID FOR THIS OPTION }}"
                    name="{{ ALL INPUTS IN MENU SHOULD HAVE THE SAME NAME }}"
                    value="{{ VALUE IN FILTER FIELD THAT THIS OPTION SELECTS }}"
                    checked> <!-- Can include `checked` if selected by default -->
                <label for="{{ SAME VALUE AS `id` ATTRIBUTE OF `input` ELEMENT }}">
                    {{ TEXT FOR THIS OPTION }}
                </label>
            </div>
            <!-- Other menu options -->
        </div>
    </fieldset>
</form>
```

#### Sort menus
Use the markup below to add a sort menu. Sort menu options must be hard-coded; they cannot be dynamically populated from the data.

The permissible values for the `data-order` attribute of menu options are the same as those accepted by the `updateModel.sortItems` API method:

  * `a-z`, `z-a`
  * `ascending`, `descending`
  * `oldest`, `newest`

```
<form>
    <label for="{{ SAME VALUE AS `id` ATTRIBUTE OF `select` ELEMENT }}">
        {{ TEXT FOR MENU TITLE }}
    </label>
    <div>
        <select
            id="{{ UNIQUE ID FOR THIS MENU }}"
            class="{{ YOUR CUSTOM HOOK TO SELECT THE MENU IN MAIN.JS }}">
            <option
                data-key="{{ FIELD TO SORT BY }}"
                data-order="{{ SORT RULE TO APPLY }}"
                selected> <!-- Can include `selected` if selected by default -->
                {{ TEXT FOR THIS OPTION }}
            </option>
            <!-- Other menu options -->
        </select>
    </div>
</form>
```

#### Recommended `filterOption` template
As noted in the section _"Deciding which templates to include in `js/templates/index.js`"_, the view expects a certain markup structure and specific data attributes in your `filterOption` template. For that reason, it is recommended that you use the template code below.

You can safely add/modify classes used for styling purposes (e.g., `c-filter-menu__option`), as well as the way the `id` and `name` attributes are dynamically generated. However, your template must include an `input` element with the required attributes, and your template function must accept a single argument, which will be an object with these properties: `{ type, field, value, label, checked, index }`.

```
// Custom modules
const formatKebabCase = require('../modules/formatKebabCase');
const stripAccents = require('../modules/stripAccents');


module.exports = function () {

    return function ({ type, field, value, label, checked, index }) {
        let formattedField = formatKebabCase(stripAccents(field));
        let id = value === 'all'
            ? `filter-${formattedField}--option-all`
            : `filter-${formattedField}--option-${index}`
        ;

        return `
            <div class="c-filter-menu__option">
                <input
                    type="${type}"
                    id="${id}"
                    name="filter-${formattedField}"
                    value="${value}"
                    ${ checked ? 'checked' : '' }>
                <label for="${id}">${label}</label>
            </div>
        `;
    };
};
```
