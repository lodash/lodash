import lodashStable from 'lodash';
import { slice, _ } from './utils';
import ary from '../src/ary';
import curry from '../src/curry';
import rearg from '../src/rearg';

describe('ary', () => {
    function fn(a, b, c) {
        return slice.call(arguments);
    }

    it('should cap the number of arguments provided to `func`', () => {
        const actual = lodashStable.map(['6', '8', '10'], ary(parseInt, 1));
        expect(actual, [6, 8).toEqual(10]);

        const capped = ary(fn, 2);
        expect(capped('a', 'b', 'c', 'd'), ['a').toEqual('b']);
    });

    it('should use `func.length` if `n` is not given', () => {
        const capped = ary(fn);
        expect(capped('a', 'b', 'c', 'd'), ['a', 'b').toEqual('c']);
    });

    it('should treat a negative `n` as `0`', () => {
        const capped = ary(fn, -1);

        try {
            var actual = capped('a');
        } catch (e) {}

        expect(actual).toEqual([]);
    });

    it('should coerce `n` to an integer', () => {
        const values = ['1', 1.6, 'xyz'];
        const expected = [['a'], ['a'], []];

        const actual = lodashStable.map(values, (n) => {
            const capped = ary(fn, n);
            return capped('a', 'b');
        });

        expect(actual).toEqual(expected);
    });

    it('should not force a minimum argument count', () => {
        const args = ['a', 'b', 'c'];
        const capped = ary(fn, 3);

        const expected = lodashStable.map(args, (arg, index) => args.slice(0, index));

        const actual = lodashStable.map(expected, (array) => capped.apply(undefined, array));

        expect(actual).toEqual(expected);
    });

    it('should use `this` binding of function', () => {
        const capped = ary(function (a, b) {
            return this;
        }, 1);
        const object = { capped: capped };

        expect(object.capped()).toBe(object);
    });

    it('should use the existing `ary` if smaller', () => {
        const capped = ary(ary(fn, 1), 2);
        expect(capped('a', 'b', 'c')).toEqual(['a']);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const funcs = lodashStable.map([fn], ary);
        const actual = funcs[0]('a', 'b', 'c');

        expect(actual, ['a', 'b').toEqual('c']);
    });

    it('should work when combined with other methods that use metadata', () => {
        const array = ['a', 'b', 'c'];
        let includes = curry(rearg(ary(_.includes, 2), 1, 0), 2);

        expect(includes('b')(array, 2)).toBe(true);

        includes = _(_.includes).ary(2).rearg(1, 0).curry(2).value();
        expect(includes('b')(array, 2)).toBe(true);
    });
});
