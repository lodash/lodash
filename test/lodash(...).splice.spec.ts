import assert from 'node:assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils';

describe('lodash(...).splice', () => {
    it('should support removing and inserting elements', () => {
        const array = [1, 2],
            wrapped = _(array);

        assert.deepEqual(wrapped.splice(1, 1, 3).value(), [2]);
        assert.deepEqual(wrapped.value(), [1, 3]);
        assert.deepEqual(wrapped.splice(0, 2).value(), [1, 3]);

        const actual = wrapped.value();
        assert.strictEqual(actual, array);
        assert.deepEqual(actual, []);
    });

    it('should accept falsey arguments', () => {
        const expected = lodashStable.map(falsey, stubTrue);

        const actual = lodashStable.map(falsey, (value, index) => {
            try {
                const result = index ? _(value).splice(0, 1).value() : _().splice(0, 1).value();
                return lodashStable.isEqual(result, []);
            } catch (e) {}
        });

        assert.deepEqual(actual, expected);
    });
});
