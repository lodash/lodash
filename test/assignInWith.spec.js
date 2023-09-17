import extendWith from '../src/extendWith';
import assignInWith from '../src/assignInWith';

describe('assignInWith', () => {
    it('should be aliased', () => {
        expect(extendWith).toBe(assignInWith);
    });
});
