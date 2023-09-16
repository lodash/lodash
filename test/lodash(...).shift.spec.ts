import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils';

describe('lodash(...).shift', () => {
    it('should remove elements from the front of `array`', () => {
        const array = [1, 2],
            wrapped = _(array);

        assert.strictEqual(wrapped.shift(), 1);
        assert.deepEqual(wrapped.value(), [2]);
        assert.strictEqual(wrapped.shift(), 2);

        const actual = wrapped.value();
        assert.strictEqual(actual, array);
        assert.deepEqual(actual, []);
    });

    it('should accept falsey arguments', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (value, index) => {
            try {
                const result = index ? _(value).shift() : _().shift();
                return result === undefined;
            } catch (e) {}
        });

        assert.deepEqual(actual, expected);
    });
});
