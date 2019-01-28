import assert from 'assert';

describe('tap', function() {
  it('should intercept and return the given value', function() {
    var intercepted,
        array = [1, 2, 3];

    var actual = _.tap(array, function(value) {
      intercepted = value;
    });

    assert.strictEqual(actual, array);
    assert.strictEqual(intercepted, array);
  });

  it('should intercept unwrapped values and return wrapped values when chaining', function() {
    var intercepted,
        array = [1, 2, 3];

    var wrapped = _(array).tap(function(value) {
      intercepted = value;
      value.pop();
    });

    assert.ok(wrapped instanceof _);

    wrapped.value();
    assert.strictEqual(intercepted, array);
  });
});
