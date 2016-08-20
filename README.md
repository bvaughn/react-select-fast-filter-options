# react-select-fast-filter-options
Fast `filterOptions` function for `react-select`;
optimized to quickly filter huge options lists.

## Getting started

#### Installation

The easiest way to install is using NPM:

```shell
npm install react-select-fast-filter-options --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
Use npmcdn to access the UMD build:

```html
<script src="https://npmcdn.com/react-select-fast-filter-options/dist/umd/react-select-fast-filter-options.js"></script>
```

Here's how to fast filter with [`react-select`](https://github.com/JedWatson/react-select) or [`react-virtualized-select`](https://github.com/bvaughn/react-virtualized-select):

```js
// Import the Select component from either react-select or react-virtualized-select
import Select from 'react-virtualized-select' // or from 'react-select'

// Import the fast-filter library
import createFilterOptions from 'react-select-fast-filter-options'

// Create a search index optimized to quickly filter options.
// The search index will need to be recreated if your options array changes.
// This index is powered by js-search: https://github.com/bvaughn/js-search
const filterOptions = createFilterOptions({ options })

// Render your Select, complete with the fast-filter index
function render ({ options }) {
  return (
    <Select
      filterOptions={filterOptions}
      options={options}
      {...otherSelectProps}
    />
  )
}
```

## Configuration

By default, `createFilterOptions` returns a filter function configured to match all substrings, in a case-insensitive way, and return results in their original order. However it supports all of the underlying [`js-search`](https://github.com/bvaughn/js-search) configuration options.

The following table shows all supported parameters and their default values:

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `indexStrategy` | [`IIndexStrategy`](https://github.com/bvaughn/js-search/blob/master/source/index-strategy/index-strategy.ts) | [`AllSubstringsIndexStrategy`](https://github.com/bvaughn/js-search/blob/master/source/index-strategy/all-substrings-index-strategy.ts) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `labelKey` | string | "label" | Option key containing the display text |
| `options` | array | [] | Array of options objects |
| `sanitizer` | [`ISanitizer`](https://github.com/bvaughn/js-search/blob/master/source/sanitizer/sanitizer.ts) | [`LowerCaseSanitizer`](https://github.com/bvaughn/js-search/blob/master/source/sanitizer/lower-case-sanitizer.ts) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `searchIndex` | [`ISearchIndex`](https://github.com/bvaughn/js-search/blob/master/source/search-index/search-index.ts) | [`UnorderedSearchIndex`](https://github.com/bvaughn/js-search/blob/master/source/search-index/unordered-search-index.ts) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `tokenizer` | [`ITokenizer`](https://github.com/bvaughn/js-search/blob/master/source/tokenizer/tokenizer.ts) | [`SimpleTokenizer`](https://github.com/bvaughn/js-search/blob/master/source/tokenizer/simple-tokenizer.ts) | See [js-search docs](https://github.com/bvaughn/js-search) |
| `valueKey` | string | "value" | Option key containing the value |
