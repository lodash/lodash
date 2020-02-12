import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import drop from '../drop.js';

describe('drop', function() {
  var array = [1, 2, 3];

  it('should drop the first two elements', function() {
    assert.deepStrictEqual(drop(array, 2), [3]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? [2, 3] : array;
    });

    var actual = lodashStable.map(falsey, function(n) {
      return drop(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return all elements when `n` < `1`', function() {
    lodashStable.each([0, -1, -Infinity], function(n) {
      assert.deepStrictEqual(drop(array, n), array);
    });
  });

  it('should return an empty array when `n` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
      assert.deepStrictEqual(drop(array, n), []);
    });
  });

  it('should coerce `n` to an integer', function() {
    assert.deepStrictEqual(drop(array, 1.6), [2, 3]);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
        predicate = function(value) { values.push(value); return isEven(value); },
        values = [],
        actual = _(array).drop(2).drop().value();

    assert.deepEqual(actual, array.slice(3));

    actual = _(array).filter(predicate).drop(2).drop().value();
    assert.deepEqual(values, array);
    assert.deepEqual(actual, drop(drop(_.filter(array, predicate), 2)));

    actual = _(array).drop(2).dropRight().drop().dropRight(2).value();
    assert.deepEqual(actual, _.dropRight(drop(_.dropRight(drop(array, 2))), 2));

    values = [];

    actual = _(array).drop().filter(predicate).drop(2).dropRight().drop().dropRight(2).value();
    assert.deepEqual(values, array.slice(1));
    assert.deepEqual(actual, _.dropRight(drop(_.dropRight(drop(_.filter(drop(array), predicate), 2))), 2));
  });
});
