import assert from 'node:assert';
import { slice } from './utils';
import meanBy from '../src/meanBy';

describe('meanBy', () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

    it('should work with an `iteratee`', () => {
        const actual = meanBy(objects, (object) => object.a);

        assert.deepStrictEqual(actual, 2);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        meanBy(objects, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [{ a: 2 }]);
    });

    it('should work with `_.property` shorthands', () => {
        const arrays = [[2], [3], [1]];
        assert.strictEqual(meanBy(arrays, 0), 2);
        assert.strictEqual(meanBy(objects, 'a'), 2);
    });
});
