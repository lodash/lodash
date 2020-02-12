import assert from 'assert';
import lodashStable from 'lodash';
import { slice, doubled, falsey, stubArray } from './utils.js';
import times from '../times.js';
import identity from '../identity.js';

describe('times', function() {
  it('should coerce non-finite `n` values to `0`', function() {
    lodashStable.each([-Infinity, NaN, Infinity], function(n) {
      assert.deepStrictEqual(times(n), []);
    });
  });

  it('should coerce `n` to an integer', function() {
    var actual = times(2.6, identity);
    assert.deepStrictEqual(actual, [0, 1]);
  });

  it('should provide correct `iteratee` arguments', function() {
    var args;

    times(1, function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [0]);
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant([0, 1, 2]));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? times(3, value) : times(3);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an array of the results of each `iteratee` execution', function() {
    assert.deepStrictEqual(times(3, doubled), [0, 2, 4]);
  });

  it('should return an empty array for falsey and negative `n` values', function() {
    var values = falsey.concat(-1, -Infinity),
        expected = lodashStable.map(values, stubArray);

    var actual = lodashStable.map(values, function(value, index) {
      return index ? times(value) : times();
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    assert.deepStrictEqual(_(3).times(), [0, 1, 2]);
  });

  it('should return a wrapped value when explicitly chaining', function() {
    assert.ok(_(3).chain().times() instanceof _);
  });
});
