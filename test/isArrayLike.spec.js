import lodashStable from 'lodash';
import { args, stubTrue, falsey, asyncFunc, genFunc, slice, symbol, realm } from './utils';
import isArrayLike from '../src/isArrayLike';

describe('isArrayLike', () => {
    it('should return `true` for array-like values', () => {
        const values = [args, [1, 2, 3], { 0: 'a', length: 1 }, 'a'];
        const expected = lodashStable.map(values, stubTrue);
        const actual = lodashStable.map(values, isArrayLike);

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non-arrays', () => {
        const expected = lodashStable.map(falsey, (value) => value === '');

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isArrayLike(value) : isArrayLike(),
        );

        expect(actual).toEqual(expected);

        expect(isArrayLike(true)).toBe(false);
        expect(isArrayLike(new Date())).toBe(false);
        expect(isArrayLike(new Error())).toBe(false);
        expect(isArrayLike(asyncFunc)).toBe(false);
        expect(isArrayLike(genFunc)).toBe(false);
        expect(isArrayLike(slice)).toBe(false);
        expect(isArrayLike({ a: 1 })).toBe(false);
        expect(isArrayLike(1)).toBe(false);
        expect(isArrayLike(/x/)).toBe(false);
        expect(isArrayLike(symbol)).toBe(false);
    });

    it('should work with an array from another realm', () => {
        if (realm.object) {
            const values = [realm.arguments, realm.array, realm.string];
            const expected = lodashStable.map(values, stubTrue);
            const actual = lodashStable.map(values, isArrayLike);

            expect(actual).toEqual(expected);
        }
    });
});
