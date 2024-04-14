import entries from '../src/entries';
import toPairs from '../src/toPairs';

describe('toPairs', () => {
    it('should be aliased', () => {
        expect(entries).toBe(toPairs);
    });
});
