import assert from 'assert';
import mod from '../mod.js';

describe('mod', function() {
  it('should mod two numbers', function() {
    assert.strictEqual(mod(6, 4), 2);
    assert.strictEqual(mod(-6, 4), -2);
    assert.strictEqual(mod(6, -4), 2);
    assert.strictEqual(mod(-6, -4), -2);
    assert.strictEqual(mod(6, 0), NaN);
    assert.strictEqual(mod(9, 3), 0);
    assert.strictEqual(mod(-9, 3), -0);
    assert.strictEqual(mod(9, -3), 0);
    assert.strictEqual(mod(-9, -3), -0);
  });

  it('should coerce arguments to numbers', function() {
    assert.strictEqual(mod('6', '4'), 2);
    assert.strictEqual(mod(6, '4'), 2);
    assert.strictEqual(mod('6', 4), 2);
    assert.strictEqual(mod('9', '3'), 0);
    assert.deepStrictEqual(mod('x', 'y'), NaN);
  });
});
