import lodashStable from 'lodash';
import { objToString, objectTag, _, xml } from './utils';

describe('isType checks', () => {
    it('should return `false` for subclassed values', () => {
        const funcs = [
            'isArray',
            'isBoolean',
            'isDate',
            'isFunction',
            'isNumber',
            'isRegExp',
            'isString',
        ];

        lodashStable.each(funcs, (methodName) => {
            function Foo() {}
            Foo.prototype = root[methodName.slice(2)].prototype;

            const object = new Foo();
            if (objToString.call(object) === objectTag) {
                assert.strictEqual(
                    _[methodName](object),
                    false,
                    `\`_.${methodName}\` returns \`false\``,
                );
            }
        });
    });

    it('should not error on host objects (test in IE)', () => {
        const funcs = [
            'isArguments',
            'isArray',
            'isArrayBuffer',
            'isArrayLike',
            'isBoolean',
            'isBuffer',
            'isDate',
            'isElement',
            'isError',
            'isFinite',
            'isFunction',
            'isInteger',
            'isMap',
            'isNaN',
            'isNil',
            'isNull',
            'isNumber',
            'isObject',
            'isObjectLike',
            'isRegExp',
            'isSet',
            'isSafeInteger',
            'isString',
            'isUndefined',
            'isWeakMap',
            'isWeakSet',
        ];

        lodashStable.each(funcs, (methodName) => {
            if (xml) {
                _[methodName](xml);
                expect(true, `\`_.${methodName}\` should not error`);
            }
        });
    });
});
