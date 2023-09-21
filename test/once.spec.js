import once from '../once';

describe('once', () => {
    it('should invoke `func` once', () => {
        let count = 0;
        const resultFunc = once(() => ++count);

        once();
        expect(resultFunc()).toBe(1);
        expect(count).toBe(1);
    });

    it('should ignore recursive calls', () => {
        let count = 0;

        var resultFunc = once(() => {
            resultFunc();
            return ++count;
        });

        expect(resultFunc()).toBe(1);
        expect(count).toBe(1);
    });

    it('should not throw more than once', () => {
        const resultFunc = once(() => {
            throw new Error();
        });

        expect(resultFunc).toThrow();
        expect(resultFunc).not.toThrow();
    });
});
