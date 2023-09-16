import assert from 'node:assert';

describe('tap', () => {
    it('should intercept and return the given value', () => {
        let intercepted,
            array = [1, 2, 3];

        const actual = _.tap(array, (value) => {
            intercepted = value;
        });

        assert.strictEqual(actual, array);
        assert.strictEqual(intercepted, array);
    });

    it('should intercept unwrapped values and return wrapped values when chaining', () => {
        let intercepted,
            array = [1, 2, 3];

        const wrapped = _(array).tap((value) => {
            intercepted = value;
            value.pop();
        });

        assert.ok(wrapped instanceof _);

        wrapped.value();
        assert.strictEqual(intercepted, array);
    });
});
