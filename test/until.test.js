import assert from 'assert';
import until from '../until.js';
import random from '../random.js';

describe('until', () => {
  it('should call the `actualFunction` with given `arguments` until the result satisfies the `barrierFunction`', () => {
    assert.strictEqual(until(random, [1, 5], number => number == 2), 2);
    assert.strictEqual(until(random, [2, 2], number => number == 3, retry=3), 2);
  });
});
