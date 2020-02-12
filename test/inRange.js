import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils.js';
import inRange from '../inRange.js';

describe('inRange', function() {
  it('should work with an `end`', function() {
    assert.strictEqual(inRange(3, 5), true);
    assert.strictEqual(inRange(5, 5), false);
    assert.strictEqual(inRange(6, 5), false);
  });

  it('should work with a `start` and `end`', function() {
    assert.strictEqual(inRange(1, 1, 5), true);
    assert.strictEqual(inRange(3, 1, 5), true);
    assert.strictEqual(inRange(0, 1, 5), false);
    assert.strictEqual(inRange(5, 1, 5), false);
  });

  it('should treat falsey `start` as `0`', function() {
    lodashStable.each(falsey, function(value, index) {
      if (index) {
        assert.strictEqual(inRange(0, value), false);
        assert.strictEqual(inRange(0, value, 1), true);
      } else {
        assert.strictEqual(inRange(0), false);
      }
    });
  });

  it('should swap `start` and `end` when `start` > `end`', function() {
    assert.strictEqual(inRange(2, 5, 1), true);
    assert.strictEqual(inRange(-3, -2, -6), true);
  });

  it('should work with a floating point `n` value', function() {
    assert.strictEqual(inRange(0.5, 5), true);
    assert.strictEqual(inRange(1.2, 1, 5), true);
    assert.strictEqual(inRange(5.2, 5), false);
    assert.strictEqual(inRange(0.5, 1, 5), false);
  });

  it('should coerce arguments to finite numbers', function() {
    var actual = [
      inRange(0, '1'),
      inRange(0, '0', 1),
      inRange(0, 0, '1'),
      inRange(0, NaN, 1),
      inRange(-1, -1, NaN)
    ];

    assert.deepStrictEqual(actual, lodashStable.map(actual, stubTrue));
  });
});
