import assert from 'assert';
import forMultipleEach from '../forMultipleEach.js';

describe('forMultipleEach', function () {
    it('should iterate till max length of array', function () {
        let count = 0;
        forMultipleEach([[1, 2], [11, 12, 13]], (itemOne, itemTwo, index) => count++);
        assert.strictEqual(count, 3);
    });

    it('should return some of two array', function () {
        let sum = 0;
        forMultipleEach([[1, 2], [3, 4]], (itemOne, itemTwo) => sum += itemOne + itemTwo);
        assert.strictEqual(sum, 10);
    });

});