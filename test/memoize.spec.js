import lodashStable from 'lodash';
import { noop, stubTrue, identity } from './utils';
import memoize from '../src/memoize';
import isFunction from '../src/isFunction';

describe('memoize', () => {
    function CustomCache() {
        this.clear();
    }

    CustomCache.prototype = {
        clear: function () {
            this.__data__ = [];
            return this;
        },
        get: function (key) {
            const entry = lodashStable.find(this.__data__, ['key', key]);
            return entry && entry.value;
        },
        has: function (key) {
            return lodashStable.some(this.__data__, ['key', key]);
        },
        set: function (key, value) {
            this.__data__.push({ key: key, value: value });
            return this;
        },
    };

    function ImmutableCache() {
        this.__data__ = [];
    }

    ImmutableCache.prototype = lodashStable.create(CustomCache.prototype, {
        constructor: ImmutableCache,
        clear: function () {
            return new ImmutableCache();
        },
        set: function (key, value) {
            const result = new ImmutableCache();
            result.__data__ = this.__data__.concat({ key: key, value: value });
            return result;
        },
    });

    it('should memoize results based on the first argument given', () => {
        const memoized = memoize((a, b, c) => a + b + c);

        expect(memoized(1, 2, 3)).toBe(6);
        expect(memoized(1, 3, 5)).toBe(6);
    });

    it('should support a `resolver`', () => {
        const fn = function (a, b, c) {
            return a + b + c;
        };
        const memoized = memoize(fn, fn);

        expect(memoized(1, 2, 3)).toBe(6);
        expect(memoized(1, 3, 5)).toBe(9);
    });

    it('should use `this` binding of function for `resolver`', () => {
        const fn = function (a, b, c) {
            return a + this.b + this.c;
        };
        const memoized = memoize(fn, fn);

        const object = { memoized: memoized, b: 2, c: 3 };
        expect(object.memoized(1)).toBe(6);

        object.b = 3;
        object.c = 5;
        expect(object.memoized(1)).toBe(9);
    });

    it('should throw a TypeError if `resolve` is truthy and not a function', () => {
        expect(() => {
            memoize(noop, true);
        }).toThrowError(TypeError);
    });

    it('should not error if `resolver` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (resolver, index) => {
            try {
                return isFunction(index ? memoize(noop, resolver) : memoize(noop));
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should check cache for own properties', () => {
        const props = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toLocaleString',
            'toString',
            'valueOf',
        ];

        const memoized = memoize(identity);

        const actual = lodashStable.map(props, (value) => memoized(value));

        expect(actual).toEqual(props);
    });

    it('should cache the `__proto__` key', () => {
        const array = [];
        const key = '__proto__';

        lodashStable.times(2, (index) => {
            let count = 0;
            const resolver = index ? identity : undefined;

            const memoized = memoize(() => {
                count++;
                return array;
            }, resolver);

            const cache = memoized.cache;

            memoized(key);
            memoized(key);

            expect(count).toBe(1);
            expect(cache.get(key)).toBe(array);
            expect(cache.__data__ instanceof Array).toBe(false);
            expect(cache.delete(key)).toBe(true);
        });
    });

    it('should allow `_.memoize.Cache` to be customized', () => {
        const oldCache = memoize.Cache;
        memoize.Cache = CustomCache;

        const memoized = memoize((object) => object.id);

        const cache = memoized.cache;
        const key1 = { id: 'a' };
        const key2 = { id: 'b' };

        expect(memoized(key1)).toBe('a');
        expect(cache.has(key1)).toBe(true);

        expect(memoized(key2)).toBe('b');
        expect(cache.has(key2)).toBe(true);

        memoize.Cache = oldCache;
    });

    it('should works with an immutable `_.memoize.Cache` ', () => {
        const oldCache = memoize.Cache;
        memoize.Cache = ImmutableCache;

        const memoized = memoize((object) => object.id);

        const key1 = { id: 'a' };
        const key2 = { id: 'b' };

        memoized(key1);
        memoized(key2);

        const cache = memoized.cache;
        expect(cache.has(key1)).toBe(true);
        expect(cache.has(key2)).toBe(true);

        memoize.Cache = oldCache;
    });
});
