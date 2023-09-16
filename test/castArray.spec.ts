import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey } from './utils';
import castArray from '../src/castArray';

describe('castArray', () => {
    it('should wrap non-array items in an array', () => {
        const values = falsey.concat(true, 1, 'a', { a: 1 }),
            expected = lodashStable.map(values, (value) => [value]),
            actual = lodashStable.map(values, castArray);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return array values by reference', () => {
        const array = [1];
        assert.strictEqual(castArray(array), array);
    });

    it('should return an empty array when no arguments are given', () => {
        assert.deepStrictEqual(castArray(), []);
    });
});
