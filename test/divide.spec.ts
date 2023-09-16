import assert from 'node:assert';
import divide from '../src/divide';

describe('divide', () => {
    it('should divide two numbers', () => {
        assert.strictEqual(divide(6, 4), 1.5);
        assert.strictEqual(divide(-6, 4), -1.5);
        assert.strictEqual(divide(-6, -4), 1.5);
    });

    it('should coerce arguments to numbers', () => {
        assert.strictEqual(divide('6', '4'), 1.5);
        assert.deepStrictEqual(divide('x', 'y'), NaN);
    });
});
