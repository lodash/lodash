import lodashStable from 'lodash';
import { arrayBuffer, falsey, stubFalse, args, slice, symbol, realm } from './utils';
import isArrayBuffer from '../src/isArrayBuffer';

describe('isArrayBuffer', () => {
    it('should return `true` for array buffers', () => {
        if (ArrayBuffer) {
            expect(isArrayBuffer(arrayBuffer)).toBe(true);
        }
    });

    it('should return `false` for non array buffers', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isArrayBuffer(value) : isArrayBuffer(),
        );

        expect(actual).toEqual(expected);

        expect(isArrayBuffer(args)).toBe(false);
        expect(isArrayBuffer([1])).toBe(false);
        expect(isArrayBuffer(true)).toBe(false);
        expect(isArrayBuffer(new Date())).toBe(false);
        expect(isArrayBuffer(new Error())).toBe(false);
        expect(isArrayBuffer(slice)).toBe(false);
        expect(isArrayBuffer({ a: 1 })).toBe(false);
        expect(isArrayBuffer(1)).toBe(false);
        expect(isArrayBuffer(/x/)).toBe(false);
        expect(isArrayBuffer('a')).toBe(false);
        expect(isArrayBuffer(symbol)).toBe(false);
    });

    it('should work with array buffers from another realm', () => {
        if (realm.arrayBuffer) {
            expect(isArrayBuffer(realm.arrayBuffer)).toBe(true);
        }
    });
});
