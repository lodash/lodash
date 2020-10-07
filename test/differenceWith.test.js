import assert from 'assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, stubOne } from './utils.js';
import differenceWith from '../differenceWith.js';

describe('differenceWith', function() {
  it('should work with a `comparator`', function() {
    let objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
        actual = differenceWith(objects, [{ 'x': 1, 'y': 2 }], lodashStable.isEqual);

    assert.deepStrictEqual(actual, [objects[1]]);
  });

  it('should preserve the sign of `0`', function() {
    let array = [-0, 1],
        largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubOne),
        others = [[1], largeArray],
        expected = lodashStable.map(others, lodashStable.constant(['-0']));

    let actual = lodashStable.map(others, function(other) {
      return lodashStable.map(differenceWith(array, other, lodashStable.eq), lodashStable.toString);
    });

    assert.deepStrictEqual(actual, expected);
  });
});
