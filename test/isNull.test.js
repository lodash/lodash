import assert from 'assert'
import lodashStable from 'lodash'
import { falsey, args, slice, symbol, realm } from './utils.js'
import isNull from '../isNull.js'

describe('isNull', () => {
  it('should return `true` for `null` values', () => {
    assert.strictEqual(isNull(null), true)
  })

  it('should return `false` for non `null` values', () => {
    const expected = lodashStable.map(falsey, (value) => value === null)

    const actual = lodashStable.map(falsey, (value, index) => index ? isNull(value) : isNull())

    assert.deepStrictEqual(actual, expected)

    assert.strictEqual(isNull(args), false)
    assert.strictEqual(isNull([1, 2, 3]), false)
    assert.strictEqual(isNull(true), false)
    assert.strictEqual(isNull(new Date), false)
    assert.strictEqual(isNull(new Error), false)
    assert.strictEqual(isNull(_), false)
    assert.strictEqual(isNull(slice), false)
    assert.strictEqual(isNull({ 'a': 1 }), false)
    assert.strictEqual(isNull(1), false)
    assert.strictEqual(isNull(/x/), false)
    assert.strictEqual(isNull('a'), false)
    assert.strictEqual(isNull(symbol), false)
  })

  it('should work with nulls from another realm', () => {
    if (realm.object) {
      assert.strictEqual(isNull(realm.null), true)
    }
  })
})
