import lodashStable from 'lodash';
import { slice, doubled, falsey, stubArray } from './utils';
import times from '../src/times';

describe('times', () => {
    it('should coerce non-finite `n` values to `0`', () => {
        lodashStable.each([-Infinity, NaN, Infinity], (n) => {
            expect(times(n)).toEqual([]);
        });
    });

    it('should coerce `n` to an integer', () => {
        const actual = times(2.6, (n) => n);
        expect(actual, [0, 1]).toEqual(1);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        times(1, function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual([0]);
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant([0, 1, 2]));

        const actual = lodashStable.map(values, (value, index) =>
            index ? times(3, value) : times(3),
        );

        expect(actual).toEqual(expected);
    });

    it('should return an array of the results of each `iteratee` execution', () => {
        expect(times(3, doubled)).toEqual([0, 2, 4]);
    });

    it('should return an empty array for falsey and negative `n` values', () => {
        const values = falsey.concat(-1, -Infinity);
        const expected = lodashStable.map(values, stubArray);

        const actual = lodashStable.map(values, (value, index) => (index ? times(value) : times()));

        expect(actual).toEqual(expected);
    });
});
