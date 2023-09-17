import lodashStable from 'lodash';
import { symbol, noop, mapCaches, LARGE_ARRAY_SIZE } from './utils';

describe('map caches', () => {
    const keys = [null, undefined, false, true, 1, -Infinity, NaN, {}, 'a', symbol || noop];

    const pairs = lodashStable.map(keys, (key, index) => {
        const lastIndex = keys.length - 1;
        return [key, keys[lastIndex - index]];
    });

    function createCaches(pairs) {
        const largeStack = new mapCaches.Stack(pairs);
        const length = pairs ? pairs.length : 0;

        lodashStable.times(LARGE_ARRAY_SIZE - length, () => {
            largeStack.set({}, {});
        });

        return {
            hashes: new mapCaches.Hash(pairs),
            'list caches': new mapCaches.ListCache(pairs),
            'map caches': new mapCaches.MapCache(pairs),
            'stack caches': new mapCaches.Stack(pairs),
            'large stacks': largeStack,
        };
    }

    lodashStable.forOwn(createCaches(pairs), (cache, kind) => {
        const isLarge = /^large/.test(kind);

        it(`should implement a \`Map\` interface for ${kind}`, () => {
            lodashStable.each(keys, (key, index) => {
                const value = pairs[index][1];

                expect(cache.get(key)).toEqual(value);
                expect(cache.has(key)).toBe(true);
                expect(cache.delete(key)).toBe(true);
                expect(cache.has(key)).toBe(false);
                expect(cache.get(key)).toBe(undefined);
                expect(cache.delete(key)).toBe(false);
                expect(cache.set(key, value)).toBe(cache);
                expect(cache.has(key)).toBe(true);
            });

            expect(cache.size).toBe(isLarge ? LARGE_ARRAY_SIZE : keys.length);
            expect(cache.clear()).toBe(undefined);
            expect(lodashStable.every(keys, (key) => !cache.has(key)));
        });
    });

    lodashStable.forOwn(createCaches(), (cache, kind) => {
        it(`should support changing values of ${kind}`, () => {
            lodashStable.each(keys, (key) => {
                cache.set(key, 1).set(key, 2);
                expect(cache.get(key)).toBe(2);
            });
        });
    });
});
