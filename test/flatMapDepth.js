import assert from 'assert';
import lodashStable from 'lodash';
import { identity } from './utils.js';
import flatMapDepth from '../flatMapDepth.js';

describe('flatMapDepth', function() {
  var array = [1, [2, [3, [4]], 5]];

  it('should use a default `depth` of `1`', function() {
    assert.deepStrictEqual(flatMapDepth(array, identity), [1, 2, [3, [4]], 5]);
  });

  it('should use `_.identity` when `iteratee` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, lodashStable.constant([1, 2, [3, [4]], 5]));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? flatMapDepth(array, value) : flatMapDepth(array);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should treat a `depth` of < `1` as a shallow clone', function() {
    lodashStable.each([-1, 0], function(depth) {
      assert.deepStrictEqual(flatMapDepth(array, identity, depth), [1, [2, [3, [4]], 5]]);
    });
  });

  it('should coerce `depth` to an integer', function() {
    assert.deepStrictEqual(flatMapDepth(array, identity, 2.2), [1, 2, 3, [4], 5]);
  });
});
