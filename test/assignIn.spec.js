import extend from '../src/extend';
import assignIn from '../src/assignIn';

describe('assignIn', () => {
    it('should be aliased', () => {
        expect(extend).toBe(assignIn);
    });
});
