import lodashStable from 'lodash';
import { slice, _ } from './utils';

describe('rest', () => {
    function fn(a, b, c) {
        return slice.call(arguments);
    }

    it('should apply a rest parameter to `func`', () => {
        const rest = _.rest(fn);
        expect(rest(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
    });

    it('should work with `start`', () => {
        const rest = _.rest(fn, 1);
        expect(rest(1, 2, 3, 4)).toEqual([1, [2, 3, 4]]);
    });

    it('should treat `start` as `0` for `NaN` or negative values', () => {
        const values = [-1, NaN, 'a'];
        const expected = lodashStable.map(values, lodashStable.constant([[1, 2, 3, 4]]));

        const actual = lodashStable.map(values, (value) => {
            const rest = _.rest(fn, value);
            return rest(1, 2, 3, 4);
        });

        expect(actual).toEqual(expected);
    });

    it('should coerce `start` to an integer', () => {
        const rest = _.rest(fn, 1.6);
        expect(rest(1, 2, 3)).toEqual([1, [2, 3]]);
    });

    it('should use an empty array when `start` is not reached', () => {
        const rest = _.rest(fn);
        expect(rest(1)).toEqual([1, undefined, []]);
    });

    it('should work on functions with more than three parameters', () => {
        const rest = _.rest(function (a, b, c, d) {
            return slice.call(arguments);
        });

        expect(rest(1, 2, 3, 4, 5)).toEqual([1, 2, 3, [4, 5]]);
    });
});
