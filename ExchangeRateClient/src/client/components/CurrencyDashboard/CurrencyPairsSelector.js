import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styles from './styles/CurrencyPairsSelector.css'

export default class CurrencyPairsSelector extends Component {
  _refSelect = null

  state = {
    availableCurrencyPairs: [],
    selectedPair: null,
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    updateFilterValue: PropTypes.func,
    toggleFilter: PropTypes.func,
    isFilterEnabled: PropTypes.bool,
    filterValue: PropTypes.array,
  }

  componentDidMount () {
    this.parseAvailableCurrencyPairs()
  }

  componentWillReceiveProps () {
    setTimeout(
      this.parseAvailableCurrencyPairs,
      0,
    )
  }

  parseAvailableCurrencyPairs = () => {
    const {data, filterValue} = this.props

    const newPairs = Object.keys(data).filter((pairId) => (
      filterValue.indexOf(pairId) === -1
    ))

    this.setState({
      availableCurrencyPairs: newPairs,
    })
  }

  onSelectorChange = (event) => {
    this.setState({
      selectedPair: event.target.value,
    })
  }

  onSelectorAddBtnClick = () => {
    const {updateFilterValue, filterValue} = this.props
    updateFilterValue([...filterValue, this.state.selectedPair])
    this._refSelect.value = -1
  }

  onFilterToggle = () => {
    const {toggleFilter} = this.props

    toggleFilter()
  }

  renderSelector = () => {
    const {data} = this.props
    const {availableCurrencyPairs} = this.state

    return (
      <div>
        <select onChange={this.onSelectorChange} defaultValue={-1} ref={(ref) => this._refSelect = ref}>
          <option disabled value={-1}>Select a pair...</option>
          {availableCurrencyPairs.map((pairId, index) => (
            <option value={pairId} key={index}>
              {`${data[pairId][0].code} / ${data[pairId][1].code}`}
            </option>
          ))}
        </select>
        <button
            onClick={this.onSelectorAddBtnClick}
            className={styles.addBtn}
        >
          Add
        </button>
      </div>
    )
  }

  renderFilterToggle = () => {
    const {isFilterEnabled} = this.props

    return (
      <div className={styles.toggle}>
        <input
            type="checkbox"
            checked={isFilterEnabled}
            onChange={this.onFilterToggle}
            id="selector-filter-toggle"
            className={styles.checkboxInput}
        />
        <label
            htmlFor="selector-filter-toggle"
            className={styles.label}
        >
          Filter:&nbsp;
        </label>
      </div>
    )
  }

  render () {
    const {isFilterEnabled} = this.props

    return (
      <div className={styles.wrapper}>
        {this.renderFilterToggle()}
        {isFilterEnabled ? this.renderSelector() : <div>Enable filter to select options...</div>}
      </div>
    )
  }
}
