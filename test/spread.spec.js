import lodashStable from 'lodash';
import { slice, _, stubTrue, falsey } from './utils';

describe('spread', () => {
    function fn(a, b, c) {
        return slice.call(arguments);
    }

    it('should spread arguments to `func`', () => {
        const spread = _.spread(fn);
        const expected = [1, 2];

        expect(spread([1, 2])).toEqual(expected);
        expect(spread([1, 2], 3)).toEqual(expected);
    });

    it('should accept a falsey `array`', () => {
        const spread = _.spread(stubTrue);
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (array, index) => {
            try {
                return index ? spread(array) : spread();
            } catch (e) {}
        });

        expect(actual).toEqual(expected);
    });

    it('should work with `start`', () => {
        const spread = _.spread(fn, 1);
        const expected = [1, 2, 3];

        expect(spread(1, [2, 3])).toEqual(expected);
        expect(spread(1, [2, 3], 4)).toEqual(expected);
    });

    it('should treat `start` as `0` for negative or `NaN` values', () => {
        const values = [-1, NaN, 'a'];
        const expected = lodashStable.map(values, lodashStable.constant([1, 2]));

        const actual = lodashStable.map(values, (value) => {
            const spread = _.spread(fn, value);
            return spread([1, 2]);
        });

        expect(actual).toEqual(expected);
    });

    it('should coerce `start` to an integer', () => {
        const spread = _.spread(fn, 1.6);
        const expected = [1, 2, 3];

        expect(spread(1, [2, 3])).toEqual(expected);
        expect(spread(1, [2, 3], 4)).toEqual(expected);
    });
});
