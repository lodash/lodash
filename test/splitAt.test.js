import assert from 'assert'
import splitAt from '../splitAt'

describe('splitAt', () => {
  describe('when array has no values', () => {
    it('should return two empty arrays', () => {
      const arr = []
      const index = 4
      const [firstItems, rest] = splitAt(arr, index)

      assert.deepEqual(firstItems, [])
      assert.deepEqual(rest,  [])
    })
  })

  describe('when array has no tail', () => {
    it('should return the second array empty', () => {
      const arr = [1, 2, 3, 4]
      const index = 4
      const [firstItems, rest] = splitAt(arr, index)

      assert.deepEqual(firstItems, [1, 2, 3, 4])
      assert.deepEqual(rest,  [])
    })
  })

  describe('when array has tail', () => {
    it('should return both arrays with values', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7]
      const index = 4
      const [firstItems, rest] = splitAt(arr, index)

      assert.deepEqual(firstItems, [1, 2, 3, 4])
      assert.deepEqual(rest,  [5, 6, 7])
    })
  })

  describe('when index is negative', () => {
    it('should return the first array empty', () => {
      const arr = [1, 2, 3]
      const index = -1
      const [firstItems, rest] = splitAt(arr, index)

      assert.deepEqual(firstItems, [])
      assert.deepEqual(rest,  [1, 2, 3])
    })
  })

  describe('when index is 0', () => {
    it('should return the first array empty', () => {
      const arr = [1, 2, 3]
      const index = 0
      const [firstItems, rest] = splitAt(arr, index)

      assert.deepEqual(firstItems, [])
      assert.deepEqual(rest,  [1, 2, 3])
    })
  })

  describe('when index is undefined', () => {
    it('should return the first array empty', () => {
      const arr = [1, 2, 3]
      const [firstItems, rest] = splitAt(arr)

      assert.deepEqual(firstItems, [])
      assert.deepEqual(rest,  [1, 2, 3])
    })
  })

  describe('when index is null', () => {
    it('should return the first array empty', () => {
      const arr = [1, 2, 3]
      const index = null
      const [firstItems, rest] = splitAt(arr, index)

      assert.deepEqual(firstItems, [])
      assert.deepEqual(rest,  [1, 2, 3])
    })
  })
})
