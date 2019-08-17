import assert from 'assert'
import lodashStable from 'lodash'
import { noop } from './utils.js'
import property from '../property.js'

describe('property', () => {
  it('should create a function that plucks a property value of a given object', () => {
    const object = { 'a': 1 }

    lodashStable.each(['a', ['a']], (path) => {
      const prop = property(path)
      assert.strictEqual(prop.length, 1)
      assert.strictEqual(prop(object), 1)
    })
  })

  it('should pluck deep property values', () => {
    const object = { 'a': { 'b': 2 } }

    lodashStable.each(['a.b', ['a', 'b']], (path) => {
      const prop = property(path)
      assert.strictEqual(prop(object), 2)
    })
  })

  it('should pluck inherited property values', () => {
    function Foo() {}
    Foo.prototype.a = 1

    lodashStable.each(['a', ['a']], (path) => {
      const prop = property(path)
      assert.strictEqual(prop(new Foo), 1)
    })
  })

  it('should work with a non-string `path`', () => {
    const array = [1, 2, 3]

    lodashStable.each([1, [1]], (path) => {
      const prop = property(path)
      assert.strictEqual(prop(array), 2)
    })
  })

  it('should preserve the sign of `0`', () => {
    const object = { '-0': 'a', '0': 'b' },
      props = [-0, Object(-0), 0, Object(0)]

    const actual = lodashStable.map(props, (key) => {
      const prop = property(key)
      return prop(object)
    })

    assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b'])
  })

  it('should coerce `path` to a string', () => {
    function fn() {}
    fn.toString = lodashStable.constant('fn')

    const expected = [1, 2, 3, 4],
      object = { 'null': 1, 'undefined': 2, 'fn': 3, '[object Object]': 4 },
      paths = [null, undefined, fn, {}]

    lodashStable.times(2, (index) => {
      const actual = lodashStable.map(paths, (path) => {
        const prop = property(index ? [path] : path)
        return prop(object)
      })

      assert.deepStrictEqual(actual, expected)
    })
  })

  it('should pluck a key over a path', () => {
    const object = { 'a.b': 1, 'a': { 'b': 2 } }

    lodashStable.each(['a.b', ['a.b']], (path) => {
      const prop = property(path)
      assert.strictEqual(prop(object), 1)
    })
  })

  it('should return `undefined` when `object` is nullish', () => {
    const values = [, null, undefined],
      expected = lodashStable.map(values, noop)

    lodashStable.each(['constructor', ['constructor']], (path) => {
      const prop = property(path)

      const actual = lodashStable.map(values, (value, index) => index ? prop(value) : prop())

      assert.deepStrictEqual(actual, expected)
    })
  })

  it('should return `undefined` for deep paths when `object` is nullish', () => {
    const values = [, null, undefined],
      expected = lodashStable.map(values, noop)

    lodashStable.each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], (path) => {
      const prop = property(path)

      const actual = lodashStable.map(values, (value, index) => index ? prop(value) : prop())

      assert.deepStrictEqual(actual, expected)
    })
  })

  it('should return `undefined` if parts of `path` are missing', () => {
    const object = {}

    lodashStable.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], (path) => {
      const prop = property(path)
      assert.strictEqual(prop(object), undefined)
    })
  })
})
