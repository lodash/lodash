import assert from 'node:assert';
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
import runInContext from '../src/runInContext';
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
            ],
            expected = lodashStable.map(values, Boolean),
            actual = lodashStable.map(values, isNative);

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `false` for non-native methods', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isNative(value) : isNative(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isNative(args), false);
        assert.strictEqual(isNative([1, 2, 3]), false);
        assert.strictEqual(isNative(true), false);
        assert.strictEqual(isNative(new Date()), false);
        assert.strictEqual(isNative(new Error()), false);
        assert.strictEqual(isNative({ a: 1 }), false);
        assert.strictEqual(isNative(1), false);
        assert.strictEqual(isNative(/x/), false);
        assert.strictEqual(isNative('a'), false);
        assert.strictEqual(isNative(symbol), false);
    });

    it('should work with native functions from another realm', () => {
        if (realm.element) {
            assert.strictEqual(isNative(realm.element.cloneNode), true);
        }
        if (realm.object) {
            assert.strictEqual(isNative(realm.object.valueOf), true);
        }
    });

    it('should throw an error if core-js is detected', () => {
        const lodash = runInContext({
            '__core-js_shared__': {},
        });

        assert.raises(() => {
            lodash.isNative(noop);
        });
    });

    it('should detect methods masquerading as native (test in Node.js)', () => {
        if (!amd && _baseEach) {
            const path = require('path'),
                basePath = path.dirname(filePath),
                uid = 'e0gvgyrad1jor',
                coreKey = '__core-js_shared__',
                fakeSrcKey = `Symbol(src)_1.${uid}`;

            root[coreKey] = { keys: { IE_PROTO: `Symbol(IE_PROTO)_3.${uid}` } };
            emptyObject(require.cache);

            const baseIsNative = interopRequire(path.join(basePath, '_baseIsNative'));
            assert.strictEqual(baseIsNative(slice), true);

            slice[fakeSrcKey] = `${slice}`;
            assert.strictEqual(baseIsNative(slice), false);

            delete slice[fakeSrcKey];
            delete root[coreKey];
        }
    });
});
