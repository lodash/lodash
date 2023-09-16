import assert from 'node:assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, stubZero } from './utils';
import intersectionWith from '../src/intersectionWith';

describe('intersectionWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
                { x: 1, y: 2 },
                { x: 2, y: 1 },
            ],
            others = [
                { x: 1, y: 1 },
                { x: 1, y: 2 },
            ],
            actual = intersectionWith(objects, others, lodashStable.isEqual);

        assert.deepStrictEqual(actual, [objects[0]]);
    });

    it('should preserve the sign of `0`', () => {
        const array = [-0],
            largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubZero),
            others = [[0], largeArray],
            expected = lodashStable.map(others, lodashStable.constant(['-0']));

        const actual = lodashStable.map(others, (other) =>
            lodashStable.map(
                intersectionWith(array, other, lodashStable.eq),
                lodashStable.toString,
            ),
        );

        assert.deepStrictEqual(actual, expected);
    });
});
