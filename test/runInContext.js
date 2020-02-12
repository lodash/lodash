import assert from 'assert';
import lodashStable from 'lodash';
import runInContext from '../runInContext.js';
import uniqueId from '../uniqueId.js';

describe('runInContext', function() {
  it('should not require a fully populated `context` object', function() {
    var lodash = runInContext({
      'setTimeout': function(func) { func(); }
    });

    var pass = false;
    lodash.delay(function() { pass = true; }, 32);
    assert.ok(pass);
  });

  it('should use a zeroed `_.uniqueId` counter', function() {
    lodashStable.times(2, uniqueId);

    var oldId = Number(uniqueId()),
        lodash = runInContext();

    assert.ok(uniqueId() > oldId);

    var id = lodash.uniqueId();
    assert.strictEqual(id, '1');
    assert.ok(id < oldId);
  });
});
