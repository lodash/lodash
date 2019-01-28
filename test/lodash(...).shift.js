import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils.js';

describe('lodash(...).shift', function() {
  it('should remove elements from the front of `array`', function() {
    var array = [1, 2],
        wrapped = _(array);

    assert.strictEqual(wrapped.shift(), 1);
    assert.deepEqual(wrapped.value(), [2]);
    assert.strictEqual(wrapped.shift(), 2);

    var actual = wrapped.value();
    assert.strictEqual(actual, array);
    assert.deepEqual(actual, []);
  });

  it('should accept falsey arguments', function() {
    var expected = lodashStable.map(falsey, stubTrue);

    var actual = lodashStable.map(falsey, function(value, index) {
      try {
        var result = index ? _(value).shift() : _().shift();
        return result === undefined;
      } catch (e) {}
    });

    assert.deepEqual(actual, expected);
  });
});
