import assert from 'node:assert';
import {
    stubFalse,
    stubOne,
    stubString,
    stubNull,
    stubA,
    stubZero,
    stubTrue,
    slice,
} from './utils';
import overSome from '../src/overSome';

describe('overSome', () => {
    it('should create a function that returns `true` if any predicates return truthy', () => {
        let over = overSome(stubFalse, stubOne, stubString);
        assert.strictEqual(over(), true);

        over = overSome(stubNull, stubA, stubZero);
        assert.strictEqual(over(), true);
    });

    it('should return `true` as soon as `predicate` returns truthy', () => {
        let count = 0,
            countFalse = function () {
                count++;
                return false;
            },
            countTrue = function () {
                count++;
                return true;
            },
            over = overSome(countFalse, countTrue, countFalse);

        assert.strictEqual(over(), true);
        assert.strictEqual(count, 2);
    });

    it('should return `false` if all predicates return falsey', () => {
        let over = overSome(stubFalse, stubFalse, stubFalse);
        assert.strictEqual(over(), false);

        over = overSome(stubNull, stubZero, stubString);
        assert.strictEqual(over(), false);
    });

    it('should use `_.identity` when a predicate is nullish', () => {
        const over = overSome(undefined, null);

        assert.strictEqual(over(true), true);
        assert.strictEqual(over(false), false);
    });

    it('should work with `_.property` shorthands', () => {
        const over = overSome('b', 'a');

        assert.strictEqual(over({ a: 1, b: 0 }), true);
        assert.strictEqual(over({ a: 0, b: 0 }), false);
    });

    it('should work with `_.matches` shorthands', () => {
        const over = overSome({ b: 2 }, { a: 1 });

        assert.strictEqual(over({ a: 0, b: 2 }), true);
        assert.strictEqual(over({ a: 0, b: 0 }), false);
    });

    it('should work with `_.matchesProperty` shorthands', () => {
        const over = overSome([
            ['b', 2],
            ['a', 1],
        ]);

        assert.strictEqual(over({ a: 0, b: 2 }), true);
        assert.strictEqual(over({ a: 0, b: 0 }), false);
    });

    it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
        let over = overSome(['a', 1]);

        assert.strictEqual(over({ a: 0, '1': 0 }), false);
        assert.strictEqual(over({ a: 1, '1': 0 }), true);
        assert.strictEqual(over({ a: 0, '1': 1 }), true);

        over = overSome([['a', 1]]);

        assert.strictEqual(over({ a: 1 }), true);
        assert.strictEqual(over({ a: 2 }), false);
    });

    it('should flatten `predicates`', () => {
        const over = overSome(stubFalse, [stubTrue]);
        assert.strictEqual(over(), true);
    });

    it('should provide arguments to predicates', () => {
        let args;

        const over = overSome(function () {
            args = slice.call(arguments);
        });

        over('a', 'b', 'c');
        assert.deepStrictEqual(args, ['a', 'b', 'c']);
    });

    it('should use `this` binding of function for `predicates`', () => {
        const over = overSome(
                function () {
                    return this.b;
                },
                function () {
                    return this.a;
                },
            ),
            object = { over: over, a: 1, b: 2 };

        assert.strictEqual(object.over(), true);

        object.a = object.b = 0;
        assert.strictEqual(object.over(), false);
    });
});
