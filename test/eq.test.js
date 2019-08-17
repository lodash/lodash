import assert from 'assert'
import eq from '../eq.js'

describe('eq', () => {
  it('should perform a `SameValueZero` comparison of two values', () => {
    assert.strictEqual(eq(), true)
    assert.strictEqual(eq(undefined), true)
    assert.strictEqual(eq(0, -0), true)
    assert.strictEqual(eq(NaN, NaN), true)
    assert.strictEqual(eq(1, 1), true)

    assert.strictEqual(eq(null, undefined), false)
    assert.strictEqual(eq(1, Object(1)), false)
    assert.strictEqual(eq(1, '1'), false)
    assert.strictEqual(eq(1, '1'), false)

    const object = { 'a': 1 }
    assert.strictEqual(eq(object, object), true)
    assert.strictEqual(eq(object, { 'a': 1 }), false)
  })
})
