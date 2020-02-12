import assert from 'assert';
import { slice } from './utils.js';
import delay from '../delay.js';

describe('delay', function() {
  it('should delay `func` execution', function(done) {
    var pass = false;
    delay(function() { pass = true; }, 32);

    setTimeout(function() {
      assert.ok(!pass);
    }, 1);

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 64);
  });

  it('should provide additional arguments to `func`', function(done) {
    var args;

    delay(function() {
      args = slice.call(arguments);
    }, 32, 1, 2);

    setTimeout(function() {
      assert.deepStrictEqual(args, [1, 2]);
      done();
    }, 64);
  });

  it('should use a default `wait` of `0`', function(done) {
    var pass = false;
    delay(function() { pass = true; });

    assert.ok(!pass);

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 0);
  });

  it('should be cancelable', function(done) {
    var pass = true,
        timerId = delay(function() { pass = false; }, 32);

    clearTimeout(timerId);

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 64);
  });

  it('should work with mocked `setTimeout`', function() {
    var pass = false,
        setTimeout = root.setTimeout;

    setProperty(root, 'setTimeout', function(func) { func(); });
    delay(function() { pass = true; }, 32);
    setProperty(root, 'setTimeout', setTimeout);

    assert.ok(pass);
  });
});
