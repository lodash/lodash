import lodashStable from 'lodash';
import { empties, stubNaN } from './utils';
import mean from '../src/mean';

describe('mean', () => {
    it('should return the mean of an array of numbers', () => {
        const array = [4, 2, 8, 6];
        expect(mean(array)).toBe(5);
    });

    it('should return `NaN` when passing empty `array` values', () => {
        const expected = lodashStable.map(empties, stubNaN);
        const actual = lodashStable.map(empties, mean);

        expect(actual).toEqual(expected);
    });
});
