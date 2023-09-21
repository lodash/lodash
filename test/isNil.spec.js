import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from './utils';
import isNil from '../src/isNil';

describe('isNil', () => {
    it('should return `true` for nullish values', () => {
        expect(isNil(null)).toBe(true);
        expect(isNil()).toBe(true);
        expect(isNil(undefined)).toBe(true);
    });

    it('should return `false` for non-nullish values', () => {
        const expected = lodashStable.map(falsey, (value) => value == null);

        const actual = lodashStable.map(falsey, (value, index) => (index ? isNil(value) : isNil()));

        expect(actual).toEqual(expected);

        expect(isNil(args)).toBe(false);
        expect(isNil([1, 2, 3])).toBe(false);
        expect(isNil(true)).toBe(false);
        expect(isNil(new Date())).toBe(false);
        expect(isNil(new Error())).toBe(false);
        expect(isNil(slice)).toBe(false);
        expect(isNil({ a: 1 })).toBe(false);
        expect(isNil(1)).toBe(false);
        expect(isNil(/x/)).toBe(false);
        expect(isNil('a')).toBe(false);

        if (Symbol) {
            expect(isNil(symbol)).toBe(false);
        }
    });

    it('should work with nils from another realm', () => {
        if (realm.object) {
            expect(isNil(realm.null)).toBe(true);
            expect(isNil(realm.undefined)).toBe(true);
        }
    });
});
