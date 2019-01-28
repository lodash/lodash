import assert from 'assert';
import { MAX_INTEGER, MAX_ARRAY_LENGTH } from './utils.js';
import toLength from '../toLength.js';

describe('toLength', function() {
  it('should return a valid length', function() {
    assert.strictEqual(toLength(-1), 0);
    assert.strictEqual(toLength('1'), 1);
    assert.strictEqual(toLength(1.1), 1);
    assert.strictEqual(toLength(MAX_INTEGER), MAX_ARRAY_LENGTH);
  });

  it('should return `value` if a valid length', function() {
    assert.strictEqual(toLength(0), 0);
    assert.strictEqual(toLength(3), 3);
    assert.strictEqual(toLength(MAX_ARRAY_LENGTH), MAX_ARRAY_LENGTH);
  });

  it('should convert `-0` to `0`', function() {
    assert.strictEqual(1 / toLength(-0), Infinity);
  });
});
