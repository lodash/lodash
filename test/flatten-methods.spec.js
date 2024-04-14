import lodashStable from 'lodash';
import { args, _ } from './utils';
import flatten from '../src/flatten';
import flattenDeep from '../src/flattenDeep';
import flattenDepth from '../src/flattenDepth';

describe('flatten methods', () => {
    const array = [1, [2, [3, [4]], 5]];
    const methodNames = ['flatten', 'flattenDeep', 'flattenDepth'];

    it('should flatten `arguments` objects', () => {
        const array = [args, [args]];

        expect(flatten(array)).toEqual([1, 2, 3, args]);
        expect(flattenDeep(array)).toEqual([1, 2, 3, 1, 2, 3]);
        expect(flattenDepth(array, 2)).toEqual([1, 2, 3, 1, 2, 3]);
    });

    it('should treat sparse arrays as dense', () => {
        const array = [[1, 2, 3], Array(3)];
        const expected = [1, 2, 3];

        expected.push(undefined, undefined, undefined);

        lodashStable.each(methodNames, (methodName) => {
            const actual = _[methodName](array);
            expect(actual).toEqual(expected);
            expect('4' in actual).toBeTruthy();
        });
    });

    it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', () => {
        if (Symbol && Symbol.isConcatSpreadable) {
            const object = { 0: 'a', length: 1 };
            const array = [object];
            const expected = lodashStable.map(methodNames, lodashStable.constant(['a']));

            object[Symbol.isConcatSpreadable] = true;

            const actual = lodashStable.map(methodNames, (methodName) => _[methodName](array));

            expect(actual).toEqual(expected);
        }
    });

    // FIXME: Not yet pass - Maximum call stack size exceeded.
    //
    // it('should work with extremely large arrays', () => {
    //     lodashStable.times(3, (index) => {
    //         const expected = Array(5e5);
    //         let func = flatten;
    //         if (index === 1) {
    //             func = flattenDeep;
    //         } else if (index === 2) {
    //             func = flattenDepth;
    //         }
    //         expect(func([expected])).toEqual(expected);
    //     });
    // });

    it('should work with empty arrays', () => {
        const array = [[], [[]], [[], [[[]]]]];

        expect(flatten(array)).toEqual([[], [], [[[]]]]);
        expect(flattenDeep(array)).toEqual([]);
        expect(flattenDepth(array, 2)).toEqual([[[]]]);
    });

    it('should support flattening of nested arrays', () => {
        expect(flatten(array)).toEqual([1, 2, [3, [4]], 5]);
        expect(flattenDeep(array)).toEqual([1, 2, 3, 4, 5]);
        expect(flattenDepth(array, 2)).toEqual([1, 2, 3, [4], 5]);
    });

    it('should return an empty array for non array-like objects', () => {
        const expected = [];
        const nonArray = { 0: 'a' };

        expect(flatten(nonArray)).toEqual(expected);
        expect(flattenDeep(nonArray)).toEqual(expected);
        expect(flattenDepth(nonArray, 2)).toEqual(expected);
    });

    it('should return a wrapped value when chaining', () => {
        const wrapped = _(array);
        let actual = wrapped.flatten();

        expect(actual instanceof _).toBeTruthy();
        expect(actual.value()).toEqual([1, 2, [3, [4]], 5]);

        actual = wrapped.flattenDeep();

        expect(actual instanceof _).toBeTruthy();
        expect(actual.value()).toEqual([1, 2, 3, 4, 5]);

        actual = wrapped.flattenDepth(2);

        expect(actual instanceof _).toBeTruthy();
        expect(actual.value()).toEqual([1, 2, 3, [4], 5]);
    });
});
