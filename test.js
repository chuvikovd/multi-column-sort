import multiColumnSort from './index.js'
import unsorted from './data/unsorted.json'
import firstNameASCSorted from './data/firstNameASCSorted.json'
import firstNameDESCSorted from './data/firstNameDESCSorted.json'
import firstNameASCBalanceDESCSorted from './data/firstNameASCBalanceDESCSorted.json'
import firstNameDESCBalanceASCSorted from './data/firstNameDESCBalanceASCSorted.json'

describe('multiColumnSort', () => {
  it('sorts by one column ASC', () => {
    expect(multiColumnSort(unsorted, ['firstName-asc'])).toEqual(
      firstNameASCSorted
    )
  })

  it('sorts by one column DESC', () => {
    expect(multiColumnSort(unsorted, ['firstName-desc'])).toEqual(
      firstNameDESCSorted
    )
  })

  describe('with getColumnValue', () => {
    const getColumnValue = (column, value) => {
      switch (column) {
        case 'balance':
          return parseFloat(value.replace(/\,|\$/g, ''))
        default:
          return value
      }
    }

    it('sorts by multiple columns', () => {
      expect(
        multiColumnSort(
          unsorted,
          ['firstName-desc', 'balance-asc'],
          getColumnValue
        )
      ).toEqual(firstNameDESCBalanceASCSorted)

      expect(
        multiColumnSort(
          unsorted,
          ['firstName-asc', 'balance-desc'],
          getColumnValue
        )
      ).toEqual(firstNameASCBalanceDESCSorted)
    })
  })
})
