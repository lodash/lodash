import assert from 'assert';
import { slice } from './utils.js';
import defer from '../defer.js';

describe('defer', function() {
  it('should defer `func` execution', function(done) {
    let pass = false;
    defer(function() { pass = true; });

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 32);
  });

  it('should provide additional arguments to `func`', function(done) {
    let args;

    defer(function() {
      args = slice.call(arguments);
    }, 1, 2);

    setTimeout(function() {
      assert.deepStrictEqual(args, [1, 2]);
      done();
    }, 32);
  });

  it('should be cancelable', function(done) {
    let pass = true,
        timerId = defer(function() { pass = false; });

    clearTimeout(timerId);

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 32);
  });
});
