import lodashStable from 'lodash';
import cond from '../src/cond';
import { stubA, stubB, stubC, slice, stubFalse, stubTrue } from './utils';

describe('cond', () => {
    it('should create a conditional function', () => {
        const resultFunc = cond([
            [lodashStable.matches({ a: 1 }), stubA],
            [lodashStable.matchesProperty('b', 1), stubB],
            [lodashStable.property('c'), stubC],
        ]);

        expect(resultFunc({ a: 1, b: 2, c: 3 })).toBe('a');
        expect(resultFunc({ a: 0, b: 1, c: 2 })).toBe('b');
        expect(resultFunc({ a: -1, b: 0, c: 1 })).toBe('c');
    });

    it('should provide arguments to functions', () => {
        let args1;
        let args2;
        const expected = ['a', 'b', 'c'];

        const resultFunc = cond([
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

        resultFunc('a', 'b', 'c');

        expect(args1).toEqual(expected);
        expect(args2).toEqual(expected);
    });

    it('should work with predicate shorthands', () => {
        const resultFunc = cond([
            [{ a: 1 }, stubA],
            [['b', 1], stubB],
            ['c', stubC],
        ]);

        expect(resultFunc({ a: 1, b: 2, c: 3 })).toBe('a');
        expect(resultFunc({ a: 0, b: 1, c: 2 })).toBe('b');
        expect(resultFunc({ a: -1, b: 0, c: 1 })).toBe('c');
    });

    it('should return `undefined` when no condition is met', () => {
        const resultFunc = cond([[stubFalse, stubA]]);
        expect(resultFunc({ a: 1 })).toBe(undefined);
    });

    it('should throw a TypeError if `pairs` is not resultFunc of functions', () => {
        lodashStable.each([false, true], (value) => {
            expect(() => {
                cond([[stubTrue, value]])();
            }).toThrowError(TypeError);
        });
    });

    it('should use `this` binding of function for `pairs`', () => {
        const resultFunc = cond([
            [
                function (a) {
                    return this[a];
                },
                function (a, b) {
                    return this[b];
                },
            ],
        ]);

        const object = { resultFunc, a: 1, b: 2 };
        expect(object.resultFunc('a', 'b')).toBe(2);
    });
});
