import assert from 'assert'
import lodashStable from 'lodash'
import { arrayProto, LARGE_ARRAY_SIZE } from './utils.js'
import toArray from '../toArray.js'

describe('toArray', () => {
  it('should convert objects to arrays', () => {
    assert.deepStrictEqual(toArray({ 'a': 1, 'b': 2 }), [1, 2])
  })

  it('should convert iterables to arrays', () => {
    if (Symbol && Symbol.iterator) {
      const object = { '0': 'a', 'length': 1 }
      object[Symbol.iterator] = arrayProto[Symbol.iterator]

      assert.deepStrictEqual(toArray(object), ['a'])
    }
  })

  it('should convert maps to arrays', () => {
    if (Map) {
      const map = new Map
      map.set('a', 1)
      map.set('b', 2)
      assert.deepStrictEqual(toArray(map), [['a', 1], ['b', 2]])
    }
  })

  it('should convert strings to arrays', () => {
    assert.deepStrictEqual(toArray(''), [])
    assert.deepStrictEqual(toArray('ab'), ['a', 'b'])
    assert.deepStrictEqual(toArray(Object('ab')), ['a', 'b'])
  })

  it('should work in a lazy sequence', () => {
    const array = lodashStable.range(LARGE_ARRAY_SIZE + 1)

    const object = lodashStable.zipObject(lodashStable.times(LARGE_ARRAY_SIZE, (index) => [`key${index}`, index]))

    let actual = _(array).slice(1).map(String).toArray().value()
    assert.deepEqual(actual, lodashStable.map(array.slice(1), String))

    actual = _(object).toArray().slice(1).map(String).value()
    assert.deepEqual(actual, _.map(toArray(object).slice(1), String))
  })
})
