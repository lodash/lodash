import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils';

describe('lodash(...).sort', () => {
    it('should return the wrapped sorted `array`', () => {
        const array = [3, 1, 2],
            wrapped = _(array).sort(),
            actual = wrapped.value();

        assert.strictEqual(actual, array);
        assert.deepEqual(actual, [1, 2, 3]);
    });

    it('should accept falsey arguments', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (value, index) => {
            try {
                const result = index ? _(value).sort().value() : _().sort().value();
                return lodashStable.eq(result, value);
            } catch (e) {}
        });

        assert.deepEqual(actual, expected);
    });
});
