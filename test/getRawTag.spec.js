"use strict";

module.exports = function (QUnit, _, skipAssert, DataView, ArrayBuffer) {
  QUnit.module("getRawTag", function () {
    QUnit.test("should not throw for DataView instances", function (assert) {
      assert.expect(1);

      if (DataView) {
        var dataView = new DataView(new ArrayBuffer(8));
        var result = _.attempt(function () {
          return _.isPlainObject(dataView);
        });

        assert.strictEqual(result, false);
      } else {
        skipAssert(assert);
      }
    });

    QUnit.test(
      "should yield a string tag for plain objects",
      function (assert) {
        assert.expect(1);

        var outcome = _.attempt(function () {
          return Object.prototype.toString.call({});
        });

        if (outcome instanceof Error) {
          assert.ok(false, "unexpected error when retrieving tag");
        } else {
          assert.strictEqual(typeof outcome, "string");
        }
      }
    );

    QUnit.test(
      "handles non-configurable Symbol.toStringTag gracefully",
      function (assert) {
        assert.expect(1);
        var sym = typeof Symbol === "function" ? Symbol.toStringTag : null;
        if (!sym) {
          skipAssert(assert);
          return;
        }
        var obj = {};
        Object.defineProperty(obj, sym, {
          value: "CustomObject",
          configurable: false,
          writable: false,
        });
        var result = _.attempt(function () {
          return _.isPlainObject(obj);
        });
        // Should return false (not plain object) but importantly, should not throw
        assert.strictEqual(result, false);
      }
    );

    QUnit.test(
      "does not throw when prototype has a setter that throws",
      function (assert) {
        assert.expect(1);
        var sym = typeof Symbol === "function" ? Symbol.toStringTag : null;
        if (!sym) {
          skipAssert(assert);
          return;
        }
        var proto = {};
        Object.defineProperty(proto, sym, {
          set: function () {
            throw new Error("hostile setter");
          },
          configurable: true,
        });
        var obj = Object.create(proto);
        var outcome = _.attempt(function () {
          return _.isPlainObject(obj);
        });
        assert.strictEqual(outcome, false, "should not throw and return false");
      }
    );

  });
};
