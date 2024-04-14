import lodashStable from 'lodash';
import { identity, MAX_MEMOIZE_SIZE } from './utils';
import _memoizeCapped from '../src/.internal/memoizeCapped';

describe('memoizeCapped', () => {
    const func = _memoizeCapped;

    it('should enforce a max cache size of `MAX_MEMOIZE_SIZE`', () => {
        if (func) {
            const memoized = func(identity);
            const cache = memoized.cache;

            lodashStable.times(MAX_MEMOIZE_SIZE, memoized);
            expect(cache.size).toBe(MAX_MEMOIZE_SIZE);

            memoized(MAX_MEMOIZE_SIZE);
            expect(cache.size).toBe(1);
        }
    });
});
