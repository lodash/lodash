import assert from 'assert';
import removeSuffix from '../removeSuffix.js';

describe('removeSuffix', () => {
  it('should remove the suffix when the suffix exist', () => {
    assert.strictEqual(removeSuffix('example.com', '.com'), 'example');
    assert.strictEqual(removeSuffix('-_-abc-_-', '-_-'), '-_-abc');
  });

  it('should not remove the suffix when the suffix does not exist', () => {
    assert.strictEqual(removeSuffix('example', '.com'), 'example');
    assert.strictEqual(removeSuffix('-_-abc-_-', '-_'), '-_-abc-_-');
  });

  it('should return a blank string when parameters are not defined', () => {
    assert.strictEqual(removeSuffix(undefined, undefined), '');
    assert.strictEqual(removeSuffix(null, null), '');
    assert.strictEqual(removeSuffix(undefined, null), '');
    assert.strictEqual(removeSuffix(null, undefined), '');
  });

  it('should work with non-string parameters', () => {
    assert.strictEqual(removeSuffix(123456, 456), '123');
    assert.strictEqual(removeSuffix(false, 'se'), 'fal');
  });
});
