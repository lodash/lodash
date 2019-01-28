import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, stubZero } from './utils.js';
import intersectionWith from '../intersectionWith.js';

describe('intersectionWith', function() {
  it('should work with a `comparator`', function() {
    var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
        others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }],
        actual = intersectionWith(objects, others, lodashStable.isEqual);

    assert.deepStrictEqual(actual, [objects[0]]);
  });

  it('should preserve the sign of `0`', function() {
    var array = [-0],
        largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubZero),
        others = [[0], largeArray],
        expected = lodashStable.map(others, lodashStable.constant(['-0']));

    var actual = lodashStable.map(others, function(other) {
      return lodashStable.map(intersectionWith(array, other, lodashStable.eq), lodashStable.toString);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
