import multiColumnSort from './index'
import unsorted from './data/unsorted.json'
import firstNameASCSorted from './data/firstNameASCSorted.json'
import firstNameDESCSorted from './data/firstNameDESCSorted.json'
import firstNameASCBalanceDESCSorted from './data/firstNameASCBalanceDESCSorted.json'
import firstNameDESCBalanceASCSorted from './data/firstNameDESCBalanceASCSorted.json'

interface Data {
  firstName: string
  lastName: string
  balance: string
}

describe('multiColumnSort', () => {
  const mapValues = (arr: Data[]) => arr.map(({ firstName }) => ({ firstName }))

  it('sorts by one column ASC', () => {
    expect(
      mapValues(multiColumnSort(unsorted, [['firstName', 'ASC']]))
    ).toEqual(mapValues(firstNameASCSorted))
  })

  it('sorts by one column DESC', () => {
    expect(
      mapValues(multiColumnSort(unsorted, [['firstName', 'DESC']]))
    ).toEqual(mapValues(firstNameDESCSorted))
  })

  describe('with getColumnValue', () => {
    const mapValues = (arr: Data[]) =>
      arr.map(({ firstName, balance }) => ({ firstName, balance }))

    const getColumnValue = (column: keyof Data, value: Data[keyof Data]) => {
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
            [
              ['firstName', 'DESC'],
              ['balance', 'ASC']
            ],
            getColumnValue
          )
        )
      ).toEqual(mapValues(firstNameDESCBalanceASCSorted))

      expect(
        mapValues(
          multiColumnSort(
            unsorted,
            [
              ['firstName', 'ASC'],
              ['balance', 'DESC']
            ],
            getColumnValue
          )
        )
      ).toEqual(mapValues(firstNameASCBalanceDESCSorted))
    })
  })
})
