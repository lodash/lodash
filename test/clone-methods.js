import assert from 'assert';
import lodashStable from 'lodash';

import {
  map,
  set,
  realm,
  body,
  asyncFunc,
  genFunc,
  errors,
  _,
  LARGE_ARRAY_SIZE,
  isNpm,
  mapCaches,
  arrayBuffer,
  stubTrue,
  objectProto,
  symbol,
  defineProperty,
  getSymbols,
  document,
  arrayViews,
  slice,
  noop,
} from './utils.js';

import cloneDeep from '../cloneDeep.js';
import cloneDeepWith from '../cloneDeepWith.js';
import last from '../last.js';

describe('clone methods', function() {
  function Foo() {
    this.a = 1;
  }
  Foo.prototype.b = 1;
  Foo.c = function() {};

  if (Map) {
    var map = new Map;
    map.set('a', 1);
    map.set('b', 2);
  }
  if (Set) {
    var set = new Set;
    set.add(1);
    set.add(2);
  }
  var objects = {
    '`arguments` objects': arguments,
    'arrays': ['a', ''],
    'array-like objects': { '0': 'a', 'length': 1 },
    'booleans': false,
    'boolean objects': Object(false),
    'date objects': new Date,
    'Foo instances': new Foo,
    'objects': { 'a': 0, 'b': 1, 'c': 2 },
    'objects with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
    'objects from another document': realm.object || {},
    'maps': map,
    'null values': null,
    'numbers': 0,
    'number objects': Object(0),
    'regexes': /a/gim,
    'sets': set,
    'strings': 'a',
    'string objects': Object('a'),
    'undefined values': undefined
  };

  objects.arrays.length = 3;

  var uncloneable = {
    'DOM elements': body,
    'functions': Foo,
    'async functions': asyncFunc,
    'generator functions': genFunc,
    'the `Proxy` constructor': Proxy
  };

  lodashStable.each(errors, function(error) {
    uncloneable[error.name + 's'] = error;
  });

  it('`_.clone` should perform a shallow clone', function() {
    var array = [{ 'a': 0 }, { 'b': 1 }],
        actual = _.clone(array);

    assert.deepStrictEqual(actual, array);
    assert.ok(actual !== array && actual[0] === array[0]);
  });

  it('`_.cloneDeep` should deep clone objects with circular references', function() {
    var object = {
      'foo': { 'b': { 'c': { 'd': {} } } },
      'bar': {}
    };

    object.foo.b.c.d = object;
    object.bar.b = object.foo.b;

    var actual = cloneDeep(object);
    assert.ok(actual.bar.b === actual.foo.b && actual === actual.foo.b.c.d && actual !== object);
  });

  it('`_.cloneDeep` should deep clone objects with lots of circular references', function() {
    var cyclical = {};
    lodashStable.times(LARGE_ARRAY_SIZE + 1, function(index) {
      cyclical['v' + index] = [index ? cyclical['v' + (index - 1)] : cyclical];
    });

    var clone = cloneDeep(cyclical),
        actual = clone['v' + LARGE_ARRAY_SIZE][0];

    assert.strictEqual(actual, clone['v' + (LARGE_ARRAY_SIZE - 1)]);
    assert.notStrictEqual(actual, cyclical['v' + (LARGE_ARRAY_SIZE - 1)]);
  });

  it('`_.cloneDeepWith` should provide `stack` to `customizer`', function() {
    var actual;

    cloneDeepWith({ 'a': 1 }, function() {
      actual = last(arguments);
    });

    assert.ok(isNpm
      ? actual.constructor.name == 'Stack'
      : actual instanceof mapCaches.Stack
    );
  });

  lodashStable.each(['clone', 'cloneDeep'], function(methodName) {
    var func = _[methodName],
        isDeep = methodName == 'cloneDeep';

    lodashStable.forOwn(objects, function(object, kind) {
      it('`_.' + methodName + '` should clone ' + kind, function() {
        var actual = func(object);
        assert.ok(lodashStable.isEqual(actual, object));

        if (lodashStable.isObject(object)) {
          assert.notStrictEqual(actual, object);
        } else {
          assert.strictEqual(actual, object);
        }
      });
    });

    it('`_.' + methodName + '` should clone array buffers', function() {
      if (ArrayBuffer) {
        var actual = func(arrayBuffer);
        assert.strictEqual(actual.byteLength, arrayBuffer.byteLength);
        assert.notStrictEqual(actual, arrayBuffer);
      }
    });

    it('`_.' + methodName + '` should clone buffers', function() {
      if (Buffer) {
        var buffer = new Buffer([1, 2]),
            actual = func(buffer);

        assert.strictEqual(actual.byteLength, buffer.byteLength);
        assert.strictEqual(actual.inspect(), buffer.inspect());
        assert.notStrictEqual(actual, buffer);

        buffer[0] = 2;
        assert.strictEqual(actual[0], isDeep ? 2 : 1);
      }
    });

    it('`_.' + methodName + '` should clone `index` and `input` array properties', function() {
      var array = /c/.exec('abcde'),
          actual = func(array);

      assert.strictEqual(actual.index, 2);
      assert.strictEqual(actual.input, 'abcde');
    });

    it('`_.' + methodName + '` should clone `lastIndex` regexp property', function() {
      var regexp = /c/g;
      regexp.exec('abcde');

      assert.strictEqual(func(regexp).lastIndex, 3);
    });

    it('`_.' + methodName + '` should clone expando properties', function() {
      var values = lodashStable.map([false, true, 1, 'a'], function(value) {
        var object = Object(value);
        object.a = 1;
        return object;
      });

      var expected = lodashStable.map(values, stubTrue);

      var actual = lodashStable.map(values, function(value) {
        return func(value).a === 1;
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`_.' + methodName + '` should clone prototype objects', function() {
      var actual = func(Foo.prototype);

      assert.ok(!(actual instanceof Foo));
      assert.deepStrictEqual(actual, { 'b': 1 });
    });

    it('`_.' + methodName + '` should set the `[[Prototype]]` of a clone', function() {
      assert.ok(func(new Foo) instanceof Foo);
    });

    it('`_.' + methodName + '` should set the `[[Prototype]]` of a clone even when the `constructor` is incorrect', function() {
      Foo.prototype.constructor = Object;
      assert.ok(func(new Foo) instanceof Foo);
      Foo.prototype.constructor = Foo;
    });

    it('`_.' + methodName + '` should ensure `value` constructor is a function before using its `[[Prototype]]`', function() {
      Foo.prototype.constructor = null;
      assert.ok(!(func(new Foo) instanceof Foo));
      Foo.prototype.constructor = Foo;
    });

    it('`_.' + methodName + '` should clone properties that shadow those on `Object.prototype`', function() {
      var object = {
        'constructor': objectProto.constructor,
        'hasOwnProperty': objectProto.hasOwnProperty,
        'isPrototypeOf': objectProto.isPrototypeOf,
        'propertyIsEnumerable': objectProto.propertyIsEnumerable,
        'toLocaleString': objectProto.toLocaleString,
        'toString': objectProto.toString,
        'valueOf': objectProto.valueOf
      };

      var actual = func(object);

      assert.deepStrictEqual(actual, object);
      assert.notStrictEqual(actual, object);
    });

    it('`_.' + methodName + '` should clone symbol properties', function() {
      function Foo() {
        this[symbol] = { 'c': 1 };
      }

      if (Symbol) {
        var symbol2 = Symbol('b');
        Foo.prototype[symbol2] = 2;

        var symbol3 = Symbol('c');
        defineProperty(Foo.prototype, symbol3, {
          'configurable': true,
          'enumerable': false,
          'writable': true,
          'value': 3
        });

        var object = { 'a': { 'b': new Foo } };
        object[symbol] = { 'b': 1 };

        var actual = func(object);
        if (isDeep) {
          assert.notStrictEqual(actual[symbol], object[symbol]);
          assert.notStrictEqual(actual.a, object.a);
        } else {
          assert.strictEqual(actual[symbol], object[symbol]);
          assert.strictEqual(actual.a, object.a);
        }
        assert.deepStrictEqual(actual[symbol], object[symbol]);
        assert.deepStrictEqual(getSymbols(actual.a.b), [symbol]);
        assert.deepStrictEqual(actual.a.b[symbol], object.a.b[symbol]);
        assert.deepStrictEqual(actual.a.b[symbol2], object.a.b[symbol2]);
        assert.deepStrictEqual(actual.a.b[symbol3], object.a.b[symbol3]);
      }
    });

    it('`_.' + methodName + '` should clone symbol objects', function() {
      if (Symbol) {
        assert.strictEqual(func(symbol), symbol);

        var object = Object(symbol),
            actual = func(object);

        assert.strictEqual(typeof actual, 'object');
        assert.strictEqual(typeof actual.valueOf(), 'symbol');
        assert.notStrictEqual(actual, object);
      }
    });

    it('`_.' + methodName + '` should not clone symbol primitives', function() {
      if (Symbol) {
        assert.strictEqual(func(symbol), symbol);
      }
    });

    it('`_.' + methodName + '` should not error on DOM elements', function() {
      if (document) {
        var element = document.createElement('div');

        try {
          assert.deepStrictEqual(func(element), {});
        } catch (e) {
          assert.ok(false, e.message);
        }
      }
    });

    it('`_.' + methodName + '` should create an object from the same realm as `value`', function() {
      var props = [];

      var objects = lodashStable.transform(_, function(result, value, key) {
        if (lodashStable.startsWith(key, '_') && lodashStable.isObject(value) &&
            !lodashStable.isArguments(value) && !lodashStable.isElement(value) &&
            !lodashStable.isFunction(value)) {
          props.push(lodashStable.capitalize(lodashStable.camelCase(key)));
          result.push(value);
        }
      }, []);

      var expected = lodashStable.map(objects, stubTrue);

      var actual = lodashStable.map(objects, function(object) {
        var Ctor = object.constructor,
            result = func(object);

        return result !== object && ((result instanceof Ctor) || !(new Ctor instanceof Ctor));
      });

      assert.deepStrictEqual(actual, expected, props.join(', '));
    });

    it('`_.' + methodName + '` should perform a ' + (isDeep ? 'deep' : 'shallow') + ' clone when used as an iteratee for methods like `_.map`', function() {
      var expected = [{ 'a': [0] }, { 'b': [1] }],
          actual = lodashStable.map(expected, func);

      assert.deepStrictEqual(actual, expected);

      if (isDeep) {
        assert.ok(actual[0] !== expected[0] && actual[0].a !== expected[0].a && actual[1].b !== expected[1].b);
      } else {
        assert.ok(actual[0] !== expected[0] && actual[0].a === expected[0].a && actual[1].b === expected[1].b);
      }
    });

    it('`_.' + methodName + '` should return a unwrapped value when chaining', function() {
      var object = objects.objects,
          actual = _(object)[methodName]();

      assert.deepEqual(actual, object);
      assert.notStrictEqual(actual, object);
    });

    lodashStable.each(arrayViews, function(type) {
      it('`_.' + methodName + '` should clone ' + type + ' values', function() {
        var Ctor = root[type];

        lodashStable.times(2, function(index) {
          if (Ctor) {
            var buffer = new ArrayBuffer(24),
                view = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer),
                actual = func(view);

            assert.deepStrictEqual(actual, view);
            assert.notStrictEqual(actual, view);
            assert.strictEqual(actual.buffer === view.buffer, !isDeep);
            assert.strictEqual(actual.byteOffset, view.byteOffset);
            assert.strictEqual(actual.length, view.length);
          }
        });
      });
    });

    lodashStable.forOwn(uncloneable, function(value, key) {
      it('`_.' + methodName + '` should not clone ' + key, function() {
        if (value) {
          var object = { 'a': value, 'b': { 'c': value } },
              actual = func(object),
              expected = value === Foo ? { 'c': Foo.c } : {};

          assert.deepStrictEqual(actual, object);
          assert.notStrictEqual(actual, object);
          assert.deepStrictEqual(func(value), expected);
        }
      });
    });
  });

  lodashStable.each(['cloneWith', 'cloneDeepWith'], function(methodName) {
    var func = _[methodName],
        isDeep = methodName == 'cloneDeepWith';

    it('`_.' + methodName + '` should provide correct `customizer` arguments', function() {
      var argsList = [],
          object = new Foo;

      func(object, function() {
        var length = arguments.length,
            args = slice.call(arguments, 0, length - (length > 1 ? 1 : 0));

        argsList.push(args);
      });

      assert.deepStrictEqual(argsList, isDeep ? [[object], [1, 'a', object]] : [[object]]);
    });

    it('`_.' + methodName + '` should handle cloning when `customizer` returns `undefined`', function() {
      var actual = func({ 'a': { 'b': 'c' } }, noop);
      assert.deepStrictEqual(actual, { 'a': { 'b': 'c' } });
    });

    lodashStable.forOwn(uncloneable, function(value, key) {
      it('`_.' + methodName + '` should work with a `customizer` callback and ' + key, function() {
        var customizer = function(value) {
          return lodashStable.isPlainObject(value) ? undefined : value;
        };

        var actual = func(value, customizer);
        assert.strictEqual(actual, value);

        var object = { 'a': value, 'b': { 'c': value } };
        actual = func(object, customizer);

        assert.deepStrictEqual(actual, object);
        assert.notStrictEqual(actual, object);
      });
    });
  });
});
