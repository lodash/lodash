import assert from 'assert';
import gte from '../gte.js';

describe('gte', function() {
  it('should return `true` if `value` >= `other`', function() {
    assert.strictEqual(gte(3, 1), true);
    assert.strictEqual(gte(3, 3), true);
    assert.strictEqual(gte('def', 'abc'), true);
    assert.strictEqual(gte('def', 'def'), true);
  });

  it('should return `false` if `value` is less than `other`', function() {
    assert.strictEqual(gte(1, 3), false);
    assert.strictEqual(gte('abc', 'def'), false);
  });

  it('should work with the BigInts', function() {
    assert.strictEqual(gte(1000000000000n, 3000000000000n), false);
    assert.strictEqual(gte(1000000000000n, 1000000000000n), true);
  });
});
