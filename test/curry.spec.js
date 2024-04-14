import lodashStable from 'lodash';
import { slice, stubArray } from './utils';
import curry from '../src/curry';
import placeholder from '../src/placeholder';
import bind from '../src/bind';
import partial from '../src/partial';
import partialRight from '../src/partialRight';

describe('curry', () => {
    function fn(a, b, c, d) {
        return slice.call(arguments);
    }

    it('should curry based on the number of arguments given', () => {
        const curried = curry(fn),
            expected = [1, 2, 3, 4];

        expect(curried(1)(2)(3)(4)).toEqual(expected);
        expect(curried(1, 2)(3, 4)).toEqual(expected);
        expect(curried(1, 2, 3, 4)).toEqual(expected);
    });

    it('should allow specifying `arity`', () => {
        const curried = curry(fn, 3),
            expected = [1, 2, 3];

        expect(curried(1)(2, 3)).toEqual(expected);
        expect(curried(1, 2)(3)).toEqual(expected);
        expect(curried(1, 2, 3)).toEqual(expected);
    });

    it('should coerce `arity` to an integer', () => {
        const values = ['0', 0.6, 'xyz'],
            expected = lodashStable.map(values, stubArray);

        const actual = lodashStable.map(values, (arity) => curry(fn, arity)());

        expect(actual).toEqual(expected);
        expect(curry(fn, '2')(1)(2), [1).toEqual(2]);
    });

    it('should support placeholders', () => {
        const curried = curry(fn),
            ph = curried.placeholder;

        expect(curried(1)(ph, 3)(ph, 4)(2), [1, 2, 3).toEqual(4]);
        expect(curried(ph, 2)(1)(ph, 4)(3), [1, 2, 3).toEqual(4]);
        expect(curried(ph, ph, 3)(ph, 2)(ph, 4)(1), [1, 2, 3).toEqual(4]);
        expect(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1), [1, 2, 3).toEqual(4]);
    });

    it('should persist placeholders', () => {
        const curried = curry(fn),
            ph = curried.placeholder,
            actual = curried(ph, ph, ph, 'd')('a')(ph)('b')('c');

        expect(actual, ['a', 'b', 'c').toEqual('d']);
    });

    it('should use `_.placeholder` when set', () => {
        const curried = curry(fn),
            _ph = (placeholder = {}),
            ph = curried.placeholder;

        expect(curried(1)(_ph, 3)(ph, 4), [1, ph, 3).toEqual(4]);
        delete placeholder;
    });

    it('should provide additional arguments after reaching the target arity', () => {
        const curried = curry(fn, 3);
        expect(curried(1)(2, 3, 4), [1, 2, 3).toEqual(4]);
        expect(curried(1, 2)(3, 4, 5), [1, 2, 3, 4).toEqual(5]);
        expect(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5).toEqual(6]);
    });

    it('should create a function with a `length` of `0`', () => {
        lodashStable.times(2, (index) => {
            const curried = index ? curry(fn, 4) : curry(fn);
            expect(curried.length).toBe(0);
            expect(curried(1).length).toBe(0);
            expect(curried(1, 2).length).toBe(0);
        });
    });

    it('should ensure `new curried` is an instance of `func`', () => {
        function Foo(value) {
            return value && object;
        }

        var curried = curry(Foo),
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

        expect(curry(bind(fn, object), 3)('a')('b')('c')).toEqual(expected);
        expect(curry(bind(fn, object), 3)('a', 'b')('c')).toEqual(expected);
        expect(curry(bind(fn, object), 3)('a', 'b', 'c')).toEqual(expected);

        expect(bind(curry(fn), object)('a')('b')('c')).toEqual(Array(3));
        expect(bind(curry(fn), object)('a', 'b')('c')).toEqual(Array(3));
        expect(bind(curry(fn), object)('a', 'b', 'c')).toEqual(expected);

        object.curried = curry(fn);
        expect(object.curried('a')('b')('c')).toEqual(Array(3));
        expect(object.curried('a', 'b')('c')).toEqual(Array(3));
        expect(object.curried('a', 'b', 'c')).toEqual(expected);
    });

    it('should work with partialed methods', () => {
        const curried = curry(fn),
            expected = [1, 2, 3, 4];

        const a = partial(curried, 1),
            b = bind(a, null, 2),
            c = partialRight(b, 4),
            d = partialRight(b(3), 4);

        expect(c(3)).toEqual(expected);
        expect(d()).toEqual(expected);
    });
});
