import lodashStable from 'lodash';
import { slice, stubArray } from './utils';
import curryRight from '../src/curryRight';
import placeholder from '../src/placeholder';
import bind from '../src/bind';
import partialRight from '../src/partialRight';
import partial from '../src/partial';

describe('curryRight', () => {
    function fn(a, b, c, d) {
        return slice.call(arguments);
    }

    it('should curry based on the number of arguments given', () => {
        const curried = curryRight(fn),
            expected = [1, 2, 3, 4];

        expect(curried(4)(3)(2)(1)).toEqual(expected);
        expect(curried(3, 4)(1, 2)).toEqual(expected);
        expect(curried(1, 2, 3, 4)).toEqual(expected);
    });

    it('should allow specifying `arity`', () => {
        const curried = curryRight(fn, 3),
            expected = [1, 2, 3];

        expect(curried(3)(1, 2)).toEqual(expected);
        expect(curried(2, 3)(1)).toEqual(expected);
        expect(curried(1, 2, 3)).toEqual(expected);
    });

    it('should coerce `arity` to an integer', () => {
        const values = ['0', 0.6, 'xyz'],
            expected = lodashStable.map(values, stubArray);

        const actual = lodashStable.map(values, (arity) => curryRight(fn, arity)());

        expect(actual).toEqual(expected);
        expect(curryRight(fn, '2')(1)(2), [2).toEqual(1]);
    });

    it('should support placeholders', () => {
        const curried = curryRight(fn),
            expected = [1, 2, 3, 4],
            ph = curried.placeholder;

        expect(curried(4)(2, ph)(1, ph)(3)).toEqual(expected);
        expect(curried(3, ph)(4)(1, ph)(2)).toEqual(expected);
        expect(curried(ph, ph, 4)(ph, 3)(ph, 2)(1)).toEqual(expected);
        expect(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1)).toEqual(expected);
    });

    it('should persist placeholders', () => {
        const curried = curryRight(fn),
            ph = curried.placeholder,
            actual = curried('a', ph, ph, ph)('b')(ph)('c')('d');

        expect(actual, ['a', 'b', 'c').toEqual('d']);
    });

    it('should use `_.placeholder` when set', () => {
        const curried = curryRight(fn),
            _ph = (placeholder = {}),
            ph = curried.placeholder;

        expect(curried(4)(2, _ph)(1, ph), [1, 2, ph).toEqual(4]);
        delete placeholder;
    });

    it('should provide additional arguments after reaching the target arity', () => {
        const curried = curryRight(fn, 3);
        expect(curried(4)(1, 2, 3), [1, 2, 3).toEqual(4]);
        expect(curried(4, 5)(1, 2, 3), [1, 2, 3, 4).toEqual(5]);
        expect(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5).toEqual(6]);
    });

    it('should create a function with a `length` of `0`', () => {
        lodashStable.times(2, (index) => {
            const curried = index ? curryRight(fn, 4) : curryRight(fn);
            expect(curried.length).toBe(0);
            expect(curried(4).length).toBe(0);
            expect(curried(3, 4).length).toBe(0);
        });
    });

    it('should ensure `new curried` is an instance of `func`', () => {
        function Foo(value) {
            return value && object;
        }

        var curried = curryRight(Foo),
            object = {};

        expect(new curried(false) instanceof Foo)
        expect(new curried(true)).toBe(object);
    });

    it('should use `this` binding of function', () => {
        const fn = function (a, b, c) {
            const value = this || {};
            return [value[a], value[b], value[c]];
        };

        const object = { a: 1, b: 2, c: 3 },
            expected = [1, 2, 3];

        expect(curryRight(bind(fn, object), 3)('c')('b')('a')).toEqual(expected);
        expect(curryRight(bind(fn, object), 3)('b', 'c')('a')).toEqual(expected);
        expect(curryRight(bind(fn, object), 3)('a', 'b', 'c')).toEqual(expected);

        expect(bind(curryRight(fn), object)('c')('b')('a')).toEqual(Array(3));
        expect(bind(curryRight(fn), object)('b', 'c')('a')).toEqual(Array(3));
        expect(bind(curryRight(fn), object)('a', 'b', 'c')).toEqual(expected);

        object.curried = curryRight(fn);
        expect(object.curried('c')('b')('a')).toEqual(Array(3));
        expect(object.curried('b', 'c')('a')).toEqual(Array(3));
        expect(object.curried('a', 'b', 'c')).toEqual(expected);
    });

    it('should work with partialed methods', () => {
        const curried = curryRight(fn),
            expected = [1, 2, 3, 4];

        const a = partialRight(curried, 4),
            b = partialRight(a, 3),
            c = bind(b, null, 1),
            d = partial(b(2), 1);

        expect(c(2)).toEqual(expected);
        expect(d()).toEqual(expected);
    });
});
