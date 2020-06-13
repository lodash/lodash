import assert from 'assert';
import sleep from '../sleep.js';

describe('sleep', function() {
  it('should sleep', function(done) {
    var pass = false;
    sleep(32).then(() => pass = true);

    setTimeout(function() {
      assert.ok(!pass);
    }, 1);

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 64);
  });

  it('should use a default `wait` of `0`', function(done) {
    var pass = false;
    sleep().then(() => pass = true);

    assert.ok(!pass);

    setTimeout(function() {
      assert.ok(pass);
      done();
    }, 0);
  });

  it('should work with mocked `setTimeout`', function() {
    var pass = false,
        setTimeout = root.setTimeout;

    setProperty(root, 'setTimeout', function(func) { func(); });
    sleep(32).then(() => pass = true);
    setProperty(root, 'setTimeout', setTimeout);

    assert.ok(pass);
  });
});
