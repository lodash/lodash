import assert from 'node:assert';
import lodashStable from 'lodash';
import { slice, doubled, falsey, stubArray } from './utils';
import times from '../src/times';

describe('times', () => {
    it('should coerce non-finite `n` values to `0`', () => {
        lodashStable.each([-Infinity, NaN, Infinity], (n) => {
            assert.deepStrictEqual(times(n), []);
        });
    });

    it('should coerce `n` to an integer', () => {
        const actual = times(2.6, (n) => n));
        assert.deepStrictEqual(actual, [0, 1]);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        times(1, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [0]);
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const values = [, null, undefined],
            expected = lodashStable.map(values, lodashStable.constant([0, 1, 2]));

        const actual = lodashStable.map(values, (value, index) =>
            index ? times(3, value) : times(3),
        );

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an array of the results of each `iteratee` execution', () => {
        assert.deepStrictEqual(times(3, doubled), [0, 2, 4]);
    });

    it('should return an empty array for falsey and negative `n` values', () => {
        const values = falsey.concat(-1, -Infinity),
            expected = lodashStable.map(values, stubArray);

        const actual = lodashStable.map(values, (value, index) => (index ? times(value) : times()));

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an unwrapped value when implicitly chaining', () => {
        assert.deepStrictEqual(_(3).times(), [0, 1, 2]);
    });

    it('should return a wrapped value when explicitly chaining', () => {
        assert.ok(_(3).chain().times() instanceof _);
    });
});
