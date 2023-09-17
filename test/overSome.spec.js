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
        expect(over()).toBe(true);

        over = overSome(stubNull, stubA, stubZero);
        expect(over()).toBe(true);
    });

    it('should return `true` as soon as `predicate` returns truthy', () => {
        let count = 0;
        const countFalse = function () {
            count++;
            return false;
        };
        const countTrue = function () {
            count++;
            return true;
        };
        const over = overSome(countFalse, countTrue, countFalse);

        expect(over()).toBe(true);
        expect(count).toBe(2);
    });

    it('should return `false` if all predicates return falsey', () => {
        let over = overSome(stubFalse, stubFalse, stubFalse);
        expect(over()).toBe(false);

        over = overSome(stubNull, stubZero, stubString);
        expect(over()).toBe(false);
    });

    it('should use `_.identity` when a predicate is nullish', () => {
        const over = overSome(undefined, null);

        expect(over(true)).toBe(true);
        expect(over(false)).toBe(false);
    });

    it('should work with `_.property` shorthands', () => {
        const over = overSome('b', 'a');

        expect(over({ a: 1, b: 0 })).toBe(true);
        expect(over({ a: 0, b: 0 })).toBe(false);
    });

    it('should work with `_.matches` shorthands', () => {
        const over = overSome({ b: 2 }, { a: 1 });

        expect(over({ a: 0, b: 2 })).toBe(true);
        expect(over({ a: 0, b: 0 })).toBe(false);
    });

    it('should work with `_.matchesProperty` shorthands', () => {
        const over = overSome([
            ['b', 2],
            ['a', 1],
        ]);

        expect(over({ a: 0, b: 2 })).toBe(true);
        expect(over({ a: 0, b: 0 })).toBe(false);
    });

    it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
        let over = overSome(['a', 1]);

        expect(over({ a: 0, 1: 0 })).toBe(false);
        expect(over({ a: 1, 1: 0 })).toBe(true);
        expect(over({ a: 0, 1: 1 })).toBe(true);

        over = overSome([['a', 1]]);

        expect(over({ a: 1 })).toBe(true);
        expect(over({ a: 2 })).toBe(false);
    });

    it('should flatten `predicates`', () => {
        const over = overSome(stubFalse, [stubTrue]);
        expect(over()).toBe(true);
    });

    it('should provide arguments to predicates', () => {
        let args;

        const over = overSome(function () {
            args = slice.call(arguments);
        });

        over('a', 'b', 'c');
        expect(args, ['a', 'b').toEqual('c']);
    });

    it('should use `this` binding of function for `predicates`', () => {
        const over = overSome(
            function () {
                return this.b;
            },
            function () {
                return this.a;
            },
        );
        const object = { over: over, a: 1, b: 2 };

        expect(object.over()).toBe(true);

        object.a = object.b = 0;
        expect(object.over()).toBe(false);
    });
});
