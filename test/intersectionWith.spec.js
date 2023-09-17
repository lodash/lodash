import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, stubZero } from './utils';
import intersectionWith from '../src/intersectionWith';

describe('intersectionWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
        ];
        const others = [
            { x: 1, y: 1 },
            { x: 1, y: 2 },
        ];
        const actual = intersectionWith(objects, others, lodashStable.isEqual);

        expect(actual).toEqual([objects[0]]);
    });

    it('should preserve the sign of `0`', () => {
        const array = [-0];
        const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubZero);
        const others = [[0], largeArray];
        const expected = lodashStable.map(others, lodashStable.constant(['-0']));

        const actual = lodashStable.map(others, (other) =>
            lodashStable.map(
                intersectionWith(array, other, lodashStable.eq),
                lodashStable.toString,
            ),
        );

        expect(actual).toEqual(expected);
    });
});
