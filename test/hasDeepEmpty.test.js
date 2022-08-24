import assert from 'assert'

import { empties } from './utils.js'

import hasDeepEmpty from '../hasDeepEmpty'
import { describe, it } from 'mocha'
import { isEmpty } from 'lodash'

describe('hasDeepEmpty', () => {
  it('should works as `isEmpty` works on flat values', () => {
    for (const empty of empties) {
      assert.strictEqual(hasDeepEmpty(empty), isEmpty(empty))
    }
  })

  it('should return `true` for empty values in nested object', () => {
    const value = { a: { b: {} } }
    assert.strictEqual(hasDeepEmpty(value), true)
  })

  it('should return `false` for non-empty values in nested object', () => {
    const value = { a: { b: { c: 'text' }, d: ['a', 'b'] } }
    assert.strictEqual(hasDeepEmpty(value), false)
  })

  it('should return `false` for numeric values in nested object', () => {
    const value = { a: { b: { c: 1 }, d: [2, 3] } }
    assert.strictEqual(hasDeepEmpty(value), false)
  })
})
