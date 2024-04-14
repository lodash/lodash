import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, falsey, stubTrue } from './utils';
import endsWith from '../src/endsWith';

describe('endsWith', () => {
    const string = 'abc';

    it('should return `true` if a string ends with `target`', () => {
        expect(endsWith(string, 'c')).toBe(true);
    });

    it('should return `false` if a string does not end with `target`', () => {
        expect(endsWith(string, 'b')).toBe(false);
    });

    it('should work with a `position`', () => {
        expect(endsWith(string, 'b', 2)).toBe(true);
    });

    it('should work with `position` >= `length`', () => {
        lodashStable.each([3, 5, MAX_SAFE_INTEGER, Infinity], (position) => {
            expect(endsWith(string, 'c', position)).toBe(true);
        });
    });

    it('should treat falsey `position` values, except `undefined`, as `0`', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (position) =>
            endsWith(string, position === undefined ? 'c' : '', position),
        );

        expect(actual).toEqual(expected);
    });

    it('should treat a negative `position` as `0`', () => {
        lodashStable.each([-1, -3, -Infinity], (position) => {
            expect(lodashStable.every(string, (chr) => !endsWith(string, chr, position)));
            expect(endsWith(string, '', position)).toBe(true);
        });
    });

    it('should coerce `position` to an integer', () => {
        expect(endsWith(string, 'ab', 2.2)).toBe(true);
    });
});
