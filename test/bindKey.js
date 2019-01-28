import assert from 'assert';
import { slice } from './utils.js';
import bindKey from '../bindKey.js';

describe('bindKey', function() {
  it('should work when the target function is overwritten', function() {
    var object = {
      'user': 'fred',
      'greet': function(greeting) {
        return this.user + ' says: ' + greeting;
      }
    };

    var bound = bindKey(object, 'greet', 'hi');
    assert.strictEqual(bound(), 'fred says: hi');

    object.greet = function(greeting) {
      return this.user + ' says: ' + greeting + '!';
    };

    assert.strictEqual(bound(), 'fred says: hi!');
  });

  it('should support placeholders', function() {
    var object = {
      'fn': function() {
        return slice.call(arguments);
      }
    };

    var ph = bindKey.placeholder,
        bound = bindKey(object, 'fn', ph, 'b', ph);

    assert.deepStrictEqual(bound('a', 'c'), ['a', 'b', 'c']);
    assert.deepStrictEqual(bound('a'), ['a', 'b', undefined]);
    assert.deepStrictEqual(bound('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
    assert.deepStrictEqual(bound(), [undefined, 'b', undefined]);
  });

  it('should use `_.placeholder` when set', function() {
    var object = {
      'fn': function() {
        return slice.call(arguments);
      }
    };

    var _ph = _.placeholder = {},
        ph = bindKey.placeholder,
        bound = bindKey(object, 'fn', _ph, 'b', ph);

    assert.deepEqual(bound('a', 'c'), ['a', 'b', ph, 'c']);
    delete _.placeholder;
  });

  it('should ensure `new bound` is an instance of `object[key]`', function() {
    function Foo(value) {
      return value && object;
    }

    var object = { 'Foo': Foo },
        bound = bindKey(object, 'Foo');

    assert.ok(new bound instanceof Foo);
    assert.strictEqual(new bound(true), object);
  });
});
