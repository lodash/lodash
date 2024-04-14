import lodashStable from 'lodash';
import { typedArrays, falsey, stubFalse, args, slice, symbol, realm, root } from './utils';
import isTypedArray from '../src/isTypedArray';

describe('isTypedArray', () => {
    it('should return `true` for typed arrays', () => {
        const expected = lodashStable.map(typedArrays, (type) => type in root);

        const actual = lodashStable.map(typedArrays, (type) => {
            const Ctor = root[type];
            return Ctor ? isTypedArray(new Ctor(new ArrayBuffer(8))) : false;
        });

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non typed arrays', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isTypedArray(value) : isTypedArray(),
        );

        expect(actual).toEqual(expected);

        expect(isTypedArray(args)).toBe(false);
        expect(isTypedArray([1, 2, 3])).toBe(false);
        expect(isTypedArray(true)).toBe(false);
        expect(isTypedArray(new Date())).toBe(false);
        expect(isTypedArray(new Error())).toBe(false);
        expect(isTypedArray(slice)).toBe(false);
        expect(isTypedArray({ a: 1 })).toBe(false);
        expect(isTypedArray(1)).toBe(false);
        expect(isTypedArray(/x/)).toBe(false);
        expect(isTypedArray('a')).toBe(false);
        expect(isTypedArray(symbol)).toBe(false);
    });

    it('should work with typed arrays from another realm', () => {
        if (realm.object) {
            const props = lodashStable.invokeMap(typedArrays, 'toLowerCase');

            const expected = lodashStable.map(props, (key) => realm[key] !== undefined);

            const actual = lodashStable.map(props, (key) => {
                const value = realm[key];
                return value ? isTypedArray(value) : false;
            });

            expect(actual).toEqual(expected);
        }
    });
});
