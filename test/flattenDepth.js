import assert from 'assert';
import lodashStable from 'lodash';
import flattenDepth from '../flattenDepth.js';

describe('flattenDepth', function() {
  var array = [1, [2, [3, [4]], 5]];

  it('should use a default `depth` of `1`', function() {
    assert.deepStrictEqual(flattenDepth(array), [1, 2, [3, [4]], 5]);
  });

  it('should treat a `depth` of < `1` as a shallow clone', function() {
    lodashStable.each([-1, 0], function(depth) {
      assert.deepStrictEqual(flattenDepth(array, depth), [1, [2, [3, [4]], 5]]);
    });
  });

  it('should coerce `depth` to an integer', function() {
    assert.deepStrictEqual(flattenDepth(array, 2.2), [1, 2, 3, [4], 5]);
  });
});
