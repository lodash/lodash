import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE } from './utils.js';
import slice from '../slice.js';

describe('slice', function() {
  var array = [1, 2, 3];

  it('should use a default `start` of `0` and a default `end` of `length`', function() {
    var actual = slice(array);
    assert.deepStrictEqual(actual, array);
    assert.notStrictEqual(actual, array);
  });

  it('should work with a positive `start`', function() {
    assert.deepStrictEqual(slice(array, 1), [2, 3]);
    assert.deepStrictEqual(slice(array, 1, 3), [2, 3]);
  });

  it('should work with a `start` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(start) {
      assert.deepStrictEqual(slice(array, start), []);
    });
  });

  it('should treat falsey `start` values as `0`', function() {
    var expected = lodashStable.map(falsey, lodashStable.constant(array));

    var actual = lodashStable.map(falsey, function(start) {
      return slice(array, start);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with a negative `start`', function() {
    assert.deepStrictEqual(slice(array, -1), [3]);
  });

  it('should work with a negative `start` <= negative `length`', function() {
    lodashStable.each([-3, -4, -Infinity], function(start) {
      assert.deepStrictEqual(slice(array, start), array);
    });
  });

  it('should work with `start` >= `end`', function() {
    lodashStable.each([2, 3], function(start) {
      assert.deepStrictEqual(slice(array, start, 2), []);
    });
  });

  it('should work with a positive `end`', function() {
    assert.deepStrictEqual(slice(array, 0, 1), [1]);
  });

  it('should work with a `end` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(end) {
      assert.deepStrictEqual(slice(array, 0, end), array);
    });
  });

  it('should treat falsey `end` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? array : [];
    });

    var actual = lodashStable.map(falsey, function(end, index) {
      return index ? slice(array, 0, end) : slice(array, 0);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with a negative `end`', function() {
    assert.deepStrictEqual(slice(array, 0, -1), [1, 2]);
  });

  it('should work with a negative `end` <= negative `length`', function() {
    lodashStable.each([-3, -4, -Infinity], function(end) {
      assert.deepStrictEqual(slice(array, 0, end), []);
    });
  });

  it('should coerce `start` and `end` to integers', function() {
    var positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

    var actual = lodashStable.map(positions, function(pos) {
      return slice.apply(_, [array].concat(pos));
    });

    assert.deepStrictEqual(actual, [[1], [1], [1], [2, 3], [1], []]);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1], [2, 3]],
        actual = lodashStable.map(array, slice);

    assert.deepStrictEqual(actual, array);
    assert.notStrictEqual(actual, array);
  });

  it('should work in a lazy sequence', function() {
    var array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1),
        length = array.length,
        wrapped = _(array);

    lodashStable.each(['map', 'filter'], function(methodName) {
      assert.deepEqual(wrapped[methodName]().slice(0, -1).value(), array.slice(0, -1));
      assert.deepEqual(wrapped[methodName]().slice(1).value(), array.slice(1));
      assert.deepEqual(wrapped[methodName]().slice(1, 3).value(), array.slice(1, 3));
      assert.deepEqual(wrapped[methodName]().slice(-1).value(), array.slice(-1));

      assert.deepEqual(wrapped[methodName]().slice(length).value(), array.slice(length));
      assert.deepEqual(wrapped[methodName]().slice(3, 2).value(), array.slice(3, 2));
      assert.deepEqual(wrapped[methodName]().slice(0, -length).value(), array.slice(0, -length));
      assert.deepEqual(wrapped[methodName]().slice(0, null).value(), array.slice(0, null));

      assert.deepEqual(wrapped[methodName]().slice(0, length).value(), array.slice(0, length));
      assert.deepEqual(wrapped[methodName]().slice(-length).value(), array.slice(-length));
      assert.deepEqual(wrapped[methodName]().slice(null).value(), array.slice(null));

      assert.deepEqual(wrapped[methodName]().slice(0, 1).value(), array.slice(0, 1));
      assert.deepEqual(wrapped[methodName]().slice(NaN, '1').value(), array.slice(NaN, '1'));

      assert.deepEqual(wrapped[methodName]().slice(0.1, 1.1).value(), array.slice(0.1, 1.1));
      assert.deepEqual(wrapped[methodName]().slice('0', 1).value(), array.slice('0', 1));
      assert.deepEqual(wrapped[methodName]().slice(0, '1').value(), array.slice(0, '1'));
      assert.deepEqual(wrapped[methodName]().slice('1').value(), array.slice('1'));
      assert.deepEqual(wrapped[methodName]().slice(NaN, 1).value(), array.slice(NaN, 1));
      assert.deepEqual(wrapped[methodName]().slice(1, NaN).value(), array.slice(1, NaN));
    });
  });
});
