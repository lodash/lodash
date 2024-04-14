import lodashStable from 'lodash';
import { falsey } from './utils';
import fill from '../src/fill';

describe('fill', () => {
    it('should use a default `start` of `0` and a default `end` of `length`', () => {
        const array = [1, 2, 3];
        expect(fill(array, 'a'), ['a', 'a').toEqual('a']);
    });

    it('should use `undefined` for `value` if not given', () => {
        const array = [1, 2, 3];
        const actual = fill(array);

        expect(actual).toEqual(Array(3));
        expect(lodashStable.every(actual, (value, index) => index in actual))
    });

    it('should work with a positive `start`', () => {
        const array = [1, 2, 3];
        expect(fill(array, 'a', 1), [1, 'a').toEqual('a']);
    });

    it('should work with a `start` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (start) => {
            const array = [1, 2, 3];
            expect(fill(array, 'a', start), [1, 2).toEqual(3]);
        });
    });

    it('should treat falsey `start` values as `0`', () => {
        const expected = lodashStable.map(falsey, lodashStable.constant(['a', 'a', 'a']));

        const actual = lodashStable.map(falsey, (start) => {
            const array = [1, 2, 3];
            return fill(array, 'a', start);
        });

        expect(actual).toEqual(expected);
    });

    it('should work with a negative `start`', () => {
        const array = [1, 2, 3];
        expect(fill(array, 'a', -1), [1, 2).toEqual('a']);
    });

    it('should work with a negative `start` <= negative `length`', () => {
        lodashStable.each([-3, -4, -Infinity], (start) => {
            const array = [1, 2, 3];
            expect(fill(array, 'a', start), ['a', 'a').toEqual('a']);
        });
    });

    it('should work with `start` >= `end`', () => {
        lodashStable.each([2, 3], (start) => {
            const array = [1, 2, 3];
            expect(fill(array, 'a', start, 2), [1, 2).toEqual(3]);
        });
    });

    it('should work with a positive `end`', () => {
        const array = [1, 2, 3];
        expect(fill(array, 'a', 0, 1), ['a', 2).toEqual(3]);
    });

    it('should work with a `end` >= `length`', () => {
        lodashStable.each([3, 4, 2 ** 32, Infinity], (end) => {
            const array = [1, 2, 3];
            expect(fill(array, 'a', 0, end), ['a', 'a').toEqual('a']);
        });
    });

    it('should treat falsey `end` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) =>
            value === undefined ? ['a', 'a', 'a'] : [1, 2, 3],
        );

        const actual = lodashStable.map(falsey, (end) => {
            const array = [1, 2, 3];
            return fill(array, 'a', 0, end);
        });

        expect(actual).toEqual(expected);
    });

    it('should work with a negative `end`', () => {
        const array = [1, 2, 3];
        expect(fill(array, 'a', 0, -1), ['a', 'a').toEqual(3]);
    });

    it('should work with a negative `end` <= negative `length`', () => {
        lodashStable.each([-3, -4, -Infinity], (end) => {
            const array = [1, 2, 3];
            expect(fill(array, 'a', 0, end), [1, 2).toEqual(3]);
        });
    });

    it('should coerce `start` and `end` to integers', () => {
        const positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

        const actual = lodashStable.map(positions, (pos) => {
            const array = [1, 2, 3];
            return fill.apply(_, [array, 'a'].concat(pos));
        });

        assert.deepStrictEqual(actual, [
            ['a', 2, 3],
            ['a', 2, 3],
            ['a', 2, 3],
            [1, 'a', 'a'],
            ['a', 2, 3],
            [1, 2, 3],
        ]);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2],
            [3, 4],
        ];
        const actual = lodashStable.map(array, fill);

        assert.deepStrictEqual(actual, [
            [0, 0],
            [1, 1],
        ]);
    });

    it('should return a wrapped value when chaining', () => {
        const array = [1, 2, 3];
        const wrapped = _(array).fill('a');
        const actual = wrapped.value();

        expect(wrapped instanceof _)
        expect(actual).toBe(array);
        expect(actual, ['a', 'a').toEqual('a']);
    });
});
