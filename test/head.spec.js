import lodashStable from 'lodash';
import { arrayProto } from './utils';
import head from '../src/head';
import first from '../src/first';

describe('head', () => {
    const array = [1, 2, 3, 4];

    it('should return the first element', () => {
        expect(head(array)).toBe(1);
    });

    it('should return `undefined` when querying empty arrays', () => {
        arrayProto[0] = 1;
        expect(head([])).toBe(undefined);
        arrayProto.length = 0;
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const actual = lodashStable.map(array, head);

        expect(actual).toEqual([1, 4, 7]);
    });

    it('should be aliased', () => {
        expect(first).toBe(head);
    });
});
