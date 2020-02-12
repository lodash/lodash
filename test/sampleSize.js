import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, empties, stubArray } from './utils.js';
import sampleSize from '../sampleSize.js';

describe('sampleSize', function() {
  var array = [1, 2, 3];

  it('should return an array of random elements', function() {
    var actual = sampleSize(array, 2);

    assert.strictEqual(actual.length, 2);
    assert.deepStrictEqual(lodashStable.difference(actual, array), []);
  });

  it('should contain elements of the collection', function() {
    var actual = sampleSize(array, array.length).sort();

    assert.deepStrictEqual(actual, array);
  });

  it('should treat falsey `size` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? ['a'] : [];
    });

    var actual = lodashStable.map(falsey, function(size, index) {
      return index ? sampleSize(['a'], size) : sampleSize(['a']);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when `n` < `1` or `NaN`', function() {
    lodashStable.each([0, -1, -Infinity], function(n) {
      assert.deepStrictEqual(sampleSize(array, n), []);
    });
  });

  it('should return all elements when `n` >= `length`', function() {
    lodashStable.each([3, 4, Math.pow(2, 32), Infinity], function(n) {
      var actual = sampleSize(array, n).sort();
      assert.deepStrictEqual(actual, array);
    });
  });

  it('should coerce `n` to an integer', function() {
    var actual = sampleSize(array, 1.6);
    assert.strictEqual(actual.length, 1);
  });

  it('should return an empty array for empty collections', function() {
    var expected = lodashStable.map(empties, stubArray);

    var actual = lodashStable.transform(empties, function(result, value) {
      try {
        result.push(sampleSize(value, 1));
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should sample an object', function() {
    var object = { 'a': 1, 'b': 2, 'c': 3 },
        actual = sampleSize(object, 2);

    assert.strictEqual(actual.length, 2);
    assert.deepStrictEqual(lodashStable.difference(actual, lodashStable.values(object)), []);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map([['a']], sampleSize);
    assert.deepStrictEqual(actual, [['a']]);
  });
});
