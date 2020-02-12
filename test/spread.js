import assert from 'assert';
import lodashStable from 'lodash';
import { slice, _, stubTrue, falsey } from './utils.js';

describe('spread', function() {
  function fn(a, b, c) {
    return slice.call(arguments);
  }

  it('should spread arguments to `func`', function() {
    var spread = _.spread(fn),
        expected = [1, 2];

    assert.deepStrictEqual(spread([1, 2]), expected);
    assert.deepStrictEqual(spread([1, 2], 3), expected);
  });

  it('should accept a falsey `array`', function() {
    var spread = _.spread(stubTrue),
        expected = lodashStable.map(falsey, stubTrue);

    var actual = lodashStable.map(falsey, function(array, index) {
      try {
        return index ? spread(array) : spread();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `start`', function() {
    var spread = _.spread(fn, 1),
        expected = [1, 2, 3];

    assert.deepStrictEqual(spread(1, [2, 3]), expected);
    assert.deepStrictEqual(spread(1, [2, 3], 4), expected);
  });

  it('should treat `start` as `0` for negative or `NaN` values', function() {
    var values = [-1, NaN, 'a'],
        expected = lodashStable.map(values, lodashStable.constant([1, 2]));

    var actual = lodashStable.map(values, function(value) {
      var spread = _.spread(fn, value);
      return spread([1, 2]);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should coerce `start` to an integer', function() {
    var spread = _.spread(fn, 1.6),
        expected = [1, 2, 3];

    assert.deepStrictEqual(spread(1, [2, 3]), expected);
    assert.deepStrictEqual(spread(1, [2, 3], 4), expected);
  });
});
