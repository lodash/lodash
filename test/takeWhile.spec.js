import { slice } from './utils';
import takeWhile from '../src/takeWhile';

describe('takeWhile', () => {
    const array = [1, 2, 3, 4];

    // const objects = [
    //     { a: 2, b: 2 },
    //     { a: 1, b: 1 },
    //     { a: 0, b: 0 },
    // ];

    it('should take elements while `predicate` returns truthy', () => {
        const actual = takeWhile(array, (n) => n < 3);

        expect(actual).toEqual([1, 2]);
    });

    it('should provide correct `predicate` arguments', () => {
        let args;

        takeWhile(array, function () {
            args = slice.call(arguments);
        });

        expect(args).toEqual([1, 0, array]);
    });

    // FIXME: Perhaps takeWhile semantic changes.
    //
    // it('should work with `_.matches` shorthands', () => {
    //     expect(takeWhile(objects, { b: 2 }), objects.slice(0).toEqual(1));
    // });
    //
    // it('should work with `_.matchesProperty` shorthands', () => {
    //     expect(takeWhile(objects, ['b', 2]), objects.slice(0).toEqual(1));
    // });
    // it('should work with `_.property` shorthands', () => {
    //     expect(takeWhile(objects, 'b'), objects.slice(0).toEqual(2));
    // });
});
