import assert from "assert";
import last from "../isPalindrome";

describe("findLongest", function () {
  it("should return true", function () {
    var x = "abc";
    assert.strictEqual(last(x), false);
  });

  it("should return false", function () {
    var x = "aba";
    assert.strictEqual(last(x), true);
  });
 
});
