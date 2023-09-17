import lodashStable from 'lodash';
import { stubTrue, stubFalse, args, symbol } from './utils';
import isFinite from '../src/isFinite';

describe('isFinite', () => {
    it('should return `true` for finite values', () => {
        const values = [0, 1, 3.14, -1];
        const expected = lodashStable.map(values, stubTrue);
        const actual = lodashStable.map(values, isFinite);

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non-finite values', () => {
        const values = [NaN, Infinity, -Infinity, Object(1)];
        const expected = lodashStable.map(values, stubFalse);
        const actual = lodashStable.map(values, isFinite);

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non-numeric values', () => {
        const values = [undefined, [], true, '', ' ', '2px'];
        const expected = lodashStable.map(values, stubFalse);
        const actual = lodashStable.map(values, isFinite);

        expect(actual).toEqual(expected);

        expect(isFinite(args)).toBe(false);
        expect(isFinite([1, 2, 3])).toBe(false);
        expect(isFinite(true)).toBe(false);
        expect(isFinite(new Date())).toBe(false);
        expect(isFinite(new Error())).toBe(false);
        expect(isFinite({ a: 1 })).toBe(false);
        expect(isFinite(/x/)).toBe(false);
        expect(isFinite('a')).toBe(false);
        expect(isFinite(symbol)).toBe(false);
    });

    it('should return `false` for numeric string values', () => {
        const values = ['2', '0', '08'];
        const expected = lodashStable.map(values, stubFalse);
        const actual = lodashStable.map(values, isFinite);

        expect(actual).toEqual(expected);
    });
});
