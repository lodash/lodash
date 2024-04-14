import lodashStable from 'lodash';
import { slice } from './utils';
import unzipWith from '../src/unzipWith';
import unzip from '../src/unzip';

describe('unzipWith', () => {
    it('should unzip arrays combining regrouped elements with `iteratee`', () => {
        const array = [
            [1, 4],
            [2, 5],
            [3, 6],
        ];

        const actual = unzipWith(array, (a, b, c) => a + b + c);

        expect(actual).toEqual([6, 15]);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        unzipWith(
            [
                [1, 3, 5],
                [2, 4, 6],
            ],
            function () {
                args || (args = slice.call(arguments));
            },
        );

        expect(args).toEqual([1, 2]);
    });

    it('should perform a basic unzip when `iteratee` is nullish', () => {
        const array = [
            [1, 3],
            [2, 4],
        ];
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant(unzip(array)));

        const actual = lodashStable.map(values, (value, index) =>
            index ? unzipWith(array, value) : unzipWith(array),
        );

        expect(actual).toEqual(expected);
    });
});
