import assert from 'assert';
import { slice } from './utils.js';
import unionBy from '../unionBy.js';

describe('unionBy', function() {
  it('should accept an `iteratee`', function() {
    var actual = unionBy([2.1], [1.2, 2.3], Math.floor);
    assert.deepStrictEqual(actual, [2.1, 1.2]);

    actual = unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
    assert.deepStrictEqual(actual, [{ 'x': 1 }, { 'x': 2 }]);
  });

  it('should provide correct `iteratee` arguments', function() {
    var args;

    unionBy([2.1], [1.2, 2.3], function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [2.1]);
  });

  it('should output values from the first possible array', function() {
    var actual = unionBy([{ 'x': 1, 'y': 1 }], [{ 'x': 1, 'y': 2 }], 'x');
    assert.deepStrictEqual(actual, [{ 'x': 1, 'y': 1 }]);
  });
});
