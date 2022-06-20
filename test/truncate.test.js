import assert from 'assert'
import lodashStable from 'lodash'
import truncate from '../truncate.js'

describe('truncate', () => {
  const string = 'hi-diddly-ho there, neighborino'

  describe('Control-Flow Graph structural tests', () => {
    it('should truncate a long string with omission', () => {
      const result = truncate('32-chars-string-----------------')

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it('should truncate strings with unicode', () => {
      const result = truncate('32-chars-string\ud800----------------')

      assert.strictEqual(result, '32-chars-string\ud800-----------...')
    })

    it('should not truncate if `string` is <= `length` default value (30)', () => {
      const result = truncate('small string')

      assert.strictEqual(result, 'small string')
    })

    it('should truncate to `omission` when it is larger than length', () => {
      const result = truncate('32-chars-string-----------------', {
        omission: 'a-omission-string-larger-than-the-length'
      })

      assert.strictEqual(result, 'a-omission-string-larger-than-the-length')
    })

    it('should not use `separator` if it is already at the end', () => {
      const result = truncate('32-chars-string------------|----', {
        separator: '|'
      })

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it('should not use `separator` at the end with unicode chars', () => {
      const result = truncate('32-chars-string-with-\ud800-----|----', {
        separator: '|'
      })

      assert.strictEqual(result, '32-chars-string-with-\ud800-----...')
    })

    it('should not use `separator` when it is in the truncated part', () => {
      const result = truncate('32-chars-string---------------|-', {
        separator: '|'
      })

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it('should use last `separator` occurrence to slice string before length', () => {
      const result = truncate('32-chars-string   --------------', {
        separator: ' '
      })

      assert.strictEqual(result, '32-chars-string  ...')
    })

    it('should ignore `separator` if is a regex without matches', () => {
      const result = truncate('32-chars-string-----------------', {
        separator: /no-match-pattern/
      })

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it(':should not use `separator` regex at the end to slice string', () => {
      const result = truncate('32-chars-strin\u1dc0g\u1dc0--------------, -', {
        separator: /,? +/
      })

      assert.strictEqual(result, '32-chars-strin\u1dc0g\u1dc0------------...')
    })

    it(':should use a `separator` regex to slice string', () => {
      const result = truncate('32-chars-string-----,  ---------', {
        separator: /,? +/
      })

      assert.strictEqual(result, '32-chars-string-----...')
    })

    it(':should use a `separator` global match regex to slice string', () => {
      const result = truncate('32-chars-string-----,  ---------', {
        separator: /,? +/g
      })

      assert.strictEqual(result, '32-chars-string-----...')
    })
  })

  it('should use a default `length` of `30`', () => {
    assert.strictEqual(truncate(string), 'hi-diddly-ho there, neighbo...')
  })

  it('should not truncate if `string` is <= `length`', () => {
    assert.strictEqual(truncate(string, { length: string.length }), string)
    assert.strictEqual(truncate(string, { length: string.length + 2 }), string)
  })

  it('should truncate string the given length', () => {
    assert.strictEqual(
      truncate(string, { length: 24 }),
      'hi-diddly-ho there, n...'
    )
  })

  it('should support a `omission` option', () => {
    assert.strictEqual(
      truncate(string, { omission: ' [...]' }),
      'hi-diddly-ho there, neig [...]'
    )
  })

  it('should coerce nullish `omission` values to strings', () => {
    assert.strictEqual(
      truncate(string, { omission: null }),
      'hi-diddly-ho there, neighbnull'
    )
    assert.strictEqual(
      truncate(string, { omission: undefined }),
      'hi-diddly-ho there, nundefined'
    )
  })

  it('should support a `length` option', () => {
    assert.strictEqual(truncate(string, { length: 4 }), 'h...')
  })

  it('should treat negative `length` as `0`', () => {
    lodashStable.each([0, -2], (length) => {
      assert.strictEqual(truncate(string, { length }), '...')
    })
  })

  it('should coerce `length` to an integer', () => {
    lodashStable.each(['', NaN, 4.6, '4'], (length, index) => {
      const actual = index > 1 ? 'h...' : '...'
      assert.strictEqual(
        truncate(string, {
          length: { valueOf: lodashStable.constant(length) }
        }),
        actual
      )
    })
  })

  it('should coerce `string` to a string', () => {
    assert.strictEqual(truncate(Object(string), { length: 4 }), 'h...')
    assert.strictEqual(
      truncate({ toString: lodashStable.constant(string) }, { length: 5 }),
      'hi...'
    )
  })

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = lodashStable.map([string, string, string], truncate),
      truncated = 'hi-diddly-ho there, neighbo...'

    assert.deepStrictEqual(actual, [truncated, truncated, truncated])
  })
})
