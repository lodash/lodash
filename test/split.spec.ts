import assert from 'node:assert';
import lodashStable from 'lodash';
import split from '../src/split';

describe('split', () => {
    it('should split a string by `separator`', () => {
        const string = 'abcde';
        assert.deepStrictEqual(split(string, 'c'), ['ab', 'de']);
        assert.deepStrictEqual(split(string, /[bd]/), ['a', 'c', 'e']);
        assert.deepStrictEqual(split(string, '', 2), ['a', 'b']);
    });

    it('should return an array containing an empty string for empty values', () => {
        const values = [, null, undefined, ''],
            expected = lodashStable.map(values, lodashStable.constant(['']));

        const actual = lodashStable.map(values, (value, index) => (index ? split(value) : split()));

        assert.deepStrictEqual(actual, expected);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const strings = ['abc', 'def', 'ghi'],
            actual = lodashStable.map(strings, split);

        assert.deepStrictEqual(actual, [['abc'], ['def'], ['ghi']]);
    });

    it('should allow mixed string and array prototype methods', () => {
        const wrapped = _('abc');
        assert.strictEqual(wrapped.split('b').join(','), 'a,c');
    });
});
