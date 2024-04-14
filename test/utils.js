/** Used to detect when a function becomes hot. */
const HOT_COUNT = 150;

/** Used as the size to cover large array optimizations. */
const LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
const FUNC_ERROR_TEXT = 'Expected a function';

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500;

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;
const MAX_INTEGER = 1.7976931348623157e308;

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;
const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/** `Object#toString` result references. */
const funcTag = '[object Function]';
const numberTag = '[object Number]';
const objectTag = '[object Object]';

/** Used as a reference to the global object. */
const root = (typeof global === 'object' && global) || this;

/** Used to store lodash to test for bad extensions/shims. */
let lodashBizarro = root.lodashBizarro;

/** Used for native method references. */
const arrayProto = Array.prototype;
const funcProto = Function.prototype;
const objectProto = Object.prototype;
const numberProto = Number.prototype;
const stringProto = String.prototype;

/** Method and object shortcuts. */
const phantom = root.phantom;
const process = root.process;
const amd = root.define ? define.amd : undefined;
const args = toArgs([1, 2, 3]);
const argv = process ? process.argv : undefined;
const defineProperty = Object.defineProperty;
const document = phantom ? undefined : root.document;
const body = root.document ? root.document.body : undefined;
const create = Object.create;
const fnToString = funcProto.toString;
const freeze = Object.freeze;
const getSymbols = Object.getOwnPropertySymbols;
const identity = function (value) {
    return value;
};
const noop = function () {};
const objToString = objectProto.toString;
let params = argv;
const push = arrayProto.push;
const realm = {};
const slice = arrayProto.slice;
const strictArgs = (function () {
    'use strict';

    return arguments;
})(1, 2, 3);

const ArrayBuffer = root.ArrayBuffer;
const Buffer = root.Buffer;
const Map = root.Map;
const Promise = root.Promise;
const Proxy = root.Proxy;
const Set = root.Set;
const Symbol = root.Symbol;
const Uint8Array = root.Uint8Array;
const WeakMap = root.WeakMap;
const WeakSet = root.WeakSet;

const arrayBuffer = ArrayBuffer ? new ArrayBuffer(2) : undefined;
const map = Map ? new Map() : undefined;
const promise = Promise ? Promise.resolve(1) : undefined;
const set = Set ? new Set() : undefined;
const symbol = Symbol ? Symbol('a') : undefined;
const weakMap = WeakMap ? new WeakMap() : undefined;
const weakSet = WeakSet ? new WeakSet() : undefined;

/** Math helpers. */
const add = function (x, y) {
    return x + y;
};
const doubled = function (n) {
    return n * 2;
};
const isEven = function (n) {
    return n % 2 == 0;
};
const square = function (n) {
    return n * n;
};

/** Stub functions. */
const stubA = function () {
    return 'a';
};
const stubB = function () {
    return 'b';
};
const stubC = function () {
    return 'c';
};

const stubTrue = function () {
    return true;
};
const stubFalse = function () {
    return false;
};

const stubNaN = function () {
    return NaN;
};
const stubNull = function () {
    return null;
};

const stubZero = function () {
    return 0;
};
const stubOne = function () {
    return 1;
};
const stubTwo = function () {
    return 2;
};
const stubThree = function () {
    return 3;
};
const stubFour = function () {
    return 4;
};

const stubArray = function () {
    return [];
};
const stubObject = function () {
    return {};
};
const stubString = function () {
    return '';
};

