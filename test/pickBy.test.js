import assert from 'assert'
import { stubTrue } from './utils.js'
import pickBy from '../pickBy.js'

describe('pickBy', () => {
  it('should work with a predicate argument', () => {
    const object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }

    const actual = pickBy(object, (n) => n == 1 || n == 3)

    assert.deepStrictEqual(actual, { 'a': 1, 'c': 3 })
  })

  it('should not treat keys with dots as deep paths', () => {
    let object = { 'a.b.c': 1 },
      actual = pickBy(object, stubTrue)

    assert.deepStrictEqual(actual, { 'a.b.c': 1 })
  })
})
