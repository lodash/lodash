import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils';

describe('lodash(...).pop', () => {
    it('should remove elements from the end of `array`', () => {
        const array = [1, 2],
            wrapped = _(array);

        assert.strictEqual(wrapped.pop(), 2);
        assert.deepEqual(wrapped.value(), [1]);
        assert.strictEqual(wrapped.pop(), 1);

        const actual = wrapped.value();
        assert.strictEqual(actual, array);
        assert.deepEqual(actual, []);
    });

    it('should accept falsey arguments', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (value, index) => {
            try {
                const result = index ? _(value).pop() : _().pop();
                return result === undefined;
            } catch (e) {}
        });

        assert.deepEqual(actual, expected);
    });
});