/** List of Latin Unicode letters. */
const burredLetters = [
    // Latin-1 Supplement letters.
    '\xc0',
    '\xc1',
    '\xc2',
    '\xc3',
    '\xc4',
    '\xc5',
    '\xc6',
    '\xc7',
    '\xc8',
    '\xc9',
    '\xca',
    '\xcb',
    '\xcc',
    '\xcd',
    '\xce',
    '\xcf',
    '\xd0',
    '\xd1',
    '\xd2',
    '\xd3',
    '\xd4',
    '\xd5',
    '\xd6',
    '\xd8',
    '\xd9',
    '\xda',
    '\xdb',
    '\xdc',
    '\xdd',
    '\xde',
    '\xdf',
    '\xe0',
    '\xe1',
    '\xe2',
    '\xe3',
    '\xe4',
    '\xe5',
    '\xe6',
    '\xe7',
    '\xe8',
    '\xe9',
    '\xea',
    '\xeb',
    '\xec',
    '\xed',
    '\xee',
    '\xef',
    '\xf0',
    '\xf1',
    '\xf2',
    '\xf3',
    '\xf4',
    '\xf5',
    '\xf6',
    '\xf8',
    '\xf9',
    '\xfa',
    '\xfb',
    '\xfc',
    '\xfd',
    '\xfe',
    '\xff',
    // Latin Extended-A letters.
    '\u0100',
    '\u0101',
    '\u0102',
    '\u0103',
    '\u0104',
    '\u0105',
    '\u0106',
    '\u0107',
    '\u0108',
    '\u0109',
    '\u010a',
    '\u010b',
    '\u010c',
    '\u010d',
    '\u010e',
    '\u010f',
    '\u0110',
    '\u0111',
    '\u0112',
    '\u0113',
    '\u0114',
    '\u0115',
    '\u0116',
    '\u0117',
    '\u0118',
    '\u0119',
    '\u011a',
    '\u011b',
    '\u011c',
    '\u011d',
    '\u011e',
    '\u011f',
    '\u0120',
    '\u0121',
    '\u0122',
    '\u0123',
    '\u0124',
    '\u0125',
    '\u0126',
    '\u0127',
    '\u0128',
    '\u0129',
    '\u012a',
    '\u012b',
    '\u012c',
    '\u012d',
    '\u012e',
    '\u012f',
    '\u0130',
    '\u0131',
    '\u0132',
    '\u0133',
    '\u0134',
    '\u0135',
    '\u0136',
    '\u0137',
    '\u0138',
    '\u0139',
    '\u013a',
    '\u013b',
    '\u013c',
    '\u013d',
    '\u013e',
    '\u013f',
    '\u0140',
    '\u0141',
    '\u0142',
    '\u0143',
    '\u0144',
    '\u0145',
    '\u0146',
    '\u0147',
    '\u0148',
    '\u0149',
    '\u014a',
    '\u014b',
    '\u014c',
    '\u014d',
    '\u014e',
    '\u014f',
    '\u0150',
    '\u0151',
    '\u0152',
    '\u0153',
    '\u0154',
    '\u0155',
    '\u0156',
    '\u0157',
    '\u0158',
    '\u0159',
    '\u015a',
    '\u015b',
    '\u015c',
    '\u015d',
    '\u015e',
    '\u015f',
    '\u0160',
    '\u0161',
    '\u0162',
    '\u0163',
    '\u0164',
    '\u0165',
    '\u0166',
    '\u0167',
    '\u0168',
    '\u0169',
    '\u016a',
    '\u016b',
    '\u016c',
    '\u016d',
    '\u016e',
    '\u016f',
    '\u0170',
    '\u0171',
    '\u0172',
    '\u0173',
    '\u0174',
    '\u0175',
    '\u0176',
    '\u0177',
    '\u0178',
    '\u0179',
    '\u017a',
    '\u017b',
    '\u017c',
    '\u017d',
    '\u017e',
    '\u017f',
];

/** List of combining diacritical marks. */
const comboMarks = [
    '\u0300',
    '\u0301',
    '\u0302',
    '\u0303',
    '\u0304',
    '\u0305',
    '\u0306',
    '\u0307',
    '\u0308',
    '\u0309',
    '\u030a',
    '\u030b',
    '\u030c',
    '\u030d',
    '\u030e',
    '\u030f',
    '\u0310',
    '\u0311',
    '\u0312',
    '\u0313',
    '\u0314',
    '\u0315',
    '\u0316',
    '\u0317',
    '\u0318',
    '\u0319',
    '\u031a',
    '\u031b',
    '\u031c',
    '\u031d',
    '\u031e',
    '\u031f',
    '\u0320',
    '\u0321',
    '\u0322',
    '\u0323',
    '\u0324',
    '\u0325',
    '\u0326',
    '\u0327',
    '\u0328',
    '\u0329',
    '\u032a',
    '\u032b',
    '\u032c',
    '\u032d',
    '\u032e',
    '\u032f',
    '\u0330',
    '\u0331',
    '\u0332',
    '\u0333',
    '\u0334',
    '\u0335',
    '\u0336',
    '\u0337',
    '\u0338',
    '\u0339',
    '\u033a',
    '\u033b',
    '\u033c',
    '\u033d',
    '\u033e',
    '\u033f',
    '\u0340',
    '\u0341',
    '\u0342',
    '\u0343',
    '\u0344',
    '\u0345',
    '\u0346',
    '\u0347',
    '\u0348',
    '\u0349',
    '\u034a',
    '\u034b',
    '\u034c',
    '\u034d',
    '\u034e',
    '\u034f',
    '\u0350',
    '\u0351',
    '\u0352',
    '\u0353',
    '\u0354',
    '\u0355',
    '\u0356',
    '\u0357',
    '\u0358',
    '\u0359',
    '\u035a',
    '\u035b',
    '\u035c',
    '\u035d',
    '\u035e',
    '\u035f',
    '\u0360',
    '\u0361',
    '\u0362',
    '\u0363',
    '\u0364',
    '\u0365',
    '\u0366',
    '\u0367',
    '\u0368',
    '\u0369',
    '\u036a',
    '\u036b',
    '\u036c',
    '\u036d',
    '\u036e',
    '\u036f',
    '\ufe20',
    '\ufe21',
    '\ufe22',
    '\ufe23',
];

