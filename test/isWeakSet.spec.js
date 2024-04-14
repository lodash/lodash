import lodashStable from 'lodash';
import { weakSet, falsey, stubFalse, args, slice, set, symbol, realm } from './utils';
import isWeakSet from '../src/isWeakSet';

describe('isWeakSet', () => {
    it('should return `true` for weak sets', () => {
        if (WeakSet) {
            expect(isWeakSet(weakSet)).toBe(true);
        }
    });

    it('should return `false` for non weak sets', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isWeakSet(value) : isWeakSet(),
        );

        expect(actual).toEqual(expected);

        expect(isWeakSet(args)).toBe(false);
        expect(isWeakSet([1, 2, 3])).toBe(false);
        expect(isWeakSet(true)).toBe(false);
        expect(isWeakSet(new Date())).toBe(false);
        expect(isWeakSet(new Error())).toBe(false);
        expect(isWeakSet(slice)).toBe(false);
        expect(isWeakSet({ a: 1 })).toBe(false);
        expect(isWeakSet(1)).toBe(false);
        expect(isWeakSet(/x/)).toBe(false);
        expect(isWeakSet('a')).toBe(false);
        expect(isWeakSet(set)).toBe(false);
        expect(isWeakSet(symbol)).toBe(false);
    });

    it('should work with weak sets from another realm', () => {
        if (realm.weakSet) {
            expect(isWeakSet(realm.weakSet)).toBe(true);
        }
    });
});
