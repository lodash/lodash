import assert from 'node:assert';
import multiply from '../src/multiply';

describe('multiply', () => {
    it('should multiply two numbers', () => {
        assert.strictEqual(multiply(6, 4), 24);
        assert.strictEqual(multiply(-6, 4), -24);
        assert.strictEqual(multiply(-6, -4), 24);
    });

    it('should coerce arguments to numbers', () => {
        assert.strictEqual(multiply('6', '4'), 24);
        assert.deepStrictEqual(multiply('x', 'y'), NaN);
    });
});
