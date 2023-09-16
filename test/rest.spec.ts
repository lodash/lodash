import assert from 'node:assert';
import lodashStable from 'lodash';
import { slice, _ } from './utils';

describe('rest', () => {
    function fn(a, b, c) {
        return slice.call(arguments);
    }

    it('should apply a rest parameter to `func`', () => {
        const rest = _.rest(fn);
        assert.deepStrictEqual(rest(1, 2, 3, 4), [1, 2, [3, 4]]);
    });

    it('should work with `start`', () => {
        const rest = _.rest(fn, 1);
        assert.deepStrictEqual(rest(1, 2, 3, 4), [1, [2, 3, 4]]);
    });

    it('should treat `start` as `0` for `NaN` or negative values', () => {
        const values = [-1, NaN, 'a'],
            expected = lodashStable.map(values, lodashStable.constant([[1, 2, 3, 4]]));

        const actual = lodashStable.map(values, (value) => {
            const rest = _.rest(fn, value);
            return rest(1, 2, 3, 4);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should coerce `start` to an integer', () => {
        const rest = _.rest(fn, 1.6);
        assert.deepStrictEqual(rest(1, 2, 3), [1, [2, 3]]);
    });

    it('should use an empty array when `start` is not reached', () => {
        const rest = _.rest(fn);
        assert.deepStrictEqual(rest(1), [1, undefined, []]);
    });

    it('should work on functions with more than three parameters', () => {
        const rest = _.rest(function (a, b, c, d) {
            return slice.call(arguments);
        });

        assert.deepStrictEqual(rest(1, 2, 3, 4, 5), [1, 2, 3, [4, 5]]);
    });
});
