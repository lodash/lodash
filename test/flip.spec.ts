import assert from 'node:assert';
import { slice } from './utils';
import flip from '../src/flip';

describe('flip', () => {
    function fn() {
        return slice.call(arguments);
    }

    it('should flip arguments provided to `func`', () => {
        const flipped = flip(fn);
        assert.deepStrictEqual(flipped('a', 'b', 'c', 'd'), ['d', 'c', 'b', 'a']);
    });
});
