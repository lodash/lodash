import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils';

describe('lodash(...).unshift', () => {
    it('should prepend elements to `array`', () => {
        const array = [3],
            wrapped = _(array).unshift(1, 2),
            actual = wrapped.value();

        assert.strictEqual(actual, array);
        assert.deepEqual(actual, [1, 2, 3]);
    });

    it('should accept falsey arguments', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (value, index) => {
            try {
                const result = index ? _(value).unshift(1).value() : _().unshift(1).value();
                return lodashStable.eq(result, value);
            } catch (e) {}
        });

        assert.deepEqual(actual, expected);
    });
});
