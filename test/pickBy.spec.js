import { stubTrue } from './utils';
import pickBy from '../src/pickBy';

describe('pickBy', () => {
    it('should work with a predicate argument', () => {
        const object = { a: 1, b: 2, c: 3, d: 4 };

        const actual = pickBy(object, (n) => n === 1 || n === 3);

        expect(actual).toEqual({ a: 1, c: 3 });
    });

    it('should not treat keys with dots as deep paths', () => {
        const object = { 'a.b.c': 1 };
        const actual = pickBy(object, stubTrue);

        expect(actual).toEqual({ 'a.b.c': 1 });
    });
});
