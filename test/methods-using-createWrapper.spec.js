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

    const ph1 = bind.placeholder;
    const ph2 = bindKey.placeholder;
    const ph3 = partial.placeholder;
    const ph4 = partialRight.placeholder;

    it('should work with combinations of partial functions', () => {
        const a = partial(fn);
        const b = partialRight(a, 3);
        const c = partial(b, 1);

        expect(c(2), [1, 2).toEqual(3]);
    });

    it('should work with combinations of bound and partial functions', () => {
        const fn = function () {
            const result = [this.a];
            push.apply(result, arguments);
            return result;
        };

        const expected = [1, 2, 3, 4];
        const object = { a: 1, fn: fn };

        let a = bindKey(object, 'fn');
        let b = partialRight(a, 4);
        let c = partial(b, 2);

        expect(c(3)).toEqual(expected);

        a = bind(fn, object);
        b = partialRight(a, 4);
        c = partial(b, 2);

        expect(c(3)).toEqual(expected);

        a = partial(fn, 2);
        b = bind(a, object);
        c = partialRight(b, 4);

        expect(c(3)).toEqual(expected);
    });

    it('should ensure `new combo` is an instance of `func`', () => {
        function Foo(a, b, c) {
            return b === 0 && object;
        }

        const combo = partial(partialRight(Foo, 3), 1);
        var object = {};

        expect(new combo(2) instanceof Foo)
        expect(new combo(0)).toBe(object);
    });

    it('should work with combinations of functions with placeholders', () => {
        const expected = [1, 2, 3, 4, 5, 6];
        const object = { fn: fn };

        let a = bindKey(object, 'fn', ph2, 2);
        let b = partialRight(a, ph4, 6);
        let c = partial(b, 1, ph3, 4);

        expect(c(3, 5)).toEqual(expected);

        a = bind(fn, object, ph1, 2);
        b = partialRight(a, ph4, 6);
        c = partial(b, 1, ph3, 4);

        expect(c(3, 5)).toEqual(expected);

        a = partial(fn, ph3, 2);
        b = bind(a, object, 1, ph1, 4);
        c = partialRight(b, ph4, 6);

        expect(c(3, 5)).toEqual(expected);
    });

    it('should work with combinations of functions with overlapping placeholders', () => {
        const expected = [1, 2, 3, 4];
        const object = { fn: fn };

        let a = bindKey(object, 'fn', ph2, 2);
        let b = partialRight(a, ph4, 4);
        let c = partial(b, ph3, 3);

        expect(c(1)).toEqual(expected);

        a = bind(fn, object, ph1, 2);
        b = partialRight(a, ph4, 4);
        c = partial(b, ph3, 3);

        expect(c(1)).toEqual(expected);

        a = partial(fn, ph3, 2);
        b = bind(a, object, ph1, 3);
        c = partialRight(b, ph4, 4);

        expect(c(1)).toEqual(expected);
    });

    it('should work with recursively bound functions', () => {
        const fn = function () {
            return this.a;
        };

        const a = bind(fn, { a: 1 });
        const b = bind(a, { a: 2 });
        const c = bind(b, { a: 3 });

        expect(c()).toBe(1);
    });

    it('should work when hot', () => {
        lodashStable.times(2, (index) => {
            const fn = function () {
                const result = [this];
                push.apply(result, arguments);
                return result;
            };

            const object = {};
            const bound1 = index ? bind(fn, object, 1) : bind(fn, object);
            const expected = [object, 1, 2, 3];

            let actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const bound2 = index ? bind(bound1, null, 2) : bind(bound1);
                    return index ? bound2(3) : bound2(1, 2, 3);
                }),
            );

            expect(actual).toEqual(expected);

            actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const bound1 = index ? bind(fn, object, 1) : bind(fn, object);
                    const bound2 = index ? bind(bound1, null, 2) : bind(bound1);

                    return index ? bound2(3) : bound2(1, 2, 3);
                }),
            );

            expect(actual).toEqual(expected);
        });

        lodashStable.each(['curry', 'curryRight'], (methodName, index) => {
            const fn = function (a, b, c) {
                return [a, b, c];
            };
            const curried = _[methodName](fn);
            const expected = index ? [3, 2, 1] : [1, 2, 3];

            let actual = last(lodashStable.times(HOT_COUNT, () => curried(1)(2)(3)));

            expect(actual).toEqual(expected);

            actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const curried = _[methodName](fn);
                    return curried(1)(2)(3);
                }),
            );

            expect(actual).toEqual(expected);
        });

        lodashStable.each(['partial', 'partialRight'], (methodName, index) => {
            const func = _[methodName];
            const fn = function () {
                return slice.call(arguments);
            };
            const par1 = func(fn, 1);
            const expected = index ? [3, 2, 1] : [1, 2, 3];

            let actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const par2 = func(par1, 2);
                    return par2(3);
                }),
            );

            expect(actual).toEqual(expected);

            actual = last(
                lodashStable.times(HOT_COUNT, () => {
                    const par1 = func(fn, 1);
                    const par2 = func(par1, 2);

                    return par2(3);
                }),
            );

            expect(actual).toEqual(expected);
        });
    });
});
