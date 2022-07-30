import assert from "assert";
import last from "../isPalindrome";

describe("isPalindrome", function () {
  it("should return `true` for palindrome", function () {
    var x = "abc";
    assert.strictEqual(last(x), false);
  });

  it("should return `false` for palindrome", function () {
    var x = "aba";
    assert.strictEqual(last(x), true);
  });
});
