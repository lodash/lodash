import assert from 'assert';
import lodashStable from 'lodash';
import { noop, slice, stubA } from './utils.js';
import wrap from '../wrap.js';

describe('wrap', function() {
  it('should create a wrapped function', function() {
    var p = wrap(lodashStable.escape, function(func, text) {
      return '<p>' + func(text) + '</p>';
    });

    assert.strictEqual(p('fred, barney, & pebbles'), '<p>fred, barney, &amp; pebbles</p>');
  });

  it('should provide correct `wrapper` arguments', function() {
    var args;

    var wrapped = wrap(noop, function() {
      args || (args = slice.call(arguments));
    });

    wrapped(1, 2, 3);
    assert.deepStrictEqual(args, [noop, 1, 2, 3]);
  });

  it('should use `_.identity` when `wrapper` is nullish', function() {
    var values = [, null, undefined],
        expected = lodashStable.map(values, stubA);

    var actual = lodashStable.map(values, function(value, index) {
      var wrapped = index ? wrap('a', value) : wrap('a');
      return wrapped('b', 'c');
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should use `this` binding of function', function() {
    var p = wrap(lodashStable.escape, function(func) {
      return '<p>' + func(this.text) + '</p>';
    });

    var object = { 'p': p, 'text': 'fred, barney, & pebbles' };
    assert.strictEqual(object.p(), '<p>fred, barney, &amp; pebbles</p>');
  });
});
