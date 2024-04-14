import lodashStable from 'lodash';
import { falsey, noop } from './utils';
import min from '../src/min';

describe('min', () => {
    it('should return the smallest value from a collection', () => {
        expect(min([1, 2, 3])).toBe(1);
    });

    it('should return `undefined` for empty collections', () => {
        const values = falsey.concat([[]]),
            expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (value: false, index: number) => {
            try {
                return index ? min(value) : min();
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should work with non-numeric collection values', () => {
        expect(min(['a', 'b'])).toBe('a');
    });
});
