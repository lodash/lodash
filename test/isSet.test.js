import assert from 'assert'
import lodashStable from 'lodash'
import { set, falsey, stubFalse, args, slice, symbol, weakSet, realm } from './utils.js'
import isSet from '../isSet.js'

describe('isSet', () => {
  it('should return `true` for sets', () => {
    if (Set) {
      assert.strictEqual(isSet(set), true)
    }
  })

  it('should return `false` for non-sets', () => {
    const expected = lodashStable.map(falsey, stubFalse)

    const actual = lodashStable.map(falsey, (value, index) => index ? isSet(value) : isSet())

    assert.deepStrictEqual(actual, expected)

    assert.strictEqual(isSet(args), false)
    assert.strictEqual(isSet([1, 2, 3]), false)
    assert.strictEqual(isSet(true), false)
    assert.strictEqual(isSet(new Date), false)
    assert.strictEqual(isSet(new Error), false)
    assert.strictEqual(isSet(_), false)
    assert.strictEqual(isSet(slice), false)
    assert.strictEqual(isSet({ 'a': 1 }), false)
    assert.strictEqual(isSet(1), false)
    assert.strictEqual(isSet(/x/), false)
    assert.strictEqual(isSet('a'), false)
    assert.strictEqual(isSet(symbol), false)
    assert.strictEqual(isSet(weakSet), false)
  })

  it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
    let values = [false, true],
      expected = lodashStable.map(values, stubFalse)

    const actual = lodashStable.map(values, (value) => isSet({ 'constructor': value }))

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with weak sets from another realm', () => {
    if (realm.set) {
      assert.strictEqual(isSet(realm.set), true)
    }
  })
})
