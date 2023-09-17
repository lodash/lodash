import { slice } from './utils';
import sumBy from '../src/sumBy';

describe('sumBy', () => {
    const array = [6, 4, 2];
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

    it('should work with an `iteratee`', () => {
        const actual = sumBy(objects, (object) => object.a);

        expect(actual).toEqual(6);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        sumBy(array, function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual([6]);
    });

    it('should work with `_.property` shorthands', () => {
        const arrays = [[2], [3], [1]];
        expect(sumBy(arrays, 0)).toBe(6);
        expect(sumBy(objects, 'a')).toBe(6);
    });
});
