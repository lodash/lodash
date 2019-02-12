import assert from 'assert';
import { _, stubA } from './utils.js';

describe('now', function() {
  it('should return the number of milliseconds that have elapsed since the Unix epoch', function(done) {
    var stamp = +new Date,
        actual = _.now();

    assert.ok(actual >= stamp);

    setTimeout(function() {
      assert.ok(_.now() > actual);
      done();
    }, 32);
  });

  it('should work with mocked `Date.now`', function() {
    var now = Date.now;
    Date.now = stubA;

    var actual = _.now();
    Date.now = now;

    assert.strictEqual(actual, 'a');
  });
});
