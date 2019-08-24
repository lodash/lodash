import assert from 'assert'
import lodashStable from 'lodash'
import { stubString } from './utils.js'
import escapeRegExp from '../escapeRegExp.js'

describe('escapeRegExp', () => {
  let escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\',
    unescaped = '^$.*+?()[]{}|\\'

  it('should escape values', () => {
    assert.strictEqual(escapeRegExp(unescaped + unescaped), escaped + escaped)
  })

  it('should handle strings with nothing to escape', () => {
    assert.strictEqual(escapeRegExp('abc'), 'abc')
  })

  it('should return an empty string for empty values', () => {
    let values = [, null, undefined, ''],
      expected = lodashStable.map(values, stubString)

    const actual = lodashStable.map(values, (value, index) => index ? escapeRegExp(value) : escapeRegExp())

    assert.deepStrictEqual(actual, expected)
  })
})
