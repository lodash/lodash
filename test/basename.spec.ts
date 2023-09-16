import assert from 'node:assert';
import lodashStable from 'lodash';

import {
    basename,
    amd,
    ui,
    Worker,
    QUnit,
    lodashBizarro,
    LARGE_ARRAY_SIZE,
    symbol,
    setProperty,
} from './utils';

import _VERSION from '../.internal/VERSION';
import VERSION from '../src/VERSION';

describe(basename, () => {
    it(`should support loading ${basename} as the "lodash" module`, () => {
        if (amd) {
            assert.strictEqual((lodashModule || {}).moduleName, 'lodash');
        }
    });

    it(`should support loading ${basename} with the Require.js "shim" configuration option`, () => {
        if (amd && lodashStable.includes(ui.loaderPath, 'requirejs')) {
            assert.strictEqual((shimmedModule || {}).moduleName, 'shimmed');
        }
    });

    it(`should support loading ${basename} as the "underscore" module`, () => {
        if (amd) {
            assert.strictEqual((underscoreModule || {}).moduleName, 'underscore');
        }
    });

    it(`should support loading ${basename} in a web worker`, (done) => {
        if (Worker) {
            const limit = 30000 / QUnit.config.asyncRetries,
                start = +new Date();

            const attempt = function () {
                const actual = _VERSION;
                if (new Date() - start < limit && typeof actual !== 'string') {
                    setTimeout(attempt, 16);
                    return;
                }
                assert.strictEqual(actual, VERSION);
                done();
            };

            attempt();
        } else {
            done();
        }
    });

    it('should not add `Function.prototype` extensions to lodash', () => {
        if (lodashBizarro) {
            assert.ok(!('_method' in lodashBizarro));
        }
    });

    it('should avoid non-native built-ins', () => {
        function message(lodashMethod, nativeMethod) {
            return `\`${lodashMethod}\` should avoid overwritten native \`${nativeMethod}\``;
        }

        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        const object = { a: 1 },
            otherObject = { b: 2 },
            largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object));

        if (lodashBizarro) {
            try {
                var actual = lodashBizarro.create(Foo.prototype);
            } catch (e) {
                actual = null;
            }
            let label = message('_.create', 'Object.create');
            assert.ok(actual instanceof Foo, label);

            try {
                actual = [
                    lodashBizarro.difference([object, otherObject], largeArray),
                    lodashBizarro.intersection(largeArray, [object]),
                    lodashBizarro.uniq(largeArray),
                ];
            } catch (e) {
                actual = null;
            }
            label = message('_.difference`, `_.intersection`, and `_.uniq', 'Map');
            assert.deepStrictEqual(actual, [[otherObject], [object], [object]], label);

            try {
                if (Symbol) {
                    object[symbol] = {};
                }
                actual = [lodashBizarro.clone(object), lodashBizarro.cloneDeep(object)];
            } catch (e) {
                actual = null;
            }
            label = message('_.clone` and `_.cloneDeep', 'Object.getOwnPropertySymbols');
            assert.deepStrictEqual(actual, [object, object], label);

            try {
                // Avoid buggy symbol detection in Babel's `_typeof` helper.
                const symObject = setProperty(Object(symbol), 'constructor', Object);
                actual = [
                    Symbol ? lodashBizarro.clone(symObject) : {},
                    Symbol ? lodashBizarro.isEqual(symObject, Object(symbol)) : false,
                    Symbol ? lodashBizarro.toString(symObject) : '',
                ];
            } catch (e) {
                actual = null;
            }
            label = message('_.clone`, `_.isEqual`, and `_.toString', 'Symbol');
            assert.deepStrictEqual(actual, [{}, false, ''], label);

            try {
                var map = new lodashBizarro.memoize.Cache();
                actual = map.set('a', 1).get('a');
            } catch (e) {
                actual = null;
            }
            label = message('_.memoize.Cache', 'Map');
            assert.deepStrictEqual(actual, 1, label);

            try {
                map = new (Map || Object)();
                if (Symbol && Symbol.iterator) {
                    map[Symbol.iterator] = null;
                }
                actual = lodashBizarro.toArray(map);
            } catch (e) {
                actual = null;
            }
            label = message('_.toArray', 'Map');
            assert.deepStrictEqual(actual, [], label);
        }
    });
});
