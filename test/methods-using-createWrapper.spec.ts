import assert from 'node:assert';
import lodashStable from 'lodash';
import { slice, _, push, HOT_COUNT } from './utils';
import bind from '../src/bind';
import bindKey from '../src/bindKey';
import partial from '../src/partial';
import partialRight from '../src/partialRight';
import last from '../src/last';

describe('methods using `createWrapper`', () => {
    function fn() {
        return slice.call(arguments);
    }

    const ph1 = bind.placeholder,
        ph2 = bindKey.placeholder,
        ph3 = partial.placeholder,
        ph4 = partialRight.placeholder;

    it('should work with combinations of partial functions', () => {
        const a = partial(fn),
            b = partialRight(a, 3),
            c = partial(b, 1);

        assert.deepStrictEqual(c(2), [1, 2, 3]);
    });

    it('should work with combinations of bound and partial functions', () => {
        const fn = function () {
            const result = [this.a];
            push.apply(result, arguments);
            return result;
        };

        const expected = [1, 2, 3, 4],
            object = { a: 1, fn: fn };

        let a = bindKey(object, 'fn'),
            b = partialRight(a, 4),
            c = partial(b, 2);

        assert.deepStrictEqual(c(3), expected);

        a = bind(fn, object);
        b = partialRight(a, 4);
        c = partial(b, 2);

        assert.deepStrictEqual(c(3), expected);

        a = partial(fn, 2);
        b = bind(a, object);
        c = partialRight(b, 4);

        assert.deepStrictEqual(c(3), expected);
    });

    it('should ensure `new combo` is an instance of `func`', () => {
        function Foo(a, b, c) {
            return b === 0 && object;
        }

        var combo = partial(partialRight(Foo, 3), 1),
            object = {};

        assert.ok(new combo(2) instanceof Foo);
        assert.strictEqual(new combo(0), object);
    });

    it('should work with combinations of functions with placeholders', () => {
        const expected = [1, 2, 3, 4, 5, 6],
            object = { fn: fn };

        let a = bindKey(object, 'fn', ph2, 2),
            b = partialRight(a, ph4, 6),
            c = partial(b, 1, ph3, 4);

        assert.deepStrictEqual(c(3, 5), expected);

        a = bind(fn, object, ph1, 2);
        b = partialRight(a, ph4, 6);
        c = partial(b, 1, ph3, 4);

        assert.deepStrictEqual(c(3, 5), expected);

        a = partial(fn, ph3, 2);
        b = bind(a, object, 1, ph1, 4);
        c = partialRight(b, ph4, 6);

        assert.deepStrictEqual(c(3, 5), expected);
    });

    it('should work with combinations of functions with overlapping placeholders', () => {
        const expected = [1, 2, 3, 4],
            object = { fn: fn };

        let a = bindKey(object, 'fn', ph2, 2),
            b = partialRight(a, ph4, 4),
            c = partial(b, ph3, 3);

        assert.deepStrictEqual(c(1), expected);

        a = bind(fn, object, ph1, 2);
        b = partialRight(a, ph4, 4);
        c = partial(b, ph3, 3);

        assert.deepStrictEqual(c(1), expected);

        a = partial(fn, ph3, 2);
        b = bind(a, object, ph1, 3);
        c = partialRight(b, ph4, 4);

        assert.deepStrictEqual(c(1), expected);
    });

    it('should work with recursively bound functions', () => {
        const fn = function () {
            return this.a;
        };

        const a = bind(fn, { a: 1 }),
            b = bind(a, { a: 2 }),
            c = bind(b, { a: 3 });

        assert.strictEqual(c(), 1);
    });

    it('should work when hot', () => {
        lodashStable.times(2, (index) => {
            const fn = function () {
                const result = [this];
                push.apply(result, arguments);
                return result;
            };

            const object = {},
                bound1 = index ? bind(fn, object, 1) : bind(fn, object),
                expected = [object, 1, 2, 3];

            let actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const bound2 = index ? bind(bound1, null, 2) : bind(bound1);
                    return index ? bound2(3) : bound2(1, 2, 3);
                }),
            );

            assert.deepStrictEqual(actual, expected);

            actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const bound1 = index ? bind(fn, object, 1) : bind(fn, object),
                        bound2 = index ? bind(bound1, null, 2) : bind(bound1);

                    return index ? bound2(3) : bound2(1, 2, 3);
                }),
            );

            assert.deepStrictEqual(actual, expected);
        });

        lodashStable.each(['curry', 'curryRight'], (methodName, index) => {
            const fn = function (a, b, c) {
                    return [a, b, c];
                },
                curried = _[methodName](fn),
                expected = index ? [3, 2, 1] : [1, 2, 3];

            let actual = last(lodashStable.times(HOT_COUNT, () => curried(1)(2)(3)));

            assert.deepStrictEqual(actual, expected);

            actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const curried = _[methodName](fn);
                    return curried(1)(2)(3);
                }),
            );

            assert.deepStrictEqual(actual, expected);
        });

        lodashStable.each(['partial', 'partialRight'], (methodName, index) => {
            const func = _[methodName],
                fn = function () {
                    return slice.call(arguments);
                },
                par1 = func(fn, 1),
                expected = index ? [3, 2, 1] : [1, 2, 3];

            let actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const par2 = func(par1, 2);
                    return par2(3);
                }),
            );

            assert.deepStrictEqual(actual, expected);

            actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const par1 = func(fn, 1),
                        par2 = func(par1, 2);

                    return par2(3);
                }),
            );

            assert.deepStrictEqual(actual, expected);
        });
    });
});
