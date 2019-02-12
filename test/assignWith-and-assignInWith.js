import assert from 'assert';
import lodashStable from 'lodash';
import { _, noop } from './utils.js';

describe('assignWith and assignInWith', function() {
  lodashStable.each(['assignWith', 'assignInWith'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should work with a `customizer` callback', function() {
      var actual = func({ 'a': 1, 'b': 2 }, { 'a': 3, 'c': 3 }, function(a, b) {
        return a === undefined ? b : a;
      });

      assert.deepStrictEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
    });

    it('`_.' + methodName + '` should work with a `customizer` that returns `undefined`', function() {
      var expected = { 'a': 1 };
      assert.deepStrictEqual(func({}, expected, noop), expected);
    });
  });
});
