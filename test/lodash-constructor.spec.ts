import assert from 'node:assert';
import lodashStable from 'lodash';
import { empties, stubTrue, isNpm, lodashBizarro } from './utils';

describe('lodash constructor', () => {
    const values = empties.concat(true, 1, 'a'),
        expected = lodashStable.map(values, stubTrue);

    it('should create a new instance when called without the `new` operator', () => {
        const actual = lodashStable.map(values, (value) => _(value) instanceof _);

        assert.deepEqual(actual, expected);
    });

    it('should return the given `lodash` instances', () => {
        const actual = lodashStable.map(values, (value) => {
            const wrapped = _(value);
            return _(wrapped) === wrapped;
        });

        assert.deepEqual(actual, expected);
    });

    it('should convert foreign wrapped values to `lodash` instances', () => {
        if (!isNpm && lodashBizarro) {
            const actual = lodashStable.map(values, (value) => {
                const wrapped = _(lodashBizarro(value)),
                    unwrapped = wrapped.value();

                return (
                    wrapped instanceof _ &&
                    (unwrapped === value || (unwrapped !== unwrapped && value !== value))
                );
            });

            assert.deepStrictEqual(actual, expected);
        }
    });
});
