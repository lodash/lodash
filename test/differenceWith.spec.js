import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, stubOne } from './utils';
import differenceWith from '../src/differenceWith';

describe('differenceWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
        ];
        const actual = differenceWith(objects, [{ x: 1, y: 2 }], lodashStable.isEqual);

        expect(actual).toEqual([objects[1]]);
    });

    it('should preserve the sign of `0`', () => {
        const array = [-0, 1];
        const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubOne);
        const others = [[1], largeArray];
        const expected = lodashStable.map(others, lodashStable.constant(['-0']));

        const actual = lodashStable.map(others, (other) =>
            lodashStable.map(differenceWith(array, other, lodashStable.eq), lodashStable.toString),
        );

        expect(actual).toEqual(expected);
    });
});
