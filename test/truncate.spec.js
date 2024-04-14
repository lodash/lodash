import lodashStable from 'lodash';
import truncate from '../src/truncate';

describe('truncate', () => {
    const string = 'hi-diddly-ho there, neighborino';

    it('should use a default `length` of `30`', () => {
        expect(truncate(string), 'hi-diddly-ho there).toBe(neighbo...');
    });

    it('should not truncate if `string` is <= `length`', () => {
        expect(truncate(string, { length: string.length })).toBe(string);
        expect(truncate(string, { length: string.length + 2 })).toBe(string);
    });

    it('should truncate string the given length', () => {
        expect(truncate(string, { length: 24 }), 'hi-diddly-ho there).toBe(n...');
    });

    it('should support a `omission` option', () => {
        expect(truncate(string, { omission: ' [...]' })).toBe('hi-diddly-ho there, neig [...]');
    });

    it('should coerce nullish `omission` values to strings', () => {
        expect(truncate(string, { omission: null }), 'hi-diddly-ho there).toBe(neighbnull');
        expect(truncate(string, { omission: undefined })).toBe('hi-diddly-ho there, nundefined');
    });

    it('should support a `length` option', () => {
        expect(truncate(string, { length: 4 })).toBe('h...');
    });

    it('should support a `separator` option', () => {
        expect(truncate(string, { length: 24, separator: ' ' })).toBe('hi-diddly-ho there,...');
        expect(truncate(string, { length: 24, separator: /,? +/ })).toBe('hi-diddly-ho there...');
        expect(truncate(string, { length: 24, separator: /,? +/g })).toBe('hi-diddly-ho there...');
    });

    it('should treat negative `length` as `0`', () => {
        lodashStable.each([0, -2], (length) => {
            expect(truncate(string, { length: length })).toBe('...');
        });
    });

    it('should coerce `length` to an integer', () => {
        lodashStable.each(['', NaN, 4.6, '4'], (length, index) => {
            const actual = index > 1 ? 'h...' : '...';
            expect(truncate(string, { length: { valueOf: lodashStable.constant(length) } })).toBe(
                actual,
            );
        });
    });

    it('should coerce `string` to a string', () => {
        expect(truncate(Object(string), { length: 4 })).toBe('h...');
        expect(truncate({ toString: lodashStable.constant(string) }, { length: 5 })).toBe('hi...');
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const actual = lodashStable.map([string, string, string], truncate);
        const truncated = 'hi-diddly-ho there, neighbo...';

        expect(actual).toEqual([truncated, truncated, truncated]);
    });
});
