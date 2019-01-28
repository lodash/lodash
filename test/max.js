import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, noop } from './utils.js';
import max from '../max.js';

describe('max', function() {
  it('should return the largest value from a collection', function() {
    assert.strictEqual(max([1, 2, 3]), 3);
  });

  it('should return `undefined` for empty collections', function() {
    var values = falsey.concat([[]]),
        expected = lodashStable.map(values, noop);

    var actual = lodashStable.map(values, function(value, index) {
      try {
        return index ? max(value) : max();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with non-numeric collection values', function() {
    assert.strictEqual(max(['a', 'b']), 'b');
  });
});
