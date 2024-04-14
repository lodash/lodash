import { slice } from './utils';
import meanBy from '../src/meanBy';

describe('meanBy', () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

    it('should work with an `iteratee`', () => {
        const actual = meanBy(objects, (object) => object.a);

        expect(actual).toEqual(2);
    });

    it('should provide correct `iteratee` arguments', () => {
        let args;

        meanBy(objects, function () {
            args || (args = slice.call(arguments));
        });

        expect(args).toEqual([{ a: 2 }]);
    });

    it('should work with `_.property` shorthands', () => {
        const arrays = [[2], [3], [1]];
        expect(meanBy(arrays, 0)).toBe(2);
        expect(meanBy(objects, 'a')).toBe(2);
    });
});
