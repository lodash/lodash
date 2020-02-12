import assert from 'assert';
import lodashStable from 'lodash';
import { burredLetters, deburredLetters, comboMarks } from './utils.js';
import deburr from '../deburr.js';

describe('deburr', function() {
  it('should convert Latin Unicode letters to basic Latin', function() {
    var actual = lodashStable.map(burredLetters, deburr);
    assert.deepStrictEqual(actual, deburredLetters);
  });

  it('should not deburr Latin mathematical operators', function() {
    var operators = ['\xd7', '\xf7'],
        actual = lodashStable.map(operators, deburr);

    assert.deepStrictEqual(actual, operators);
  });

  it('should deburr combining diacritical marks', function() {
    var expected = lodashStable.map(comboMarks, lodashStable.constant('ei'));

    var actual = lodashStable.map(comboMarks, function(chr) {
      return deburr('e' + chr + 'i');
    });

    assert.deepStrictEqual(actual, expected);
  });
});
