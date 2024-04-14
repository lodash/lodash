import join from '../src/join';

describe('join', () => {
    const array = ['a', 'b', 'c'];

    it('should return join all array elements into a string', () => {
        expect(join(array, '~')).toBe('a~b~c');
    });

    it('should return an unwrapped value when implicitly chaining', () => {
        const wrapped = _(array);
        expect(wrapped.join('~')).toBe('a~b~c');
        expect(wrapped.value()).toBe(array);
    });

    it('should return a wrapped value when explicitly chaining', () => {
        expect(_(array).chain().join('~') instanceof _);
    });
});
