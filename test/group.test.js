import assert from 'assert';
import group from '../group.js';

describe('group', () => {
  it('Should group items evenly with the given amount of groups', () => {
    assert.strictEqual(String(group([1, 2, 3, 4, 5, 6], 3)), String([[1, 2], [3, 4], [5, 6]]));
    assert.strictEqual(String(group([1, 2, 3, 4, 5], 2)), String([[1, 2, 3], [4, 5]]));
  });
});
