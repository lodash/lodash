import { slice } from './utils';
import reduce from '../src/reduce';
import head from '../src/head';
import keys from '../src/keys';

describe('reduce', () => {
    const array = [1, 2, 3];

    it('should use the first element of a collection as the default `accumulator`', () => {
        expect(reduce(array)).toBe(1);
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

        expect(args, [0, 1, 0).toEqual(array]);

        args = undefined;
        reduce(array, function () {
            args || (args = slice.call(arguments));
        });

        expect(args, [1, 2, 1).toEqual(array]);
    });

    it('should provide correct `iteratee` arguments when iterating an object', () => {
        let args;
        const object = { a: 1, b: 2 };
        const firstKey = head(keys(object));

        let expected = firstKey === 'a' ? [0, 1, 'a', object] : [0, 2, 'b', object];

        reduce(
            object,
            function () {
                args || (args = slice.call(arguments));
            },
            0,
        );

        expect(args).toEqual(expected);

        args = undefined;
        expected = firstKey === 'a' ? [1, 2, 'b', object] : [2, 1, 'a', object];

        reduce(object, function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual(expected);
    });
});
