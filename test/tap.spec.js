describe('tap', () => {
    it('should intercept and return the given value', () => {
        let intercepted;
        const array = [1, 2, 3];

        const actual = _.tap(array, (value) => {
            intercepted = value;
        });

        expect(actual).toBe(array);
        expect(intercepted).toBe(array);
    });

    it('should intercept unwrapped values and return wrapped values when chaining', () => {
        let intercepted;
        const array = [1, 2, 3];

        const wrapped = _(array).tap((value) => {
            intercepted = value;
            value.pop();
        });

        expect(wrapped instanceof _);

        wrapped.value();
        expect(intercepted).toBe(array);
    });
});
