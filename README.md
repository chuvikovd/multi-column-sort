# multi-column-sort

Tiny, zero-dependency multi column sorting helper.

[![npm](https://img.shields.io/npm/v/multi-column-sort?style=flat-square)](https://www.npmjs.com/package/multi-column-sort)
[![CircleCI](https://img.shields.io/circleci/build/github/chuvikovd/multi-column-sort?style=flat-square)](https://circleci.com/gh/chuvikovd/multi-column-sort)
[![Codecov](https://img.shields.io/codecov/c/github/chuvikovd/multi-column-sort?style=flat-square)](https://codecov.io/gh/chuvikovd/multi-column-sort)
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

```typescript
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
  [
    ['firstName', 'ASC'],
    ['balance', 'DESC']
  ],
  getColumnValue
)

/* Or: */

const sorted = multiColumnSort(
  data,
  {
    firstName: 'ASC',
    balance: 'DESC'
  },
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
multiColumnSort(array, sortArrayOrObject, getColumnValue)
```

**Parameters**

- `array` **array** Array of objects to be sorted.
- `sortArrayOrObject` **array** or **object** Array of tuples or object defining columns to be sorted by, order and direction e.g. `[['name', 'ASC'], ['city', 'DESC']]` or `{ name: 'ASC', city: 'DESC' }`.
- `getColumnValue` **function** Optional, by default all values are cast to string. Takes `column` and `value` arguments, must return value for comparison.
