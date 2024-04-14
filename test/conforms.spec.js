import conforms from '../src/conforms';

describe('conforms', () => {
    it('should not change behavior if `source` is modified', () => {
        const object = { a: 2 };
        const source = {
            a: function (value) {
                return value > 1;
            },
        };
        const par = conforms(source);

        expect(par(object)).toBe(true);

        source.a = function (value) {
            return value < 2;
        };
        expect(par(object)).toBe(true);
    });
});
