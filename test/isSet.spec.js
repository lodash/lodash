import lodashStable from 'lodash';
import { set, falsey, stubFalse, args, slice, symbol, weakSet, realm } from './utils';
import isSet from '../src/isSet';

describe('isSet', () => {
    it('should return `true` for sets', () => {
        if (Set) {
            expect(isSet(set)).toBe(true);
        }
    });

    it('should return `false` for non-sets', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) => (index ? isSet(value) : isSet()));

        expect(actual).toEqual(expected);

        expect(isSet(args)).toBe(false);
        expect(isSet([1, 2, 3])).toBe(false);
        expect(isSet(true)).toBe(false);
        expect(isSet(new Date())).toBe(false);
        expect(isSet(new Error())).toBe(false);
        expect(isSet(slice)).toBe(false);
        expect(isSet({ a: 1 })).toBe(false);
        expect(isSet(1)).toBe(false);
        expect(isSet(/x/)).toBe(false);
        expect(isSet('a')).toBe(false);
        expect(isSet(symbol)).toBe(false);
        expect(isSet(weakSet)).toBe(false);
    });

    it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
        const values = [false, true];
        const expected = lodashStable.map(values, stubFalse);

        const actual = lodashStable.map(values, (value) => isSet({ constructor: value }));

        expect(actual).toEqual(expected);
    });

    it('should work with weak sets from another realm', () => {
        if (realm.set) {
            expect(isSet(realm.set)).toBe(true);
        }
    });
});
