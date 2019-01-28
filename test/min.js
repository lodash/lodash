import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, noop } from './utils.js';
import min from '../min.js';

describe('min', function() {
  it('should return the smallest value from a collection', function() {
    assert.strictEqual(min([1, 2, 3]), 1);
  });

  it('should return `undefined` for empty collections', function() {
    var values = falsey.concat([[]]),
        expected = lodashStable.map(values, noop);

    var actual = lodashStable.map(values, function(value, index) {
      try {
        return index ? min(value) : min();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with non-numeric collection values', function() {
    assert.strictEqual(min(['a', 'b']), 'a');
  });
});
