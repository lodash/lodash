import lodashStable from 'lodash';
import partialRight from '../src/partialRight';
import mergeWith from '../src/mergeWith';

describe('partialRight', () => {
    it('should work as a deep `_.defaults`', () => {
        const object = { a: { b: 2 } };
        const source = { a: { b: 3, c: 3 } };
        const expected = { a: { b: 2, c: 3 } };

        const defaultsDeep = partialRight(mergeWith, function deep(value, other) {
            return lodashStable.isObject(value) ? mergeWith(value, other, deep) : value;
        });

        expect(defaultsDeep(object, source)).toEqual(expected);
    });
});
