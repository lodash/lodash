import assert from 'assert';
import lodashStable from 'lodash';
import { slice } from './utils.js';
import zipWith from '../zipWith.js';
import zip from '../zip.js';

describe('zipWith', function() {
  it('should zip arrays combining grouped elements with `iteratee`', function() {
    var array1 = [1, 2, 3],
        array2 = [4, 5, 6],
        array3 = [7, 8, 9];

    var actual = zipWith(array1, array2, array3, function(a, b, c) {
      return a + b + c;
    });

    assert.deepStrictEqual(actual, [12, 15, 18]);

    var actual = zipWith(array1, [], function(a, b) {
      return a + (b || 0);
    });

    assert.deepStrictEqual(actual, [1, 2, 3]);
  });

  it('should provide correct `iteratee` arguments', function() {
    var args;

    zipWith([1, 2], [3, 4], [5, 6], function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [1, 3, 5]);
  });

  it('should perform a basic zip when `iteratee` is nullish', function() {
    var array1 = [1, 2],
        array2 = [3, 4],
        values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant(zip(array1, array2)));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? zipWith(array1, array2, value) : zipWith(array1, array2);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
