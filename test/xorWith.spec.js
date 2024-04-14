import lodashStable from 'lodash';
import xorWith from '../src/xorWith';

describe('xorWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
        ];
        const others = [
            { x: 1, y: 1 },
            { x: 1, y: 2 },
        ];
        const actual = xorWith(objects, others, lodashStable.isEqual);

        expect(actual).toEqual([objects[1], others[0]]);
    });
});
