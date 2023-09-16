import assert from 'node:assert';
import gt from '../src/gt';

describe('gt', () => {
    it('should return `true` if `value` > `other`', () => {
        assert.strictEqual(gt(3, 1), true);
        assert.strictEqual(gt('def', 'abc'), true);
    });

    it('should return `false` if `value` is <= `other`', () => {
        assert.strictEqual(gt(1, 3), false);
        assert.strictEqual(gt(3, 3), false);
        assert.strictEqual(gt('abc', 'def'), false);
        assert.strictEqual(gt('def', 'def'), false);
    });
});
