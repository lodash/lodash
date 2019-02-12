import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('exit early', function() {
  lodashStable.each(['_baseEach', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'transform'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` can exit early when iterating arrays', function() {
      if (func) {
        var array = [1, 2, 3],
            values = [];

        func(array, function(value, other) {
          values.push(lodashStable.isArray(value) ? other : value);
          return false;
        });

        assert.deepStrictEqual(values, [lodashStable.endsWith(methodName, 'Right') ? 3 : 1]);
      }
    });

    it('`_.' + methodName + '` can exit early when iterating objects', function() {
      if (func) {
        var object = { 'a': 1, 'b': 2, 'c': 3 },
            values = [];

        func(object, function(value, other) {
          values.push(lodashStable.isArray(value) ? other : value);
          return false;
        });

        assert.strictEqual(values.length, 1);
      }
    });
  });
});
