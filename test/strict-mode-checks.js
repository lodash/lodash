import assert from 'assert';
import lodashStable from 'lodash';
import { _, isStrict, freeze } from './utils.js';

describe('strict mode checks', function() {
  lodashStable.each(['assign', 'assignIn', 'bindAll', 'defaults', 'defaultsDeep', 'merge'], function(methodName) {
    var func = _[methodName],
        isBindAll = methodName == 'bindAll';

    it('`_.' + methodName + '` should ' + (isStrict ? '' : 'not ') + 'throw strict mode errors', function() {
      var object = freeze({ 'a': undefined, 'b': function() {} }),
          pass = !isStrict;

      try {
        func(object, isBindAll ? 'b' : { 'a': 1 });
      } catch (e) {
        pass = !pass;
      }
      assert.ok(pass);
    });
  });
});
