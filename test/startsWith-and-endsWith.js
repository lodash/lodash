import assert from 'assert';
import lodashStable from 'lodash';
import { _, MAX_SAFE_INTEGER } from './utils.js';

describe('startsWith and endsWith', function() {
  lodashStable.each(['startsWith', 'endsWith'], function(methodName) {
    var func = _[methodName],
        isStartsWith = methodName == 'startsWith';

    var string = 'abc',
        chr = isStartsWith ? 'a' : 'c';

    it('`_.' + methodName + '` should coerce `string` to a string', function() {
      assert.strictEqual(func(Object(string), chr), true);
      assert.strictEqual(func({ 'toString': lodashStable.constant(string) }, chr), true);
    });

    it('`_.' + methodName + '` should coerce `target` to a string', function() {
      assert.strictEqual(func(string, Object(chr)), true);
      assert.strictEqual(func(string, { 'toString': lodashStable.constant(chr) }), true);
    });

    it('`_.' + methodName + '` should coerce `position` to a number', function() {
      var position = isStartsWith ? 1 : 2;

      assert.strictEqual(func(string, 'b', Object(position)), true);
      assert.strictEqual(func(string, 'b', { 'toString': lodashStable.constant(String(position)) }), true);
    });

    it('should return `true` when `target` is an empty string regardless of `position`', function() {
      var positions = [-Infinity, NaN, -3, -1, 0, 1, 2, 3, 5, MAX_SAFE_INTEGER, Infinity];

      assert.ok(lodashStable.every(positions, function(position) {
        return func(string, '', position);
      }));
    });
  });
});
