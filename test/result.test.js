import assert from 'assert'
import lodashStable from 'lodash'
import { stubB } from './utils.js'
import result from '../result.js'

describe('result', () => {
  const object = { 'a': 1, 'b': stubB }

  it('should invoke function values', () => {
    assert.strictEqual(result(object, 'b'), 'b')
  })

  it('should invoke default function values', () => {
    const actual = result(object, 'c', object.b)
    assert.strictEqual(actual, 'b')
  })

  it('should invoke nested function values', () => {
    const value = { 'a': lodashStable.constant({ 'b': stubB }) }

    lodashStable.each(['a.b', ['a', 'b']], (path) => {
      assert.strictEqual(result(value, path), 'b')
    })
  })

  it('should invoke deep property methods with the correct `this` binding', () => {
    const value = { 'a': { 'b': function() { return this.c }, 'c': 1 } }

    lodashStable.each(['a.b', ['a', 'b']], (path) => {
      assert.strictEqual(result(value, path), 1)
    })
  })
})
