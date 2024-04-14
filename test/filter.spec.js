import { isEven } from './utils';
import filter from '../src/filter';

describe('filter', () => {
    const array = [1, 2, 3];

    it('should return elements `predicate` returns truthy for', () => {
        expect(filter(array, isEven)).toEqual([2]);
    });
});
