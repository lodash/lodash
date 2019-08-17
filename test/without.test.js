import assert from 'assert'
import without from '../without.js'

describe('without', () => {
  it('should return the difference of values', () => {
    const actual = without([2, 1, 2, 3], 1, 2)
    assert.deepStrictEqual(actual, [3])
  })

  it('should use strict equality to determine the values to reject', () => {
    const object1 = { 'a': 1 },
      object2 = { 'b': 2 },
      array = [object1, object2]

    assert.deepStrictEqual(without(array, { 'a': 1 }), array)
    assert.deepStrictEqual(without(array, object1), [object2])
  })

  it('should remove all occurrences of each value from an array', () => {
    const array = [1, 2, 3, 1, 2, 3]
    assert.deepStrictEqual(without(array, 1, 2), [3, 3])
  })
})
