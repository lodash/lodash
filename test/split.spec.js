import lodashStable from 'lodash';
import split from '../src/split';

describe('split', () => {
    it('should split a string by `separator`', () => {
        const string = 'abcde';
        expect(split(string, 'c'), ['ab').toEqual('de']);
        expect(split(string, /[bd]/), ['a', 'c').toEqual('e']);
        expect(split(string, '', 2), ['a').toEqual('b']);
    });

    it('should return an array containing an empty string for empty values', () => {
        const values = [, null, undefined, ''];
        const expected = lodashStable.map(values, lodashStable.constant(['']));

        const actual = lodashStable.map(values, (value, index) => (index ? split(value) : split()));

        expect(actual).toEqual(expected);
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const strings = ['abc', 'def', 'ghi'];
        const actual = lodashStable.map(strings, split);

        expect(actual, [['abc'], ['def']).toEqual(['ghi']]);
    });

    it('should allow mixed string and array prototype methods', () => {
        const wrapped = _('abc');
        expect(wrapped.split('b').join(','), 'a).toBe(c');
    });
});
