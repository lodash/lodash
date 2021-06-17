import assert from 'assert';
import lodashStable from 'lodash';
import insert from '../insert.js';

describe('insert', function() {
  var main_string = 'abc';
  var ins_string = 'de';

  it('should insert a string', function() {
    assert.strictEqual(insert(main_string, ins_string, 0), 'deabc');
    assert.strictEqual(insert(main_string, ins_string), 'deabc');
    assert.strictEqual(insert(main_string, ins_string, -1), 'abdec'); //for negative indexes it will find position from main string in reverse order
  });

  it('should return an given string', function() {
    assert.strictEqual(insert(main_string, ''), main_string);
    assert.strictEqual(insert(main_string, '', 0), main_string);
    assert.strictEqual(insert(main_string, '', -1), main_string);
  });

  it('should coerce `string` to a string', function() {
    assert.strictEqual(insert(Object(main_string), Object(ins_string), 0), 'deabc');
    assert.strictEqual(insert(Object(main_string), Object(ins_string), -1), 'abdec');
    assert.strictEqual(insert({ 'toString': lodashStable.constant(main_string) },
    { 'toString': lodashStable.constant(ins_string) }, 0), 'deabc');
    assert.strictEqual(insert({ 'toString': lodashStable.constant(main_string) },
    { 'toString': lodashStable.constant(ins_string) }, -1), 'abdec');
  });
});
