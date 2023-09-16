import assert from 'node:assert';
import { slice } from './utils';
import sumBy from '../src/sumBy';

describe('sumBy', () => {
    const array = [6, 4, 2],
        objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

    it('should work with an `iteratee`', () => {
        const actual = sumBy(objects, (object) => object.a);

        assert.deepStrictEqual(actual, 6);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        sumBy(array, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [6]);
    });

    it('should work with `_.property` shorthands', () => {
        const arrays = [[2], [3], [1]];
        assert.strictEqual(sumBy(arrays, 0), 6);
        assert.strictEqual(sumBy(objects, 'a'), 6);
    });
});
