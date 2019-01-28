import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, isEven } from './utils.js';
import uniqWith from '../uniqWith.js';

describe('uniqWith', function() {
  it('should work with a `comparator`', function() {
    var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }],
        actual = uniqWith(objects, lodashStable.isEqual);

    assert.deepStrictEqual(actual, [objects[0], objects[1]]);
  });

  it('should preserve the sign of `0`', function() {
    var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, function(index) {
      return isEven(index) ? -0 : 0;
    });

    var arrays = [[-0, 0], largeArray],
        expected = lodashStable.map(arrays, lodashStable.constant(['-0']));

    var actual = lodashStable.map(arrays, function(array) {
      return lodashStable.map(uniqWith(array, lodashStable.eq), lodashStable.toString);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
