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
            expect((lodashModule || {}).moduleName).toBe('lodash');
        }
    });

    it(`should support loading ${basename} with the Require.js "shim" configuration option`, () => {
        if (amd && lodashStable.includes(ui.loaderPath, 'requirejs')) {
            expect((shimmedModule || {}).moduleName).toBe('shimmed');
        }
    });

    it(`should support loading ${basename} as the "underscore" module`, () => {
        if (amd) {
            expect((underscoreModule || {}).moduleName).toBe('underscore');
        }
    });

    it(`should support loading ${basename} in a web worker`, (done) => {
        if (Worker) {
            const limit = 30000 / QUnit.config.asyncRetries;
            const start = +new Date();

            const attempt = function () {
                const actual = _VERSION;
                if (new Date() - start < limit && typeof actual !== 'string') {
                    setTimeout(attempt, 16);
                    return;
                }
                expect(actual).toBe(VERSION);
                done();
            };

            attempt();
        } else {
            done();
        }
    });

    it('should not add `Function.prototype` extensions to lodash', () => {
        if (lodashBizarro) {
            expect('_method' in lodashBizarro).toBe(false);
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

        const object = { a: 1 };
        const otherObject = { b: 2 };
        const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object));

        if (lodashBizarro) {
            try {
                var actual = lodashBizarro.create(Foo.prototype);
            } catch (e) {
                actual = null;
            }
            let label = message('_.create', 'Object.create');
            expect(actual instanceof Foo, label);

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
            expect(actual, [[otherObject], [object], [object]]).toEqual(label);

            try {
                if (Symbol) {
                    object[symbol] = {};
                }
                actual = [lodashBizarro.clone(object), lodashBizarro.cloneDeep(object)];
            } catch (e) {
                actual = null;
            }
            label = message('_.clone` and `_.cloneDeep', 'Object.getOwnPropertySymbols');
            expect(actual, [object, object]).toEqual(label);

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
            expect(actual, [{}, false, '']).toEqual(label);

            try {
                var map = new lodashBizarro.memoize.Cache();
                actual = map.set('a', 1).get('a');
            } catch (e) {
                actual = null;
            }
            label = message('_.memoize.Cache', 'Map');
            expect(actual, 1).toEqual(label);

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
            expect(actual, []).toEqual(label);
        }
    });
});
