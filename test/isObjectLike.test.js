import assert from 'assert'
import lodashStable from 'lodash'
import { args, falsey, slice, symbol, stubFalse, realm } from './utils.js'
import isObjectLike from '../isObjectLike.js'

describe('isObjectLike', () => {
  it('should return `true` for objects', () => {
    assert.strictEqual(isObjectLike(args), true)
    assert.strictEqual(isObjectLike([1, 2, 3]), true)
    assert.strictEqual(isObjectLike(Object(false)), true)
    assert.strictEqual(isObjectLike(new Date), true)
    assert.strictEqual(isObjectLike(new Error), true)
    assert.strictEqual(isObjectLike({ 'a': 1 }), true)
    assert.strictEqual(isObjectLike(Object(0)), true)
    assert.strictEqual(isObjectLike(/x/), true)
    assert.strictEqual(isObjectLike(Object('a')), true)
  })

  it('should return `false` for non-objects', () => {
    let values = falsey.concat(true, _, slice, 1, 'a', symbol),
      expected = lodashStable.map(values, stubFalse)

    const actual = lodashStable.map(values, (value, index) => index ? isObjectLike(value) : isObjectLike())

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with objects from another realm', () => {
    if (realm.object) {
      assert.strictEqual(isObjectLike(realm.boolean), true)
      assert.strictEqual(isObjectLike(realm.date), true)
      assert.strictEqual(isObjectLike(realm.number), true)
      assert.strictEqual(isObjectLike(realm.object), true)
      assert.strictEqual(isObjectLike(realm.regexp), true)
      assert.strictEqual(isObjectLike(realm.string), true)
    }
  })
})
