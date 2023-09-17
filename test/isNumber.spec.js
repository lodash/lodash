import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isNumber from '../src/isNumber';

describe('isNumber', () => {
    it('should return `true` for numbers', () => {
        expect(isNumber(0)).toBe(true);
        expect(isNumber(Object(0))).toBe(true);
        expect(isNumber(NaN)).toBe(true);
    });

    it('should return `false` for non-numbers', () => {
        const expected = lodashStable.map(falsey, (value) => typeof value === 'number');

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isNumber(value) : isNumber(),
        );

        expect(actual).toEqual(expected);

        expect(isNumber(args)).toBe(false);
        expect(isNumber([1, 2, 3])).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber(new Date())).toBe(false);
        expect(isNumber(new Error())).toBe(false);
        expect(isNumber(slice)).toBe(false);
        expect(isNumber({ a: 1 })).toBe(false);
        expect(isNumber(/x/)).toBe(false);
        expect(isNumber('a')).toBe(false);
        expect(isNumber(symbol)).toBe(false);
    });

    it('should work with numbers from another realm', () => {
        if (realm.number) {
            expect(isNumber(realm.number)).toBe(true);
        }
    });
});
