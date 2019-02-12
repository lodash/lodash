import assert from 'assert';
import lodashStable from 'lodash';
import { symbol } from './utils.js';
import toPath from '../toPath.js';

describe('toPath', function() {
  it('should convert a string to a path', function() {
    assert.deepStrictEqual(toPath('a.b.c'), ['a', 'b', 'c']);
    assert.deepStrictEqual(toPath('a[0].b.c'), ['a', '0', 'b', 'c']);
  });

  it('should coerce array elements to strings', function() {
    var array = ['a', 'b', 'c'];

    lodashStable.each([array, lodashStable.map(array, Object)], function(value) {
      var actual = toPath(value);
      assert.deepStrictEqual(actual, array);
      assert.notStrictEqual(actual, array);
    });
  });

  it('should return new path array', function() {
    assert.notStrictEqual(toPath('a.b.c'), toPath('a.b.c'));
  });

  it('should not coerce symbols to strings', function() {
    if (Symbol) {
      var object = Object(symbol);
      lodashStable.each([symbol, object, [symbol], [object]], function(value) {
        var actual = toPath(value);
        assert.ok(lodashStable.isSymbol(actual[0]));
      });
    }
  });

  it('should handle complex paths', function() {
    var actual = toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
    assert.deepStrictEqual(actual, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']);
  });

  it('should handle consecutive empty brackets and dots', function() {
    var expected = ['', 'a'];
    assert.deepStrictEqual(toPath('.a'), expected);
    assert.deepStrictEqual(toPath('[].a'), expected);

    expected = ['', '', 'a'];
    assert.deepStrictEqual(toPath('..a'), expected);
    assert.deepStrictEqual(toPath('[][].a'), expected);

    expected = ['a', '', 'b'];
    assert.deepStrictEqual(toPath('a..b'), expected);
    assert.deepStrictEqual(toPath('a[].b'), expected);

    expected = ['a', '', '', 'b'];
    assert.deepStrictEqual(toPath('a...b'), expected);
    assert.deepStrictEqual(toPath('a[][].b'), expected);

    expected = ['a', ''];
    assert.deepStrictEqual(toPath('a.'), expected);
    assert.deepStrictEqual(toPath('a[]'), expected);

    expected = ['a', '', ''];
    assert.deepStrictEqual(toPath('a..'), expected);
    assert.deepStrictEqual(toPath('a[][]'), expected);
  });
});
