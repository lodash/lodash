import assert from "assert";
import lodashStable from "lodash";
import { falsey, noop } from "./utils.js";
import nthOrderStatistic from "../nthOrderStatistic.js";

describe("nthOrderStatistic", function () {
  it("should return the smallest value from a collection", function () {
    assert.strictEqual(nthOrderStatistic([1, 2, 3], 0), 1);
  });

  it("should return the second smallest value from a collection", function () {
    assert.strictEqual(nthOrderStatistic([1, 2, 3], 1), 2);
  });

  it("should return the largest value from a collection", function () {
    assert.strictEqual(nthOrderStatistic([1, 2, 3], 2), 3);
  });

  it("should return `undefined` for empty collections", function () {
    var values = falsey.concat([[]]),
      expected = lodashStable.map(values, noop);

    var actual = lodashStable.map(values, function (value, index) {
      try {
        return index ? nthOrderStatistic(value, 0) : nthOrderStatistic("", 0);
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it("should work with non-numeric collection values", function () {
    assert.strictEqual(nthOrderStatistic(["a", "b"], 0), "a");
  });
});
