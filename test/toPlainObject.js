import assert from 'assert';
import lodashStable from 'lodash';
import { args } from './utils.js';
import toPlainObject from '../toPlainObject.js';

describe('toPlainObject', function() {
  it('should flatten inherited string keyed properties', function() {
    function Foo() {
      this.b = 2;
    }
    Foo.prototype.c = 3;

    var actual = lodashStable.assign({ 'a': 1 }, toPlainObject(new Foo));
    assert.deepStrictEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
  });

  it('should convert `arguments` objects to plain objects', function() {
    var actual = toPlainObject(args),
        expected = { '0': 1, '1': 2, '2': 3 };

    assert.deepStrictEqual(actual, expected);
  });

  it('should convert arrays to plain objects', function() {
    var actual = toPlainObject(['a', 'b', 'c']),
        expected = { '0': 'a', '1': 'b', '2': 'c' };

    assert.deepStrictEqual(actual, expected);
  });
});
