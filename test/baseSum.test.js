import assert from 'assert'
import baseSum from '../.internal/baseSum.js'
import { identity } from './utils.js'

describe('baseSum', () => {
  it('should return 0 for an empty array', () => {
    const actual = baseSum([], identity)
    assert.strictEqual(actual, 0)
  })
  it('should coerce the iteratee return value to a number', () => {
    const actual = baseSum([true], (i) => i === true)
    assert.strictEqual(actual, 1)
  })
  it('should not sum the iteratee return value of undefined or null', () => {
    const actual = baseSum([, null], identity)
    assert.strictEqual(actual, 0)
  })
  it('should return the sum of numbers when provided as strings', () => {
    const actual = baseSum(['-1', '0', '1', '2', '3'], identity)
    assert.strictEqual(actual, 5)
  })
  it('should return the sum of numbers', () => {
    const actual = baseSum([-1, 0, 1, 2, 3], identity)
    assert.strictEqual(actual, 5)
  })
  it('should return NaN when unable to coerce the iteratee return value to a number', () => {
    const actual = baseSum([{}], identity)
    assert.strictEqual(isNaN(actual), true)
  })
})