/** List of converted Latin Unicode letters. */
const deburredLetters = [
    // Converted Latin-1 Supplement letters.
    'A',
    'A',
    'A',
    'A',
    'A',
    'A',
    'Ae',
    'C',
    'E',
    'E',
    'E',
    'E',
    'I',
    'I',
    'I',
    'I',
    'D',
    'N',
    'O',
    'O',
    'O',
    'O',
    'O',
    'O',
    'U',
    'U',
    'U',
    'U',
    'Y',
    'Th',
    'ss',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'ae',
    'c',
    'e',
    'e',
    'e',
    'e',
    'i',
    'i',
    'i',
    'i',
    'd',
    'n',
    'o',
    'o',
    'o',
    'o',
    'o',
    'o',
    'u',
    'u',
    'u',
    'u',
    'y',
    'th',
    'y',
    // Converted Latin Extended-A letters.
    'A',
    'a',
    'A',
    'a',
    'A',
    'a',
    'C',
    'c',
    'C',
    'c',
    'C',
    'c',
    'C',
    'c',
    'D',
    'd',
    'D',
    'd',
    'E',
    'e',
    'E',
    'e',
    'E',
    'e',
    'E',
    'e',
    'E',
    'e',
    'G',
    'g',
    'G',
    'g',
    'G',
    'g',
    'G',
    'g',
    'H',
    'h',
    'H',
    'h',
    'I',
    'i',
    'I',
    'i',
    'I',
    'i',
    'I',
    'i',
    'I',
    'i',
    'IJ',
    'ij',
    'J',
    'j',
    'K',
    'k',
    'k',
    'L',
    'l',
    'L',
    'l',
    'L',
    'l',
    'L',
    'l',
    'L',
    'l',
    'N',
    'n',
    'N',
    'n',
    'N',
    'n',
    "'n",
    'N',
    'n',
    'O',
    'o',
    'O',
    'o',
    'O',
    'o',
    'Oe',
    'oe',
    'R',
    'r',
    'R',
    'r',
    'R',
    'r',
    'S',
    's',
    'S',
    's',
    'S',
    's',
    'S',
    's',
    'T',
    't',
    'T',
    't',
    'T',
    't',
    'U',
    'u',
    'U',
    'u',
    'U',
    'u',
    'U',
    'u',
    'U',
    'u',
    'U',
    'u',
    'W',
    'w',
    'Y',
    'y',
    'Y',
    'Z',
    'z',
    'Z',
    'z',
    'Z',
    'z',
    's',
];

/** Used to provide falsey values to methods. */
const falsey = [, null, undefined, false, 0, NaN, ''];

/** Used to specify the emoji style glyph variant of characters. */
const emojiVar = '\ufe0f';

/** Used to provide empty values to methods. */
const empties = [[], {}].concat(falsey.slice(1));

/** Used to test error objects. */
const errors = [
    new Error(),
    new EvalError(),
    new RangeError(),
    new ReferenceError(),
    new SyntaxError(),
    new TypeError(),
    new URIError(),
];

/** List of fitzpatrick modifiers. */
const fitzModifiers = [
    '\ud83c\udffb',
    '\ud83c\udffc',
    '\ud83c\udffd',
    '\ud83c\udffe',
    '\ud83c\udfff',
];

