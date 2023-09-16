import assert from 'node:assert';
import { slice, doubled, square, identity, noop } from './utils';
import overArgs from '../src/overArgs';

describe('overArgs', () => {
    function fn() {
        return slice.call(arguments);
    }

    it('should transform each argument', () => {
        const over = overArgs(fn, doubled, square);
        assert.deepStrictEqual(over(5, 10), [10, 100]);
    });

    it('should use `_.identity` when a predicate is nullish', () => {
        const over = overArgs(fn, undefined, null);
        assert.deepStrictEqual(over('a', 'b'), ['a', 'b']);
    });

    it('should work with `_.property` shorthands', () => {
        const over = overArgs(fn, 'b', 'a');
        assert.deepStrictEqual(over({ b: 2 }, { a: 1 }), [2, 1]);
    });

    it('should work with `_.matches` shorthands', () => {
        const over = overArgs(fn, { b: 1 }, { a: 1 });
        assert.deepStrictEqual(over({ b: 2 }, { a: 1 }), [false, true]);
    });

    it('should work with `_.matchesProperty` shorthands', () => {
        const over = overArgs(fn, [
            ['b', 1],
            ['a', 1],
        ]);
        assert.deepStrictEqual(over({ b: 2 }, { a: 1 }), [false, true]);
    });

    it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
        let over = overArgs(fn, ['a', 1]);
        assert.deepStrictEqual(over({ a: 1 }, { '1': 2 }), [1, 2]);

        over = overArgs(fn, [['a', 1]]);
        assert.deepStrictEqual(over({ a: 1 }), [true]);
    });

    it('should flatten `transforms`', () => {
        const over = overArgs(fn, [doubled, square], String);
        assert.deepStrictEqual(over(5, 10, 15), [10, 100, '15']);
    });

    it('should not transform any argument greater than the number of transforms', () => {
        const over = overArgs(fn, doubled, square);
        assert.deepStrictEqual(over(5, 10, 18), [10, 100, 18]);
    });

    it('should not transform any arguments if no transforms are given', () => {
        const over = overArgs(fn);
        assert.deepStrictEqual(over(5, 10, 18), [5, 10, 18]);
    });

    it('should not pass `undefined` if there are more transforms than arguments', () => {
        const over = overArgs(fn, doubled, identity);
        assert.deepStrictEqual(over(5), [10]);
    });

    it('should provide the correct argument to each transform', () => {
        const argsList = [],
            transform = function () {
                argsList.push(slice.call(arguments));
            },
            over = overArgs(noop, transform, transform, transform);

        over('a', 'b');
        assert.deepStrictEqual(argsList, [['a'], ['b']]);
    });

    it('should use `this` binding of function for `transforms`', () => {
        const over = overArgs(
            function (x) {
                return this[x];
            },
            function (x) {
                return this === x;
            },
        );

        const object = { over: over, true: 1 };
        assert.strictEqual(object.over(object), 1);
    });
});
