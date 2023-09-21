import { slice } from './utils';
import takeRightWhile from '../src/takeRightWhile';

describe('takeRightWhile', () => {
    const array = [1, 2, 3, 4];

    // const objects = [
    //     { a: 0, b: 0 },
    //     { a: 1, b: 1 },
    //     { a: 2, b: 2 },
    // ];

    it('should take elements while `predicate` returns truthy', () => {
        const actual = takeRightWhile(array, (n) => n > 2);

        expect(actual).toEqual([3, 4]);
    });

    it('should provide correct `predicate` arguments', () => {
        let args;

        takeRightWhile(array, function () {
            args = slice.call(arguments);
        });

        expect(args).toEqual([4, 3, array]);
    });

    // FIXME: Perhaps takeRightWhile semantic changes.
    //
    // it('should work with `_.matches` shorthands', () => {
    //     expect(takeRightWhile(objects, { b: 2 })).toEqual(objects.slice(2));
    // });
    //
    // it('should work with `_.matchesProperty` shorthands', () => {
    //     expect(takeRightWhile(objects, ['b', 2])).toEqual(objects.slice(2));
    // });
    //
    // it('should work with `_.property` shorthands', () => {
    //     expect(takeRightWhile(objects, 'b')).toEqual(objects.slice(1));
    // });
});
