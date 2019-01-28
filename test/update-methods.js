import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('update methods', function() {
  lodashStable.each(['update', 'updateWith'], function(methodName) {
    var func = _[methodName],
        oldValue = 1;

    it('`_.' + methodName + '` should invoke `updater` with the value on `path` of `object`', function() {
      var object = { 'a': [{ 'b': { 'c': oldValue } }] },
          expected = oldValue + 1;

      lodashStable.each(['a[0].b.c', ['a', '0', 'b', 'c']], function(path) {
        func(object, path, function(n) {
          assert.strictEqual(n, oldValue);
          return ++n;
        });

        assert.strictEqual(object.a[0].b.c, expected);
        object.a[0].b.c = oldValue;
      });
    });
  });
});
