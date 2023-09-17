import lodashStable from 'lodash';
import last from '../src/last';

describe('last', () => {
    const array = [1, 2, 3, 4];

    it('should return the last element', () => {
        expect(last(array)).toBe(4);
    });

    it('should return `undefined` when querying empty arrays', () => {
        const array = [];
        array['-1'] = 1;

        expect(last([])).toBe(undefined);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const actual = lodashStable.map(array, last);

        expect(actual).toEqual([3, 6, 9]);
    });
});
