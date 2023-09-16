import assert from 'node:assert';
import subtract from '../src/subtract';

describe('subtract', () => {
    it('should subtract two numbers', () => {
        assert.strictEqual(subtract(6, 4), 2);
        assert.strictEqual(subtract(-6, 4), -10);
        assert.strictEqual(subtract(-6, -4), -2);
    });

    it('should coerce arguments to numbers', () => {
        assert.strictEqual(subtract('6', '4'), 2);
        assert.deepStrictEqual(subtract('x', 'y'), NaN);
    });
});
