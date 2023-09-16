import assert from 'node:assert';
import lodashStable from 'lodash';
import xorWith from '../src/xorWith';

describe('xorWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
                { x: 1, y: 2 },
                { x: 2, y: 1 },
            ],
            others = [
                { x: 1, y: 1 },
                { x: 1, y: 2 },
            ],
            actual = xorWith(objects, others, lodashStable.isEqual);

        assert.deepStrictEqual(actual, [objects[1], others[0]]);
    });
});
