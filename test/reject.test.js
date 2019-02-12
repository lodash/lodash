import assert from 'assert';
import { isEven } from './utils.js';
import reject from '../reject.js';

describe('reject', function() {
  var array = [1, 2, 3];

  it('should return elements the `predicate` returns falsey for', function() {
    assert.deepStrictEqual(reject(array, isEven), [1, 3]);
  });
});
