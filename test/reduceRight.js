import assert from 'assert';
import lodashStable from 'lodash';
import { slice } from './utils.js';
import reduceRight from '../reduceRight.js';

describe('reduceRight', function() {
  var array = [1, 2, 3];

  it('should use the last element of a collection as the default `accumulator`', function() {
    assert.strictEqual(reduceRight(array), 3);
  });

  it('should provide correct `iteratee` arguments when iterating an array', function() {
    var args;

    reduceRight(array, function() {
      args || (args = slice.call(arguments));
    }, 0);

    assert.deepStrictEqual(args, [0, 3, 2, array]);

    args = undefined;
    reduceRight(array, function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, [3, 2, 1, array]);
  });

  it('should provide correct `iteratee` arguments when iterating an object', function() {
    var args,
        object = { 'a': 1, 'b': 2 },
        isFIFO = lodashStable.keys(object)[0] == 'a';

    var expected = isFIFO
      ? [0, 2, 'b', object]
      : [0, 1, 'a', object];

    reduceRight(object, function() {
      args || (args = slice.call(arguments));
    }, 0);

    assert.deepStrictEqual(args, expected);

    args = undefined;
    expected = isFIFO
      ? [2, 1, 'a', object]
      : [1, 2, 'b', object];

    reduceRight(object, function() {
      args || (args = slice.call(arguments));
    });

    assert.deepStrictEqual(args, expected);
  });
});
