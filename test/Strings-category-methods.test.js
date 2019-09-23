import assert from 'assert';
import lodashStable from 'lodash';
import { stubString } from './utils.js';

import camelCase from '../camelCase.js';
import capitalize from '../capitalize.js';
import escape from '../escape.js';
import kebabCase from '../kebabCase.js';
import lowerCase from '../lowerCase.js';
import lowerFirst from '../lowerFirst.js';
import pad from '../pad.js';
import padEnd from '../padEnd.js';
import padStart from '../padStart.js';
import repeat from '../repeat.js';
import snakeCase from '../snakeCase.js';
import trim from '../trim.js';
import trimStart from '../trimStart.js';
import trimEnd from '../trimEnd.js';
import truncate from '../truncate.js';
import unescape from '../unescape.js';
import upperCase from '../upperCase.js';
import upperFirst from '../upperFirst';


const methods = {
  camelCase,
  capitalize,
  escape,
  kebabCase,
  lowerCase,
  lowerFirst,
  pad,
  padEnd,
  padStart,
  repeat,
  snakeCase,
  trim,
  trimStart,
  trimEnd,
  truncate,
  unescape,
  upperCase,
  upperFirst
}


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
    'trim',
    'trimEnd',
    'trimStart',
    'truncate',
    'unescape',
    'upperCase',
    'upperFirst'
  ];

  lodashStable.each(stringMethods, function(methodName) {
    var func = methods[methodName];

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
