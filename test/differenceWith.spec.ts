import assert from 'node:assert';
import lodashStable from 'lodash';
import { LARGE_ARRAY_SIZE, stubOne } from './utils';
import differenceWith from '../src/differenceWith';

describe('differenceWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
                { x: 1, y: 2 },
                { x: 2, y: 1 },
            ],
            actual = differenceWith(objects, [{ x: 1, y: 2 }], lodashStable.isEqual);

        assert.deepStrictEqual(actual, [objects[1]]);
    });

    it('should preserve the sign of `0`', () => {
        const array = [-0, 1],
            largeArray = lodashStable.times(LARGE_ARRAY_SIZE, stubOne),
            others = [[1], largeArray],
            expected = lodashStable.map(others, lodashStable.constant(['-0']));

        const actual = lodashStable.map(others, (other) =>
            lodashStable.map(differenceWith(array, other, lodashStable.eq), lodashStable.toString),
        );

        assert.deepStrictEqual(actual, expected);
    });
});
