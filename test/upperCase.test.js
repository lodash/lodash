import assert from 'assert';
import upperCase from '../upperCase.js';

describe('upperCase', function() {
  it('should uppercase as space-separated words', function() {
    assert.strictEqual(upperCase('--foo-bar--'), 'FOO BAR');
    assert.strictEqual(upperCase('fooBar'), 'FOO BAR');
    assert.strictEqual(upperCase('__foo_bar__'), 'FOO BAR');
  });
  it('should handle locale information correctly', function() {
    assert.strictEqual(upperCase('iyi'), 'IYI'); // Without specifying the locale, this is the correct behaviour
    assert.strictEqual(upperCase('iyi', 'tr-TR'), 'İYİ');
    assert.strictEqual(upperCase('iyi', ['tr-TR']), 'İYİ');
  });
});