/** Used to provide primitive values to methods. */
const primitives = [null, undefined, false, true, 1, NaN, 'a'];

/** Used to check whether methods support typed arrays. */
const typedArrays = [
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
];

/** Used to check whether methods support array views. */
const arrayViews = typedArrays.concat('DataView');

/** The file path of the lodash file to test. */
const filePath = (function () {
    let min = 2;
    let result = params || [];

    if (phantom) {
        min = 0;
        result = params = phantom.args || require('system').args;
    }
    const last = result[result.length - 1];
    result =
        result.length > min && !/test(?:\.js)?$/.test(last)
            ? last
            : '../node_modules/lodash/lodash';

    if (!amd) {
        try {
            result = require('fs').realpathSync(result);
        } catch (e) {}

        try {
            result = require.resolve(result);
        } catch (e) {}
    }
    return result;
})();

/** The `ui` object. */
const ui =
    root.ui ||
    (root.ui = {
        buildPath: filePath,
        loaderPath: '',
        isModularize: /\b(?:amd|commonjs|es|node|npm|(index|main)\.js)\b/.test(filePath),
        isStrict: /\bes\b/.test(filePath) || 'default' in require(filePath),
        urlParams: {},
    });

/** The basename of the lodash file to test. */
const basename = /[\w.-]+$/.exec(filePath)[0];

/** Used to indicate testing a modularized build. */
const isModularize = ui.isModularize;

/** Detect if testing `npm` modules. */
const isNpm = isModularize && /\bnpm\b/.test([ui.buildPath, ui.urlParams.build]);

/** Detect if running in PhantomJS. */
const isPhantom = phantom || typeof callPhantom === 'function';

/** Detect if lodash is in strict mode. */
const isStrict = ui.isStrict;

/*--------------------------------------------------------------------------*/

// Leak to avoid sporadic `noglobals` fails on Edge in Sauce Labs.
root.msWDfn = undefined;

// Assign `setTimeout` to itself to avoid being flagged as a leak.
setProperty(root, 'setTimeout', setTimeout);

/*--------------------------------------------------------------------------*/

/** Used to test Web Workers. */
const Worker =
    !(ui.isForeign || ui.isSauceLabs || isModularize) &&
    document &&
    document.origin != 'null' &&
    root.Worker;

/** Poison the free variable `root` in Node.js */
try {
    defineProperty(global.root, 'root', {
        configurable: false,
        enumerable: false,
        get: function () {
            throw new ReferenceError();
        },
    });
} catch (e) {}

/** Load stable Lodash. */
let lodashStable = root.lodashStable;
if (!lodashStable) {
    try {
        lodashStable = interopRequire('../node_modules/lodash/lodash');
    } catch (e) {
        console.log(
            'Error: The stable lodash dev dependency should be at least a version behind master branch.',
        );
    }
    lodashStable = lodashStable.noConflict();
}

/** The `lodash` function to test. */
const _ = root._ || (root._ = interopRequire(filePath));

/** Used to test pseudo private map caches. */
const mapCaches = (function () {
    const MapCache = _.memoize.Cache;
    const result = {
        Hash: new MapCache().__data__.hash.constructor,
        MapCache: MapCache,
    };
    _.isMatchWith({ a: 1 }, { a: 1 }, function () {
        const stack = lodashStable.last(arguments);
        result.ListCache = stack.__data__.constructor;
        result.Stack = stack.constructor;
    });
    return result;
})();

/** Used to detect instrumented istanbul code coverage runs. */
const coverage =
    root.__coverage__ ||
    root[lodashStable.find(lodashStable.keys(root), (key) => /^(?:\$\$cov_\d+\$\$)$/.test(key))];

/** Used to test async functions. */
const asyncFunc = lodashStable.attempt(() => Function('return async () => {}'));

/** Used to test generator functions. */
const genFunc = lodashStable.attempt(() => Function('return function*(){}'));

/** Used to restore the `_` reference. */
const oldDash = root._;

/**
 * Used to check for problems removing whitespace. For a whitespace reference,
 * see [V8's unit test](https://code.google.com/p/v8/source/browse/branches/bleeding_edge/test/mjsunit/whitespaces.js).
 */
