import lodashStable from 'lodash';
import { falsey, noop } from './utils';
import max from '../src/max';

describe('max', () => {
    it('should return the largest value from a collection', () => {
        expect(max([1, 2, 3])).toBe(3);
    });

    it('should return `undefined` for empty collections', () => {
        const values = falsey.concat([[]]);
        const expected = lodashStable.map(values, noop);

        const actual = lodashStable.map(values, (value, index) => {
            try {
                return index ? max(value) : max();
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should work with non-numeric collection values', () => {
        expect(max(['a', 'b'])).toBe('b');
    });
});
