import assert from 'assert';
import lte from '../lte.js';
import lt from '../lt.js';

describe('lte', function() {
  it('should return `true` if `value` is <= `other`', function() {
    assert.strictEqual(lte(1, 3), true);
    assert.strictEqual(lte(3, 3), true);
    assert.strictEqual(lte('abc', 'def'), true);
    assert.strictEqual(lte('def', 'def'), true);
  });

  it('should return `false` if `value` > `other`', function() {
    assert.strictEqual(lt(3, 1), false);
    assert.strictEqual(lt('def', 'abc'), false);
  });

  it('should work with the BigInts', function() {
    assert.strictEqual(lte(1000000000000n, 3000000000000n), true);
    assert.strictEqual(lte(1000000000000n, 1000000000000n), true);
  });
});
