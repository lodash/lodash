import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils';
import inRange from '../src/inRange';

describe('inRange', () => {
    it('should work with an `end`', () => {
        expect(inRange(3, 5)).toBe(true);
        expect(inRange(5, 5)).toBe(false);
        expect(inRange(6, 5)).toBe(false);
    });

    it('should work with a `start` and `end`', () => {
        expect(inRange(1, 1, 5)).toBe(true);
        expect(inRange(3, 1, 5)).toBe(true);
        expect(inRange(0, 1, 5)).toBe(false);
        expect(inRange(5, 1, 5)).toBe(false);
    });

    it('should treat falsey `start` as `0`', () => {
        lodashStable.each(falsey, (value, index) => {
            if (index) {
                expect(inRange(0, value)).toBe(false);
                expect(inRange(0, value, 1)).toBe(true);
            } else {
                expect(inRange(0)).toBe(false);
            }
        });
    });

    it('should swap `start` and `end` when `start` > `end`', () => {
        expect(inRange(2, 5, 1)).toBe(true);
        expect(inRange(-3, -2, -6)).toBe(true);
    });

    it('should work with a floating point `n` value', () => {
        expect(inRange(0.5, 5)).toBe(true);
        expect(inRange(1.2, 1, 5)).toBe(true);
        expect(inRange(5.2, 5)).toBe(false);
        expect(inRange(0.5, 1, 5)).toBe(false);
    });

    it('should coerce arguments to finite numbers', () => {
        const actual = [
            inRange(0, '1'),
            inRange(0, '0', 1),
            inRange(0, 0, '1'),
            inRange(0, NaN, 1),
            inRange(-1, -1, NaN),
        ];

        expect(actual).toEqual(lodashStable.map(actual,stubTrue));
    });
});
