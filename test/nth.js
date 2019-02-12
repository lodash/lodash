import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubA, stubB, noop } from './utils.js';
import nth from '../nth.js';

describe('nth', function() {
  var array = ['a', 'b', 'c', 'd'];

  it('should get the nth element of `array`', function() {
    var actual = lodashStable.map(array, function(value, index) {
      return nth(array, index);
    });

    assert.deepStrictEqual(actual, array);
  });

  it('should work with a negative `n`', function() {
    var actual = lodashStable.map(lodashStable.range(1, array.length + 1), function(n) {
      return nth(array, -n);
    });

    assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a']);
  });

  it('should coerce `n` to an integer', function() {
    var values = falsey,
        expected = lodashStable.map(values, stubA);

    var actual = lodashStable.map(values, function(n) {
      return n ? nth(array, n) : nth(array);
    });

    assert.deepStrictEqual(actual, expected);

    values = ['1', 1.6];
    expected = lodashStable.map(values, stubB);

    actual = lodashStable.map(values, function(n) {
      return nth(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `undefined` for empty arrays', function() {
    var values = [null, undefined, []],
        expected = lodashStable.map(values, noop);

    var actual = lodashStable.map(values, function(array) {
      return nth(array, 1);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return `undefined` for non-indexes', function() {
    var array = [1, 2],
        values = [Infinity, array.length],
        expected = lodashStable.map(values, noop);

    array[-1] = 3;

    var actual = lodashStable.map(values, function(n) {
      return nth(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
