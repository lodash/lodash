import assert from 'assert';
import { isEven } from './utils.js';
import filter from '../filter.js';

describe('filter', function() {
  var array = [1, 2, 3];

  it('should return elements `predicate` returns truthy for', function() {
    assert.deepStrictEqual(filter(array, isEven), [2]);
  });
});
