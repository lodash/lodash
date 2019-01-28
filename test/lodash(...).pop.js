import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils.js';

describe('lodash(...).pop', function() {
  it('should remove elements from the end of `array`', function() {
    var array = [1, 2],
        wrapped = _(array);

    assert.strictEqual(wrapped.pop(), 2);
    assert.deepEqual(wrapped.value(), [1]);
    assert.strictEqual(wrapped.pop(), 1);

    var actual = wrapped.value();
    assert.strictEqual(actual, array);
    assert.deepEqual(actual, []);
  });

  it('should accept falsey arguments', function() {
    var expected = lodashStable.map(falsey, stubTrue);

    var actual = lodashStable.map(falsey, function(value, index) {
      try {
        var result = index ? _(value).pop() : _().pop();
        return result === undefined;
      } catch (e) {}
    });

    assert.deepEqual(actual, expected);
  });
});
