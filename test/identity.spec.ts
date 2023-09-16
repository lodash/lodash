import assert from 'node:assert';
import identity from '../src/identity';

describe('identity', () => {
    it('should return the first argument given', () => {
        const object = { name: 'fred' };
        assert.strictEqual(identity(object), object);
    });
});
