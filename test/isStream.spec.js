import { Readable, Writable } from 'stream';

import lodashStable from 'lodash';

import { falsey, stubFalse, args, slice, symbol } from './utils';

import isStream from '../src/isStream';

describe('isStream', () => {
    it('should return `true` for valid streams', () => {
        const readableStream = new Readable({
            read() {},
        });

        const writableStream = new Writable({
            write(chunk, encoding, callback) {
                callback();
            },
        });

        expect(isStream(readableStream)).toBe(true);
        expect(isStream(writableStream)).toBe(true);
    });

    it('should return `false` for non-stream', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isStream(value) : isStream(),
        );

        expect(actual).toEqual(expected);

        expect(isStream(args)).toBe(false);
        expect(isStream([1])).toBe(false);
        expect(isStream(true)).toBe(false);
        expect(isStream(new Date())).toBe(false);
        expect(isStream(new Error())).toBe(false);
        expect(isStream(slice)).toBe(false);
        expect(isStream({ a: 1 })).toBe(false);
        expect(isStream(1)).toBe(false);
        expect(isStream(/x/)).toBe(false);
        expect(isStream('a')).toBe(false);
        expect(isStream(symbol)).toBe(false);
    });
});
