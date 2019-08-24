import assert from 'assert';
import upperCase from '../upperCase.js';

describe('upperCase', function() {
  it('should uppercase as space-separated words', function() {
    assert.strictEqual(upperCase('--foo-bar--'), 'FOO BAR');
    assert.strictEqual(upperCase('fooBar'), 'FOO BAR');
    assert.strictEqual(upperCase('__foo_bar__'), 'FOO BAR');
  });
});
