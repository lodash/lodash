import lodashStable from 'lodash';
import { falsey } from './utils';
import castArray from '../src/castArray';

describe('castArray', () => {
    it('should wrap non-array items in an array', () => {
        const values = falsey.concat(true, 1, 'a', { a: 1 });
        const expected = lodashStable.map(values, (value) => [value]);
        const actual = lodashStable.map(values, castArray);

        expect(actual).toEqual(expected);
    });

    it('should return array values by reference', () => {
        const array = [1];
        expect(castArray(array)).toBe(array);
    });

    it('should return an empty array when no arguments are given', () => {
        expect(castArray()).toEqual([]);
    });
});
