import assert from 'assert'
import lodashStable from 'lodash'
import { slice, errors, stubTrue, CustomError, realm } from './utils.js'
import attempt from '../attempt.js'

describe('attempt', () => {
  it('should return the result of `func`', () => {
    assert.strictEqual(attempt(lodashStable.constant('x')), 'x')
  })

  it('should provide additional arguments to `func`', () => {
    const actual = attempt(function() { return slice.call(arguments) }, 1, 2)
    assert.deepStrictEqual(actual, [1, 2])
  })

  it('should return the caught error', () => {
    const expected = lodashStable.map(errors, stubTrue)

    const actual = lodashStable.map(errors, (error) => attempt(() => { throw error }) === error)

    assert.deepStrictEqual(actual, expected)
  })

  it('should coerce errors to error objects', () => {
    const actual = attempt(() => { throw 'x' })
    assert.ok(lodashStable.isEqual(actual, Error('x')))
  })

  it('should preserve custom errors', () => {
    const actual = attempt(() => { throw new CustomError('x') })
    assert.ok(actual instanceof CustomError)
  })

  it('should work with an error object from another realm', () => {
    if (realm.errors) {
      const expected = lodashStable.map(realm.errors, stubTrue)

      const actual = lodashStable.map(realm.errors, (error) => attempt(() => { throw error }) === error)

      assert.deepStrictEqual(actual, expected)
    }
  })

  it('should return an unwrapped value when implicitly chaining', () => {
    assert.strictEqual(_(lodashStable.constant('x')).attempt(), 'x')
  })

  it('should return a wrapped value when explicitly chaining', () => {
    assert.ok(_(lodashStable.constant('x')).chain().attempt() instanceof _)
  })
})
