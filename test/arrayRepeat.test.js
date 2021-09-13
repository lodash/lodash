import assert from 'assert'
import arrayRepeat from '../arrayRepeat'

describe('arrayRepeat', () => {
  it('should return an empty array when the `times` parameter is 0', () => {
    const testArray = [1, 2, 3]
    const testTimes = 0
    const testResult = arrayRepeat(testArray, testTimes)
    assert.equal(testResult.length, 0)
  })
  it('should return an empty array when the `array` parameter is empty', () => {
    const testArray = []
    const testTimes = 3
    const testResult = arrayRepeat(testArray, testTimes)
    assert.equal(testResult.length, 0)
  })
  it('should repeat the array 3 times', () => {
    const testArray = [1, 2, 3]
    const testTimes = 3
    const testResult = arrayRepeat(testArray, testTimes)
    assert.deepStrictEqual(testResult, [1, 2, 3, 1, 2, 3, 1, 2, 3])
  })
  it('throws an error when given an object that is not an array', () => {
    assert.throws(() => {
      arrayRepeat('some text that is not an array', 3)
    }, {
      name: 'TypeError',
      message: 'Expected array argument to be an array'
    })
  })
  it('throws an error when given an object that is not an integer', () => {
    assert.throws(() => {
      arrayRepeat([1, 2, 3], 'some text that is not an integer')
    }, {
      name: 'TypeError',
      message: 'Expected times argument to be an integer'
    })
  })
})
