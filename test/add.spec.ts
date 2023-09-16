import assert from 'node:assert';
import add from '../src/add';

describe('add', () => {
    it('should add two numbers', () => {
        assert.strictEqual(add(6, 4), 10);
        assert.strictEqual(add(-6, 4), -2);
        assert.strictEqual(add(-6, -4), -10);
    });

    it('should not coerce arguments to numbers', () => {
        assert.strictEqual(add('6', '4'), '64');
        assert.strictEqual(add('x', 'y'), 'xy');
    });
});
