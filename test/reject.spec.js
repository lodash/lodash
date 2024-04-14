import { isEven } from './utils';
import reject from '../src/reject';

describe('reject', () => {
    const array = [1, 2, 3];

    it('should return elements the `predicate` returns falsey for', () => {
        expect(reject(array, isEven)).toEqual([1, 3]);
    });
});
