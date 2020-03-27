type SortArray<T> = [keyof T, 'ASC' | 'DESC'][]
type GetColumnValue<T> = (column: keyof T, value: T[keyof T]) => any

const sort = <T>(
  a: T,
  b: T,
  columns: SortArray<T>,
  getColumnValue?: GetColumnValue<T>
): -1 | 0 | 1 => {
  const [item, ...others] = columns
  const [column, orderBy] = item
  const valueA = getColumnValue ? getColumnValue(column, a[column]) : a[column]
  const valueB = getColumnValue ? getColumnValue(column, b[column]) : b[column]

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

const multiColumnSort = <T>(
  arr: T[],
  sortArr: [keyof T, 'ASC' | 'DESC'][],
  getColumnValue?: GetColumnValue<T>
): T[] => [...arr].sort((a, b) => sort(a, b, sortArr, getColumnValue))

export default multiColumnSort
