export type Direction = 'ASC' | 'DESC'
export type SortArray<T> = [keyof T, Direction][]
export type SortObject<T> = { [key in keyof T]?: Direction }
export type GetColumnValue<T> = (column: keyof T, value: T[keyof T], row: T) => any

const sort = <T>(
  a: T,
  b: T,
  columns: SortArray<T>,
  getColumnValue?: GetColumnValue<T>
): -1 | 0 | 1 => {
  const [item, ...others] = columns
  const [column, orderBy] = item
  const valueA = getColumnValue ? getColumnValue(column, a[column], a) : a[column]
  const valueB = getColumnValue ? getColumnValue(column, b[column], b) : b[column]

  if (orderBy === 'ASC') {
    if (valueA > valueB) return 1
    if (valueA < valueB) return -1
    if (others.length) return sort(a, b, others, getColumnValue)
    return 0
  } else {
    if (valueB > valueA) return 1
    if (valueB < valueA) return -1
    if (others.length) return sort(a, b, others, getColumnValue)
    return 0
  }
}

const sortObjectToArray = <T>(object: SortObject<T>): SortArray<T> =>
  Object.keys(object).reduce(
    (arr, column) =>
      [...arr, [column, object[column as keyof T]]] as SortArray<T>,
    [] as SortArray<T>
  )

const multiColumnSort = <T>(
  arr: T[],
  sortArrOrObject: SortArray<T> | SortObject<T>,
  getColumnValue?: GetColumnValue<T>
): T[] =>
  [...arr].sort((a, b) =>
    sort(
      a,
      b,
      Array.isArray(sortArrOrObject)
        ? sortArrOrObject
        : sortObjectToArray(sortArrOrObject),
      getColumnValue
    )
  )

export default multiColumnSort
