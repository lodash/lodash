import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isNull from '../src/isNull';

describe('isNull', () => {
    it('should return `true` for `null` values', () => {
        expect(isNull(null)).toBe(true);
    });

    it('should return `false` for non `null` values', () => {
        const expected = lodashStable.map(falsey, (value) => value === null);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isNull(value) : isNull(),
        );

        expect(actual).toEqual(expected);

        expect(isNull(args)).toBe(false);
        expect(isNull([1, 2, 3])).toBe(false);
        expect(isNull(true)).toBe(false);
        expect(isNull(new Date())).toBe(false);
        expect(isNull(new Error())).toBe(false);
        expect(isNull(slice)).toBe(false);
        expect(isNull({ a: 1 })).toBe(false);
        expect(isNull(1)).toBe(false);
        expect(isNull(/x/)).toBe(false);
        expect(isNull('a')).toBe(false);
        expect(isNull(symbol)).toBe(false);
    });

    it('should work with nulls from another realm', () => {
        if (realm.object) {
            expect(isNull(realm.null)).toBe(true);
        }
    });
});
