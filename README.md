# react-select-fast-filter-options
Fast `filterOptions` function for [`react-select`](https://github.com/JedWatson/react-select); optimized to quickly filter huge options lists.

## Installation

The easiest way to install is using NPM:

```shell
npm install react-select-fast-filter-options --save
```

ES6, CommonJS, and UMD builds are available with each distribution.

Use unpkg to access the UMD build:

```html
<script src="https://unpkg.com/react-select-fast-filter-options/dist/umd/react-select-fast-filter-options.js"></script>
```

## Examples

#### [`react-select`](https://github.com/JedWatson/react-select) example

[Try this example in Code Sandbox.](https://codesandbox.io/s/rjjn7m3q3o)

```js
// Import default styles.
// This only needs to be done once; probably during bootstrapping process.
import "react-select/dist/react-select.css";

import React from "react";
import ReactDOM from "react-dom";
import createFilterOptions from "react-select-fast-filter-options";
import Select from "react-select";

// Dummy array of test values.
const options = [
  {label: "Option One", value: 1},
  {label: "Option Two", value: 2},
];

// For more configuration options, see:
// https://github.com/bvaughn/react-select-fast-filter-options#configuration-options
const filterOptions = createFilterOptions({
  options
});

ReactDOM.render(
  <Select filterOptions={filterOptions} options={options} />,
  document.getElementById("root")
);
```

#### [`react-virtualized-select`](https://github.com/bvaughn/react-virtualized-select) example

[Try this example in Code Sandbox.](https://codesandbox.io/s/qoro7wzy9)

```js
// Import default styles.
// This only needs to be done once; probably during bootstrapping process.
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

import React from "react";
import ReactDOM from "react-dom";
import createFilterOptions from "react-select-fast-filter-options";
import Select from "react-virtualized-select";

// Dummy array of test values.
const options = [
  {label: "Option One", value: 1},
  {label: "Option Two", value: 2},
];

// For more configuration options, see:
// https://github.com/bvaughn/react-select-fast-filter-options#configuration-options
const filterOptions = createFilterOptions({
  options
});

ReactDOM.render(
  <Select filterOptions={filterOptions} options={options} />,
  document.getElementById("root")
);
```

#### [`react-redux`](https://github.com/reactjs/react-redux) example

[Try this example in Code Sandbox.](https://codesandbox.io/s/7kn4k94rrj)

##### `selectors.js`
```js
// selectors file
import { createSelector } from "reselect";
import createFilterOptions from "react-select-fast-filter-options";

// Select the huge array of options stored in redux state
export const optionsSelector = state => state.options;

// Create a search index optimized to quickly filter options.
// The search index will need to be recreated if your options array changes.
// This index is powered by js-search: https://github.com/bvaughn/js-search
// Reselect will only re-run this if options has changed
export const getIndexedOptions = createSelector(optionsSelector, options =>
  createFilterOptions({ options })
);
```

##### `reducers.js`
```js
// Dummy array of test values.
const options = Array.from(new Array(100), (_, index) => ({
  label: `Item ${index}`,
  value: index
}));

const INITIAL_STATE = {
  options
};

function searchApp(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default searchApp;
```

##### application.js
```js
// Import default styles.
// This only needs to be done once; probably during bootstrapping process.
import "react-select/dist/react-select.css";

import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import Select from "react-select";
import { createStore } from "redux";
import { createSelector } from "reselect";
import searchApp from "./reducers";
import { getIndexedOptions, optionsSelector } from "./selectors";

const store = createStore(searchApp);
const mapStateToProps = state => ({
  filterOptions: getIndexedOptions(state),
  options: optionsSelector(state)
});

const FilterableSelect = connect(mapStateToProps)(props => (
  <Select {...props} />
));

ReactDOM.render(
  <Provider store={store}>
    <FilterableSelect />
  </Provider>,
  document.getElementById("root")
);
```

## Configuration Options

By default, `createFilterOptions` returns a filter function configured to match all substrings, in a case-insensitive way, and return results in their original order. However it supports all of the underlying [`js-search`](https://github.com/bvaughn/js-search) configuration options.

The following table shows all supported parameters and their default values:

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `indexes` | `Array<String>` |  | Optional array of attributes to build search index from; defaults to the `labelKey` attribute. |
| `indexStrategy` | [`IndexStrategy`](https://github.com/bvaughn/js-search/blob/master/source/IndexStrategy/IndexStrategy.js) | [`AllSubstringsIndexStrategy`](https://github.com/bvaughn/js-search/blob/master/source/IndexStrategy/AllSubstringsIndexStrategy.js) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `labelKey` | string | "label" | Option key containing the display text |
| `options` | array | [] | Array of options objects |
| `sanitizer` | [`Sanitizer`](https://github.com/bvaughn/js-search/blob/master/source/Sanitizer/Sanitizer.js) | [`LowerCaseSanitizer`](https://github.com/bvaughn/js-search/blob/master/source/Sanitizer/LowerCaseSanitizer.js) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `searchIndex` | [`SearchIndex`](https://github.com/bvaughn/js-search/blob/master/source/SearchIndex/SearchIndex.js) | [`UnorderedSearchIndex`](https://github.com/bvaughn/js-search/blob/master/source/SearchIndex/UnorderedSearchIndex.js) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `tokenizer` | [`Tokenizer`](https://github.com/bvaughn/js-search/blob/master/source/Tokenizer/Tokenizer.js) | [`SimpleTokenizer`](https://github.com/bvaughn/js-search/blob/master/source/Tokenizer/SimpleTokenizer.js) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `valueKey` | string | "value" | Option key containing the value |

## Advanced Configuration

The default filter configuration mimics `react-search` behavior.
But you can also customize search.
For example:

```js
import {
  CaseSensitiveSanitizer,
  ExactWordIndexStrategy,
  Search,
  SimpleTokenizer,
  StemmingTokenizer,
  TfIdfSearchIndex
} from 'js-search'
import { stemmer } from 'porter-stemmer'
import createFilterOptions from 'react-select-fast-filter-options'

// Default index strategy is built for all substrings.
// In other word "c", "ca", "cat", "a", "at", and "t" all match "cat".
// Override to only allow exact-word matches like so:
const indexStrategy = new ExactWordIndexStrategy()

// Default sanitizer is case-insensitive
// Searches for "foo" will match "Foo".
// Override to be case-sensitive like so:
const sanitizer = new CaseSensitiveSanitizer()

// By default, search results are returned in the order they wre indexed.
// This means that your filtered options will match their unfiltered order.
// More advanced results orderings are possbile.
// For example TF-IDF ranking is an option.
// Learn more at https://github.com/bvaughn/js-search#tf-idf-ranking
const searchIndex = new TfIdfSearchIndex()

// Default tokenizer just splits search text on spaces.
// In other words "the boy" becomes 2 search tokens, "the" and "boy".
// The StemmingTokenizer can be used for fuzzier matching.
// For example, "searching" will match  "search", "searching", and "searched".
// Learn more at https://github.com/bvaughn/js-search#stemming
const tokenizer = new StemmingTokenizer(stemmer, new SimpleTokenizer())

const filterOptions = createFilterOptions({
  indexStrategy,
  options,
  sanitizer,
  searchIndex,
  tokenizer
})
```

In addition to the stemming tokenizer, other tokenizers are available as well, including `StopWordsTokenizer` which removes common words like "a", "and", and "the".
For more information on available configuration options, see [`js-search` documentation](https://github.com/bvaughn/js-search).
