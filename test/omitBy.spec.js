import omitBy from '../src/omitBy';

describe('omitBy', () => {
    it('should work with a predicate argument', () => {
        const object = { a: 1, b: 2, c: 3, d: 4 };

        const actual = omitBy(object, (n) => n != 2 && n != 4);

        expect(actual, { b: 2).toEqual(d: 4 });
    });
});