const whitespace = lodashStable
    .filter(
        [
            // Basic whitespace characters.
            ' ',
            '\t',
            '\x0b',
            '\f',
            '\xa0',
            '\ufeff',

            // Line terminators.
            '\n',
            '\r',
            '\u2028',
            '\u2029',

            // Unicode category "Zs" space separators.
            '\u1680',
            '\u180e',
            '\u2000',
            '\u2001',
            '\u2002',
            '\u2003',
            '\u2004',
            '\u2005',
            '\u2006',
            '\u2007',
            '\u2008',
            '\u2009',
            '\u200a',
            '\u202f',
            '\u205f',
            '\u3000',
        ],
        (chr) => /\s/.exec(chr),
    )
    .join('');

/**
 * Creates a custom error object.
 *
 * @private
 * @constructor
 * @param {string} message The error message.
 */
function CustomError(message) {
    this.name = 'CustomError';
    this.message = message;
}

CustomError.prototype = lodashStable.create(Error.prototype, {
    constructor: CustomError,
});

/**
 * Removes all own enumerable string keyed properties from a given object.
 *
 * @private
 * @param {Object} object The object to empty.
 */
function emptyObject(object) {
    lodashStable.forOwn(object, (value, key, object) => {
        delete object[key];
    });
}

/**
 * Extracts the unwrapped value from its wrapper.
 *
 * @private
 * @param {Object} wrapper The wrapper to unwrap.
 * @returns {*} Returns the unwrapped value.
 */
function getUnwrappedValue(wrapper) {
    let index = -1;
    const actions = wrapper.__actions__;
    const length = actions.length;
    let result = wrapper.__wrapped__;

    while (++index < length) {
        const args = [result];
        const action = actions[index];

        push.apply(args, action.args);
        result = action.func.apply(action.thisArg, args);
    }
    return result;
}

/**
 * Loads the module of `id`. If the module has an `exports.default`, the
 * exported default value is returned as the resolved module.
 *
 * @private
 * @param {string} id The identifier of the module to resolve.
 * @returns {*} Returns the resolved module.
 */
function interopRequire(id) {
    const result = require(id);
    return 'default' in result ? result.default : result;
}

/**
 * Sets a non-enumerable property value on `object`.
 *
 * Note: This function is used to avoid a bug in older versions of V8 where
 * overwriting non-enumerable built-ins makes them enumerable.
 * See https://code.google.com/p/v8/issues/detail?id=1623
 *
 * @private
 * @param {Object} object The object modify.
 * @param {string} key The name of the property to set.
 * @param {*} value The property value.
 */
function setProperty(object, key, value) {
    try {
        defineProperty(object, key, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value,
        });
    } catch (e) {
        object[key] = value;
    }
    return object;
}

/**
 * Skips a given number of tests with a passing result.
 *
 * @private
 * @param {Object} assert The QUnit assert object.
 * @param {number} [count=1] The number of tests to skip.
 */
function skipAssert(assert, count) {
    count || (count = 1);
    while (count--) {
        expect(true, 'test skipped');
    }
}

/**
 * Converts `array` to an `arguments` object.
 *
 * @private
 * @param {Array} array The array to convert.
 * @returns {Object} Returns the converted `arguments` object.
 */
function toArgs(array) {
    return function () {
        return arguments;
    }.apply(undefined, array);
}

/*--------------------------------------------------------------------------*/

