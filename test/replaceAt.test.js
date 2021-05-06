import assert from 'assert';
import replaceAt from '../replaceAt.js'

describe('replaceAt', function() {
  it('should replace given index of given string with given string', function() {
    assert.strictEqual(replaceAt('01234567', '---', 0), '---1234567')
    assert.strictEqual(replaceAt('01234567', '---', 3), '012---4567')
    assert.strictEqual(replaceAt('01234567', '---', 7), '0123456---')
  })
})
