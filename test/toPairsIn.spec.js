import entriesIn from '../src/entriesIn';
import toPairsIn from '../src/toPairsIn';

describe('toPairsIn', () => {
    it('should be aliased', () => {
        expect(entriesIn).toBe(toPairsIn);
    });
});
