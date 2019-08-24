import assert from 'assert'
import lowerCase from '../lowerCase.js'

describe('lowerCase', () => {
  it('should lowercase as space-separated words', () => {
    assert.strictEqual(lowerCase('--Foo-Bar--'), 'foo bar')
    assert.strictEqual(lowerCase('fooBar'), 'foo bar')
    assert.strictEqual(lowerCase('__FOO_BAR__'), 'foo bar')
  })
})
