import assert from 'assert';
import lodashStable from 'lodash';
import { add, square, noop, identity } from './utils.js';
import head from '../head.js';
import map from '../map.js';
import uniq from '../uniq.js';
import flow from '../flow.js';
import flowRight from '../flowRight.js';

const methods = {
  flow,
  flowRight
}

describe('flow methods', function() {
  lodashStable.each(['flow', 'flowRight'], function(methodName) {
    var func = methods[methodName],
        isFlow = methodName == 'flow';

    it('`_.' + methodName + '` should supply each function with the return value of the previous', function() {
      var fixed = function(n) { return n.toFixed(1); },
          combined = isFlow ? func(add, square, fixed) : func(fixed, square, add);

      assert.strictEqual(combined(1, 2), '9.0');
    });

    it('`_.' + methodName + '` should return a new function', function() {
      assert.notStrictEqual(func(noop), noop);
    });

    it('`_.' + methodName + '` should work with a curried function and `_.head`', function() {
      var curried = lodashStable.curry(identity);

      var combined = isFlow
        ? func(head, curried)
        : func(curried, head);

      assert.strictEqual(combined([1]), 1);
    });

    it('`_.' + methodName + '` should work with curried functions with placeholders', function() {
      var curried = lodashStable.curry(lodashStable.ary(map, 2), 2),
          getProp = curried(curried.placeholder, (value) => value.a),
          objects = [{ 'a': 1 }, { 'a': 2 }, { 'a': 1 }];

      var combined = isFlow
        ? func(getProp, uniq)
        : func(uniq, getProp);

      assert.deepStrictEqual(combined(objects), [1, 2]);
    });
  });
});
