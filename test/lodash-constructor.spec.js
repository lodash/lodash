import lodashStable from 'lodash';
import { empties, stubTrue, isNpm, lodashBizarro } from './utils';

describe('lodash constructor', () => {
    const values = empties.concat(true, 1, 'a');
    const expected = lodashStable.map(values, stubTrue);

    it('should create a new instance when called without the `new` operator', () => {
        const actual = lodashStable.map(values, (value) => _(value) instanceof _);

        expect(actual).toEqual(expected);
    });

    it('should return the given `lodash` instances', () => {
        const actual = lodashStable.map(values, (value) => {
            const wrapped = _(value);
            return _(wrapped) === wrapped;
        });

        expect(actual).toEqual(expected);
    });

    it('should convert foreign wrapped values to `lodash` instances', () => {
        if (!isNpm && lodashBizarro) {
            const actual = lodashStable.map(values, (value) => {
                const wrapped = _(lodashBizarro(value));
                const unwrapped = wrapped.value();

                return (
                    wrapped instanceof _ &&
                    (unwrapped === value || (unwrapped !== unwrapped && value !== value))
                );
            });

            expect(actual).toEqual(expected);
        }
    });
});
