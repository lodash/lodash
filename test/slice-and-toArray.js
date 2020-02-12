import assert from 'assert';
import lodashStable from 'lodash';
import { _, args, document, body } from './utils.js';

describe('slice and toArray', function() {
  lodashStable.each(['slice', 'toArray'], function(methodName) {
    var array = [1, 2, 3],
        func = _[methodName];

    it('`_.' + methodName + '` should return a dense array', function() {
      var sparse = Array(3);
      sparse[1] = 2;

      var actual = func(sparse);

      assert.ok('0' in actual);
      assert.ok('2' in actual);
      assert.deepStrictEqual(actual, sparse);
    });

    it('`_.' + methodName + '` should treat array-like objects like arrays', function() {
      var object = { '0': 'a', 'length': 1 };
      assert.deepStrictEqual(func(object), ['a']);
      assert.deepStrictEqual(func(args), array);
    });

    it('`_.' + methodName + '` should return a shallow clone of arrays', function() {
      var actual = func(array);
      assert.deepStrictEqual(actual, array);
      assert.notStrictEqual(actual, array);
    });

    it('`_.' + methodName + '` should work with a node list for `collection`', function() {
      if (document) {
        try {
          var actual = func(document.getElementsByTagName('body'));
        } catch (e) {}

        assert.deepStrictEqual(actual, [body]);
      }
    });
  });
});
