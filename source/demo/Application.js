import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import VirtualizedSelect from 'react-virtualized-select'
import createFilterOptions from '../index'

const STRINGS = ['foo', 'bar', 'baz', 'qux']

const NUM_OPTIONS = 1e5
const options = Array
  .from(Array(NUM_OPTIONS))
  .map((_, index) => ({
    label: `${index}: ${STRINGS[Math.floor(Math.random() * STRINGS.length)]}`,
    value: index
  }))

const filterOptions = createFilterOptions({ options })

class Application extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {}
  }

  render () {
    return (
      <div>
        <div>
          Total options: {options.length}
        </div>
        <h2>With fast-filter</h2>
        <p>
          This is <code>react-select-fast-filter-options</code>.
          It should be very fast.
        </p>
        <VirtualizedSelect
          filterOptions={filterOptions}
          options={options}
          onChange={(selectValue) => this.setState({ selectValue })}
          value={this.state.selectValue}
        />
        <h2>Without fast-filter</h2>
        <p>
          This is the default <code>filterOptions</code> function.
          It will lock your browser for a bit
        </p>
        <VirtualizedSelect
          options={options}
          onChange={(selectValue) => this.setState({ selectValue })}
          value={this.state.selectValue}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
)

// Import and attach the favicon
document.querySelector('[rel="shortcut icon"]').href = require('file!./favicon.png')
