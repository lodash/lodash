import lodashStable from 'lodash';
import pullAllWith from '../src/pullAllWith';

describe('pullAllWith', () => {
    it('should work with a `comparator`', () => {
        const objects = [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
        ];
        const expected = [objects[0], objects[2]];
        const actual = pullAllWith(objects, [{ x: 2, y: 2 }], lodashStable.isEqual);

        expect(actual).toEqual(expected);
    });
});
