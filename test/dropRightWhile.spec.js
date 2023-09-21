import { slice } from './utils';
import dropRightWhile from '../src/dropRightWhile';

describe('dropRightWhile', () => {
    const array = [1, 2, 3, 4];

    const objects = [
        { a: 0, b: 0 },
        { a: 1, b: 1 },
        { a: 2, b: 2 },
    ];

    it('should drop elements while `predicate` returns truthy', () => {
        const actual = dropRightWhile(array, (n) => n > 2);

        expect(actual).toEqual([1, 2]);
    });

    it('should provide correct `predicate` arguments', () => {
        let args;

        dropRightWhile(array, function () {
            args = slice.call(arguments);
        });

        expect(args).toEqual([4, 3, array]);
    });

    // FIXME: Perhaps dropRightWhile semantic changes.
    // it('should work with `_.matches` shorthands', () => {
    //     expect(dropRightWhile(objects, { b: 2 })).toEqual(objects.slice(0, 2));
    // });
    //
    // it('should work with `_.matchesProperty` shorthands', () => {
    //     expect(dropRightWhile(objects, ['b', 2])).toEqual(objects.slice(0, 2));
    // });
    //
    // it('should work with `_.property` shorthands', () => {
    //     expect(dropRightWhile(objects, 'b')).toEqual(objects.slice(0, 1));
    // });

    // FIXME: Work out a solution for _.
    //
    // it('should return a wrapped value when chaining', () => {
    //     const wrapped = _(array).dropRightWhile((n) => n > 2);
    //
    //     expect(wrapped instanceof _);
    //     expect(wrapped.value()).toEqual([1, 2]);
    // });
});
