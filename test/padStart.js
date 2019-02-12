import assert from 'assert';
import lodashStable from 'lodash';
import { stubTrue } from './utils.js';
import padStart from '../padStart.js';

describe('padStart', function() {
  var string = 'abc';

  it('should pad a string to a given length', function() {
    var values = [, undefined],
        expected = lodashStable.map(values, lodashStable.constant('   abc'));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? padStart(string, 6, value) : padStart(string, 6);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should truncate pad characters to fit the pad length', function() {
    assert.strictEqual(padStart(string, 6, '_-'), '_-_abc');
  });

  it('should coerce `string` to a string', function() {
    var values = [Object(string), { 'toString': lodashStable.constant(string) }],
        expected = lodashStable.map(values, stubTrue);

    var actual = lodashStable.map(values, function(value) {
      return padStart(value, 6) === '   abc';
    });

    assert.deepStrictEqual(actual, expected);
  });
});
