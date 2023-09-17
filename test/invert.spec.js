import invert from '../src/invert';

describe('invert', () => {
    it('should invert an object', () => {
        const object = { a: 1, b: 2 };
        const actual = invert(object);

        expect(actual).toEqual({ 1: 'a', 2: 'b' });
        expect(invert(actual)).toEqual({ a: '1', b: '2' });
    });

    it('should work with values that shadow keys on `Object.prototype`', () => {
        const object = { a: 'hasOwnProperty', b: 'constructor' };
        expect(invert(object)).toEqual({ hasOwnProperty: 'a', constructor: 'b' });
    });

    it('should work with an object that has a `length` property', () => {
        const object = { 0: 'a', 1: 'b', length: 2 };
        expect(invert(object)).toEqual({ a: '0', b: '1', 2: 'length' });
    });
});
