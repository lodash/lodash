import lodashStable from 'lodash';
import shuffle from '../src/shuffle';

describe('shuffle', () => {
    const array = [1, 2, 3];
    const object = { a: 1, b: 2, c: 3 };

    it('should return a new array', () => {
        expect(shuffle(array)).not.toBe(array);
    });

    it('should contain the same elements after a collection is shuffled', () => {
        expect(shuffle(array).sort()).toEqual(array);
        expect(shuffle(object).sort()).toEqual(array);
    });

    it('should shuffle small collections', () => {
        const actual = lodashStable.times(1000, () => shuffle([1, 2]));

        expect(lodashStable.sortBy(lodashStable.uniqBy(actual, String), '0')).toEqual([
            [1, 2],
            [2, 1],
        ]);
    });

    it('should treat number values for `collection` as empty', () => {
        expect(shuffle(1)).toEqual([]);
    });
});
