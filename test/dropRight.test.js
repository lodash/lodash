import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import dropRight from '../dropRight.js';

describe('dropRight', function() {
  var array = [1, 2, 3];

  it('should drop the last two elements', function() {
    assert.deepStrictEqual(dropRight(array, 2), [1]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? [1, 2] : array;
    });

    var actual = lodashStable.map(falsey, function(n) {
      return dropRight(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return all elements when `n` < `1`', function() {
    lodashStable.each([0, -1, -Infinity], function(n) {
      assert.deepStrictEqual(dropRight(array, n), array);
    });
  });

  it('should return an empty array when `n` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
      assert.deepStrictEqual(dropRight(array, n), []);
    });
  });

  it('should coerce `n` to an integer', function() {
    assert.deepStrictEqual(dropRight(array, 1.6), [1, 2]);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
        predicate = function(value) { values.push(value); return isEven(value); },
        values = [],
        actual = _(array).dropRight(2).dropRight().value();

    assert.deepEqual(actual, array.slice(0, -3));

    actual = _(array).filter(predicate).dropRight(2).dropRight().value();
    assert.deepEqual(values, array);
    assert.deepEqual(actual, dropRight(dropRight(_.filter(array, predicate), 2)));

    actual = _(array).dropRight(2).drop().dropRight().drop(2).value();
    assert.deepEqual(actual, _.drop(dropRight(_.drop(dropRight(array, 2))), 2));

    values = [];

    actual = _(array).dropRight().filter(predicate).dropRight(2).drop().dropRight().drop(2).value();
    assert.deepEqual(values, array.slice(0, -1));
    assert.deepEqual(actual, _.drop(dropRight(_.drop(dropRight(_.filter(dropRight(array), predicate), 2))), 2));
  });
});
