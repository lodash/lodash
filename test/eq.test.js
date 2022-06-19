import assert from 'assert'
import eq from '../eq.js'

describe('eq', () => {
  describe('when types are different', () => {
    it('should return false to number and boolean', () => {
      assert.strictEqual(eq(0, false), false)
    })

    it('should return false to null and undefined', () => {
      assert.strictEqual(eq(null, undefined), false)
    })

    it('should return false to number and object', () => {
      assert.strictEqual(eq(1, Object(1)), false)
    })

    it('should return false to number and string', () => {
      assert.strictEqual(eq(1, '1'), false)
    })

    it('should return false to string and symbol', () => {
      assert.strictEqual(eq(Symbol('abc'), 'abc'), false)
    })
  })

  describe('when type is undefined', () => {
    it('should return true for both undefined', () => {
      assert.strictEqual(eq(undefined, undefined), true)
    })
  })

  describe('when type is null', () => {
    it('should return true for both null', () => {
      assert.strictEqual(eq(null, null), true)
    })
  })

  describe('when type is number', () => {
    it('should return true for both +0', () => {
      assert.strictEqual(eq(+0, +0), true)
    })

    it('should return true for +0 and -0', () => {
      assert.strictEqual(eq(+0, -0), true)
    })

    it('should return true for -0 and +0', () => {
      assert.strictEqual(eq(-0, +0), true)
    })

    it('should return true for both -0', () => {
      assert.strictEqual(eq(-0, -0), true)
    })

    it('should return true for both NaN', () => {
      assert.strictEqual(eq(NaN, NaN), true)
    })

    it('should return false for NaN and non NaN', () => {
      assert.strictEqual(eq(NaN, 0), false)
    })

    it('should return false for non NaN and NaN', () => {
      assert.strictEqual(eq(-0, NaN), false)
    })

    it('should return false different ordinary numbers', () => {
      assert.strictEqual(eq(2, -2), false)
    })

    it('should return true for the same ordinary number', () => {
      assert.strictEqual(eq(1.0, 1.0), true)
    })
  })

  describe('when type is string', () => {
    it('should return true for strings equal element-wise', () => {
      assert.strictEqual(eq('abcd', 'abcd'), true)
    })

    it('should return false for strings with char mismatch', () => {
      assert.strictEqual(eq('abcd', 'aacd'), false)
    })
  })

  describe('when type is boolean', () => {
    it('should return true for both true', () => {
      assert.strictEqual(eq(true, true), true)
    })

    it('should return false for true and false', () => {
      assert.strictEqual(eq(true, false), false)
    })

    it('should return false for false and true', () => {
      assert.strictEqual(eq(false, true), false)
    })

    it('should return true for both false', () => {
      assert.strictEqual(eq(false, false), true)
    })
  })

  describe('when type is symbol', () => {
    it('should return true for the same Symbol instance', () => {
      const symbol = Symbol('sym')
      assert.strictEqual(eq(symbol, symbol), true)
    })

    it('should return false for different Symbol instance', () => {
      assert.strictEqual(eq(Symbol('sym'), Symbol('sym')), false)
    })
  })

  describe('when type is object', () => {
    it('should return true for the same instance', () => {
      const object = { 'a': 1 }
      assert.strictEqual(eq(object, object), true)
    })

    it('should return false for different instances', () => {
      assert.strictEqual(eq({ 'a': 1 }, { 'a': 1 }), false)
    })
  })
})
