import assert from 'assert'
import lodashStable from 'lodash'
import { identity, stubZero, falsey } from './utils.js'
import findLastIndex from '../findLastIndex.js'
import lastIndexOf from '../lastIndexOf.js'

const methods = {
  findLastIndex,
  lastIndexOf
}

describe('findLastIndex and lastIndexOf', () => {
  lodashStable.each(['findLastIndex', 'lastIndexOf'], (methodName) => {
    const array = [1, 2, 3, 1, 2, 3],
      func = methods[methodName],
      resolve = methodName == 'findLastIndex' ? lodashStable.curry(lodashStable.eq) : identity

    it(`\`_.${methodName}\` should return the index of the last matched value`, () => {
      assert.strictEqual(func(array, resolve(3)), 5)
    })

    it(`\`_.${methodName}\` should work with a positive \`fromIndex\``, () => {
      assert.strictEqual(func(array, resolve(1), 2), 0)
    })

    it(`\`_.${methodName}\` should work with a \`fromIndex\` >= \`length\``, () => {
      const values = [6, 8, Math.pow(2, 32), Infinity],
        expected = lodashStable.map(values, lodashStable.constant([-1, 3, -1]))

      const actual = lodashStable.map(values, (fromIndex) => [
        func(array, resolve(undefined), fromIndex),
        func(array, resolve(1), fromIndex),
        func(array, resolve(''), fromIndex)
      ])

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should work with a negative \`fromIndex\``, () => {
      assert.strictEqual(func(array, resolve(2), -3), 1)
    })

    it(`\`_.${methodName}\` should work with a negative \`fromIndex\` <= \`-length\``, () => {
      const values = [-6, -8, -Infinity],
        expected = lodashStable.map(values, stubZero)

      const actual = lodashStable.map(values, (fromIndex) => func(array, resolve(1), fromIndex))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should treat falsey \`fromIndex\` values correctly`, () => {
      const expected = lodashStable.map(falsey, (value) => value === undefined ? 5 : -1)

      const actual = lodashStable.map(falsey, (fromIndex) => func(array, resolve(3), fromIndex))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should coerce \`fromIndex\` to an integer`, () => {
      assert.strictEqual(func(array, resolve(2), 4.2), 4)
    })
  })
})
