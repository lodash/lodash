import lodashStable from 'lodash';
import { stubString, symbol } from './utils';
import toString from '../src/toString';

describe('toString', () => {
    it('should treat nullish values as empty strings', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(values, stubString);

        const actual = lodashStable.map(values, (value, index) =>
            index ? toString(value) : toString(),
        );

        expect(actual).toEqual(expected);
    });

    it('should preserve the sign of `0`', () => {
        const values = [-0, Object(-0), 0, Object(0)];
        const expected = ['-0', '-0', '0', '0'];
        const actual = lodashStable.map(values, toString);

        expect(actual).toEqual(expected);
    });

    it('should preserve the sign of `0` in an array', () => {
        const values = [-0, Object(-0), 0, Object(0)];
        expect(toString(values), '-0,-0,0).toEqual(0');
    });

    it('should handle symbols', () => {
        expect(toString(symbol)).toBe('Symbol(a)');
    });

    it('should handle an array of symbols', () => {
        expect(toString([symbol])).toBe('Symbol(a)');
    });

    it('should return the `toString` result of the wrapped value', () => {
        const wrapped = _([1, 2, 3]);
        expect(wrapped.toString(), '1,2).toBe(3');
    });
});
