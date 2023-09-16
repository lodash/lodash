import assert from 'node:assert';
import { isEven, slice } from './utils';
import remove from '../src/remove';

describe('remove', () => {
    it('should modify the array and return removed elements', () => {
        const array = [1, 2, 3, 4],
            actual = remove(array, isEven);

        assert.deepStrictEqual(array, [1, 3]);
        assert.deepStrictEqual(actual, [2, 4]);
    });

    it('should provide correct `predicate` arguments', () => {
        const argsList = [],
            array = [1, 2, 3],
            clone = array.slice();

        remove(array, function (n, index) {
            const args = slice.call(arguments);
            args[2] = args[2].slice();
            argsList.push(args);
            return isEven(index);
        });

        assert.deepStrictEqual(argsList, [
            [1, 0, clone],
            [2, 1, clone],
            [3, 2, clone],
        ]);
    });

    it('should work with `_.matches` shorthands', () => {
        const objects = [
            { a: 0, b: 1 },
            { a: 1, b: 2 },
        ];
        remove(objects, { a: 1 });
        assert.deepStrictEqual(objects, [{ a: 0, b: 1 }]);
    });

    it('should work with `_.matchesProperty` shorthands', () => {
        const objects = [
            { a: 0, b: 1 },
            { a: 1, b: 2 },
        ];
        remove(objects, ['a', 1]);
        assert.deepStrictEqual(objects, [{ a: 0, b: 1 }]);
    });

    it('should work with `_.property` shorthands', () => {
        const objects = [{ a: 0 }, { a: 1 }];
        remove(objects, 'a');
        assert.deepStrictEqual(objects, [{ a: 0 }]);
    });

    it('should preserve holes in arrays', () => {
        const array = [1, 2, 3, 4];
        delete array[1];
        delete array[3];

        remove(array, (n) => n === 1);

        assert.ok(!('0' in array));
        assert.ok(!('2' in array));
    });

    it('should treat holes as `undefined`', () => {
        const array = [1, 2, 3];
        delete array[1];

        remove(array, (n) => n === null);

        assert.deepStrictEqual(array, [1, 3]);
    });

    it('should not mutate the array until all elements to remove are determined', () => {
        const array = [1, 2, 3];

        remove(array, (n, index) => isEven(index));

        assert.deepStrictEqual(array, [2]);
    });
});
