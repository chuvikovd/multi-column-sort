import multiColumnSort from './index.js'
import unsorted from './data/unsorted.json'
import firstNameASCSorted from './data/firstNameASCSorted.json'
import firstNameDESCSorted from './data/firstNameDESCSorted.json'
import firstNameASCBalanceDESCSorted from './data/firstNameASCBalanceDESCSorted.json'
import firstNameDESCBalanceASCSorted from './data/firstNameDESCBalanceASCSorted.json'

describe('multiColumnSort', () => {
  const mapValues = arr => arr.map(({ firstName }) => ({ firstName }))

  it('sorts by one column ASC', () => {
    expect(mapValues(multiColumnSort(unsorted, ['firstName-asc']))).toEqual(
      mapValues(firstNameASCSorted)
    )
  })

  it('sorts by one column DESC', () => {
    expect(mapValues(multiColumnSort(unsorted, ['firstName-desc']))).toEqual(
      mapValues(firstNameDESCSorted)
    )
  })

  describe('with getColumnValue', () => {
    const mapValues = arr =>
      arr.map(({ firstName, balance }) => ({ firstName, balance }))

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
        mapValues(
          multiColumnSort(
            unsorted,
            ['firstName-desc', 'balance-asc'],
            getColumnValue
          )
        )
      ).toEqual(mapValues(firstNameDESCBalanceASCSorted))

      expect(
        mapValues(
          multiColumnSort(
            unsorted,
            ['firstName-asc', 'balance-desc'],
            getColumnValue
          )
        )
      ).toEqual(mapValues(firstNameASCBalanceDESCSorted))
    })
  })
})
