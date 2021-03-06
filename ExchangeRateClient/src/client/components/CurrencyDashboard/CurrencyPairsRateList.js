import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles/CurrencyPairsRateList.css'

const CurrencyPairsRateList = ({
  data,
  rates,
  filterValue,
  isFilterEnabled,
  updateFilterValue,
}) => {
  function generateClickHandler (pairId) {
    return function handleDeleteBtnClick () {
      const newFilterValue = filterValue.filter((currentPairId) => pairId !== currentPairId)
      updateFilterValue(newFilterValue)
    }
  }

  const currencyPairs = Object.keys(data)
    .filter((pairId) => (
      isFilterEnabled ? filterValue.indexOf(pairId) !== -1 : true
    ))
    .map((pairId, index) => {
      const thisData = data[pairId]
      const {value, previousValue} = rates !== null && rates[pairId]
      const valueDifference = rates !== null && ((value - previousValue) || 0)

      return (
        <div key={index} className={styles.pair}>
          <div className={styles.pairCodes}>
            <span title={thisData[0].name}>
              {thisData[0].code}
            </span>
            &nbsp;/&nbsp;
            <span title={thisData[1].name}>
              {thisData[1].code}
            </span>
          </div>
          {rates !== null && (
            <div className={styles.pairDifference}>
              {valueDifference !== 0 && (
                <span>{valueDifference > 0 ? '+' : '-'}&nbsp;</span>
              )}
              <span>{value}</span>
            </div>
          )}
          {isFilterEnabled && (
            <div>
              <button
                  onClick={generateClickHandler(pairId)}
                  className={styles.pairDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )
    })

  return (
    <div className={styles.rates}>
      {currencyPairs}
    </div>
  )
}

CurrencyPairsRateList.propTypes = {
  data: PropTypes.object.isRequired,
  rates: PropTypes.object,
  filterValue: PropTypes.array,
  updateFilterValue: PropTypes.func,
}

export default CurrencyPairsRateList
