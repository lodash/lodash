import move from '../move.js'
import assert from 'assert'

describe('move', () => {
  it('should move first item to the end of the array', () => {
    const array = [1, 2, 3]
    assert.deepStrictEqual(move(array, 0, 2), [2, 3, 1])
  })
  it('should move last item to the beginning of the array', () => {
    const array = [1, 2, 3]
    assert.deepStrictEqual(move(array, 2, 0), [3, 1, 2])
  })
  it('should move an item to various positions', () => {
    const array = [1, 2, 3, 4, 5]
    assert.deepStrictEqual(move(array.slice(), 0, 2), [2, 3, 1, 4, 5])
    assert.deepStrictEqual(move(array.slice(), 1, 3), [1, 3, 4, 2, 5])
    assert.deepStrictEqual(move(array.slice(), 2, 4), [1, 2, 4, 5, 3])
    assert.deepStrictEqual(move(array.slice(), 3, 1), [1, 4, 2, 3, 5])
  })
  it('should not modify the array if the `oldIndex` is out of bounds', () => {
    const array = [1, 2, 3]
    assert.deepStrictEqual(move(array, 4, 1), [1, 2, 3])
  })
  it('should not modify the array if the `oldIndex` is the same as `newIndex`', () => {
    const array = [1, 2, 3]
    assert.deepStrictEqual(move(array, 1, 1), [1, 2, 3])
  })
  it('should cap the `newIndex` to `array.length - 1` when higher', () => {
    const array = [1, 2, 3]
    assert.deepStrictEqual(move(array, 0, 9), [2, 3, 1])
  })
  it('should cap the `newIndex` to `0` when lower', () => {
    const array = [1, 2, 3]
    assert.deepStrictEqual(move(array, 2, -1), [3, 1, 2])
  })
  it('should work with empty arrays', () => {
    assert.deepStrictEqual(move([], 0, 1), [])
  })
  it('should return the same array reference', () => {
    const array = [1, 2, 3]
    assert.strictEqual(move(array, 0, 1), array)
  })
})
