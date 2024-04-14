import lodashStable from 'lodash';

import {
    body,
    create,
    slice,
    falsey,
    stubFalse,
    args,
    symbol,
    realm,
    amd,
    filePath,
    emptyObject,
    interopRequire,
} from './utils';

import isNative from '../src/isNative';
import _baseEach from '../.internal/baseEach';

describe('isNative', () => {
    it('should return `true` for native methods', () => {
        const values = [
            Array,
            body && body.cloneNode,
            create,
            root.encodeURI,
            Promise,
            slice,
            Uint8Array,
        ];
        const expected = lodashStable.map(values, Boolean);
        const actual = lodashStable.map(values, isNative);

        expect(actual).toEqual(expected);
    });

    it('should return `false` for non-native methods', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isNative(value) : isNative(),
        );

        expect(actual).toEqual(expected);

        expect(isNative(args)).toBe(false);
        expect(isNative([1, 2, 3])).toBe(false);
        expect(isNative(true)).toBe(false);
        expect(isNative(new Date())).toBe(false);
        expect(isNative(new Error())).toBe(false);
        expect(isNative({ a: 1 })).toBe(false);
        expect(isNative(1)).toBe(false);
        expect(isNative(/x/)).toBe(false);
        expect(isNative('a')).toBe(false);
        expect(isNative(symbol)).toBe(false);
    });

    it('should work with native functions from another realm', () => {
        if (realm.element) {
            expect(isNative(realm.element.cloneNode)).toBe(true);
        }
        if (realm.object) {
            expect(isNative(realm.object.valueOf)).toBe(true);
        }
    });

    xit('should throw an error if core-js is detected', () => {
        const lodash = runInContext({
            '__core-js_shared__': {},
        });

        expect(() => {
            lodash.isNative(noop);
        }).toThrow();
    });

    it('should detect methods masquerading as native (test in Node.js)', () => {
        if (!amd && _baseEach) {
            const path = require('path');
            const basePath = path.dirname(filePath);
            const uid = 'e0gvgyrad1jor';
            const coreKey = '__core-js_shared__';
            const fakeSrcKey = `Symbol(src)_1.${uid}`;

            root[coreKey] = { keys: { IE_PROTO: `Symbol(IE_PROTO)_3.${uid}` } };
            emptyObject(require.cache);

            const baseIsNative = interopRequire(path.join(basePath, '_baseIsNative'));
            expect(baseIsNative(slice)).toBe(true);

            slice[fakeSrcKey] = `${slice}`;
            expect(baseIsNative(slice)).toBe(false);

            delete slice[fakeSrcKey];
            delete root[coreKey];
        }
    });
});
