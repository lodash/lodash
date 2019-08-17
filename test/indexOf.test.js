import assert from 'assert'
import lodashStable from 'lodash'
import { stubZero, falsey } from './utils.js'
import indexOf from '../indexOf.js'

describe('indexOf', () => {
  const array = [1, 2, 3, 1, 2, 3]

  it('`_.indexOf` should return the index of the first matched value', () => {
    assert.strictEqual(indexOf(array, 3), 2)
  })

  it('`_.indexOf` should work with a positive `fromIndex`', () => {
    assert.strictEqual(indexOf(array, 1, 2), 3)
  })

  it('`_.indexOf` should work with a `fromIndex` >= `length`', () => {
    let values = [6, 8, Math.pow(2, 32), Infinity],
      expected = lodashStable.map(values, lodashStable.constant([-1, -1, -1]))

    const actual = lodashStable.map(values, (fromIndex) => [
      indexOf(array, undefined, fromIndex),
      indexOf(array, 1, fromIndex),
      indexOf(array, '', fromIndex)
    ])

    assert.deepStrictEqual(actual, expected)
  })

  it('`_.indexOf` should work with a negative `fromIndex`', () => {
    assert.strictEqual(indexOf(array, 2, -3), 4)
  })

  it('`_.indexOf` should work with a negative `fromIndex` <= `-length`', () => {
    let values = [-6, -8, -Infinity],
      expected = lodashStable.map(values, stubZero)

    const actual = lodashStable.map(values, (fromIndex) => indexOf(array, 1, fromIndex))

    assert.deepStrictEqual(actual, expected)
  })

  it('`_.indexOf` should treat falsey `fromIndex` values as `0`', () => {
    const expected = lodashStable.map(falsey, stubZero)

    const actual = lodashStable.map(falsey, (fromIndex) => indexOf(array, 1, fromIndex))

    assert.deepStrictEqual(actual, expected)
  })

  it('`_.indexOf` should coerce `fromIndex` to an integer', () => {
    assert.strictEqual(indexOf(array, 2, 1.2), 1)
  })
})
