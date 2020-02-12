import assert from 'assert';
import lodashStable from 'lodash';

describe('uniq', function() {
  it('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', function() {
    var array = [[2, 1, 2], [1, 2, 1]],
        actual = lodashStable.map(array, lodashStable.uniq);

    assert.deepStrictEqual(actual, [[2, 1], [1, 2]]);
  });
});
