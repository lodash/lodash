import assert from 'node:assert';
import lodashStable from 'lodash';
import { identity, MAX_MEMOIZE_SIZE } from './utils';
import _memoizeCapped from '../src/.internal/memoizeCapped';

describe('memoizeCapped', () => {
    const func = _memoizeCapped;

    it('should enforce a max cache size of `MAX_MEMOIZE_SIZE`', () => {
        if (func) {
            const memoized = func(identity),
                cache = memoized.cache;

            lodashStable.times(MAX_MEMOIZE_SIZE, memoized);
            assert.strictEqual(cache.size, MAX_MEMOIZE_SIZE);

            memoized(MAX_MEMOIZE_SIZE);
            assert.strictEqual(cache.size, 1);
        }
    });
});
