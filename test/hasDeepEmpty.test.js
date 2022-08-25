import assert from 'assert'

import { empties } from './utils.js'

import hasDeepEmpty from '../hasDeepEmpty'
import { describe, it } from 'mocha'
import { isArray, isEmpty, isNull } from 'lodash'

describe('hasDeepEmpty', () => {
  describe('Without `predicate`', () => {
    it('should works as `isEmpty` works on flat values', () => {
      for (const empty of empties) {
        assert.strictEqual(hasDeepEmpty(empty), isEmpty(empty))
      }
    })

    it('should return `true` for empty values in nested object', () => {
      const object = { a: { b: {} } }
      assert.strictEqual(hasDeepEmpty(object), true)
    })

    it('should return `false` for non-empty values in nested object', () => {
      const object = { a: { b: { c: 'text' }, d: ['a', 'b'] } }
      assert.strictEqual(hasDeepEmpty(object), false)
    })

    it('should return `false` for numeric values in nested object', () => {
      const object = { a: { b: { c: 1 }, d: [2, 3] } }
      assert.strictEqual(hasDeepEmpty(object), false)
    })
  })

  describe('With `predicate`', () => {
    it('should return `false` for null values in nested levels', () => {
      const object = { a: { b: { c: null }, d: [2, null] } }
      const result=hasDeepEmpty(object, (value) => !isNull(value))

      assert.strictEqual(result, false)
    })

    it('should return `false` if `value` is `null` and `parent` is an `array`', () => {
      const object = { a: [null, 1] }
      const result = hasDeepEmpty(object, (value, key, parent) => {
        if (isArray(parent) && isNull(value)) {return false}
        return true
      })

      assert.strictEqual(result, false)
    })

    it('should return `false` if `key` is not required', () => {
      const object = { fn: '', ln: null, phone: '9' }
      const requiredKeys = ['phone']

      const result = hasDeepEmpty(object, (value, key) => requiredKeys.includes(key))
      assert.strictEqual(result, false)
    })
  })
})
