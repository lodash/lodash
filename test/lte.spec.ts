import assert from 'node:assert';
import lte from '../src/lte';
import lt from '../src/lt';

describe('lte', () => {
    it('should return `true` if `value` is <= `other`', () => {
        assert.strictEqual(lte(1, 3), true);
        assert.strictEqual(lte(3, 3), true);
        assert.strictEqual(lte('abc', 'def'), true);
        assert.strictEqual(lte('def', 'def'), true);
    });

    it('should return `false` if `value` > `other`', () => {
        assert.strictEqual(lt(3, 1), false);
        assert.strictEqual(lt('def', 'abc'), false);
    });
});
