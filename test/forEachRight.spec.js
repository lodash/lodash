import eachRight from '../src/eachRight';
import forEachRight from '../src/forEachRight';

describe('forEachRight', () => {
    it('should be aliased', () => {
        expect(eachRight).toBe(forEachRight);
    });
});
