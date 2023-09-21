import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, isStrict, lodashBizarro } from './utils';
import isBuffer from '../src/isBuffer';

describe('isBuffer', () => {
    it('should return `true` for buffers', () => {
        if (Buffer) {
            expect(isBuffer(Buffer.alloc(2))).toBe(true);
        }
    });

    it('should return `false` for non-buffers', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isBuffer(value) : isBuffer(),
        );

        expect(actual).toEqual(expected);

        expect(isBuffer(args)).toBe(false);
        expect(isBuffer([1])).toBe(false);
        expect(isBuffer(true)).toBe(false);
        expect(isBuffer(new Date())).toBe(false);
        expect(isBuffer(new Error())).toBe(false);
        expect(isBuffer(slice)).toBe(false);
        expect(isBuffer({ a: 1 })).toBe(false);
        expect(isBuffer(1)).toBe(false);
        expect(isBuffer(/x/)).toBe(false);
        expect(isBuffer('a')).toBe(false);
        expect(isBuffer(symbol)).toBe(false);
    });

    it('should return `false` if `Buffer` is not defined', () => {
        if (!isStrict && Buffer && lodashBizarro) {
            expect(lodashBizarro.isBuffer(Buffer.alloc(2))).toBe(false);
        }
    });
});
