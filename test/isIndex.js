import assert from 'assert';
import lodashStable from 'lodash';
import { MAX_SAFE_INTEGER, stubTrue, stubFalse } from './utils.js';
import _isIndex from '../.internal/isIndex.js';

describe('isIndex', function() {
  var func = _isIndex;

  it('should return `true` for indexes', function() {
    if (func) {
      var values = [[0], ['0'], ['1'], [3, 4], [MAX_SAFE_INTEGER - 1]],
          expected = lodashStable.map(values, stubTrue);

      var actual = lodashStable.map(values, function(args) {
        return func.apply(undefined, args);
      });

      assert.deepStrictEqual(actual, expected);
    }
  });

  it('should return `false` for non-indexes', function() {
    if (func) {
      var values = [['1abc'], ['07'], ['0001'], [-1], [3, 3], [1.1], [MAX_SAFE_INTEGER]],
          expected = lodashStable.map(values, stubFalse);

      var actual = lodashStable.map(values, function(args) {
        return func.apply(undefined, args);
      });

      assert.deepStrictEqual(actual, expected);
    }
  });
});
