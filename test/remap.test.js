import assert from "assert";
import remap from "../remap";
import createRemap from "../createRemap";

describe("remap", function () {
  it("should return 25 fo remap(50, 0, 100, 0, 50)", function () {
    assert.strictEqual(remap(50, 0, 100, 0, 50), 25);
  });

  it("should return 50 fo remap(25, 0, 50, 0, 100)", function () {
    assert.strictEqual(remap(25, 0, 50, 0, 100), 50);
  });
});

describe("createRemap", function () {
  it("should return 4 for createRemap(0, 600, 0, 100)(24)", function () {
    assert.strictEqual(createRemap(0, 600, 0, 100)(24), 4);
  });

  it("should return 24 for createRemap(0, 100, 0, 600)(4)", function () {
    assert.strictEqual(createRemap(0, 100, 0, 600)(4), 24);
  });
});
