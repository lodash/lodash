import assert from 'assert';
import lodashStable from 'lodash';
import { _, stubTrue, burredLetters, deburredLetters } from './utils.js';
import camelCase from '../camelCase.js';
import kebabCase from '../kebabCase.js';
import lowerCase from '../lowerCase.js';
import snakeCase from '../snakeCase.js';
import startCase from '../startCase.js';

describe('case methods', function() {
  lodashStable.each(['camel', 'kebab', 'lower', 'snake', 'start', 'upper'], function(caseName) {
    var methodName = caseName + 'Case',
        func = _[methodName];

    var strings = [
      'foo bar', 'Foo bar', 'foo Bar', 'Foo Bar',
      'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'
    ];

    var converted = (function() {
      switch (caseName) {
        case 'camel': return 'fooBar';
        case 'kebab': return 'foo-bar';
        case 'lower': return 'foo bar';
        case 'snake': return 'foo_bar';
        case 'start': return 'Foo Bar';
        case 'upper': return 'FOO BAR';
      }
    }());

    it('`_.' + methodName + '` should convert `string` to ' + caseName + ' case', function() {
      var actual = lodashStable.map(strings, function(string) {
        var expected = (caseName == 'start' && string == 'FOO BAR') ? string : converted;
        return func(string) === expected;
      });

      assert.deepStrictEqual(actual, lodashStable.map(strings, stubTrue));
    });

    it('`_.' + methodName + '` should handle double-converting strings', function() {
      var actual = lodashStable.map(strings, function(string) {
        var expected = (caseName == 'start' && string == 'FOO BAR') ? string : converted;
        return func(func(string)) === expected;
      });

      assert.deepStrictEqual(actual, lodashStable.map(strings, stubTrue));
    });

    it('`_.' + methodName + '` should deburr letters', function() {
      var actual = lodashStable.map(burredLetters, function(burred, index) {
        var letter = deburredLetters[index].replace(/['\u2019]/g, '');
        if (caseName == 'start') {
          letter = letter == 'IJ' ? letter : lodashStable.capitalize(letter);
        } else if (caseName == 'upper') {
          letter = letter.toUpperCase();
        } else {
          letter = letter.toLowerCase();
        }
        return func(burred) === letter;
      });

      assert.deepStrictEqual(actual, lodashStable.map(burredLetters, stubTrue));
    });

    it('`_.' + methodName + '` should remove contraction apostrophes', function() {
      var postfixes = ['d', 'll', 'm', 're', 's', 't', 've'];

      lodashStable.each(["'", '\u2019'], function(apos) {
        var actual = lodashStable.map(postfixes, function(postfix) {
          return func('a b' + apos + postfix +  ' c');
        });

        var expected = lodashStable.map(postfixes, function(postfix) {
          switch (caseName) {
            case 'camel': return 'aB'  + postfix + 'C';
            case 'kebab': return 'a-b' + postfix + '-c';
            case 'lower': return 'a b' + postfix + ' c';
            case 'snake': return 'a_b' + postfix + '_c';
            case 'start': return 'A B' + postfix + ' C';
            case 'upper': return 'A B' + postfix.toUpperCase() + ' C';
          }
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it('`_.' + methodName + '` should remove Latin mathematical operators', function() {
      var actual = lodashStable.map(['\xd7', '\xf7'], func);
      assert.deepStrictEqual(actual, ['', '']);
    });

    it('`_.' + methodName + '` should coerce `string` to a string', function() {
      var string = 'foo bar';
      assert.strictEqual(func(Object(string)), converted);
      assert.strictEqual(func({ 'toString': lodashStable.constant(string) }), converted);
    });

    it('`_.' + methodName + '` should return an unwrapped value implicitly when chaining', function() {
      assert.strictEqual(_('foo bar')[methodName](), converted);
    });

    it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function() {
      assert.ok(_('foo bar').chain()[methodName]() instanceof _);
    });
  });

  (function() {
    it('should get the original value after cycling through all case methods', function() {
      var funcs = [camelCase, kebabCase, lowerCase, snakeCase, startCase, lowerCase, camelCase];

      var actual = lodashStable.reduce(funcs, function(result, func) {
        return func(result);
      }, 'enable 6h format');

      assert.strictEqual(actual, 'enable6HFormat');
    });
  })();
});
