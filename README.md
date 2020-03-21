# multi-column-sort

Tiny, zero-dependency multi column sorting helper.

[![npm](https://img.shields.io/npm/v/multi-column-sort?style=flat-square)](https://www.npmjs.com/package/multi-column-sort)
[![CircleCI](https://img.shields.io/circleci/build/github/chuvikovd/multi-column-sort?style=flat-square)](https://circleci.com/gh/chuvikovd/multi-column-sort)
[![GitHub file size in bytes](https://img.shields.io/github/size/chuvikovd/multi-column-sort/index.js?style=flat-square)](https://github.com/chuvikovd/multi-column-sort/blob/master/index.js)
[![GitHub](https://img.shields.io/github/license/chuvikovd/multi-column-sort?style=flat-square)](https://github.com/chuvikovd/multi-column-sort/blob/master/LICENSE)

## Installation

With [npm](https://www.npmjs.com):

```sh
$ npm i multi-column-sort
```

or with [yarn](https://yarnpkg.com):

```sh
$ yarn add multi-column-sort
```

## Usage

```javascript
import multiColumnSort from 'multi-column-sort'

const data = [
  { firstName: 'Richards', lastName: 'Shepard', balance: '$2,657.70' },
  { firstName: 'Bessie', lastName: 'Henry', balance: '$3,202.83' },
  { firstName: 'Richards', lastName: 'Hammond', balance: '$3,441.19' },
  { firstName: 'Allison', lastName: 'Church', balance: '$1,616.60' },
  { firstName: 'Bennett', lastName: 'Ferrell', balance: '$1,165.54' }
]

const getColumnValue = (column, value) => {
  switch (column) {
    case 'balance':
      return parseFloat(value.replace(/\,|\$/g, ''))
    default:
      return value
  }
}

const sorted = multiColumnSort(
  data,
  ['firstName-asc', 'balance-desc'],
  getColumnValue
)

/* sorted: [
  { firstName: 'Allison', lastName: 'Church', balance: '$1,616.60' },
  { firstName: 'Bennett', lastName: 'Ferrell', balance: '$1,165.54' },
  { firstName: 'Bessie', lastName: 'Henry', balance: '$3,202.83' },
  { firstName: 'Richards', lastName: 'Hammond', balance: '$3,441.19' },
  { firstName: 'Richards', lastName: 'Shepard', balance: '$2,657.70' }
] */
```

## API

```javascript
multiColumnSort(array, sortArray, getColumnValue)
```

**Parameters**

- `array` **array** Array of objects to be sorted.
- `sortArray` **array** Array of strings defining columns to be sorted by, order and direction e.g. `['name-asc', 'city-desc']`.
- `getColumnValue` **function** Optional, by default all values are cast to string. Takes `column` and `value` arguments, must return value for comparison.
