import assert from 'node:assert';
import { slice } from './utils';
import reduce from '../src/reduce';
import head from '../src/head';
import keys from '../src/keys';

describe('reduce', () => {
    const array = [1, 2, 3];

    it('should use the first element of a collection as the default `accumulator`', () => {
        assert.strictEqual(reduce(array), 1);
    });

    it('should provide correct `iteratee` arguments when iterating an array', () => {
        let args;

        reduce(
            array,
            function () {
                args || (args = slice.call(arguments));
            },
            0,
        );

        assert.deepStrictEqual(args, [0, 1, 0, array]);

        args = undefined;
        reduce(array, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [1, 2, 1, array]);
    });

    it('should provide correct `iteratee` arguments when iterating an object', () => {
        let args,
            object = { a: 1, b: 2 },
            firstKey = head(keys(object));

        let expected = firstKey == 'a' ? [0, 1, 'a', object] : [0, 2, 'b', object];

        reduce(
            object,
            function () {
                args || (args = slice.call(arguments));
            },
            0,
        );

        assert.deepStrictEqual(args, expected);

        args = undefined;
        expected = firstKey == 'a' ? [1, 2, 'b', object] : [2, 1, 'a', object];

        reduce(object, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, expected);
    });
});
