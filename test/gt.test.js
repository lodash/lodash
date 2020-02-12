import assert from 'assert';
import gt from '../gt.js';

describe('gt', function() {
  it('should return `true` if `value` > `other`', function() {
    assert.strictEqual(gt(3, 1), true);
    assert.strictEqual(gt('def', 'abc'), true);
  });

  it('should return `false` if `value` is <= `other`', function() {
    assert.strictEqual(gt(1, 3), false);
    assert.strictEqual(gt(3, 3), false);
    assert.strictEqual(gt('abc', 'def'), false);
    assert.strictEqual(gt('def', 'def'), false);
  });
});
