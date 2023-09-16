import assert from 'node:assert';
import lodashStable from 'lodash';
import { empties, stubNaN } from './utils';
import mean from '../src/mean';

describe('mean', () => {
    it('should return the mean of an array of numbers', () => {
        const array = [4, 2, 8, 6];
        assert.strictEqual(mean(array), 5);
    });

    it('should return `NaN` when passing empty `array` values', () => {
        const expected = lodashStable.map(empties, stubNaN),
            actual = lodashStable.map(empties, mean);

        assert.deepStrictEqual(actual, expected);
    });
});
