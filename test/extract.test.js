import assert from 'assert'
import {identity, stubTrue, stubFalse} from './utils.js'
import extract from '../extract.js'

describe('extract', () => {
  const array = [1, 0, 2]

  it('should split elements into n groups, where n is the number of predicates', () => {
    assert.deepStrictEqual(extract([], identity), [[]])
    assert.deepStrictEqual(extract(array, stubTrue, stubFalse), [[1, 0, 2], []])
    assert.deepStrictEqual(extract(array,
      (element) => element === 0,
      (element) => element === 1,
      (element) => element === 2
    ), [[0], [1], [2]])
  })

  it('should return empty array if no predicate is used', () => {
    assert.deepStrictEqual(extract([1, 2, 3]), []);
  })

  it('should work with an object for `collection`', () => {
    const actual = extract({'a': 1.1, 'b': 0.2, 'c': 1.3}, Math.floor, Math.ceil)
    assert.deepStrictEqual(actual, [[1.1, 1.3], [1.1, 0.2, 1.3]])
  })
})
