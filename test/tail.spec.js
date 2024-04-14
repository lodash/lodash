import lodashStable from 'lodash';
import { falsey, stubArray } from './utils';
import tail from '../src/tail';

describe('tail', () => {
    const array = [1, 2, 3];

    it('should accept a falsey `array`', () => {
        const expected = lodashStable.map(falsey, stubArray);

        const actual = lodashStable.map(falsey, (array, index) => {
            try {
                return index ? tail(array) : tail();
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should exclude the first element', () => {
        expect(tail(array)).toEqual([2, 3]);
    });

    it('should return an empty when querying empty arrays', () => {
        expect(tail([])).toEqual([]);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const actual = lodashStable.map(array, tail);

        expect(actual).toEqual([
            [2, 3],
            [5, 6],
            [8, 9],
        ]);
    });
});
