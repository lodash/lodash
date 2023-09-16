import assert from 'node:assert';
import eachRight from '../src/eachRight';
import forEachRight from '../src/forEachRight';

describe('forEachRight', () => {
    it('should be aliased', () => {
        assert.strictEqual(eachRight, forEachRight);
    });
});
