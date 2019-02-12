import assert from 'assert';
import { slice } from './utils.js';
import sumBy from '../sumBy.js';

describe('sumBy', function() {
  var array = [6, 4, 2],
      objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

  it('should work with an `iteratee`', function() {
    var actual = sumBy(objects, function(object) {
      return object.a;
    });

    assert.deepStrictEqual(actual, 6);
  });

  it('should provide correct `iteratee` arguments', function() {
    var args;

    sumBy(array, function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [6]);
  });

  it('should work with `_.property` shorthands', function() {
    var arrays = [[2], [3], [1]];
    assert.strictEqual(sumBy(arrays, 0), 6);
    assert.strictEqual(sumBy(objects, 'a'), 6);
  });
});
