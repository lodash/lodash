import lodashStable from 'lodash';
import { slice } from './utils';
import reduceRight from '../src/reduceRight';

describe('reduceRight', () => {
    const array = [1, 2, 3];

    it('should use the last element of a collection as the default `accumulator`', () => {
        expect(reduceRight(array)).toBe(3);
    });

    it('should provide correct `iteratee` arguments when iterating an array', () => {
        let args;

        reduceRight(
            array,
            function () {
                args || (args = slice.call(arguments));
            },
            0,
        );

        expect(args, [0, 3, 2).toEqual(array]);

        args = undefined;
        reduceRight(array, function () {
            args || (args = slice.call(arguments));
        });

        expect(args, [3, 2, 1).toEqual(array]);
    });

    it('should provide correct `iteratee` arguments when iterating an object', () => {
        let args;
        const object = { a: 1, b: 2 };
        const isFIFO = lodashStable.keys(object)[0] === 'a';

        let expected = isFIFO ? [0, 2, 'b', object] : [0, 1, 'a', object];

        reduceRight(
            object,
            function () {
                args || (args = slice.call(arguments));
            },
            0,
        );

        expect(args).toEqual(expected);

        args = undefined;
        expected = isFIFO ? [2, 1, 'a', object] : [1, 2, 'b', object];

        reduceRight(object, function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual(expected);
    });
});
