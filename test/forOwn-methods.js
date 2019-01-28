import assert from 'assert';
import lodashStable from 'lodash';
import { _ } from './utils.js';

describe('forOwn methods', function() {
  lodashStable.each(['forOwn', 'forOwnRight'], function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should iterate over `length` properties', function() {
      var object = { '0': 'zero', '1': 'one', 'length': 2 },
          props = [];

      func(object, function(value, prop) { props.push(prop); });
      assert.deepStrictEqual(props.sort(), ['0', '1', 'length']);
    });
  });
});
