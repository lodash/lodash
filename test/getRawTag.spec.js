'use strict';

module.exports = function(QUnit, _, skipAssert, DataView, ArrayBuffer) {
  QUnit.module('getRawTag', function() {
    QUnit.test('should not throw for DataView instances', function(assert) {
      assert.expect(1);

      if (DataView) {
        var dataView = new DataView(new ArrayBuffer(8));
        var result = _.attempt(function() {
          return _.isPlainObject(dataView);
        });

        assert.strictEqual(result, false);
      } else {
        skipAssert(assert);
      }
    });

    QUnit.test('should yield a string tag for plain objects', function(assert) {
      assert.expect(1);

      var outcome = _.attempt(function() {
        return Object.prototype.toString.call({});
      });

      if (outcome instanceof Error) {
        assert.ok(false, 'unexpected error when retrieving tag');
      } else {
        assert.strictEqual(typeof outcome, 'string');
      }
    });
  });
};
