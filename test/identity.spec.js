import identity from '../src/identity';

describe('identity', () => {
    it('should return the first argument given', () => {
        const object = { name: 'fred' };
        expect(identity(object)).toBe(object);
    });
});
