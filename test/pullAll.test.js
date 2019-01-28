import assert from 'assert';
import pullAll from '../pullAll.js';

describe('pullAll', function() {
  it('should work with the same value for `array` and `values`', function() {
    var array = [{ 'a': 1 }, { 'b': 2 }],
        actual = pullAll(array, array);

    assert.deepStrictEqual(actual, []);
  });
});
