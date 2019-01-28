import assert from 'assert';
import { slice } from './utils.js';
import flip from '../flip.js';

describe('flip', function() {
  function fn() {
    return slice.call(arguments);
  }

  it('should flip arguments provided to `func`', function() {
    var flipped = flip(fn);
    assert.deepStrictEqual(flipped('a', 'b', 'c', 'd'), ['d', 'c', 'b', 'a']);
  });
});
