import assert from 'node:assert';
import extend from '../src/extend';
import assignIn from '../src/assignIn';

describe('assignIn', () => {
    it('should be aliased', () => {
        assert.strictEqual(extend, assignIn);
    });
});
