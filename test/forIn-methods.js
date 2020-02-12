import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('forIn methods', function() {
  lodashStable.each(['forIn', 'forInRight'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` iterates over inherited string keyed properties', function() {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      var keys = [];
      func(new Foo, function(value, key) { keys.push(key); });
      assert.deepStrictEqual(keys.sort(), ['a', 'b']);
    });
  });
});
