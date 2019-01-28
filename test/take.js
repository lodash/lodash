import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import take from '../take.js';

describe('take', function() {
  var array = [1, 2, 3];

  it('should take the first two elements', function() {
    assert.deepStrictEqual(take(array, 2), [1, 2]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? [1] : [];
    });

    var actual = lodashStable.map(falsey, function(n) {
      return take(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when `n` < `1`', function() {
    lodashStable.each([0, -1, -Infinity], function(n) {
      assert.deepStrictEqual(take(array, n), []);
    });
  });

  it('should return all elements when `n` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
      assert.deepStrictEqual(take(array, n), array);
    });
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        actual = lodashStable.map(array, take);

    assert.deepStrictEqual(actual, [[1], [4], [7]]);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
        predicate = function(value) { values.push(value); return isEven(value); },
        values = [],
        actual = _(array).take(2).take().value();

    assert.deepEqual(actual, take(take(array, 2)));

    actual = _(array).filter(predicate).take(2).take().value();
    assert.deepEqual(values, [1, 2]);
    assert.deepEqual(actual, take(take(_.filter(array, predicate), 2)));

    actual = _(array).take(6).takeRight(4).take(2).takeRight().value();
    assert.deepEqual(actual, _.takeRight(take(_.takeRight(take(array, 6), 4), 2)));

    values = [];

    actual = _(array).take(array.length - 1).filter(predicate).take(6).takeRight(4).take(2).takeRight().value();
    assert.deepEqual(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    assert.deepEqual(actual, _.takeRight(take(_.takeRight(take(_.filter(take(array, array.length - 1), predicate), 6), 4), 2)));
  });
});
