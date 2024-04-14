import lodashStable from 'lodash';
import { weakMap, falsey, stubFalse, args, slice, map, symbol, realm } from './utils';
import isWeakMap from '../src/isWeakMap';

describe('isWeakMap', () => {
    it('should return `true` for weak maps', () => {
        if (WeakMap) {
            expect(isWeakMap(weakMap)).toBe(true);
        }
    });

    it('should return `false` for non weak maps', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isWeakMap(value) : isWeakMap(),
        );

        expect(actual).toEqual(expected);

        expect(isWeakMap(args)).toBe(false);
        expect(isWeakMap([1, 2, 3])).toBe(false);
        expect(isWeakMap(true)).toBe(false);
        expect(isWeakMap(new Date())).toBe(false);
        expect(isWeakMap(new Error())).toBe(false);
        expect(isWeakMap(slice)).toBe(false);
        expect(isWeakMap({ a: 1 })).toBe(false);
        expect(isWeakMap(map)).toBe(false);
        expect(isWeakMap(1)).toBe(false);
        expect(isWeakMap(/x/)).toBe(false);
        expect(isWeakMap('a')).toBe(false);
        expect(isWeakMap(symbol)).toBe(false);
    });

    it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
        const values = [false, true];
        const expected = lodashStable.map(values, stubFalse);

        const actual = lodashStable.map(values, (value) => isWeakMap({ constructor: value }));

        expect(actual).toEqual(expected);
    });

    it('should work with weak maps from another realm', () => {
        if (realm.weakMap) {
            expect(isWeakMap(realm.weakMap)).toBe(true);
        }
    });
});
