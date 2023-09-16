import assert from 'node:assert';
import lodashStable from 'lodash';
import flattenDepth from '../src/flattenDepth';

describe('flattenDepth', () => {
    const array = [1, [2, [3, [4]], 5]];

    it('should use a default `depth` of `1`', () => {
        assert.deepStrictEqual(flattenDepth(array), [1, 2, [3, [4]], 5]);
    });

    it('should treat a `depth` of < `1` as a shallow clone', () => {
        lodashStable.each([-1, 0], (depth) => {
            assert.deepStrictEqual(flattenDepth(array, depth), [1, [2, [3, [4]], 5]]);
        });
    });

    it('should coerce `depth` to an integer', () => {
        assert.deepStrictEqual(flattenDepth(array, 2.2), [1, 2, 3, [4], 5]);
    });
});
