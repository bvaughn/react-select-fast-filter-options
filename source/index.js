import { Search, UnorderedSearchIndex } from 'js-search'

export default function createFilterOptions ({
  labelKey = 'label',
  options = [],
  valueKey = 'value'
}) {
  const search = new Search(valueKey)
  search.searchIndex = new UnorderedSearchIndex()
  search.addIndex(labelKey)
  search.addDocuments(options)

  // See https://github.com/JedWatson/react-select/blob/e19bce383a8fd1694278de47b6d00a608ea99f2d/src/Select.js#L830
  // See https://github.com/JedWatson/react-select#advanced-filters
  return function filterOptions (options, filter) {
    return filter
      ? search.search(filter) // .sort((a, b) => a[labelKey].localeCompare(b[labelKey]))
      : options
  }
}
