import assert from 'node:assert';
import { isNpm } from './utils';
import prototype from '../src/prototype';

describe('lodash(...).value', () => {
    it('should execute the chained sequence and extract the unwrapped value', () => {
        const array = [1],
            wrapped = _(array).push(2).push(3);

        assert.deepEqual(array, [1]);
        assert.deepEqual(wrapped.value(), [1, 2, 3]);
        assert.deepEqual(wrapped.value(), [1, 2, 3, 2, 3]);
        assert.deepEqual(array, [1, 2, 3, 2, 3]);
    });

    it('should return the `valueOf` result of the wrapped value', () => {
        const wrapped = _(123);
        assert.strictEqual(Number(wrapped), 123);
    });

    it('should stringify the wrapped value when used by `JSON.stringify`', () => {
        if (!isNpm && JSON) {
            const wrapped = _([1, 2, 3]);
            assert.strictEqual(JSON.stringify(wrapped), '[1,2,3]');
        }
    });

    it('should be aliased', () => {
        const expected = prototype.value;
        assert.strictEqual(prototype.toJSON, expected);
        assert.strictEqual(prototype.valueOf, expected);
    });
});
