import lodashStable from 'lodash';

describe('uniq', () => {
    it('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', () => {
        const array = [
            [2, 1, 2],
            [1, 2, 1],
        ];
        const actual = lodashStable.map(array, lodashStable.uniq);

        expect(actual).toEqual([
            [2, 1],
            [1, 2],
        ]);
    });
});
