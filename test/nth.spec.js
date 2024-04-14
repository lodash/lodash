import lodashStable from 'lodash';
import { falsey, stubA, stubB, noop } from './utils';
import nth from '../src/nth';

describe('nth', () => {
    const array = ['a', 'b', 'c', 'd'];

    it('should get the nth element of `array`', () => {
        const actual = lodashStable.map(array, (value, index) => nth(array, index));

        expect(actual).toEqual(array);
    });

    it('should work with a negative `n`', () => {
        const actual = lodashStable.map(lodashStable.range(1, array.length + 1), (n) =>
            nth(array, -n),
        );

        expect(actual).toEqual(['d', 'c', 'b', 'a']);
    });

    it('should coerce `n` to an integer', () => {
        let values = falsey;
        let expected = lodashStable.map(values, stubA);

        let actual = lodashStable.map(values, (n) => (n ? nth(array, n) : nth(array)));

        expect(actual).toEqual(expected);

        values = ['1', 1.6];
        expected = lodashStable.map(values, stubB);

        actual = lodashStable.map(values, (n) => nth(array, n));

        expect(actual).toEqual(expected);
    });

    it('should return `undefined` for empty arrays', () => {
        const values = [null, undefined, []];
        const expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (array) => nth(array, 1));

        expect(actual).toEqual(expected);
    });

    it('should return `undefined` for non-indexes', () => {
        const array = [1, 2];
        const values = [Infinity, array.length];
        const expected = lodashStable.map(values, noop);

        array[-1] = 3;

        const actual = lodashStable.map(values, (n) => nth(array, n));

        expect(actual).toEqual(expected);
    });
});
