import assert from 'assert';
import intersects from '../intersects.js';


describe('intersects', function() {
    it('should work with lists and return a boolean', function() {
      assert.strictEqual(intersects([1, 2, 3], [1, 3]), true);
      assert.strictEqual(intersects([1,2], [3, 4, 5]), false);
    });
});