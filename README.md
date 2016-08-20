# react-select-fast-filter-options
Fast `filterOptions` function for `react-select`;
optimized to quickly filter huge options lists.


## Getting started

Install `react-select-fast-filter-options` using npm.

```shell
npm install react-select-fast-filter-options --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
For example:

```js
// Make sure to import default styles.
// This only needs to be done once,
// Probably during your application's bootstrapping process.
import 'react-virtualized/styles.css'
import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'

// Then import the virtualized Select HOC
// This isn't required but it is suggested-
// This way large lists will also display quickly
// For more info see https://github.com/bvaughn/react-virtualized-select
import VirtualizedSelect from 'react-virtualized-select'

// Create a search index optimized to quickly filter options
// This is powered by js-search
// Configuration options available here: https://github.com/bvaughn/js-search
const filterOptions = createFilterOptions({ options })

// Render the windowed react-select (powered by react-virtualized)
// Wired up with the fast filter function
<VirtualizedSelect
  filterOptions={filterOptions}
  options={options}
  {...props}
/>
```
