import assert from 'node:assert';
import lodashStable from 'lodash';
import unionWith from '../src/unionWith';

describe('unionWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
                { x: 1, y: 2 },
                { x: 2, y: 1 },
            ],
            others = [
                { x: 1, y: 1 },
                { x: 1, y: 2 },
            ],
            actual = unionWith(objects, others, lodashStable.isEqual);

        assert.deepStrictEqual(actual, [objects[0], objects[1], others[0]]);
    });

    it('should output values from the first possible array', () => {
        const objects = [{ x: 1, y: 1 }],
            others = [{ x: 1, y: 2 }];

        const actual = unionWith(objects, others, (a, b) => a.x == b.x);

        assert.deepStrictEqual(actual, [{ x: 1, y: 1 }]);
    });
});
