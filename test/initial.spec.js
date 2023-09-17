import lodashStable from 'lodash';
import { falsey, stubArray } from './utils';
import initial from '../src/initial';

describe('initial', () => {
    const array = [1, 2, 3];

    it('should accept a falsey `array`', () => {
        const expected = lodashStable.map(falsey, stubArray);

        const actual = lodashStable.map(falsey, (array, index) => {
            try {
                return index ? initial(array) : initial();
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should exclude last element', () => {
        expect(initial(array)).toEqual([1, 2]);
    });

    it('should return an empty when querying empty arrays', () => {
        expect(initial([])).toEqual([]);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const actual = lodashStable.map(array, initial);

        expect(actual).toEqual([
            [1, 2],
            [4, 5],
            [7, 8],
        ]);
    });
});
