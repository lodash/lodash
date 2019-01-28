import assert from 'assert';
import lodashStable from 'lodash';
import { stubString } from './utils.js';
import escapeRegExp from '../escapeRegExp.js';

describe('escapeRegExp', function() {
  var escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\',
      unescaped = '^$.*+?()[]{}|\\';

  it('should escape values', function() {
    assert.strictEqual(escapeRegExp(unescaped + unescaped), escaped + escaped);
  });

  it('should handle strings with nothing to escape', function() {
    assert.strictEqual(escapeRegExp('abc'), 'abc');
  });

  it('should return an empty string for empty values', function() {
    var values = [, null, undefined, ''],
        expected = lodashStable.map(values, stubString);

    var actual = lodashStable.map(values, function(value, index) {
      return index ? escapeRegExp(value) : escapeRegExp();
    });

    assert.deepStrictEqual(actual, expected);
  });
});
