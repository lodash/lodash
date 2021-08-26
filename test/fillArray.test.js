import assert from 'assert'
import fillArray from '../fillArray'

describe('fillArray', () => {
  it('should return an empty array when the `times` parameter is 0', () => {
    const testArray = [1, 2, 3]
    const testTimes = 0
    const testResult = fillArray(testArray, testTimes)
    assert.equal(testResult.length, 0)
  })
  it('should return an empty array when the `array` parameter is empty', () => {
    const testArray = []
    const testTimes = 3
    const testResult = fillArray(testArray, testTimes)
    assert.equal(testResult.length, 0)
  })
  it('should repeat the array 3 times', () => {
    const testArray = [1, 2, 3]
    const testTimes = 3
    const testResult = fillArray(testArray, testTimes)
    assert.deepStrictEqual(testResult, [1, 2, 3, 1, 2, 3, 1, 2, 3])
  })
})
