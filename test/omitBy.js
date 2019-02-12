import assert from 'assert';
import omitBy from '../omitBy.js';

describe('omitBy', function() {
  it('should work with a predicate argument', function() {
    var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

    var actual = omitBy(object, function(n) {
      return n != 2 && n != 4;
    });

    assert.deepStrictEqual(actual, { 'b': 2, 'd': 4 });
  });
});
