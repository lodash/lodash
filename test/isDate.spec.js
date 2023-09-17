import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, realm } from './utils';
import isDate from '../src/isDate';

describe('isDate', () => {
    it('should return `true` for dates', () => {
        expect(isDate(new Date())).toBe(true);
    });

    it('should return `false` for non-dates', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isDate(value) : isDate(),
        );

        expect(actual).toEqual(expected);

        expect(isDate(args)).toBe(false);
        expect(isDate([1, 2, 3])).toBe(false);
        expect(isDate(true)).toBe(false);
        expect(isDate(new Error())).toBe(false);
        expect(isDate(slice)).toBe(false);
        expect(isDate({ a: 1 })).toBe(false);
        expect(isDate(1)).toBe(false);
        expect(isDate(/x/)).toBe(false);
        expect(isDate('a')).toBe(false);
        expect(isDate(symbol)).toBe(false);
    });

    it('should work with a date object from another realm', () => {
        if (realm.date) {
            expect(isDate(realm.date)).toBe(true);
        }
    });
});
