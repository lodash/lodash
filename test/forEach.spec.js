import each from '../src/each';
import forEach from '../src/forEach';

describe('forEach', () => {
    it('should be aliased', () => {
        expect(each).toBe(forEach);
    });
});
