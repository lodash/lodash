import assert from 'node:assert';
import each from '../src/each';
import forEach from '../src/forEach';

describe('forEach', () => {
    it('should be aliased', () => {
        assert.strictEqual(each, forEach);
    });
});
