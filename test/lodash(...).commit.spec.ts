import assert from 'node:assert';

describe('lodash(...).commit', () => {
    it('should execute the chained sequence and returns the wrapped result', () => {
        const array = [1],
            wrapped = _(array).push(2).push(3);

        assert.deepEqual(array, [1]);

        const otherWrapper = wrapped.commit();
        assert.ok(otherWrapper instanceof _);
        assert.deepEqual(otherWrapper.value(), [1, 2, 3]);
        assert.deepEqual(wrapped.value(), [1, 2, 3, 2, 3]);
    });

    it('should track the `__chain__` value of a wrapper', () => {
        const wrapped = _([1]).chain().commit().head();
        assert.ok(wrapped instanceof _);
        assert.strictEqual(wrapped.value(), 1);
    });
});
