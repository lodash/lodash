import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubTrue } from './utils.js';

describe('lodash(...).sort', function() {
  it('should return the wrapped sorted `array`', function() {
    var array = [3, 1, 2],
        wrapped = _(array).sort(),
        actual = wrapped.value();

    assert.strictEqual(actual, array);
    assert.deepEqual(actual, [1, 2, 3]);
  });

  it('should accept falsey arguments', function() {
    var expected = lodashStable.map(falsey, stubTrue);

    var actual = lodashStable.map(falsey, function(value, index) {
      try {
        var result = index ? _(value).sort().value() : _().sort().value();
        return lodashStable.eq(result, value);
      } catch (e) {}
    });

    assert.deepEqual(actual, expected);
  });
});
