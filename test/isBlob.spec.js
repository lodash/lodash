import lodashStable from 'lodash';
import { blob, falsey, stubFalse, args, slice, map, symbol, realm } from './utils';
import isBlob from '../src/isBlob';

describe('isBlob', () => {
    it('should return `true` for blobs', () => {
        if (Blob) {
            expect(isBlob(blob)).toBe(true);
        }
    });

    it('should return `false` for non blob', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isBlob(value) : isBlob(),
        );

        expect(actual).toEqual(expected);

        expect(isBlob(args)).toBe(false);
        expect(isBlob([1, 2, 3])).toBe(false);
        expect(isBlob(true)).toBe(false);
        expect(isBlob(new Date())).toBe(false);
        expect(isBlob(new Error())).toBe(false);
        expect(isBlob(slice)).toBe(false);
        expect(isBlob({ a: 1 })).toBe(false);
        expect(isBlob(map)).toBe(false);
        expect(isBlob(1)).toBe(false);
        expect(isBlob(/x/)).toBe(false);
        expect(isBlob('a')).toBe(false);
        expect(isBlob(symbol)).toBe(false);
    });

    it('should work with blob from another realm', () => {
        if (realm.weakMap) {
            expect(isBlob(realm.blob)).toBe(true);
        }
    });
});
