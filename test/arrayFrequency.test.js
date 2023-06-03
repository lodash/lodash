import arrayFrequency from '../arrayFrequency'
import assert from 'assert'

describe('Array Frequency', () => {

  it('should give frequency of simple number array', () => {

    var simpleArrayOfNumbers = [
      1, 2, 3, 4, 4, 4, 5, 6, 6, 6, 7, 8, 8
    ]

    var result = arrayFrequency(simpleArrayOfNumbers)

    var expectedResult = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 3,
      '5': 1,
      '6': 3,
      '7': 1,
      '8': 2
    }

    assert.deepStrictEqual(result,expectedResult)
  })

  it('should give frequency of nested array', () => {

    var names = [
      { name: 'John' },
      { name: 'Jane' },
      { name: 'John' },
      { name: 'Alex' },
      { name: 'Jane' },
      { name: 'John' },
      { name: 'Alice' },
      { name: 'John' },
      { name: 'Jane' },
      { name: 'Alex' }
    ]

    var result = arrayFrequency(names)

    var expectedResult = {
      '{"name":"John"}': 4,
      '{"name":"Jane"}': 3,
      '{"name":"Alex"}': 2,
      '{"name":"Alice"}': 1
    }

    assert.deepStrictEqual(result,expectedResult)
  })

})
