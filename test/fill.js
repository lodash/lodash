import assert from 'assert';
import lodashStable from 'lodash';
import { falsey } from './utils.js';
import fill from '../fill.js';

describe('fill', function() {
  it('should use a default `start` of `0` and a default `end` of `length`', function() {
    var array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, 'a'), ['a', 'a', 'a']);
  });

  it('should use `undefined` for `value` if not given', function() {
    var array = [1, 2, 3],
        actual = fill(array);

    assert.deepStrictEqual(actual, Array(3));
    assert.ok(lodashStable.every(actual, function(value, index) {
      return index in actual;
    }));
  });

  it('should work with a positive `start`', function() {
    var array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, 'a', 1), [1, 'a', 'a']);
  });

  it('should work with a `start` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(start) {
      var array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, 'a', start), [1, 2, 3]);
    });
  });

  it('should treat falsey `start` values as `0`', function() {
    var expected = lodashStable.map(falsey, lodashStable.constant(['a', 'a', 'a']));

    var actual = lodashStable.map(falsey, function(start) {
      var array = [1, 2, 3];
      return fill(array, 'a', start);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with a negative `start`', function() {
    var array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, 'a', -1), [1, 2, 'a']);
  });

  it('should work with a negative `start` <= negative `length`', function() {
    lodashStable.each([-3, -4, -Infinity], function(start) {
      var array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, 'a', start), ['a', 'a', 'a']);
    });
  });

  it('should work with `start` >= `end`', function() {
    lodashStable.each([2, 3], function(start) {
      var array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, 'a', start, 2), [1, 2, 3]);
    });
  });

  it('should work with a positive `end`', function() {
    var array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, 'a', 0, 1), ['a', 2, 3]);
  });

  it('should work with a `end` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(end) {
      var array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, 'a', 0, end), ['a', 'a', 'a']);
    });
  });

  it('should treat falsey `end` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? ['a', 'a', 'a'] : [1, 2, 3];
    });

    var actual = lodashStable.map(falsey, function(end) {
      var array = [1, 2, 3];
      return fill(array, 'a', 0, end);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with a negative `end`', function() {
    var array = [1, 2, 3];
    assert.deepStrictEqual(fill(array, 'a', 0, -1), ['a', 'a', 3]);
  });

  it('should work with a negative `end` <= negative `length`', function() {
    lodashStable.each([-3, -4, -Infinity], function(end) {
      var array = [1, 2, 3];
      assert.deepStrictEqual(fill(array, 'a', 0, end), [1, 2, 3]);
    });
  });

  it('should coerce `start` and `end` to integers', function() {
    var positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

    var actual = lodashStable.map(positions, function(pos) {
      var array = [1, 2, 3];
      return fill.apply(_, [array, 'a'].concat(pos));
    });

    assert.deepStrictEqual(actual, [['a', 2, 3], ['a', 2, 3], ['a', 2, 3], [1, 'a', 'a'], ['a', 2, 3], [1, 2, 3]]);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [[1, 2], [3, 4]],
        actual = lodashStable.map(array, fill);

    assert.deepStrictEqual(actual, [[0, 0], [1, 1]]);
  });

  it('should return a wrapped value when chaining', function() {
    var array = [1, 2, 3],
        wrapped = _(array).fill('a'),
        actual = wrapped.value();

    assert.ok(wrapped instanceof _);
    assert.strictEqual(actual, array);
    assert.deepEqual(actual, ['a', 'a', 'a']);
  });
});
