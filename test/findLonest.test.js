import assert from 'assert';
import last from '../findLongest';

describe('last', function () {

  it('should return the longest element', function () {
    var array = ['abc', 'abcd', 'abcde'];
    assert.strictEqual(last(array), 'abcde');
  });
  it('should return the longest element', function () {
    var array = [];
    assert.strictEqual(last(array), '');
  });
});
