import assert from 'assert'
import lodashStable from 'lodash'
import { falsey } from './utils.js'
import orderBy from '../orderBy.js'

describe('orderBy', () => {
  const objects = [
    { 'a': 'x', 'b': 3 },
    { 'a': 'y', 'b': 4 },
    { 'a': 'x', 'b': 1 },
    { 'a': 'y', 'b': 2 }
  ]

  it('should sort by a single property by a specified order', () => {
    const actual = orderBy(objects, 'a', 'desc')
    assert.deepStrictEqual(actual, [objects[1], objects[3], objects[0], objects[2]])
  })

  it('should sort by multiple properties by specified orders', () => {
    const actual = orderBy(objects, ['a', 'b'], ['desc', 'asc'])
    assert.deepStrictEqual(actual, [objects[3], objects[1], objects[2], objects[0]])
  })

  it('should sort by a property in ascending order when its order is not specified', () => {
    let expected = [objects[2], objects[0], objects[3], objects[1]],
      actual = orderBy(objects, ['a', 'b'])

    assert.deepStrictEqual(actual, expected)

    expected = lodashStable.map(falsey, lodashStable.constant([objects[3], objects[1], objects[2], objects[0]]))

    actual = lodashStable.map(falsey, (order, index) => orderBy(objects, ['a', 'b'], index ? ['desc', order] : ['desc']))

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with `orders` specified as string objects', () => {
    const actual = orderBy(objects, ['a'], [Object('desc')])
    assert.deepStrictEqual(actual, [objects[1], objects[3], objects[0], objects[2]])
  })

  it('should work when certain iteratees are arrays', () => {
    const nestedObjects = [
      { a: { b: 1 }, c: 2 },
      { a: { b: 3 }, c: 3 },
      { a: { b: 2 }, c: 1 }
    ]

    const actual = orderBy(nestedObjects, [['a', 'b'], 'c'])

    const expected = [nestedObjects[0], nestedObjects[2], nestedObjects[1]]

    assert.deepStrictEqual(actual, expected)
  })
})
