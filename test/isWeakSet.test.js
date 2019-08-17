import assert from 'assert'
import lodashStable from 'lodash'
import { weakSet, falsey, stubFalse, args, slice, set, symbol, realm } from './utils.js'
import isWeakSet from '../isWeakSet.js'

describe('isWeakSet', () => {
  it('should return `true` for weak sets', () => {
    if (WeakSet) {
      assert.strictEqual(isWeakSet(weakSet), true)
    }
  })

  it('should return `false` for non weak sets', () => {
    const expected = lodashStable.map(falsey, stubFalse)

    const actual = lodashStable.map(falsey, (value, index) => index ? isWeakSet(value) : isWeakSet())

    assert.deepStrictEqual(actual, expected)

    assert.strictEqual(isWeakSet(args), false)
    assert.strictEqual(isWeakSet([1, 2, 3]), false)
    assert.strictEqual(isWeakSet(true), false)
    assert.strictEqual(isWeakSet(new Date), false)
    assert.strictEqual(isWeakSet(new Error), false)
    assert.strictEqual(isWeakSet(_), false)
    assert.strictEqual(isWeakSet(slice), false)
    assert.strictEqual(isWeakSet({ 'a': 1 }), false)
    assert.strictEqual(isWeakSet(1), false)
    assert.strictEqual(isWeakSet(/x/), false)
    assert.strictEqual(isWeakSet('a'), false)
    assert.strictEqual(isWeakSet(set), false)
    assert.strictEqual(isWeakSet(symbol), false)
  })

  it('should work with weak sets from another realm', () => {
    if (realm.weakSet) {
      assert.strictEqual(isWeakSet(realm.weakSet), true)
    }
  })
})
