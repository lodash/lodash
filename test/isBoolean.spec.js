import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isBoolean from '../src/isBoolean';

describe('isBoolean', () => {
    it('should return `true` for booleans', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(Object(true))).toBe(true);
        expect(isBoolean(Object(false))).toBe(true);
    });

    it('should return `false` for non-booleans', () => {
        const expected = lodashStable.map(falsey, (value) => value === false);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isBoolean(value) : isBoolean(),
        );

        expect(actual).toEqual(expected);

        expect(isBoolean(args)).toBe(false);
        expect(isBoolean([1, 2, 3])).toBe(false);
        expect(isBoolean(new Date())).toBe(false);
        expect(isBoolean(new Error())).toBe(false);
        expect(isBoolean(slice)).toBe(false);
        expect(isBoolean({ a: 1 })).toBe(false);
        expect(isBoolean(1)).toBe(false);
        expect(isBoolean(/x/)).toBe(false);
        expect(isBoolean('a')).toBe(false);
        expect(isBoolean(symbol)).toBe(false);
    });

    it('should work with a boolean from another realm', () => {
        if (realm.boolean) {
            expect(isBoolean(realm.boolean)).toBe(true);
        }
    });
});
