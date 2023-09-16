import assert from 'node:assert';
import lodashStable from 'lodash';
import { lodashBizarro, whitespace, stubZero } from './utils';
import parseInt from '../src/parseInt';

describe('parseInt', () => {
    it('should accept a `radix`', () => {
        const expected = lodashStable.range(2, 37);

        const actual = lodashStable.map(expected, (radix) => parseInt('10', radix));

        assert.deepStrictEqual(actual, expected);
    });

    it('should use a radix of `10`, for non-hexadecimals, if `radix` is `undefined` or `0`', () => {
        assert.strictEqual(parseInt('10'), 10);
        assert.strictEqual(parseInt('10', 0), 10);
        assert.strictEqual(parseInt('10', 10), 10);
        assert.strictEqual(parseInt('10', undefined), 10);
    });

    it('should use a radix of `16`, for hexadecimals, if `radix` is `undefined` or `0`', () => {
        lodashStable.each(['0x20', '0X20'], (string) => {
            assert.strictEqual(parseInt(string), 32);
            assert.strictEqual(parseInt(string, 0), 32);
            assert.strictEqual(parseInt(string, 16), 32);
            assert.strictEqual(parseInt(string, undefined), 32);
        });
    });

    it('should use a radix of `10` for string with leading zeros', () => {
        assert.strictEqual(parseInt('08'), 8);
        assert.strictEqual(parseInt('08', 10), 8);
    });

    it('should parse strings with leading whitespace', () => {
        const expected = [8, 8, 10, 10, 32, 32, 32, 32];

        lodashStable.times(2, (index) => {
            const actual = [],
                func = (index ? lodashBizarro || {} : _).parseInt;

            if (func) {
                lodashStable.times(2, (otherIndex) => {
                    const string = otherIndex ? '10' : '08';
                    actual.push(func(whitespace + string, 10), func(whitespace + string));
                });

                lodashStable.each(['0x20', '0X20'], (string) => {
                    actual.push(func(whitespace + string), func(whitespace + string, 16));
                });

                assert.deepStrictEqual(actual, expected);
            }
        });
    });

    it('should coerce `radix` to a number', () => {
        const object = { valueOf: stubZero };
        assert.strictEqual(parseInt('08', object), 8);
        assert.strictEqual(parseInt('0x20', object), 32);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        let strings = lodashStable.map(['6', '08', '10'], Object),
            actual = lodashStable.map(strings, parseInt);

        assert.deepStrictEqual(actual, [6, 8, 10]);

        actual = lodashStable.map('123', parseInt);
        assert.deepStrictEqual(actual, [1, 2, 3]);
    });
});
