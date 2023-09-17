import lodashStable from 'lodash';
import { falsey } from './utils';
import defaultTo from '../src/defaultTo';

describe('defaultTo', () => {
    it('should return a default value if `value` is `NaN` or nullish', () => {
        const expected = lodashStable.map(falsey, (value) =>
            value == null || value !== value ? 1 : value,
        );

        const actual = lodashStable.map(falsey, (value) => defaultTo(value, 1));

        expect(actual).toEqual(expected);
    });
});
