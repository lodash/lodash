import assert from 'assert'
import upperCase from '../upperCase.js'

describe('upperCase', () => {
  it('should uppercase as space-separated words', () => {
    assert.strictEqual(upperCase('--foo-bar--'), 'FOO BAR')
    assert.strictEqual(upperCase('fooBar'), 'FOO BAR')
    assert.strictEqual(upperCase('__foo_bar__'), 'FOO BAR')
  })
})
