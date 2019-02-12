import assert from 'assert';
import lodashStable from 'lodash';
import { _, empties } from './utils.js';

describe('stub methods', function() {
  lodashStable.each(['noop', 'stubTrue', 'stubFalse', 'stubArray', 'stubObject', 'stubString'], function(methodName) {
    var func = _[methodName];

    var pair = ({
      'stubArray': [[], 'an empty array'],
      'stubFalse': [false, '`false`'],
      'stubObject': [{}, 'an empty object'],
      'stubString': ['', 'an empty string'],
      'stubTrue': [true, '`true`'],
      'noop': [undefined, '`undefined`']
    })[methodName];

    var values = Array(2).concat(empties, true, 1, 'a'),
        expected = lodashStable.map(values, lodashStable.constant(pair[0]));

    it('`_.' + methodName + '` should return ' + pair[1], function() {
      var actual = lodashStable.map(values, function(value, index) {
        if (index < 2) {
          return index ? func.call({}) : func();
        }
        return func(value);
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
