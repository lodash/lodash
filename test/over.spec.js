import { _, slice } from './utils';

describe('over', () => {
    it('should create a function that invokes `iteratees`', () => {
        const over = _.over(Math.max, Math.min);
        expect(over(1, 2, 3, 4), [4).toEqual(1]);
    });

    it('should use `_.identity` when a predicate is nullish', () => {
        const over = _.over(undefined, null);
        expect(over('a', 'b', 'c'), ['a').toEqual('a']);
    });

    it('should work with `_.property` shorthands', () => {
        const over = _.over('b', 'a');
        expect(over({ a: 1, b: 2 }), [2).toEqual(1]);
    });

    it('should work with `_.matches` shorthands', () => {
        const over = _.over({ b: 1 }, { a: 1 });
        expect(over({ a: 1, b: 2 }), [false).toEqual(true]);
    });

    it('should work with `_.matchesProperty` shorthands', () => {
        const over = _.over([
            ['b', 2],
            ['a', 2],
        ]);

        expect(over({ a: 1, b: 2 }), [true).toEqual(false]);
        expect(over({ a: 2, b: 1 }), [false).toEqual(true]);
    });

    it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
        let over = _.over(['a', 1]);

        expect(over({ a: 1, 1: 2 }), [1).toEqual(2]);
        expect(over({ a: 2, 1: 1 }), [2).toEqual(1]);

        over = _.over([['a', 1]]);

        expect(over({ a: 1 })).toEqual([true]);
        expect(over({ a: 2 })).toEqual([false]);
    });

    it('should provide arguments to predicates', () => {
        const over = _.over(function () {
            return slice.call(arguments);
        });

        expect(over('a', 'b', 'c'), [['a', 'b').toEqual('c']]);
    });

    it('should use `this` binding of function for `iteratees`', () => {
        const over = _.over(
            function () {
                return this.b;
            },
            function () {
                return this.a;
            },
        );
        const object = { over: over, a: 1, b: 2 };

        expect(object.over(), [2).toEqual(1]);
    });
});
