import assert from 'assert';
import lowerCase from '../lowerCase.js';

describe('lowerCase', function() {
  it('should lowercase as space-separated words', function() {
    assert.strictEqual(lowerCase('--Foo-Bar--'), 'foo bar');
    assert.strictEqual(lowerCase('fooBar'), 'foo bar');
    assert.strictEqual(lowerCase('__FOO_BAR__'), 'foo bar');
  });
  it('should handle locale information correctly', function() {
    assert.strictEqual(lowerCase('DINÇ MUHTEŞEM İYI'), 'dinç muhteşem i̇yi'); // Without specifying the locale, this is the correct behaviour
    assert.strictEqual(lowerCase('DINÇ MUHTEŞEM İYI', 'tr-TR'), 'dınç muhteşem iyı');
    assert.strictEqual(lowerCase('DINÇ MUHTEŞEM İYI', ['tr-TR']), 'dınç muhteşem iyı');
  });
});