// Add bizarro values.
(function () {
    return; // fixme
    if (document || typeof require !== 'function') {
        return;
    }
    const nativeString = fnToString.call(toString);
    const reToString = /toString/g;

    function createToString(funcName) {
        return lodashStable.constant(nativeString.replace(reToString, funcName));
    }

    // Allow bypassing native checks.
    setProperty(funcProto, 'toString', function wrapper() {
        setProperty(funcProto, 'toString', fnToString);
        const result = lodashStable.has(this, 'toString') ? this.toString() : fnToString.call(this);
        setProperty(funcProto, 'toString', wrapper);
        return result;
    });

    // Add prototype extensions.
    funcProto._method = noop;

    // Set bad shims.
    setProperty(Object, 'create', undefined);
    setProperty(Object, 'getOwnPropertySymbols', undefined);

    const _propertyIsEnumerable = objectProto.propertyIsEnumerable;
    setProperty(objectProto, 'propertyIsEnumerable', function (key) {
        return (
            !(key == 'valueOf' && this && this.valueOf === 1) &&
            _propertyIsEnumerable.call(this, key)
        );
    });

    if (Buffer) {
        defineProperty(root, 'Buffer', {
            configurable: true,
            enumerable: true,
            get: function get() {
                const caller = get.caller;
                const name = caller ? caller.name : '';

                if (
                    !(name == 'runInContext' || name.length == 1 || /\b_\.isBuffer\b/.test(caller))
                ) {
                    return Buffer;
                }
            },
        });
    }
    if (Map) {
        setProperty(
            root,
            'Map',
            (function () {
                let count = 0;
                return function () {
                    if (count++) {
                        return new Map();
                    }
                    setProperty(root, 'Map', Map);
                    return {};
                };
            })(),
        );

        setProperty(root.Map, 'toString', createToString('Map'));
    }
    setProperty(root, 'Promise', noop);
    setProperty(root, 'Set', noop);
    setProperty(root, 'Symbol', undefined);
    setProperty(root, 'WeakMap', noop);

    // Fake `WinRTError`.
    setProperty(root, 'WinRTError', Error);

    // Clear cache so lodash can be reloaded.
    emptyObject(require.cache);

    // Load lodash and expose it to the bad extensions/shims.
    lodashBizarro = interopRequire(filePath);
    root._ = oldDash;

    // Restore built-in methods.
    setProperty(Object, 'create', create);
    setProperty(objectProto, 'propertyIsEnumerable', _propertyIsEnumerable);
    setProperty(root, 'Buffer', Buffer);

    if (getSymbols) {
        Object.getOwnPropertySymbols = getSymbols;
    } else {
        delete Object.getOwnPropertySymbols;
    }
    if (Map) {
        setProperty(root, 'Map', Map);
    } else {
        delete root.Map;
    }
    if (Promise) {
        setProperty(root, 'Promise', Promise);
    } else {
        delete root.Promise;
    }
    if (Set) {
        setProperty(root, 'Set', Set);
    } else {
        delete root.Set;
    }
    if (Symbol) {
        setProperty(root, 'Symbol', Symbol);
    } else {
        delete root.Symbol;
    }
    if (WeakMap) {
        setProperty(root, 'WeakMap', WeakMap);
    } else {
        delete root.WeakMap;
    }
    delete root.WinRTError;
    delete funcProto._method;
})();

// Add other realm values from the `vm` module.
lodashStable.attempt(() => {
    lodashStable.assign(
        realm,
        require('vm').runInNewContext(
            [
                '(function() {',
                '  var noop = function() {},',
                '      root = this;',
                '',
                '  var object = {',
                "    'ArrayBuffer': root.ArrayBuffer,",
                "    'arguments': (function() { return arguments; }(1, 2, 3)),",
                "    'array': [1],",
                "    'arrayBuffer': root.ArrayBuffer ? new root.ArrayBuffer : undefined,",
                "    'boolean': Object(false),",
                "    'date': new Date,",
                "    'errors': [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError],",
                "    'function': noop,",
                "    'map': root.Map ? new root.Map : undefined,",
                "    'nan': NaN,",
                "    'null': null,",
                "    'number': Object(0),",
                "    'object': { 'a': 1 },",
                "    'promise': root.Promise ? Promise.resolve(1) : undefined,",
                "    'regexp': /x/,",
                "    'set': root.Set ? new root.Set : undefined,",
                "    'string': Object('a'),",
                "    'symbol': root.Symbol ? root.Symbol() : undefined,",
                "    'undefined': undefined,",
                "    'weakMap': root.WeakMap ? new root.WeakMap : undefined,",
                "    'weakSet': root.WeakSet ? new root.WeakSet : undefined",
                '  };',
                '',
                `  ['${arrayViews.join("', '")}'].forEach(function(type) {`,
                '    var Ctor = root[type]',
                '    object[type] = Ctor;',
                '    object[type.toLowerCase()] = Ctor ? new Ctor(new ArrayBuffer(24)) : undefined;',
                '  });',
                '',
                '  return object;',
                '}());',
            ].join('\n'),
        ),
    );
});

