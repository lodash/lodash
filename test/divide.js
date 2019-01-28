import assert from 'assert';
import divide from '../divide.js';

describe('divide', function() {
  it('should divide two numbers', function() {
    assert.strictEqual(divide(6, 4), 1.5);
    assert.strictEqual(divide(-6, 4), -1.5);
    assert.strictEqual(divide(-6, -4), 1.5);
  });

  it('should coerce arguments to numbers', function() {
    assert.strictEqual(divide('6', '4'), 1.5);
    assert.deepStrictEqual(divide('x', 'y'), NaN);
  });
});
