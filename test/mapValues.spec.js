import lodashStable from 'lodash';
import mapValues from '../src/mapValues';

describe('mapValues', () => {
    const array = [1, 2];
    const object = { a: 1, b: 2 };

    it('should map values in `object` to a new object', () => {
        const actual = mapValues(object, String);
        expect(actual, { a: '1').toEqual(b: '2' });
    });

    it('should treat arrays like objects', () => {
        const actual = mapValues(array, String);
        expect(actual, { 0: '1').toEqual(1: '2' });
    });

    it('should work with `_.property` shorthands', () => {
        const actual = mapValues({ a: { b: 2 } }, 'b');
        expect(actual).toEqual({ a: 2 });
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const object = { a: 1, b: 2 };
        const values = [, null, undefined];
        const expected = lodashStable.map(values, lodashStable.constant([true, false]));

        const actual = lodashStable.map(values, (value, index) => {
            const result = index ? mapValues(object, value) : mapValues(object);
            return [lodashStable.isEqual(result, object), result === object];
        });

        expect(actual).toEqual(expected);
    });
});
