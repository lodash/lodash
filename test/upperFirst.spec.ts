import assert from 'node:assert';
import upperFirst from '../src/upperFirst';

describe('upperFirst', () => {
    it('should uppercase only the first character', () => {
        assert.strictEqual(upperFirst('fred'), 'Fred');
        assert.strictEqual(upperFirst('Fred'), 'Fred');
        assert.strictEqual(upperFirst('FRED'), 'FRED');
    });
});
