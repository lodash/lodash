import lodashStable from 'lodash';
import { map, falsey, stubFalse, args, slice, symbol, weakMap, realm } from './utils';
import isMap from '../src/isMap';

describe('isMap', () => {
    it('should return `true` for maps', () => {
        if (Map) {
            expect(isMap(map)).toBe(true);
        }
    });

    it('should return `false` for non-maps', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) => (index ? isMap(value) : isMap()));

        expect(actual).toEqual(expected);

        expect(isMap(args)).toBe(false);
        expect(isMap([1, 2, 3])).toBe(false);
        expect(isMap(true)).toBe(false);
        expect(isMap(new Date())).toBe(false);
        expect(isMap(new Error())).toBe(false);
        expect(isMap(slice)).toBe(false);
        expect(isMap({ a: 1 })).toBe(false);
        expect(isMap(1)).toBe(false);
        expect(isMap(/x/)).toBe(false);
        expect(isMap('a')).toBe(false);
        expect(isMap(symbol)).toBe(false);
        expect(isMap(weakMap)).toBe(false);
    });

    it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
        const values = [false, true];
        const expected = lodashStable.map(values, stubFalse);

        const actual = lodashStable.map(values, (value) => isMap({ constructor: value }));

        expect(actual).toEqual(expected);
    });

    it('should work with maps from another realm', () => {
        if (realm.map) {
            expect(isMap(realm.map)).toBe(true);
        }
    });
});
