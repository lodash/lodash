import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import takeRight from '../takeRight.js';

describe('takeRight', function() {
  var array = [1, 2, 3];

  it('should take the last two elements', function() {
    assert.deepStrictEqual(takeRight(array, 2), [2, 3]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? [3] : [];
    });

    var actual = lodashStable.map(falsey, function(n) {
      return takeRight(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when `n` < `1`', function() {
    lodashStable.each([0, -1, -Infinity], function(n) {
      assert.deepStrictEqual(takeRight(array, n), []);
    });
  });

  it('should return all elements when `n` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
      assert.deepStrictEqual(takeRight(array, n), array);
    });
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        actual = lodashStable.map(array, takeRight);

    assert.deepStrictEqual(actual, [[3], [6], [9]]);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(LARGE_ARRAY_SIZE),
        predicate = function(value) { values.push(value); return isEven(value); },
        values = [],
        actual = _(array).takeRight(2).takeRight().value();

    assert.deepEqual(actual, takeRight(takeRight(array)));

    actual = _(array).filter(predicate).takeRight(2).takeRight().value();
    assert.deepEqual(values, array);
    assert.deepEqual(actual, takeRight(takeRight(_.filter(array, predicate), 2)));

    actual = _(array).takeRight(6).take(4).takeRight(2).take().value();
    assert.deepEqual(actual, _.take(takeRight(_.take(takeRight(array, 6), 4), 2)));

    values = [];

    actual = _(array).filter(predicate).takeRight(6).take(4).takeRight(2).take().value();
    assert.deepEqual(values, array);
    assert.deepEqual(actual, _.take(takeRight(_.take(takeRight(_.filter(array, predicate), 6), 4), 2)));
  });
});
