import assert from 'assert'
import lodashStable from 'lodash'
import { falsey } from './utils.js'
import defaultTo from '../defaultTo.js'

describe('defaultTo', () => {
  it('should return a default value if `value` is `NaN` or nullish', () => {
    const expected = lodashStable.map(falsey, (value) => (value == null || value !== value) ? 1 : value)

    const actual = lodashStable.map(falsey, (value) => defaultTo(value, 1))

    assert.deepStrictEqual(actual, expected)
  })
})
