import assert from 'assert';
import { slice } from './utils.js';
import pullAllBy from '../pullAllBy.js';

describe('pullAllBy', function() {
  it('should accept an `iteratee`', function() {
    var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];

    var actual = pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], function(object) {
      return object.x;
    });

    assert.deepStrictEqual(actual, [{ 'x': 2 }]);
  });

  it('should provide correct `iteratee` arguments', function() {
    var args,
        array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];

    pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [{ 'x': 1 }]);
  });
});
