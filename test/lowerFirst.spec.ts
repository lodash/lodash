import assert from 'node:assert';
import lowerFirst from '../src/lowerFirst';

describe('lowerFirst', () => {
    it('should lowercase only the first character', () => {
        assert.strictEqual(lowerFirst('fred'), 'fred');
        assert.strictEqual(lowerFirst('Fred'), 'fred');
        assert.strictEqual(lowerFirst('FRED'), 'fRED');
    });
});
