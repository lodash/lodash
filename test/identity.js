import assert from 'assert';
import identity from '../identity.js';

describe('identity', function() {
  it('should return the first argument given', function() {
    var object = { 'name': 'fred' };
    assert.strictEqual(identity(object), object);
  });
});
