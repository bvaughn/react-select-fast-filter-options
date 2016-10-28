import {
  AllSubstringsIndexStrategy,
  Search,
  UnorderedSearchIndex
} from 'js-search'

export default function createFilterOptions ({
  indexes,
  indexStrategy,
  labelKey = 'label',
  options = [],
  sanitizer,
  searchIndex,
  tokenizer,
  valueKey = 'value'
}) {
  const search = new Search(valueKey)
  search.searchIndex = searchIndex || new UnorderedSearchIndex()
  search.indexStrategy = indexStrategy || new AllSubstringsIndexStrategy()

  if (sanitizer) {
    search.sanitizer = sanitizer
  }

  if (tokenizer) {
    search.tokenizer = tokenizer
  }

  if (indexes) {
    indexes.forEach((index) => {
      search.addIndex(index)
    })
  } else {
    search.addIndex(labelKey)
  }

  search.addDocuments(options)

  // See https://github.com/JedWatson/react-select/blob/e19bce383a8fd1694278de47b6d00a608ea99f2d/src/Select.js#L830
  // See https://github.com/JedWatson/react-select#advanced-filters
return function filterOptions (options, filter, selectedOptions) {
    const filtered = filter
      ? search.search(filter)
      : options

    if (
      Array.isArray(selectedOptions) &&
      selectedOptions.length
    ) {
      const selectedValues = selectedOptions.map((option) => option[valueKey])

      return filtered.filter(
        (option) => !selectedValues.includes(option[valueKey])
      )
    }

    return filtered
  }
}
