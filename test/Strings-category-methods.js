import assert from 'assert';
import lodashStable from 'lodash';
import { _, stubString } from './utils.js';

describe('"Strings" category methods', function() {
  var stringMethods = [
    'camelCase',
    'capitalize',
    'escape',
    'kebabCase',
    'lowerCase',
    'lowerFirst',
    'pad',
    'padEnd',
    'padStart',
    'repeat',
    'snakeCase',
    'toLower',
    'toUpper',
    'trim',
    'trimEnd',
    'trimStart',
    'truncate',
    'unescape',
    'upperCase',
    'upperFirst'
  ];

  lodashStable.each(stringMethods, function(methodName) {
    var func = _[methodName];

    it('`_.' + methodName + '` should return an empty string for empty values', function() {
      var values = [, null, undefined, ''],
          expected = lodashStable.map(values, stubString);

      var actual = lodashStable.map(values, function(value, index) {
        return index ? func(value) : func();
      });

      assert.deepStrictEqual(actual, expected);
    });
  });
});
