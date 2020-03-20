const sort = (a, b, columns, getColumnValue) => {
  const [item, ...others] = columns
  const [column, orderBy] = item.split('-')
  const valueA = getColumnValue ? getColumnValue(column, a[column]) : a[column]
  const valueB = getColumnValue ? getColumnValue(column, b[column]) : b[column]

  if (orderBy === 'asc') {
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

const multiColumnSort = (arr, sortArr, getColumnValue) =>
  [...arr].sort((a, b) => sort(a, b, sortArr, getColumnValue))

module.exports = multiColumnSort
