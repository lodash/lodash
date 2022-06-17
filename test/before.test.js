import assert from "assert";
import lodashStable from "lodash";
import { _ } from "./utils.js";

describe.only("before", () => {
  const callMethod = (n, times) => {
    let count = 0;

    lodashStable.times(
      times,
      _.before(n, () => {
        count++;
      })
    );
    return count;
  };

  describe("if `func` arg is a valid function", () => {
    describe("if n isn't a numeric value", () => {
      it("should coerce NaN values to 0", () => {
        assert.strictEqual(callMethod(NaN, 10), 0);
      });
    });

    describe("if n is a numeric value", () => {
      describe("when n = 0", () => {
        it("should create a function that does not invoke `func` when called", () => {
          assert.strictEqual(callMethod(0, 10), 0);
        });

        it("should create a function that does not invoke `func` immediately", () => {
          assert.strictEqual(callMethod(0, 0), 0);
        });
      });

      describe("when n > 0", () => {
        it("should create a function that invokes `func` before being called n times", () => {
          assert.strictEqual(callMethod(5, 4), 4);
        });

        it("should create a function that does not invoke `func` after being called n - 1 times", () => {
          assert.strictEqual(callMethod(5, 5), 4);
        });
      });

      describe("when n < 0", () => {
        it("should create a function that does not invoke `func` when called", () => {
          assert.strictEqual(callMethod(-1, 10), 0);
        });
      });
    });
  });

  describe('if `func` ins\'t an object of type "function"', () => {
    it("should throw TypeError", () => {
      assert.throws(() => _.before(10, { test: "not a function" }));
    });
  });

  it("should use `this` binding of function", () => {
    const before = _.before(2, function () {
        return ++this.count;
      }),
      object = { before, count: 0 };

    object.before();
    assert.strictEqual(object.before(), 1);
    assert.strictEqual(object.count, 1);
  });
});
