import assert from 'assert';
import lodashStable from 'lodash';
import sortedUniq from '../sortedUniq.js';

describe('sortedUniq', function() {
  it('should return unique values of a sorted array', function() {
    var expected = [1, 2, 3];

    lodashStable.each([[1, 2, 3], [1, 1, 2, 2, 3], [1, 2, 3, 3, 3, 3, 3]], function(array) {
      assert.deepStrictEqual(sortedUniq(array), expected);
    });
  });
});
