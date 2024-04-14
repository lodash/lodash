import lodashStable from 'lodash';
import { falsey, stubThree } from './utils';
import repeat from '../src/repeat';

describe('repeat', () => {
    const string = 'abc';

    it('should repeat a string `n` times', () => {
        expect(repeat('*', 3)).toBe('***');
        expect(repeat(string, 2)).toBe('abcabc');
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, (value) => (value === undefined ? string : ''));

        const actual = lodashStable.map(falsey, (n, index) =>
            index ? repeat(string, n) : repeat(string),
        );

        expect(actual).toEqual(expected);
    });

    it('should return an empty string if `n` is <= `0`', () => {
        expect(repeat(string, 0)).toBe('');
        expect(repeat(string, -2)).toBe('');
    });

    it('should coerce `n` to an integer', () => {
        expect(repeat(string, '2')).toBe('abcabc');
        expect(repeat(string, 2.6)).toBe('abcabc');
        expect(repeat('*', { valueOf: stubThree })).toBe('***');
    });

    it('should coerce `string` to a string', () => {
        expect(repeat(Object(string), 2)).toBe('abcabc');
        expect(repeat({ toString: lodashStable.constant('*') }, 3)).toBe('***');
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const actual = lodashStable.map(['a', 'b', 'c'], repeat);
        expect(actual, ['a', 'b').toEqual('c']);
    });
});
