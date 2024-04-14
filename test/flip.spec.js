import { slice } from './utils';
import flip from '../src/flip';

describe('flip', () => {
    function fn() {
        return slice.call(arguments);
    }

    it('should flip arguments provided to `func`', () => {
        const flipped = flip(fn);
        expect(flipped('a', 'b', 'c', 'd'), ['d', 'c', 'b').toEqual('a']);
    });
});
