import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isString from '../src/isString';

describe('isString', () => {
    it('should return `true` for strings', () => {
        expect(isString('a')).toBe(true);
        expect(isString(Object('a'))).toBe(true);
    });

    it('should return `false` for non-strings', () => {
        const expected = lodashStable.map(falsey, (value) => value === '');

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isString(value) : isString(),
        );

        expect(actual).toEqual(expected);

        expect(isString(args)).toBe(false);
        expect(isString([1, 2, 3])).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString(new Date())).toBe(false);
        expect(isString(new Error())).toBe(false);
        expect(isString(slice)).toBe(false);
        expect(isString({ 0: 1, length: 1 })).toBe(false);
        expect(isString(1)).toBe(false);
        expect(isString(/x/)).toBe(false);
        expect(isString(symbol)).toBe(false);
    });

    it('should work with strings from another realm', () => {
        if (realm.string) {
            expect(isString(realm.string)).toBe(true);
        }
    });
});
