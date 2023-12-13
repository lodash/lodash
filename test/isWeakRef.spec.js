import lodashStable from 'lodash';
import { weakRef, falsey, stubFalse, args, slice, set, map, weakSet, weakMap, symbol, realm } from './utils';
import isWeakRef from '../src/isWeakRef';

describe('isWeakRef', () => {
    it('should return `true` for weak refs', () => {
        if (WeakRef) {
            expect(isWeakRef(weakRef)).toBe(true);
        }
    });

    it('should return `false` for non weak refs', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isWeakRef(value) : isWeakRef(),
        );

        expect(actual).toEqual(expected);

        expect(isWeakRef(args)).toBe(false);
        expect(isWeakRef([1, 2, 3])).toBe(false);
        expect(isWeakRef(true)).toBe(false);
        expect(isWeakRef(new Date())).toBe(false);
        expect(isWeakRef(new Error())).toBe(false);
        expect(isWeakRef(slice)).toBe(false);
        expect(isWeakRef({ a: 1 })).toBe(false);
        expect(isWeakRef(1)).toBe(false);
        expect(isWeakRef(/x/)).toBe(false);
        expect(isWeakRef('a')).toBe(false);
        expect(isWeakRef(set)).toBe(false);
        expect(isWeakRef(map)).toBe(false);
        expect(isWeakRef(weakSet)).toBe(false);
        expect(isWeakRef(weakMap)).toBe(false);
        expect(isWeakRef(symbol)).toBe(false);
    });

    it('should work with weak refs from another realm', () => {
        if (realm.weakRef) {
            expect(isWeakRef(realm.weakRef)).toBe(true);
        }
    });
});
