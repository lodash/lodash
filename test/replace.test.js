import assert from 'assert'
import replace from '../replace.js'

describe('replace', () => {
  it('should replace the matched pattern', () => {
    const string = 'abcde'
    assert.strictEqual(replace(string, 'de', '123'), 'abc123')
    assert.strictEqual(replace(string, /[bd]/g, '-'), 'a-c-e')
  })
})
