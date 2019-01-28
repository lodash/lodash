import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('sortedIndexOf methods', function() {
  lodashStable.each(['sortedIndexOf', 'sortedLastIndexOf'], function(methodName) {
    var func = _[methodName],
        isSortedIndexOf = methodName == 'sortedIndexOf';

    it('`_.' + methodName + '` should perform a binary search', function() {
      var sorted = [4, 4, 5, 5, 6, 6];
      assert.deepStrictEqual(func(sorted, 5), isSortedIndexOf ? 2 : 3);
    });
  });
});
