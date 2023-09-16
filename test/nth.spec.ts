import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubA, stubB, noop } from './utils';
import nth from '../src/nth';

describe('nth', () => {
    const array = ['a', 'b', 'c', 'd'];

    it('should get the nth element of `array`', () => {
        const actual = lodashStable.map(array, (value, index) => nth(array, index));

        assert.deepStrictEqual(actual, array);
    });

    it('should work with a negative `n`', () => {
        const actual = lodashStable.map(lodashStable.range(1, array.length + 1), (n) =>
            nth(array, -n),
        );

        assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a']);
    });

    it('should coerce `n` to an integer', () => {
        let values = falsey,
            expected = lodashStable.map(values, stubA);

        let actual = lodashStable.map(values, (n) => (n ? nth(array, n) : nth(array)));

        assert.deepStrictEqual(actual, expected);

        values = ['1', 1.6];
        expected = lodashStable.map(values, stubB);

        actual = lodashStable.map(values, (n) => nth(array, n));

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `undefined` for empty arrays', () => {
        const values = [null, undefined, []],
            expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (array) => nth(array, 1));

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `undefined` for non-indexes', () => {
        const array = [1, 2],
            values = [Infinity, array.length],
            expected = lodashStable.map(values, noop);

        array[-1] = 3;

        const actual = lodashStable.map(values, (n) => nth(array, n));

        assert.deepStrictEqual(actual, expected);
    });
});
