import assert from 'assert';
import join from '../join.js';

describe('join', function() {
  var array = ['a', 'b', 'c'];

  it('should return join all array elements into a string', function() {
    assert.strictEqual(join(array, '~'), 'a~b~c');
  });

  it('should return an unwrapped value when implicitly chaining', function() {
    var wrapped = _(array);
    assert.strictEqual(wrapped.join('~'), 'a~b~c');
    assert.strictEqual(wrapped.value(), array);
  });

  it('should return a wrapped value when explicitly chaining', function() {
    assert.ok(_(array).chain().join('~') instanceof _);
  });
});
