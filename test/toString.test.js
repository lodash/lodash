import assert from 'assert'
import lodashStable from 'lodash'
import { stubString, symbol } from './utils.js'
import toString from '../toString.js'

describe('toString', () => {
  it('should treat nullish values as empty strings', () => {
    const values = [, null, undefined],
      expected = lodashStable.map(values, stubString)

    const actual = lodashStable.map(values, (value, index) => index ? toString(value) : toString())

    assert.deepStrictEqual(actual, expected)
  })

  it('should preserve the sign of `0`', () => {
    const values = [-0, Object(-0), 0, Object(0)],
      expected = ['-0', '-0', '0', '0'],
      actual = lodashStable.map(values, toString)

    assert.deepStrictEqual(actual, expected)
  })

  it('should preserve the sign of `0` in an array', () => {
    const values = [-0, Object(-0), 0, Object(0)]
    assert.deepStrictEqual(toString(values), '-0,-0,0,0')
  })

  it('should handle symbols', function() {
    assert.strictEqual(toString(symbol), 'Symbol(a)');
  });

  it('should handle an array of symbols', function() {
    assert.strictEqual(toString([symbol]), 'Symbol(a)');
  });

  it('should return the `toString` result of the wrapped value', () => {
    const wrapped = _([1, 2, 3])
    assert.strictEqual(wrapped.toString(), '1,2,3')
  })
})
