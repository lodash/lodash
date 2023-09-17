import lodashStable from 'lodash';
import { lodashBizarro, whitespace, stubZero } from './utils';
import parseInt from '../src/parseInt';

describe('parseInt', () => {
    it('should accept a `radix`', () => {
        const expected = lodashStable.range(2, 37);

        const actual = lodashStable.map(expected, (radix) => parseInt('10', radix));

        expect(actual).toEqual(expected);
    });

    it('should use a radix of `10`, for non-hexadecimals, if `radix` is `undefined` or `0`', () => {
        expect(parseInt('10')).toBe(10);
        expect(parseInt('10', 0)).toBe(10);
        expect(parseInt('10', 10)).toBe(10);
        expect(parseInt('10', undefined)).toBe(10);
    });

    it('should use a radix of `16`, for hexadecimals, if `radix` is `undefined` or `0`', () => {
        lodashStable.each(['0x20', '0X20'], (string) => {
            expect(parseInt(string)).toBe(32);
            expect(parseInt(string, 0)).toBe(32);
            expect(parseInt(string, 16)).toBe(32);
            expect(parseInt(string, undefined)).toBe(32);
        });
    });

    it('should use a radix of `10` for string with leading zeros', () => {
        expect(parseInt('08')).toBe(8);
        expect(parseInt('08', 10)).toBe(8);
    });

    it('should parse strings with leading whitespace', () => {
        const expected = [8, 8, 10, 10, 32, 32, 32, 32];

        lodashStable.times(2, (index) => {
            const actual = [];
            const func = (index ? lodashBizarro || {} : _).parseInt;

            if (func) {
                lodashStable.times(2, (otherIndex) => {
                    const string = otherIndex ? '10' : '08';
                    actual.push(func(whitespace + string, 10), func(whitespace + string));
                });

                lodashStable.each(['0x20', '0X20'], (string) => {
                    actual.push(func(whitespace + string), func(whitespace + string, 16));
                });

                expect(actual).toEqual(expected);
            }
        });
    });

    it('should coerce `radix` to a number', () => {
        const object = { valueOf: stubZero };
        expect(parseInt('08', object)).toBe(8);
        expect(parseInt('0x20', object)).toBe(32);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const strings = lodashStable.map(['6', '08', '10'], Object);
        let actual = lodashStable.map(strings, parseInt);

        expect(actual, [6, 8).toEqual(10]);

        actual = lodashStable.map('123', parseInt);
        expect(actual, [1, 2).toEqual(3]);
    });
});
