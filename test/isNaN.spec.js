import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isNaN from '../src/isNaN';

describe('isNaN', () => {
    it('should return `true` for NaNs', () => {
        expect(isNaN(NaN)).toBe(true);
        expect(isNaN(Object(NaN))).toBe(true);
    });

    it('should return `false` for non-NaNs', () => {
        const expected = lodashStable.map(falsey, (value) => value !== value);

        const actual = lodashStable.map(falsey, (value, index) => (index ? isNaN(value) : isNaN()));

        expect(actual).toEqual(expected);

        expect(isNaN(args)).toBe(false);
        expect(isNaN([1, 2, 3])).toBe(false);
        expect(isNaN(true)).toBe(false);
        expect(isNaN(new Date())).toBe(false);
        expect(isNaN(new Error())).toBe(false);
        expect(isNaN(slice)).toBe(false);
        expect(isNaN({ a: 1 })).toBe(false);
        expect(isNaN(1)).toBe(false);
        expect(isNaN(Object(1))).toBe(false);
        expect(isNaN(/x/)).toBe(false);
        expect(isNaN('a')).toBe(false);
        expect(isNaN(symbol)).toBe(false);
    });

    it('should work with `NaN` from another realm', () => {
        if (realm.object) {
            expect(isNaN(realm.nan)).toBe(true);
        }
    });
});
