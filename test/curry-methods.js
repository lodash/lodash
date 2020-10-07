import assert from 'assert';
import lodashStable from 'lodash';
import { _, slice } from './utils.js';
import curry from '../curry.js';

describe('curry methods', function() {
  lodashStable.each(['curry', 'curryRight'], function(methodName) {
    let func = _[methodName],
        fn = function(a, b) { return slice.call(arguments); },
        isCurry = methodName == 'curry';

    it(`\`_.${  methodName  }\` should not error on functions with the same name as lodash methods`, function() {
      function run(a, b) {
        return a + b;
      }

      let curried = func(run);

      try {
        var actual = curried(1)(2);
      } catch (e) {}

      assert.strictEqual(actual, 3);
    });

    it(`\`_.${  methodName  }\` should work for function names that shadow those on \`Object.prototype\``, function() {
      let curried = curry(function hasOwnProperty(a, b, c) {
        return [a, b, c];
      });

      let expected = [1, 2, 3];

      assert.deepStrictEqual(curried(1)(2)(3), expected);
    });

    it(`\`_.${  methodName  }\` should work as an iteratee for methods like \`_.map\``, function() {
      let array = [fn, fn, fn],
          object = { 'a': fn, 'b': fn, 'c': fn };

      lodashStable.each([array, object], function(collection) {
        let curries = lodashStable.map(collection, func),
            expected = lodashStable.map(collection, lodashStable.constant(isCurry ? ['a', 'b'] : ['b', 'a']));

        let actual = lodashStable.map(curries, function(curried) {
          return curried('a')('b');
        });

        assert.deepStrictEqual(actual, expected);
      });
    });
  });
});
