import assert from 'assert';
import removePrefix from '../removePrefix.js';

describe('removePrefix', () => {
  it('should remove the prefix when the prefix exist', () => {
    assert.strictEqual(removePrefix('https://example.com', 'https://'), 'example.com');
    assert.strictEqual(removePrefix('-_-abc-_-', '-_-'), 'abc-_-');
  });

  it('should not remove the prefix when the prefix does not exist', () => {
    assert.strictEqual(removePrefix('example.com', 'https://'), 'example.com');
    assert.strictEqual(removePrefix('-_-abc-_-', '_-'), '-_-abc-_-');
  });

  it('should return a blank string when parameters are not defined', () => {
    assert.strictEqual(removePrefix(undefined, undefined), '');
    assert.strictEqual(removePrefix(null, null), '');
    assert.strictEqual(removePrefix(undefined, null), '');
    assert.strictEqual(removePrefix(null, undefined), '');
  });

  it('should work with non-string parameters', () => {
    assert.strictEqual(removePrefix(123456, 123), '456');
    assert.strictEqual(removePrefix(false, 'fal'), 'se');
  });
});
