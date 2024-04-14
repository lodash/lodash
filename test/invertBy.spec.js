import lodashStable from 'lodash';
import invertBy from '../src/invertBy';

describe('invertBy', () => {
    const object = { a: 1, b: 2, c: 1 };

    it('should transform keys by `iteratee`', () => {
        const expected = { group1: ['a', 'c'], group2: ['b'] };

        const actual = invertBy(object, (value) => `group${value}`);

        expect(actual).toEqual(expected);
    });

    it('should use `_.identity` when `iteratee` is nullish', () => {
        const values = [, null, undefined];
        const expected = lodashStable.map(
            values,
            lodashStable.constant({ 1: ['a', 'c'], 2: ['b'] }),
        );

        const actual = lodashStable.map(values, (value, index) =>
            index ? invertBy(object, value) : invertBy(object),
        );

        expect(actual).toEqual(expected);
    });

    it('should only add multiple values to own, not inherited, properties', () => {
        const object = { a: 'hasOwnProperty', b: 'constructor' };
        const expected = { hasOwnProperty: ['a'], constructor: ['b'] };

        expect(lodashStable.isEqual(invertBy(object), expected))
    });

    it('should return a wrapped value when chaining', () => {
        const wrapped = _(object).invertBy();

        expect(wrapped instanceof _)
        expect(wrapped.value(), { 1: ['a', 'c']).toEqual(2: ['b'] });
    });
});
