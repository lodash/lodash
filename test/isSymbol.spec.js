import lodashStable from 'lodash';
import { symbol, falsey, stubFalse, args, slice, realm } from './utils';
import isSymbol from '../src/isSymbol';

describe('isSymbol', () => {
    it('should return `true` for symbols', () => {
        if (Symbol) {
            expect(isSymbol(symbol)).toBe(true);
            expect(isSymbol(Object(symbol))).toBe(true);
        }
    });

    it('should return `false` for non-symbols', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isSymbol(value) : isSymbol(),
        );

        expect(actual).toEqual(expected);

        expect(isSymbol(args)).toBe(false);
        expect(isSymbol([1, 2, 3])).toBe(false);
        expect(isSymbol(true)).toBe(false);
        expect(isSymbol(new Date())).toBe(false);
        expect(isSymbol(new Error())).toBe(false);
        expect(isSymbol(slice)).toBe(false);
        expect(isSymbol({ 0: 1, length: 1 })).toBe(false);
        expect(isSymbol(1)).toBe(false);
        expect(isSymbol(/x/)).toBe(false);
        expect(isSymbol('a')).toBe(false);
    });

    it('should work with symbols from another realm', () => {
        if (Symbol && realm.symbol) {
            expect(isSymbol(realm.symbol)).toBe(true);
        }
    });
});
