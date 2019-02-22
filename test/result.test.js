import assert from "assert";
import lodashStable from "lodash";
import result from "../result.js";
import { stubB } from "./utils.js";

describe("result", function() {
  var object = { a: 1, b: stubB };
  var nullObject = null;
  var undefinedObject = undefined;
  var emptyObject = {};
  var nullInnerObject = { any: null };
  var undefinedInnerObject = { any: undefined };

  it("should invoke function values", function() {
    assert.strictEqual(result(object, "b"), "b");
  });

  it("should return undefined", function() {
    assert.strictEqual(result(nullObject, "any"), undefined);
    assert.strictEqual(result(undefinedObject, "any"), undefined);
    assert.strictEqual(result(emptyObject, "any"), undefined);
    assert.strictEqual(result(nullInnerObject, "any"), undefined);
    assert.strictEqual(result(undefinedInnerObject, "any"), undefined);
  });

  it("should return default value", function() {
    assert.deepEqual(result(nullObject, "any", { default: true }), {
      default: true
    });

    assert.deepEqual(result(undefinedObject, "any", { foo: "bar" }), {
      foo: "bar"
    });

    assert.deepEqual(result(emptyObject, "any", { foo: "bizz" }), {
      foo: "bizz"
    });

    assert.deepEqual(result(nullInnerObject, "any", { foo: "bizz" }), {
      foo: "bizz"
    });
    assert.deepEqual(result(undefinedInnerObject, "any", { foo: "bizz" }), {
      foo: "bizz"
    });
  });

  it("should invoke default function values", function() {
    var actual = result(object, "c", object.b);
    assert.strictEqual(actual, "b");
  });

  it("should invoke nested function values", function() {
    var value = { a: lodashStable.constant({ b: stubB }) };

    lodashStable.each(["a.b", ["a", "b"]], function(path) {
      assert.strictEqual(result(value, path), "b");
    });
  });

  it("should invoke deep property methods with the correct `this` binding", function() {
    var value = {
      a: {
        b: function() {
          return this.c;
        },
        c: 1
      }
    };

    lodashStable.each(["a.b", ["a", "b"]], function(path) {
      assert.strictEqual(result(value, path), 1);
    });
  });
});
