import assert from 'assert'
import { slice } from './utils.js'
import pullAllBy from '../pullAllBy.js'

describe('pullAllBy', () => {
  it('should accept an `iteratee`', () => {
    const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]

    const actual = pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], (object) => object.x)

    assert.deepStrictEqual(actual, [{ 'x': 2 }])
  })

  it('should provide correct `iteratee` arguments', () => {
    let args,
      array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]

    pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], function() {
      args || (args = slice.call(arguments))
    })

    assert.deepStrictEqual(args, [{ 'x': 1 }])
  })
})
