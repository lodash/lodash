import assert from 'assert';
import invert from '../invert.js';

describe('invert', function() {
  it('should invert an object', function() {
    var object = { 'a': 1, 'b': 2 },
        actual = invert(object);

    assert.deepStrictEqual(actual, { '1': 'a', '2': 'b' });
    assert.deepStrictEqual(invert(actual), { 'a': '1', 'b': '2' });
  });

  it('should work with values that shadow keys on `Object.prototype`', function() {
    var object = { 'a': 'hasOwnProperty', 'b': 'constructor' };
    assert.deepStrictEqual(invert(object), { 'hasOwnProperty': 'a', 'constructor': 'b' });
  });

  it('should work with an object that has a `length` property', function() {
    var object = { '0': 'a', '1': 'b', 'length': 2 };
    assert.deepStrictEqual(invert(object), { 'a': '0', 'b': '1', '2': 'length' });
  });

  it('should return a wrapped value when chaining', function() {
    var object = { 'a': 1, 'b': 2 },
        wrapped = _(object).invert();

    assert.ok(wrapped instanceof _);
    assert.deepEqual(wrapped.value(), { '1': 'a', '2': 'b' });
  });
});
