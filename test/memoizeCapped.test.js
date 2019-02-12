import assert from 'assert';
import lodashStable from 'lodash';
import { identity, MAX_MEMOIZE_SIZE } from './utils.js';
import _memoizeCapped from '../.internal/memoizeCapped.js';

describe('memoizeCapped', function() {
  var func = _memoizeCapped;

  it('should enforce a max cache size of `MAX_MEMOIZE_SIZE`', function() {
    if (func) {
      var memoized = func(identity),
          cache = memoized.cache;

      lodashStable.times(MAX_MEMOIZE_SIZE, memoized);
      assert.strictEqual(cache.size, MAX_MEMOIZE_SIZE);

      memoized(MAX_MEMOIZE_SIZE);
      assert.strictEqual(cache.size, 1);
    }
  });
});
