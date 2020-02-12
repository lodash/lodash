import assert from 'assert';
import lodashStable from 'lodash';
import uniqueId from '../uniqueId.js';

describe('uniqueId', function() {
  it('should generate unique ids', function() {
    var actual = lodashStable.times(1000, function() {
      return uniqueId();
    });

    assert.strictEqual(lodashStable.uniq(actual).length, actual.length);
  });

  it('should return a string value when not providing a `prefix`', function() {
    assert.strictEqual(typeof uniqueId(), 'string');
  });

  it('should coerce the prefix argument to a string', function() {
    var actual = [uniqueId(3), uniqueId(2), uniqueId(1)];
    assert.ok(/3\d+,2\d+,1\d+/.test(actual));
  });
});
