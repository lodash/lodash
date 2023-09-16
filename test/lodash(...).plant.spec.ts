import assert from 'node:assert';
import lodashStable from 'lodash';
import { square, isNpm } from './utils';
import compact from '../src/compact';

describe('lodash(...).plant', () => {
    it('should clone the chained sequence planting `value` as the wrapped value', () => {
        const array1 = [5, null, 3, null, 1],
            array2 = [10, null, 8, null, 6],
            wrapped1 = _(array1).thru(compact).map(square).takeRight(2).sort(),
            wrapped2 = wrapped1.plant(array2);

        assert.deepEqual(wrapped2.value(), [36, 64]);
        assert.deepEqual(wrapped1.value(), [1, 9]);
    });

    it('should clone `chainAll` settings', () => {
        const array1 = [2, 4],
            array2 = [6, 8],
            wrapped1 = _(array1).chain().map(square),
            wrapped2 = wrapped1.plant(array2);

        assert.deepEqual(wrapped2.head().value(), 36);
    });

    it('should reset iterator data on cloned sequences', () => {
        if (!isNpm && Symbol && Symbol.iterator) {
            const array1 = [2, 4],
                array2 = [6, 8],
                wrapped1 = _(array1).map(square);

            assert.deepStrictEqual(lodashStable.toArray(wrapped1), [4, 16]);
            assert.deepStrictEqual(lodashStable.toArray(wrapped1), []);

            const wrapped2 = wrapped1.plant(array2);
            assert.deepStrictEqual(lodashStable.toArray(wrapped2), [36, 64]);
        }
    });
});
