import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, falsey, stubTrue } from './utils';
import startsWith from '../src/startsWith';

describe('startsWith', () => {
    const string = 'abc';

    it('should return `true` if a string starts with `target`', () => {
        expect(startsWith(string, 'a')).toBe(true);
    });

    it('should return `false` if a string does not start with `target`', () => {
        expect(startsWith(string, 'b')).toBe(false);
    });

    it('should work with a `position`', () => {
        expect(startsWith(string, 'b', 1)).toBe(true);
    });

    it('should work with `position` >= `length`', () => {
        lodashStable.each([3, 5, MAX_SAFE_INTEGER, Infinity], (position) => {
            expect(startsWith(string, 'a', position)).toBe(false);
        });
    });

    it('should treat falsey `position` values as `0`', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (position) => startsWith(string, 'a', position));

        expect(actual).toEqual(expected);
    });

    it('should treat a negative `position` as `0`', () => {
        lodashStable.each([-1, -3, -Infinity], (position) => {
            expect(startsWith(string, 'a', position)).toBe(true);
            expect(startsWith(string, 'b', position)).toBe(false);
        });
    });

    it('should coerce `position` to an integer', () => {
        expect(startsWith(string, 'bc', 1.2)).toBe(true);
    });
});
