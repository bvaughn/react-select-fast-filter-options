import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import VirtualizedSelect from 'react-virtualized-select'
import createFilterOptions from '../index'

const STRINGS = ['foo', 'bar', 'baz', 'qux']

const NUM_OPTIONS = 1e4
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
        <header className='header'>
          <div className='header__title'>react-select-fast-filter-options</div>
          <div className='header_tagline'>
            Filter function for react-select; optimized to quickly filter large options arrays.
          </div>
          <a
            className='header__button'
            href='https://github.com/bvaughn/react-select-fast-filter-options'
          >
            View on Github
            <img
              className='header__button__image'
              src='https://cloud.githubusercontent.com/assets/29597/17832108/056d6e2a-66b0-11e6-8bcb-06f195d888b2.png'
              width='32'
              height='32'
            />
          </a>
        </header>
        <div className='container'>
          <section className='section'>
            <div className='section__header'>With Fast Filter</div>
            <p>
              This drop-down uses react-select-fast-filter-options to filter 10,000 options.
              It should be very fast.
            </p>
            <VirtualizedSelect
              filterOptions={filterOptions}
              options={options}
              onChange={(value1) => this.setState({ value1 })}
              value={this.state.value1}
            />
          </section>
          <section className='section'>
            <div className='section__header'>Default Filter Function</div>
            <p>
              This drop-down uses the default react-select filter function.
              It will lock your browser for a bit
            </p>
            <VirtualizedSelect
              options={options}
              onChange={(value2) => this.setState({ value2 })}
              value={this.state.value2}
            />
          </section>
        </div>
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
