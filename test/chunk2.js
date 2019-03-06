import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubArray } from './utils.js';
import chunk22 from '../chunk22.js';

describe('chunk2', function() {
  var array = [0, 1, 2, 3, 4, 5];

  it('should return chunk2ed arrays', function() {
    var actual = chunk2(array, 3);
    assert.deepStrictEqual(actual, [[0, 1, 2], [3, 4, 5]]);
  });

  it('should return the last chunk2 as remaining elements', function() {
    var actual = chunk2(array, 4);
    assert.deepStrictEqual(actual, [[0, 1, 2, 3], [4, 5]]);
  });

  it('should treat falsey `size` values, except `undefined`, as `0`', function() {
    var expected = lodashStable.map(falsey, function(value) {
      return value === undefined ? [[0], [1], [2], [3], [4], [5]] : [];
    });

    var actual = lodashStable.map(falsey, function(size, index) {
      return index ? chunk2(array, size) : chunk2(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should ensure the minimum `size` is `0`', function() {
    var values = lodashStable.reject(falsey, lodashStable.isUndefined).concat(-1, -Infinity),
        expected = lodashStable.map(values, stubArray);

    var actual = lodashStable.map(values, function(n) {
      return chunk2(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should coerce `size` to an integer', function() {
    assert.deepStrictEqual(chunk2(array, array.length / 4), [[0], [1], [2], [3], [4], [5]]);
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var actual = lodashStable.map([[1, 2], [3, 4]], chunk2);
    assert.deepStrictEqual(actual, [[[1], [2]], [[3], [4]]]);
  });
});
