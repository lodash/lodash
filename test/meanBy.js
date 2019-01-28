import assert from 'assert';
import { slice } from './utils.js';
import meanBy from '../meanBy.js';

describe('meanBy', function() {
  var objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

  it('should work with an `iteratee`', function() {
    var actual = meanBy(objects, function(object) {
      return object.a;
    });

    assert.deepStrictEqual(actual, 2);
  });

  it('should provide correct `iteratee` arguments', function() {
    var args;

    meanBy(objects, function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [{ 'a': 2 }]);
  });

  it('should work with `_.property` shorthands', function() {
    var arrays = [[2], [3], [1]];
    assert.strictEqual(meanBy(arrays, 0), 2);
    assert.strictEqual(meanBy(objects, 'a'), 2);
  });
});
