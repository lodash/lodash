import assert from 'node:assert';
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

        assert.deepStrictEqual(actual, [1, 2]);
    });

    it('should provide correct `predicate` arguments', () => {
        let args;

        dropRightWhile(array, function () {
            args = slice.call(arguments);
        });

        assert.deepStrictEqual(args, [4, 3, array]);
    });

    it('should work with `_.matches` shorthands', () => {
        assert.deepStrictEqual(dropRightWhile(objects, { b: 2 }), objects.slice(0, 2));
    });

    it('should work with `_.matchesProperty` shorthands', () => {
        assert.deepStrictEqual(dropRightWhile(objects, ['b', 2]), objects.slice(0, 2));
    });

    it('should work with `_.property` shorthands', () => {
        assert.deepStrictEqual(dropRightWhile(objects, 'b'), objects.slice(0, 1));
    });

    it('should return a wrapped value when chaining', () => {
        const wrapped = _(array).dropRightWhile((n) => n > 2);

        assert.ok(wrapped instanceof _);
        assert.deepEqual(wrapped.value(), [1, 2]);
    });
});
