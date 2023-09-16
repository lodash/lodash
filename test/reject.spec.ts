import assert from 'node:assert';
import { isEven } from './utils';
import reject from '../src/reject';

describe('reject', () => {
    const array = [1, 2, 3];

    it('should return elements the `predicate` returns falsey for', () => {
        assert.deepStrictEqual(reject(array, isEven), [1, 3]);
    });
});
