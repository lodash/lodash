import assert from 'node:assert';
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

        assert.strictEqual(memoized(1, 2, 3), 6);
        assert.strictEqual(memoized(1, 3, 5), 6);
    });

    it('should support a `resolver`', () => {
        const fn = function (a, b, c) {
                return a + b + c;
            },
            memoized = memoize(fn, fn);

        assert.strictEqual(memoized(1, 2, 3), 6);
        assert.strictEqual(memoized(1, 3, 5), 9);
    });

    it('should use `this` binding of function for `resolver`', () => {
        const fn = function (a, b, c) {
                return a + this.b + this.c;
            },
            memoized = memoize(fn, fn);

        const object = { memoized: memoized, b: 2, c: 3 };
        assert.strictEqual(object.memoized(1), 6);

        object.b = 3;
        object.c = 5;
        assert.strictEqual(object.memoized(1), 9);
    });

    it('should throw a TypeError if `resolve` is truthy and not a function', () => {
        assert.throws(() => {
            memoize(noop, true);
        }, TypeError);
    });

    it('should not error if `resolver` is nullish', () => {
        const values = [, null, undefined],
            expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (resolver, index) => {
            try {
                return isFunction(index ? memoize(noop, resolver) : memoize(noop));
            } catch (e) {}
        });

        assert.deepStrictEqual(actual, expected);
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

        assert.deepStrictEqual(actual, props);
    });

    it('should cache the `__proto__` key', () => {
        const array = [],
            key = '__proto__';

        lodashStable.times(2, (index) => {
            let count = 0,
                resolver = index ? identity : undefined;

            const memoized = memoize(() => {
                count++;
                return array;
            }, resolver);

            const cache = memoized.cache;

            memoized(key);
            memoized(key);

            assert.strictEqual(count, 1);
            assert.strictEqual(cache.get(key), array);
            assert.ok(!(cache.__data__ instanceof Array));
            assert.strictEqual(cache.delete(key), true);
        });
    });

    it('should allow `_.memoize.Cache` to be customized', () => {
        const oldCache = memoize.Cache;
        memoize.Cache = CustomCache;

        const memoized = memoize((object) => object.id);

        const cache = memoized.cache,
            key1 = { id: 'a' },
            key2 = { id: 'b' };

        assert.strictEqual(memoized(key1), 'a');
        assert.strictEqual(cache.has(key1), true);

        assert.strictEqual(memoized(key2), 'b');
        assert.strictEqual(cache.has(key2), true);

        memoize.Cache = oldCache;
    });

    it('should works with an immutable `_.memoize.Cache` ', () => {
        const oldCache = memoize.Cache;
        memoize.Cache = ImmutableCache;

        const memoized = memoize((object) => object.id);

        const key1 = { id: 'a' },
            key2 = { id: 'b' };

        memoized(key1);
        memoized(key2);

        const cache = memoized.cache;
        assert.strictEqual(cache.has(key1), true);
        assert.strictEqual(cache.has(key2), true);

        memoize.Cache = oldCache;
    });
});
