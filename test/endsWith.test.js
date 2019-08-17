import assert from 'assert'
import lodashStable from 'lodash'
import { MAX_SAFE_INTEGER, falsey, stubTrue } from './utils.js'
import endsWith from '../endsWith.js'

describe('endsWith', () => {
  const string = 'abc'

  it('should return `true` if a string ends with `target`', () => {
    assert.strictEqual(endsWith(string, 'c'), true)
  })

  it('should return `false` if a string does not end with `target`', () => {
    assert.strictEqual(endsWith(string, 'b'), false)
  })

  it('should work with a `position`', () => {
    assert.strictEqual(endsWith(string, 'b', 2), true)
  })

  it('should work with `position` >= `length`', () => {
    lodashStable.each([3, 5, MAX_SAFE_INTEGER, Infinity], (position) => {
      assert.strictEqual(endsWith(string, 'c', position), true)
    })
  })

  it('should treat falsey `position` values, except `undefined`, as `0`', () => {
    const expected = lodashStable.map(falsey, stubTrue)

    const actual = lodashStable.map(falsey, (position) => endsWith(string, position === undefined ? 'c' : '', position))

    assert.deepStrictEqual(actual, expected)
  })

  it('should treat a negative `position` as `0`', () => {
    lodashStable.each([-1, -3, -Infinity], (position) => {
      assert.ok(lodashStable.every(string, (chr) => !endsWith(string, chr, position)))
      assert.strictEqual(endsWith(string, '', position), true)
    })
  })

  it('should coerce `position` to an integer', () => {
    assert.strictEqual(endsWith(string, 'ab', 2.2), true)
  })
})