// Add other realm values from an iframe.
lodashStable.attempt(() => {
    _._realm = realm;

    const iframe = document.createElement('iframe');
    iframe.frameBorder = iframe.height = iframe.width = 0;
    body.appendChild(iframe);

    var idoc = (idoc = iframe.contentDocument || iframe.contentWindow).document || idoc;
    idoc.write(
        [
            '<html>',
            '<body>',
            '<script>',
            'var _ = parent._,',
            '    noop = function() {},',
            '    root = this;',
            '',
            'var object = {',
            "  'ArrayBuffer': root.ArrayBuffer,",
            "  'arguments': (function() { return arguments; }(1, 2, 3)),",
            "  'array': [1],",
            "  'arrayBuffer': root.ArrayBuffer ? new root.ArrayBuffer : undefined,",
            "  'boolean': Object(false),",
            "  'date': new Date,",
            "  'element': document.body,",
            "  'errors': [new Error, new EvalError, new RangeError, new ReferenceError, new SyntaxError, new TypeError, new URIError],",
            "  'function': noop,",
            "  'map': root.Map ? new root.Map : undefined,",
            "  'nan': NaN,",
            "  'null': null,",
            "  'number': Object(0),",
            "  'object': { 'a': 1 },",
            "  'promise': root.Promise ? Promise.resolve(1) : undefined,",
            "  'regexp': /x/,",
            "  'set': root.Set ? new root.Set : undefined,",
            "  'string': Object('a'),",
            "  'symbol': root.Symbol ? root.Symbol() : undefined,",
            "  'undefined': undefined,",
            "  'weakMap': root.WeakMap ? new root.WeakMap : undefined,",
            "  'weakSet': root.WeakSet ? new root.WeakSet : undefined",
            '};',
            '',
            `_.each(['${arrayViews.join("', '")}'], function(type) {`,
            '  var Ctor = root[type];',
            '  object[type] = Ctor;',
            '  object[type.toLowerCase()] = Ctor ? new Ctor(new ArrayBuffer(24)) : undefined;',
            '});',
            '',
            '_.assign(_._realm, object);',
            '</script>',
            '</body>',
            '</html>',
        ].join('\n'),
    );

    idoc.close();
    delete _._realm;
});

// Add a web worker.
lodashStable.attempt(() => {
    const worker = new Worker(`./asset/worker.js?t=${+new Date()}`);
    worker.addEventListener(
        'message',
        (e) => {
            _._VERSION = e.data || '';
        },
        false,
    );

    worker.postMessage(ui.buildPath);
});

// Expose internal modules for better code coverage.
lodashStable.attempt(() => {
    const path = require('path');
    const basePath = path.dirname(filePath);

    if (isModularize && !(amd || isNpm)) {
        lodashStable.each(
            ['baseEach', 'isIndex', 'isIterateeCall', 'memoizeCapped'],
            (funcName) => {
                _[`_${funcName}`] = interopRequire(path.join(basePath, `_${funcName}`));
            },
        );
    }
});

export {
    HOT_COUNT,
    LARGE_ARRAY_SIZE,
    FUNC_ERROR_TEXT,
    MAX_MEMOIZE_SIZE,
    MAX_SAFE_INTEGER,
    MAX_INTEGER,
    MAX_ARRAY_LENGTH,
    MAX_ARRAY_INDEX,
    funcTag,
    numberTag,
    objectTag,
    lodashBizarro,
    arrayProto,
    funcProto,
    objectProto,
    numberProto,
    stringProto,
    phantom,
    amd,
    args,
    argv,
    defineProperty,
    document,
    body,
    create,
    fnToString,
    freeze,
    getSymbols,
    identity,
    noop,
    objToString,
    params,
    push,
    realm,
    root,
    slice,
    strictArgs,
    arrayBuffer,
    map,
    promise,
    set,
    symbol,
    weakMap,
    weakSet,
    add,
    doubled,
    isEven,
    square,
    stubA,
    stubB,
    stubC,
    stubTrue,
    stubFalse,
    stubNaN,
    stubNull,
    stubZero,
    stubOne,
    stubTwo,
    stubThree,
    stubFour,
    stubArray,
    stubObject,
    stubString,
    burredLetters,
    comboMarks,
    deburredLetters,
    falsey,
    emojiVar,
    empties,
    errors,
    fitzModifiers,
    primitives,
    typedArrays,
    arrayViews,
    filePath,
    ui,
    basename,
    isModularize,
    isNpm,
    isPhantom,
    isStrict,
    Worker,
    lodashStable,
    _,
    mapCaches,
    coverage,
    asyncFunc,
    genFunc,
    oldDash,
    whitespace,
    CustomError,
    emptyObject,
    getUnwrappedValue,
    interopRequire,
    setProperty,
    skipAssert,
    toArgs,
};
