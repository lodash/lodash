import assert from 'assert'
import { isEven } from './utils.js'
import filter from '../filter.js'

describe('filter', () => {
  const array = [1, 2, 3]

  it('should return elements `predicate` returns truthy for', () => {
    assert.deepStrictEqual(filter(array, isEven), [2])
  })
})
