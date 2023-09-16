import assert from 'node:assert';
import conforms from '../src/conforms';

describe('conforms', () => {
    it('should not change behavior if `source` is modified', () => {
        const object = { a: 2 },
            source = {
                a: function (value) {
                    return value > 1;
                },
            },
            par = conforms(source);

        assert.strictEqual(par(object), true);

        source.a = function (value) {
            return value < 2;
        };
        assert.strictEqual(par(object), true);
    });
});
