import lodashStable from 'lodash';
import { _, stubA, stubB, stubC, slice, stubFalse, stubTrue } from './utils';

describe('cond', () => {
    it('should create a conditional function', () => {
        const cond = _.cond([
            [lodashStable.matches({ a: 1 }), stubA],
            [lodashStable.matchesProperty('b', 1), stubB],
            [lodashStable.property('c'), stubC],
        ]);

        expect(cond({ a: 1, b: 2, c: 3 })).toBe('a');
        expect(cond({ a: 0, b: 1, c: 2 })).toBe('b');
        expect(cond({ a: -1, b: 0, c: 1 })).toBe('c');
    });

    it('should provide arguments to functions', () => {
        let args1;
        let args2;
        const expected = ['a', 'b', 'c'];

        const cond = _.cond([
            [
                function () {
                    args1 || (args1 = slice.call(arguments));
                    return true;
                },
                function () {
                    args2 || (args2 = slice.call(arguments));
                },
            ],
        ]);

        cond('a', 'b', 'c');

        expect(args1).toEqual(expected);
        expect(args2).toEqual(expected);
    });

    it('should work with predicate shorthands', () => {
        const cond = _.cond([
            [{ a: 1 }, stubA],
            [['b', 1], stubB],
            ['c', stubC],
        ]);

        expect(cond({ a: 1, b: 2, c: 3 })).toBe('a');
        expect(cond({ a: 0, b: 1, c: 2 })).toBe('b');
        expect(cond({ a: -1, b: 0, c: 1 })).toBe('c');
    });

    it('should return `undefined` when no condition is met', () => {
        const cond = _.cond([[stubFalse, stubA]]);
        expect(cond({ a: 1 })).toBe(undefined);
    });

    it('should throw a TypeError if `pairs` is not composed of functions', () => {
        lodashStable.each([false, true], (value) => {
            assert.throws(() => {
                _.cond([[stubTrue, value]])();
            }, TypeError);
        });
    });

    it('should use `this` binding of function for `pairs`', () => {
        const cond = _.cond([
            [
                function (a) {
                    return this[a];
                },
                function (a, b) {
                    return this[b];
                },
            ],
        ]);

        const object = { cond: cond, a: 1, b: 2 };
        expect(object.cond('a', 'b')).toBe(2);
    });
});
