import assert from 'assert';
import add from '../add.js';

describe('add', function() {
  it('should add two numbers', function() {
    assert.strictEqual(add(6, 4), 10);
    assert.strictEqual(add(-6, 4), -2);
    assert.strictEqual(add(-6, -4), -10);
  });

  it('should not coerce arguments to numbers', function() {
    assert.strictEqual(add('6', '4'), '64');
    assert.strictEqual(add('x', 'y'), 'xy');
  });
});
