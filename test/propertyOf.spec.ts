import assert from 'node:assert';
import lodashStable from 'lodash';
import { noop } from './utils';
import propertyOf from '../src/propertyOf';

describe('propertyOf', () => {
    it('should create a function that plucks a property value of a given key', () => {
        const object = { a: 1 },
            propOf = propertyOf(object);

        assert.strictEqual(propOf.length, 1);
        lodashStable.each(['a', ['a']], (path) => {
            assert.strictEqual(propOf(path), 1);
        });
    });

    it('should pluck deep property values', () => {
        const object = { a: { b: 2 } },
            propOf = propertyOf(object);

        lodashStable.each(['a.b', ['a', 'b']], (path) => {
            assert.strictEqual(propOf(path), 2);
        });
    });

    it('should pluck inherited property values', () => {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        const propOf = propertyOf(new Foo());

        lodashStable.each(['b', ['b']], (path) => {
            assert.strictEqual(propOf(path), 2);
        });
    });

    it('should work with a non-string `path`', () => {
        const array = [1, 2, 3],
            propOf = propertyOf(array);

        lodashStable.each([1, [1]], (path) => {
            assert.strictEqual(propOf(path), 2);
        });
    });

    it('should preserve the sign of `0`', () => {
        const object = { '-0': 'a', '0': 'b' },
            props = [-0, Object(-0), 0, Object(0)];

        const actual = lodashStable.map(props, (key) => {
            const propOf = propertyOf(object);
            return propOf(key);
        });

        assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
    });

    it('should coerce `path` to a string', () => {
        function fn() {}
        fn.toString = lodashStable.constant('fn');

        const expected = [1, 2, 3, 4],
            object = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 },
            paths = [null, undefined, fn, {}];

        lodashStable.times(2, (index) => {
            const actual = lodashStable.map(paths, (path) => {
                const propOf = propertyOf(object);
                return propOf(index ? [path] : path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should pluck a key over a path', () => {
        const object = { 'a.b': 1, a: { b: 2 } },
            propOf = propertyOf(object);

        lodashStable.each(['a.b', ['a.b']], (path) => {
            assert.strictEqual(propOf(path), 1);
        });
    });

    it('should return `undefined` when `object` is nullish', () => {
        const values = [, null, undefined],
            expected = lodashStable.map(values, noop);

        lodashStable.each(['constructor', ['constructor']], (path) => {
            const actual = lodashStable.map(values, (value, index) => {
                const propOf = index ? propertyOf(value) : propertyOf();
                return propOf(path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` for deep paths when `object` is nullish', () => {
        const values = [, null, undefined],
            expected = lodashStable.map(values, noop);

        lodashStable.each(
            ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']],
            (path) => {
                const actual = lodashStable.map(values, (value, index) => {
                    const propOf = index ? propertyOf(value) : propertyOf();
                    return propOf(path);
                });

                assert.deepStrictEqual(actual, expected);
            },
        );
    });

    it('should return `undefined` if parts of `path` are missing', () => {
        const propOf = propertyOf({});

        lodashStable.each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], (path) => {
            assert.strictEqual(propOf(path), undefined);
        });
    });
});
