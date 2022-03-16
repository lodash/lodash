(function() {
  var _ = typeof require == 'function' ? require('..') : window._;

  QUnit.module('Objects');

  var testElement = typeof document === 'object' ? document.createElement('div') : void 0;

  QUnit.test('keys', function(assert) {
    assert.deepEqual(_.keys({one: 1, two: 2}), ['one', 'two'], 'can extract the keys from an object');
    // the test above is not safe because it relies on for-in enumeration order
    var a = []; a[1] = 0;
    assert.deepEqual(_.keys(a), ['1'], 'is not fooled by sparse arrays; see issue #95');
    assert.deepEqual(_.keys(null), []);
    assert.deepEqual(_.keys(void 0), []);
    assert.deepEqual(_.keys(1), []);
    assert.deepEqual(_.keys('a'), []);
    assert.deepEqual(_.keys(true), []);

    // keys that may be missed if the implementation isn't careful
    var trouble = {
      constructor: Object,
      valueOf: _.noop,
      hasOwnProperty: null,
      toString: 5,
      toLocaleString: void 0,
      propertyIsEnumerable: /a/,
      isPrototypeOf: this,
      __defineGetter__: Boolean,
      __defineSetter__: {},
      __lookupSetter__: false,
      __lookupGetter__: []
    };
    var troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                  'isPrototypeOf', '__defineGetter__', '__defineSetter__', '__lookupSetter__', '__lookupGetter__'].sort();
    assert.deepEqual(_.keys(trouble).sort(), troubleKeys, 'matches non-enumerable properties');
  });

  QUnit.test('allKeys', function(assert) {
    assert.deepEqual(_.allKeys({one: 1, two: 2}), ['one', 'two'], 'can extract the allKeys from an object');
    // the test above is not safe because it relies on for-in enumeration order
    var a = []; a[1] = 0;
    assert.deepEqual(_.allKeys(a), ['1'], 'is not fooled by sparse arrays; see issue #95');

    a.a = a;
    assert.deepEqual(_.allKeys(a), ['1', 'a'], 'is not fooled by sparse arrays with additional properties');

    _.each([null, void 0, 1, 'a', true, NaN, {}, [], new Number(5), new Date(0)], function(val) {
      assert.deepEqual(_.allKeys(val), []);
    });

    // allKeys that may be missed if the implementation isn't careful
    var trouble = {
      constructor: Object,
      valueOf: _.noop,
      hasOwnProperty: null,
      toString: 5,
      toLocaleString: void 0,
      propertyIsEnumerable: /a/,
      isPrototypeOf: this
    };
    var troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                  'isPrototypeOf'].sort();
    assert.deepEqual(_.allKeys(trouble).sort(), troubleKeys, 'matches non-enumerable properties');

    function A() {}
    A.prototype.foo = 'foo';
    var b = new A();
    b.bar = 'bar';
    assert.deepEqual(_.allKeys(b).sort(), ['bar', 'foo'], 'should include inherited keys');

    function y() {}
    y.x = 'z';
    assert.deepEqual(_.allKeys(y), ['x'], 'should get keys from constructor');
  });

  QUnit.test('values', function(assert) {
    assert.deepEqual(_.values({one: 1, two: 2}), [1, 2], 'can extract the values from an object');
    assert.deepEqual(_.values({one: 1, two: 2, length: 3}), [1, 2, 3], '... even when one of them is "length"');
  });

  QUnit.test('pairs', function(assert) {
    assert.deepEqual(_.pairs({one: 1, two: 2}), [['one', 1], ['two', 2]], 'can convert an object into pairs');
    assert.deepEqual(_.pairs({one: 1, two: 2, length: 3}), [['one', 1], ['two', 2], ['length', 3]], '... even when one of them is "length"');
  });

  QUnit.test('invert', function(assert) {
    var obj = {first: 'Moe', second: 'Larry', third: 'Curly'};
    assert.deepEqual(_.keys(_.invert(obj)), ['Moe', 'Larry', 'Curly'], 'can invert an object');
    assert.deepEqual(_.invert(_.invert(obj)), obj, 'two inverts gets you back where you started');

    obj = {length: 3};
    assert.strictEqual(_.invert(obj)['3'], 'length', 'can invert an object with "length"');
  });

  QUnit.test('functions', function(assert) {
    var obj = {a: 'dash', b: _.map, c: /yo/, d: _.reduce};
    assert.deepEqual(['b', 'd'], _.functions(obj), 'can grab the function names of any passed-in object');

    var Animal = function(){};
    Animal.prototype.run = function(){};
    assert.deepEqual(_.functions(new Animal), ['run'], 'also looks up functions on the prototype');
  });

  QUnit.test('methods', function(assert) {
    assert.strictEqual(_.methods, _.functions, 'is an alias for functions');
  });

  QUnit.test('extend', function(assert) {
    var result;
    assert.strictEqual(_.extend({}, {a: 'b'}).a, 'b', 'can extend an object with the attributes of another');
    assert.strictEqual(_.extend({a: 'x'}, {a: 'b'}).a, 'b', 'properties in source override destination');
    assert.strictEqual(_.extend({x: 'x'}, {a: 'b'}).x, 'x', "properties not in source don't get overridden");
    result = _.extend({x: 'x'}, {a: 'a'}, {b: 'b'});
    assert.deepEqual(result, {x: 'x', a: 'a', b: 'b'}, 'can extend from multiple source objects');
    result = _.extend({x: 'x'}, {a: 'a', x: 2}, {a: 'b'});
    assert.deepEqual(result, {x: 2, a: 'b'}, 'extending from multiple source objects last property trumps');
    result = _.extend({}, {a: void 0, b: null});
    assert.deepEqual(_.keys(result), ['a', 'b'], 'extend copies undefined values');

    var F = function() {};
    F.prototype = {a: 'b'};
    var subObj = new F();
    subObj.c = 'd';
    assert.deepEqual(_.extend({}, subObj), {a: 'b', c: 'd'}, 'extend copies all properties from source');
    _.extend(subObj, {});
    assert.ok(!subObj.hasOwnProperty('a'), "extend does not convert destination object's 'in' properties to 'own' properties");

    try {
      result = {};
      _.extend(result, null, void 0, {a: 1});
    } catch (e) { /* ignored */ }

    assert.strictEqual(result.a, 1, 'should not error on `null` or `undefined` sources');

    assert.strictEqual(_.extend(null, {a: 1}), null, 'extending null results in null');
    assert.strictEqual(_.extend(void 0, {a: 1}), void 0, 'extending undefined results in undefined');
  });

  QUnit.test('extendOwn', function(assert) {
    var result;
    assert.strictEqual(_.extendOwn({}, {a: 'b'}).a, 'b', 'can extend an object with the attributes of another');
    assert.strictEqual(_.extendOwn({a: 'x'}, {a: 'b'}).a, 'b', 'properties in source override destination');
    assert.strictEqual(_.extendOwn({x: 'x'}, {a: 'b'}).x, 'x', "properties not in source don't get overridden");
    result = _.extendOwn({x: 'x'}, {a: 'a'}, {b: 'b'});
    assert.deepEqual(result, {x: 'x', a: 'a', b: 'b'}, 'can extend from multiple source objects');
    result = _.extendOwn({x: 'x'}, {a: 'a', x: 2}, {a: 'b'});
    assert.deepEqual(result, {x: 2, a: 'b'}, 'extending from multiple source objects last property trumps');
    assert.deepEqual(_.extendOwn({}, {a: void 0, b: null}), {a: void 0, b: null}, 'copies undefined values');

    var F = function() {};
    F.prototype = {a: 'b'};
    var subObj = new F();
    subObj.c = 'd';
    assert.deepEqual(_.extendOwn({}, subObj), {c: 'd'}, 'copies own properties from source');

    result = {};
    assert.deepEqual(_.extendOwn(result, null, void 0, {a: 1}), {a: 1}, 'should not error on `null` or `undefined` sources');

    _.each(['a', 5, null, false], function(val) {
      assert.strictEqual(_.extendOwn(val, {a: 1}), val, 'extending non-objects results in returning the non-object value');
    });

    assert.strictEqual(_.extendOwn(void 0, {a: 1}), void 0, 'extending undefined results in undefined');

    result = _.extendOwn({a: 1, 0: 2, 1: '5', length: 6}, {0: 1, 1: 2, length: 2});
    assert.deepEqual(result, {a: 1, 0: 1, 1: 2, length: 2}, 'should treat array-like objects like normal objects');
  });

  QUnit.test('assign', function(assert) {
    assert.strictEqual(_.assign, _.extendOwn, 'is an alias for extendOwn');
  });

  QUnit.test('pick', function(assert) {
    var result;
    result = _.pick({a: 1, b: 2, c: 3}, 'a', 'c');
    assert.deepEqual(result, {a: 1, c: 3}, 'can restrict properties to those named');
    result = _.pick({a: 1, b: 2, c: 3}, ['b', 'c']);
    assert.deepEqual(result, {b: 2, c: 3}, 'can restrict properties to those named in an array');
    result = _.pick({a: 1, b: 2, c: 3}, ['a'], 'b');
    assert.deepEqual(result, {a: 1, b: 2}, 'can restrict properties to those named in mixed args');
    result = _.pick({a: 1, b: 2, c: 3}, ['a'], [['b']]);
    assert.deepEqual(result, {a: 1, b: 2}, 'can restrict properties to those named in mixed deep args');
    result = _.pick(['a', 'b'], 1);
    assert.deepEqual(result, {1: 'b'}, 'can pick numeric properties');

    _.each([null, void 0], function(val) {
      assert.deepEqual(_.pick(val, 'hasOwnProperty'), {}, 'Called with null/undefined');
      assert.deepEqual(_.pick(val, _.constant(true)), {});
    });
    assert.deepEqual(_.pick(5, 'toString', 'b'), {toString: Number.prototype.toString}, 'can iterate primitives');

    var data = {a: 1, b: 2, c: 3};
    var callback = function(value, key, object) {
      assert.strictEqual(key, {1: 'a', 2: 'b', 3: 'c'}[value]);
      assert.strictEqual(object, data);
      return value !== this.value;
    };
    result = _.pick(data, callback, {value: 2});
    assert.deepEqual(result, {a: 1, c: 3}, 'can accept a predicate and context');

    var Obj = function(){};
    Obj.prototype = {a: 1, b: 2, c: 3};
    var instance = new Obj();
    assert.deepEqual(_.pick(instance, 'a', 'c'), {a: 1, c: 3}, 'include prototype props');

    assert.deepEqual(_.pick(data, function(val, key) {
      return this[key] === 3 && this === instance;
    }, instance), {c: 3}, 'function is given context');

    assert.ok(!_.has(_.pick({}, 'foo'), 'foo'), 'does not set own property if property not in object');
    _.pick(data, function(value, key, obj) {
      assert.strictEqual(obj, data, 'passes same object as third parameter of iteratee');
    });
  });

  QUnit.test('omit', function(assert) {
    var result;
    result = _.omit({a: 1, b: 2, c: 3}, 'b');
    assert.deepEqual(result, {a: 1, c: 3}, 'can omit a single named property');
    result = _.omit({a: 1, b: 2, c: 3}, 'a', 'c');
    assert.deepEqual(result, {b: 2}, 'can omit several named properties');
    result = _.omit({a: 1, b: 2, c: 3}, ['b', 'c']);
    assert.deepEqual(result, {a: 1}, 'can omit properties named in an array');
    result = _.omit({a: 1, b: 2, c: 3}, ['b', ['c']]);
    assert.deepEqual(result, {a: 1}, 'can omit properties named in a nested array');
    result = _.omit(['a', 'b'], 0);
    assert.deepEqual(result, {1: 'b'}, 'can omit numeric properties');

    assert.deepEqual(_.omit(null, 'a', 'b'), {}, 'non objects return empty object');
    assert.deepEqual(_.omit(void 0, 'toString'), {}, 'null/undefined return empty object');
    assert.deepEqual(_.omit(5, 'toString', 'b'), {}, 'returns empty object for primitives');

    var data = {a: 1, b: 2, c: 3};
    var callback = function(value, key, object) {
      assert.strictEqual(key, {1: 'a', 2: 'b', 3: 'c'}[value]);
      assert.strictEqual(object, data);
      return value !== this.value;
    };
    result = _.omit(data, callback, {value: 2});
    assert.deepEqual(result, {b: 2}, 'can accept a predicate');

    var Obj = function(){};
    Obj.prototype = {a: 1, b: 2, c: 3};
    var instance = new Obj();
    assert.deepEqual(_.omit(instance, 'b'), {a: 1, c: 3}, 'include prototype props');

    assert.deepEqual(_.omit(data, function(val, key) {
      return this[key] === 3 && this === instance;
    }, instance), {a: 1, b: 2}, 'function is given context');
  });

  QUnit.test('defaults', function(assert) {
    var options = {zero: 0, one: 1, empty: '', nan: NaN, nothing: null};

    _.defaults(options, {zero: 1, one: 10, twenty: 20, nothing: 'str'});
    assert.strictEqual(options.zero, 0, 'value exists');
    assert.strictEqual(options.one, 1, 'value exists');
    assert.strictEqual(options.twenty, 20, 'default applied');
    assert.strictEqual(options.nothing, null, "null isn't overridden");

    _.defaults(options, {empty: 'full'}, {nan: 'nan'}, {word: 'word'}, {word: 'dog'});
    assert.strictEqual(options.empty, '', 'value exists');
    assert.ok(_.isNaN(options.nan), "NaN isn't overridden");
    assert.strictEqual(options.word, 'word', 'new value is added, first one wins');

    try {
      options = {};
      _.defaults(options, null, void 0, {a: 1});
    } catch (e) { /* ignored */ }

    assert.strictEqual(options.a, 1, 'should not error on `null` or `undefined` sources');

    assert.deepEqual(_.defaults(null, {a: 1}), {a: 1}, 'defaults skips nulls');
    assert.deepEqual(_.defaults(void 0, {a: 1}), {a: 1}, 'defaults skips undefined');
  });

  QUnit.test('clone', function(assert) {
    var moe = {name: 'moe', lucky: [13, 27, 34]};
    var clone = _.clone(moe);
    assert.strictEqual(clone.name, 'moe', 'the clone as the attributes of the original');

    clone.name = 'curly';
    assert.ok(clone.name === 'curly' && moe.name === 'moe', 'clones can change shallow attributes without affecting the original');

    clone.lucky.push(101);
    assert.strictEqual(_.last(moe.lucky), 101, 'changes to deep attributes are shared with the original');

    assert.strictEqual(_.clone(void 0), void 0, 'non objects should not be changed by clone');
    assert.strictEqual(_.clone(1), 1, 'non objects should not be changed by clone');
    assert.strictEqual(_.clone(null), null, 'non objects should not be changed by clone');
  });

  QUnit.test('create', function(assert) {
    var Parent = function() {};
    Parent.prototype = {foo: function() {}, bar: 2};

    _.each(['foo', null, void 0, 1], function(val) {
      assert.deepEqual(_.create(val), {}, 'should return empty object when a non-object is provided');
    });

    assert.ok(_.create([]) instanceof Array, 'should return new instance of array when array is provided');

    var Child = function() {};
    Child.prototype = _.create(Parent.prototype);
    assert.ok(new Child instanceof Parent, 'object should inherit prototype');

    var func = function() {};
    Child.prototype = _.create(Parent.prototype, {func: func});
    assert.strictEqual(Child.prototype.func, func, 'properties should be added to object');

    Child.prototype = _.create(Parent.prototype, {constructor: Child});
    assert.strictEqual(Child.prototype.constructor, Child);

    Child.prototype.foo = 'foo';
    var created = _.create(Child.prototype, new Child);
    assert.ok(!created.hasOwnProperty('foo'), 'should only add own properties');
  });

  QUnit.test('isEqual', function(assert) {
    function First() {
      this.value = 1;
    }
    First.prototype.value = 1;
    function Second() {
      this.value = 1;
    }
    Second.prototype.value = 2;

    // Basic equality and identity comparisons.
    assert.ok(_.isEqual(null, null), '`null` is equal to `null`');
    assert.ok(_.isEqual(), '`undefined` is equal to `undefined`');

    assert.ok(!_.isEqual(0, -0), '`0` is not equal to `-0`');
    assert.ok(!_.isEqual(-0, 0), 'Commutative equality is implemented for `0` and `-0`');
    assert.ok(!_.isEqual(null, void 0), '`null` is not equal to `undefined`');
    assert.ok(!_.isEqual(void 0, null), 'Commutative equality is implemented for `null` and `undefined`');

    // String object and primitive comparisons.
    assert.ok(_.isEqual('Curly', 'Curly'), 'Identical string primitives are equal');
    assert.ok(_.isEqual(new String('Curly'), new String('Curly')), 'String objects with identical primitive values are equal');
    assert.ok(_.isEqual(new String('Curly'), 'Curly'), 'String primitives and their corresponding object wrappers are equal');
    assert.ok(_.isEqual('Curly', new String('Curly')), 'Commutative equality is implemented for string objects and primitives');

    assert.ok(!_.isEqual('Curly', 'Larry'), 'String primitives with different values are not equal');
    assert.ok(!_.isEqual(new String('Curly'), new String('Larry')), 'String objects with different primitive values are not equal');
    assert.ok(!_.isEqual(new String('Curly'), {toString: function(){ return 'Curly'; }}), 'String objects and objects with a custom `toString` method are not equal');

    // Number object and primitive comparisons.
    assert.ok(_.isEqual(75, 75), 'Identical number primitives are equal');
    assert.ok(_.isEqual(new Number(75), new Number(75)), 'Number objects with identical primitive values are equal');
    assert.ok(_.isEqual(75, new Number(75)), 'Number primitives and their corresponding object wrappers are equal');
    assert.ok(_.isEqual(new Number(75), 75), 'Commutative equality is implemented for number objects and primitives');
    assert.ok(!_.isEqual(new Number(0), -0), '`new Number(0)` and `-0` are not equal');
    assert.ok(!_.isEqual(0, new Number(-0)), 'Commutative equality is implemented for `new Number(0)` and `-0`');

    assert.ok(!_.isEqual(new Number(75), new Number(63)), 'Number objects with different primitive values are not equal');
    assert.ok(!_.isEqual(new Number(63), {valueOf: function(){ return 63; }}), 'Number objects and objects with a `valueOf` method are not equal');

    // Comparisons involving `NaN`.
    assert.ok(_.isEqual(NaN, NaN), '`NaN` is equal to `NaN`');
    assert.ok(_.isEqual(new Number(NaN), NaN), 'Object(`NaN`) is equal to `NaN`');
    assert.ok(!_.isEqual(61, NaN), 'A number primitive is not equal to `NaN`');
    assert.ok(!_.isEqual(new Number(79), NaN), 'A number object is not equal to `NaN`');
    assert.ok(!_.isEqual(Infinity, NaN), '`Infinity` is not equal to `NaN`');

    // Boolean object and primitive comparisons.
    assert.ok(_.isEqual(true, true), 'Identical boolean primitives are equal');
    assert.ok(_.isEqual(new Boolean, new Boolean), 'Boolean objects with identical primitive values are equal');
    assert.ok(_.isEqual(true, new Boolean(true)), 'Boolean primitives and their corresponding object wrappers are equal');
    assert.ok(_.isEqual(new Boolean(true), true), 'Commutative equality is implemented for booleans');
    assert.ok(!_.isEqual(new Boolean(true), new Boolean), 'Boolean objects with different primitive values are not equal');

    // Common type coercions.
    assert.ok(!_.isEqual(new Boolean(false), true), '`new Boolean(false)` is not equal to `true`');
    assert.ok(!_.isEqual('75', 75), 'String and number primitives with like values are not equal');
    assert.ok(!_.isEqual(new Number(63), new String(63)), 'String and number objects with like values are not equal');
    assert.ok(!_.isEqual(75, '75'), 'Commutative equality is implemented for like string and number values');
    assert.ok(!_.isEqual(0, ''), 'Number and string primitives with like values are not equal');
    assert.ok(!_.isEqual(1, true), 'Number and boolean primitives with like values are not equal');
    assert.ok(!_.isEqual(new Boolean(false), new Number(0)), 'Boolean and number objects with like values are not equal');
    assert.ok(!_.isEqual(false, new String('')), 'Boolean primitives and string objects with like values are not equal');
    assert.ok(!_.isEqual(12564504e5, new Date(2009, 9, 25)), 'Dates and their corresponding numeric primitive values are not equal');

    // Dates.
    assert.ok(_.isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25)), 'Date objects referencing identical times are equal');
    assert.ok(!_.isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13)), 'Date objects referencing different times are not equal');
    assert.ok(!_.isEqual(new Date(2009, 11, 13), {
      getTime: function(){
        return 12606876e5;
      }
    }), 'Date objects and objects with a `getTime` method are not equal');
    assert.ok(!_.isEqual(new Date('Curly'), new Date('Curly')), 'Invalid dates are not equal');

    // Functions.
    assert.ok(!_.isEqual(First, Second), 'Different functions with identical bodies and source code representations are not equal');

    // RegExps.
    assert.ok(_.isEqual(/(?:)/gim, /(?:)/gim), 'RegExps with equivalent patterns and flags are equal');
    assert.ok(_.isEqual(/(?:)/gi, /(?:)/ig), 'Flag order is not significant');
    assert.ok(!_.isEqual(/(?:)/g, /(?:)/gi), 'RegExps with equivalent patterns and different flags are not equal');
    assert.ok(!_.isEqual(/Moe/gim, /Curly/gim), 'RegExps with different patterns and equivalent flags are not equal');
    assert.ok(!_.isEqual(/(?:)/gi, /(?:)/g), 'Commutative equality is implemented for RegExps');
    assert.ok(!_.isEqual(/Curly/g, {source: 'Larry', global: true, ignoreCase: false, multiline: false}), 'RegExps and RegExp-like objects are not equal');

    // Empty arrays, array-like objects, and object literals.
    assert.ok(_.isEqual({}, {}), 'Empty object literals are equal');
    assert.ok(_.isEqual([], []), 'Empty array literals are equal');
    assert.ok(_.isEqual([{}], [{}]), 'Empty nested arrays and objects are equal');
    assert.ok(!_.isEqual({length: 0}, []), 'Array-like objects and arrays are not equal.');
    assert.ok(!_.isEqual([], {length: 0}), 'Commutative equality is implemented for array-like objects');

    assert.ok(!_.isEqual({}, []), 'Object literals and array literals are not equal');
    assert.ok(!_.isEqual([], {}), 'Commutative equality is implemented for objects and arrays');

    // Arrays with primitive and object values.
    assert.ok(_.isEqual([1, 'Larry', true], [1, 'Larry', true]), 'Arrays containing identical primitives are equal');
    assert.ok(_.isEqual([/Moe/g, new Date(2009, 9, 25)], [/Moe/g, new Date(2009, 9, 25)]), 'Arrays containing equivalent elements are equal');

    // Multi-dimensional arrays.
    var a = [new Number(47), false, 'Larry', /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
    var b = [new Number(47), false, 'Larry', /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
    assert.ok(_.isEqual(a, b), 'Arrays containing nested arrays and objects are recursively compared');

    // Overwrite the methods defined in ES 5.1 section 15.4.4.
    a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
    b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

    // Array elements and properties.
    assert.ok(_.isEqual(a, b), 'Arrays containing equivalent elements and different non-numeric properties are equal');
    a.push('White Rocks');
    assert.ok(!_.isEqual(a, b), 'Arrays of different lengths are not equal');
    a.push('East Boulder');
    b.push('Gunbarrel Ranch', 'Teller Farm');
    assert.ok(!_.isEqual(a, b), 'Arrays of identical lengths containing different elements are not equal');

    // Sparse arrays.
    assert.ok(_.isEqual(Array(3), Array(3)), 'Sparse arrays of identical lengths are equal');
    assert.ok(!_.isEqual(Array(3), Array(6)), 'Sparse arrays of different lengths are not equal when both are empty');

    var sparse = [];
    sparse[1] = 5;
    assert.ok(_.isEqual(sparse, [void 0, 5]), 'Handles sparse arrays as dense');

    // Simple objects.
    assert.ok(_.isEqual({a: 'Curly', b: 1, c: true}, {a: 'Curly', b: 1, c: true}), 'Objects containing identical primitives are equal');
    assert.ok(_.isEqual({a: /Curly/g, b: new Date(2009, 11, 13)}, {a: /Curly/g, b: new Date(2009, 11, 13)}), 'Objects containing equivalent members are equal');
    assert.ok(!_.isEqual({a: 63, b: 75}, {a: 61, b: 55}), 'Objects of identical sizes with different values are not equal');
    assert.ok(!_.isEqual({a: 63, b: 75}, {a: 61, c: 55}), 'Objects of identical sizes with different property names are not equal');
    assert.ok(!_.isEqual({a: 1, b: 2}, {a: 1}), 'Objects of different sizes are not equal');
    assert.ok(!_.isEqual({a: 1}, {a: 1, b: 2}), 'Commutative equality is implemented for objects');
    assert.ok(!_.isEqual({x: 1, y: void 0}, {x: 1, z: 2}), 'Objects with identical keys and different values are not equivalent');

    // `A` contains nested objects and arrays.
    a = {
      name: new String('Moe Howard'),
      age: new Number(77),
      stooge: true,
      hobbies: ['acting'],
      film: {
        name: 'Sing a Song of Six Pants',
        release: new Date(1947, 9, 30),
        stars: [new String('Larry Fine'), 'Shemp Howard'],
        minutes: new Number(16),
        seconds: 54
      }
    };

    // `B` contains equivalent nested objects and arrays.
    b = {
      name: new String('Moe Howard'),
      age: new Number(77),
      stooge: true,
      hobbies: ['acting'],
      film: {
        name: 'Sing a Song of Six Pants',
        release: new Date(1947, 9, 30),
        stars: [new String('Larry Fine'), 'Shemp Howard'],
        minutes: new Number(16),
        seconds: 54
      }
    };
    assert.ok(_.isEqual(a, b), 'Objects with nested equivalent members are recursively compared');

    // Instances.
    assert.ok(_.isEqual(new First, new First), 'Object instances are equal');
    assert.ok(!_.isEqual(new First, new Second), 'Objects with different constructors and identical own properties are not equal');
    assert.ok(!_.isEqual({value: 1}, new First), 'Object instances and objects sharing equivalent properties are not equal');
    assert.ok(!_.isEqual({value: 2}, new Second), 'The prototype chain of objects should not be examined');

    // Circular Arrays.
    (a = []).push(a);
    (b = []).push(b);
    assert.ok(_.isEqual(a, b), 'Arrays containing circular references are equal');
    a.push(new String('Larry'));
    b.push(new String('Larry'));
    assert.ok(_.isEqual(a, b), 'Arrays containing circular references and equivalent properties are equal');
    a.push('Shemp');
    b.push('Curly');
    assert.ok(!_.isEqual(a, b), 'Arrays containing circular references and different properties are not equal');

    // More circular arrays #767.
    a = ['everything is checked but', 'this', 'is not'];
    a[1] = a;
    b = ['everything is checked but', ['this', 'array'], 'is not'];
    assert.ok(!_.isEqual(a, b), 'Comparison of circular references with non-circular references are not equal');

    // Circular Objects.
    a = {abc: null};
    b = {abc: null};
    a.abc = a;
    b.abc = b;
    assert.ok(_.isEqual(a, b), 'Objects containing circular references are equal');
    a.def = 75;
    b.def = 75;
    assert.ok(_.isEqual(a, b), 'Objects containing circular references and equivalent properties are equal');
    a.def = new Number(75);
    b.def = new Number(63);
    assert.ok(!_.isEqual(a, b), 'Objects containing circular references and different properties are not equal');

    // More circular objects #767.
    a = {everything: 'is checked', but: 'this', is: 'not'};
    a.but = a;
    b = {everything: 'is checked', but: {that: 'object'}, is: 'not'};
    assert.ok(!_.isEqual(a, b), 'Comparison of circular references with non-circular object references are not equal');

    // Cyclic Structures.
    a = [{abc: null}];
    b = [{abc: null}];
    (a[0].abc = a).push(a);
    (b[0].abc = b).push(b);
    assert.ok(_.isEqual(a, b), 'Cyclic structures are equal');
    a[0].def = 'Larry';
    b[0].def = 'Larry';
    assert.ok(_.isEqual(a, b), 'Cyclic structures containing equivalent properties are equal');
    a[0].def = new String('Larry');
    b[0].def = new String('Curly');
    assert.ok(!_.isEqual(a, b), 'Cyclic structures containing different properties are not equal');

    // Complex Circular References.
    a = {foo: {b: {foo: {c: {foo: null}}}}};
    b = {foo: {b: {foo: {c: {foo: null}}}}};
    a.foo.b.foo.c.foo = a;
    b.foo.b.foo.c.foo = b;
    assert.ok(_.isEqual(a, b), 'Cyclic structures with nested and identically-named properties are equal');

    // Chaining.
    assert.ok(!_.isEqual(_({x: 1, y: void 0}).chain(), _({x: 1, z: 2}).chain()), 'Chained objects containing different values are not equal');

    a = _({x: 1, y: 2}).chain();
    b = _({x: 1, y: 2}).chain();
    assert.strictEqual(_.isEqual(a.isEqual(b), _(true)), true, '`isEqual` can be chained');

    // Objects without a `constructor` property
    if (Object.create) {
      a = Object.create(null, {x: {value: 1, enumerable: true}});
      b = {x: 1};
      assert.ok(_.isEqual(a, b), 'Handles objects without a constructor (e.g. from Object.create');
    }

    function Foo() { this.a = 1; }
    Foo.prototype.constructor = null;

    var other = {a: 1};
    assert.strictEqual(_.isEqual(new Foo, other), false, 'Objects from different constructors are not equal');


    // Tricky object cases val comparisons
    assert.strictEqual(_.isEqual([0], [-0]), false);
    assert.strictEqual(_.isEqual({a: 0}, {a: -0}), false);
    assert.strictEqual(_.isEqual([NaN], [NaN]), true);
    assert.strictEqual(_.isEqual({a: NaN}, {a: NaN}), true);

    if (typeof Symbol !== 'undefined') {
      var symbol = Symbol('x');
      assert.strictEqual(_.isEqual(symbol, symbol), true, 'A symbol is equal to itself');
      assert.strictEqual(_.isEqual(symbol, Object(symbol)), true, 'Even when wrapped in Object()');
      assert.strictEqual(_.isEqual(symbol, null), false, 'Different types are not equal');

      var symbolY = Symbol('y');
      assert.strictEqual(_.isEqual(symbol, symbolY), false, 'Different symbols are not equal');

      var sameStringSymbol = Symbol('x');
      assert.strictEqual(_.isEqual(symbol, sameStringSymbol), false, 'Different symbols of same string are not equal');
    }

    // typed arrays
    if (typeof ArrayBuffer !== 'undefined') {
      var u8 = new Uint8Array([1, 2]);
      var u8b = new Uint8Array([1, 2]);
      var i8 = new Int8Array([1, 2]);
      var u16 = new Uint16Array([1, 2]);
      var u16one = new Uint16Array([3]);

      assert.ok(_.isEqual(u8, u8b), 'Identical typed array data are equal');
      assert.ok(_.isEqual(u8.buffer, u8b.buffer), 'Identical ArrayBuffers are equal');
      assert.ok(_.isEqual(u8.buffer, i8.buffer), 'Identical ArrayBuffers of different typed arrays are equal');

      assert.notOk(_.isEqual({a: 1, buffer: u8.buffer}, {a: 2, buffer: u8b.buffer}), 'Unequal objects with similar buffer properties are not equals');

      assert.notOk(_.isEqual(u8, i8), 'Different types of typed arrays with the same byte data are not equal');
      assert.notOk(_.isEqual(u8, u16), 'Typed arrays with different types and different byte length are not equal');
      assert.notOk(_.isEqual(u8, u16one), 'Typed arrays with different types, same byte length but different byte data are not equal');
      assert.notOk(_.isEqual(u8.buffer, u16.buffer), 'Different ArrayBuffers with different length are not equal');
      assert.notOk(_.isEqual(u8.buffer, u16one.buffer), 'Different ArrayBuffers with different byte data are not equal');

      // Regression tests for #2875.
      var shared = new Uint8Array([1, 2, 3, 4]);
      var view1 = new Uint8Array(shared.buffer, 0, 2);
      var view2 = new Uint8Array(shared.buffer, 2, 2);
      assert.notOk(_.isEqual(view1, view2), 'same buffer with different offset is not equal');

      // Some older browsers support typed arrays but not DataView.
      if (typeof DataView !== 'undefined') {
        assert.ok(_.isEqual(new DataView(u8.buffer), new DataView(u8b.buffer)), 'Identical DataViews are equal');
        assert.ok(_.isEqual(new DataView(u8.buffer), new DataView(i8.buffer)), 'Identical DataViews of different typed arrays are equal');
        assert.notOk(_.isEqual(new DataView(u8.buffer), new DataView(u16.buffer)), 'Different DataViews with different length are not equal');
        assert.notOk(_.isEqual(new DataView(u8.buffer), new DataView(u16one.buffer)), 'Different DataViews with different byte data are not equal');
      }
    }
  });

  QUnit.test('isEmpty', function(assert) {
    assert.ok(!_([1]).isEmpty(), '[1] is not empty');
    assert.ok(_.isEmpty([]), '[] is empty');
    assert.ok(!_.isEmpty({one: 1}), '{one: 1} is not empty');
    assert.ok(_.isEmpty({}), '{} is empty');
    assert.ok(_.isEmpty(new RegExp('')), 'objects with prototype properties are empty');
    assert.ok(_.isEmpty(null), 'null is empty');
    assert.ok(_.isEmpty(), 'undefined is empty');
    assert.ok(_.isEmpty(''), 'the empty string is empty');
    assert.ok(!_.isEmpty('moe'), 'but other strings are not');

    var obj = {one: 1};
    delete obj.one;
    assert.ok(_.isEmpty(obj), 'deleting all the keys from an object empties it');

    var args = function(){ return arguments; };
    assert.ok(_.isEmpty(args()), 'empty arguments object is empty');
    assert.ok(!_.isEmpty(args('')), 'non-empty arguments object is not empty');

    // covers collecting non-enumerable properties in IE < 9
    var nonEnumProp = {toString: 5};
    assert.ok(!_.isEmpty(nonEnumProp), 'non-enumerable property is not empty');
  });

  if (typeof document === 'object') {
    QUnit.test('isElement', function(assert) {
      assert.ok(!_.isElement('div'), 'strings are not dom elements');
      assert.ok(_.isElement(testElement), 'an element is a DOM element');
    });
  }

  QUnit.test('isArguments', function(assert) {
    var args = (function(){ return arguments; }(1, 2, 3));
    assert.ok(!_.isArguments('string'), 'a string is not an arguments object');
    assert.ok(!_.isArguments(_.isArguments), 'a function is not an arguments object');
    assert.ok(_.isArguments(args), 'but the arguments object is an arguments object');
    assert.ok(!_.isArguments(_.toArray(args)), 'but not when it\'s converted into an array');
    assert.ok(!_.isArguments([1, 2, 3]), 'and not vanilla arrays.');
  });

  QUnit.test('isObject', function(assert) {
    assert.ok(_.isObject(arguments), 'the arguments object is object');
    assert.ok(_.isObject([1, 2, 3]), 'and arrays');
    if (testElement) {
      assert.ok(_.isObject(testElement), 'and DOM element');
    }
    assert.ok(_.isObject(function() {}), 'and functions');
    assert.ok(!_.isObject(null), 'but not null');
    assert.ok(!_.isObject(void 0), 'and not undefined');
    assert.ok(!_.isObject('string'), 'and not string');
    assert.ok(!_.isObject(12), 'and not number');
    assert.ok(!_.isObject(true), 'and not boolean');
    assert.ok(_.isObject(new String('string')), 'but new String()');
  });

  QUnit.test('isArray', function(assert) {
    assert.ok(!_.isArray(void 0), 'undefined vars are not arrays');
    assert.ok(!_.isArray(arguments), 'the arguments object is not an array');
    assert.ok(_.isArray([1, 2, 3]), 'but arrays are');
  });

  QUnit.test('isString', function(assert) {
    var obj = new String('I am a string object');
    if (testElement) {
      assert.ok(!_.isString(testElement), 'an element is not a string');
    }
    assert.ok(_.isString([1, 2, 3].join(', ')), 'but strings are');
    assert.strictEqual(_.isString('I am a string literal'), true, 'string literals are');
    assert.ok(_.isString(obj), 'so are String objects');
    assert.strictEqual(_.isString(1), false);
  });

  QUnit.test('isSymbol', function(assert) {
    assert.ok(!_.isSymbol(0), 'numbers are not symbols');
    assert.ok(!_.isSymbol(''), 'strings are not symbols');
    assert.ok(!_.isSymbol(_.isSymbol), 'functions are not symbols');
    if (typeof Symbol === 'function') {
      assert.ok(_.isSymbol(Symbol()), 'symbols are symbols');
      assert.ok(_.isSymbol(Symbol('description')), 'described symbols are symbols');
      assert.ok(_.isSymbol(Object(Symbol())), 'boxed symbols are symbols');
    }
  });

  QUnit.test('isNumber', function(assert) {
    assert.ok(!_.isNumber('string'), 'a string is not a number');
    assert.ok(!_.isNumber(arguments), 'the arguments object is not a number');
    assert.ok(!_.isNumber(void 0), 'undefined is not a number');
    assert.ok(_.isNumber(3 * 4 - 7 / 10), 'but numbers are');
    assert.ok(_.isNumber(NaN), 'NaN *is* a number');
    assert.ok(_.isNumber(Infinity), 'Infinity is a number');
    assert.ok(!_.isNumber('1'), 'numeric strings are not numbers');
  });

  QUnit.test('isBoolean', function(assert) {
    assert.ok(!_.isBoolean(2), 'a number is not a boolean');
    assert.ok(!_.isBoolean('string'), 'a string is not a boolean');
    assert.ok(!_.isBoolean('false'), 'the string "false" is not a boolean');
    assert.ok(!_.isBoolean('true'), 'the string "true" is not a boolean');
    assert.ok(!_.isBoolean(arguments), 'the arguments object is not a boolean');
    assert.ok(!_.isBoolean(void 0), 'undefined is not a boolean');
    assert.ok(!_.isBoolean(NaN), 'NaN is not a boolean');
    assert.ok(!_.isBoolean(null), 'null is not a boolean');
    assert.ok(_.isBoolean(true), 'but true is');
    assert.ok(_.isBoolean(false), 'and so is false');
  });

  QUnit.test('isMap', function(assert) {
    assert.ok(!_.isMap('string'), 'a string is not a map');
    assert.ok(!_.isMap(2), 'a number is not a map');
    assert.ok(!_.isMap({}), 'an object is not a map');
    assert.ok(!_.isMap(false), 'a boolean is not a map');
    assert.ok(!_.isMap(void 0), 'undefined is not a map');
    assert.ok(!_.isMap([1, 2, 3]), 'an array is not a map');
    if (typeof Set === 'function') {
      assert.ok(!_.isMap(new Set()), 'a set is not a map');
    }
    if (typeof WeakSet === 'function') {
      assert.ok(!_.isMap(new WeakSet()), 'a weakset is not a map');
    }
    if (typeof WeakMap === 'function') {
      assert.ok(!_.isMap(new WeakMap()), 'a weakmap is not a map');
    }
    if (typeof Map === 'function') {
      var keyString = 'a string';
      var obj = new Map();
      obj.set(keyString, "value associated with 'a string'");
      assert.ok(_.isMap(obj), 'but a map is');
    }
  });

  QUnit.test('isWeakMap', function(assert) {
    assert.ok(!_.isWeakMap('string'), 'a string is not a weakmap');
    assert.ok(!_.isWeakMap(2), 'a number is not a weakmap');
    assert.ok(!_.isWeakMap({}), 'an object is not a weakmap');
    assert.ok(!_.isWeakMap(false), 'a boolean is not a weakmap');
    assert.ok(!_.isWeakMap(void 0), 'undefined is not a weakmap');
    assert.ok(!_.isWeakMap([1, 2, 3]), 'an array is not a weakmap');
    if (typeof Set === 'function') {
      assert.ok(!_.isWeakMap(new Set()), 'a set is not a weakmap');
    }
    if (typeof WeakSet === 'function') {
      assert.ok(!_.isWeakMap(new WeakSet()), 'a weakset is not a weakmap');
    }
    if (typeof Map === 'function') {
      assert.ok(!_.isWeakMap(new Map()), 'a map is not a weakmap');
    }
    if (typeof WeakMap === 'function') {
      var keyObj = {}, obj = new WeakMap();
      obj.set(keyObj, 'value');
      assert.ok(_.isWeakMap(obj), 'but a weakmap is');
    }
  });

  QUnit.test('isSet', function(assert) {
    assert.ok(!_.isSet('string'), 'a string is not a set');
    assert.ok(!_.isSet(2), 'a number is not a set');
    assert.ok(!_.isSet({}), 'an object is not a set');
    assert.ok(!_.isSet(false), 'a boolean is not a set');
    assert.ok(!_.isSet(void 0), 'undefined is not a set');
    assert.ok(!_.isSet([1, 2, 3]), 'an array is not a set');
    if (typeof Map === 'function') {
      assert.ok(!_.isSet(new Map()), 'a map is not a set');
    }
    if (typeof WeakMap === 'function') {
      assert.ok(!_.isSet(new WeakMap()), 'a weakmap is not a set');
    }
    if (typeof WeakSet === 'function') {
      assert.ok(!_.isSet(new WeakSet()), 'a weakset is not a set');
    }
    if (typeof Set === 'function') {
      var obj = new Set([1, 2, 3, 4, 5]);
      assert.ok(_.isSet(obj), 'but a set is');
    }
  });

  QUnit.test('isWeakSet', function(assert) {

    assert.ok(!_.isWeakSet('string'), 'a string is not a weakset');
    assert.ok(!_.isWeakSet(2), 'a number is not a weakset');
    assert.ok(!_.isWeakSet({}), 'an object is not a weakset');
    assert.ok(!_.isWeakSet(false), 'a boolean is not a weakset');
    assert.ok(!_.isWeakSet(void 0), 'undefined is not a weakset');
    assert.ok(!_.isWeakSet([1, 2, 3]), 'an array is not a weakset');
    if (typeof Map === 'function') {
      assert.ok(!_.isWeakSet(new Map()), 'a map is not a weakset');
    }
    if (typeof WeakMap === 'function') {
      assert.ok(!_.isWeakSet(new WeakMap()), 'a weakmap is not a weakset');
    }
    if (typeof Set === 'function') {
      assert.ok(!_.isWeakSet(new Set()), 'a set is not a weakset');
    }
    if (typeof WeakSet === 'function') {
      var obj = new WeakSet();
      obj.add({x: 1}, {y: 'string'}).add({y: 'string'}).add({z: [1, 2, 3]});
      assert.ok(_.isWeakSet(obj), 'but a weakset is');
    }
  });

  QUnit.test('isFunction', function(assert) {
    assert.ok(!_.isFunction(void 0), 'undefined vars are not functions');
    assert.ok(!_.isFunction([1, 2, 3]), 'arrays are not functions');
    assert.ok(!_.isFunction('moe'), 'strings are not functions');
    assert.ok(_.isFunction(_.isFunction), 'but functions are');
    assert.ok(_.isFunction(function(){}), 'even anonymous ones');

    if (testElement) {
      assert.ok(!_.isFunction(testElement), 'elements are not functions');
    }

    var nodelist = typeof document != 'undefined' && document.childNodes;
    if (nodelist) {
      assert.ok(!_.isFunction(nodelist));
    }
  });

  if (typeof Int8Array !== 'undefined') {
    QUnit.test('#1929 Typed Array constructors are functions', function(assert) {
      _.chain(['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array'])
      .map(_.propertyOf(typeof global != 'undefined' ? global : window))
      .compact()
      .each(function(TypedArray) {
        // PhantomJS reports `typeof UInt8Array == 'object'` and doesn't report toString TypeArray
        // as a function
        assert.strictEqual(_.isFunction(TypedArray), Object.prototype.toString.call(TypedArray) === '[object Function]');
      });
    });
  }

  QUnit.test('isDate', function(assert) {
    assert.ok(!_.isDate(100), 'numbers are not dates');
    assert.ok(!_.isDate({}), 'objects are not dates');
    assert.ok(_.isDate(new Date()), 'but dates are');
  });

  QUnit.test('isRegExp', function(assert) {
    assert.ok(!_.isRegExp(_.identity), 'functions are not RegExps');
    assert.ok(_.isRegExp(/identity/), 'but RegExps are');
  });

  QUnit.test('isFinite', function(assert) {
    assert.ok(!_.isFinite(void 0), 'undefined is not finite');
    assert.ok(!_.isFinite(null), 'null is not finite');
    assert.ok(!_.isFinite(NaN), 'NaN is not finite');
    assert.ok(!_.isFinite(Infinity), 'Infinity is not finite');
    assert.ok(!_.isFinite(-Infinity), '-Infinity is not finite');
    assert.ok(_.isFinite('12'), 'Numeric strings are numbers');
    assert.ok(!_.isFinite('1a'), 'Non numeric strings are not numbers');
    assert.ok(!_.isFinite(''), 'Empty strings are not numbers');
    var obj = new Number(5);
    assert.ok(_.isFinite(obj), 'Number instances can be finite');
    assert.ok(_.isFinite(0), '0 is finite');
    assert.ok(_.isFinite(123), 'Ints are finite');
    assert.ok(_.isFinite(-12.44), 'Floats are finite');
    if (typeof Symbol === 'function') {
      assert.ok(!_.isFinite(Symbol()), 'symbols are not numbers');
      assert.ok(!_.isFinite(Symbol('description')), 'described symbols are not numbers');
      assert.ok(!_.isFinite(Object(Symbol())), 'boxed symbols are not numbers');
    }
  });

  QUnit.test('isNaN', function(assert) {
    assert.ok(!_.isNaN(void 0), 'undefined is not NaN');
    assert.ok(!_.isNaN(null), 'null is not NaN');
    assert.ok(!_.isNaN(0), '0 is not NaN');
    assert.ok(!_.isNaN(new Number(0)), 'wrapped 0 is not NaN');
    assert.ok(_.isNaN(NaN), 'but NaN is');
    assert.ok(_.isNaN(new Number(NaN)), 'wrapped NaN is still NaN');
    if (typeof Symbol !== 'undefined'){
      assert.ok(!_.isNaN(Symbol()), 'symbol is not NaN');
    }
  });

  QUnit.test('isNull', function(assert) {
    assert.ok(!_.isNull(void 0), 'undefined is not null');
    assert.ok(!_.isNull(NaN), 'NaN is not null');
    assert.ok(_.isNull(null), 'but null is');
  });

  QUnit.test('isUndefined', function(assert) {
    assert.ok(!_.isUndefined(1), 'numbers are defined');
    assert.ok(!_.isUndefined(null), 'null is defined');
    assert.ok(!_.isUndefined(false), 'false is defined');
    assert.ok(!_.isUndefined(NaN), 'NaN is defined');
    assert.ok(_.isUndefined(), 'nothing is undefined');
    assert.ok(_.isUndefined(void 0), 'undefined is undefined');
  });

  QUnit.test('isError', function(assert) {
    assert.ok(!_.isError(1), 'numbers are not Errors');
    assert.ok(!_.isError(null), 'null is not an Error');
    assert.ok(!_.isError(Error), 'functions are not Errors');
    assert.ok(_.isError(new Error()), 'Errors are Errors');
    assert.ok(_.isError(new EvalError()), 'EvalErrors are Errors');
    assert.ok(_.isError(new RangeError()), 'RangeErrors are Errors');
    assert.ok(_.isError(new ReferenceError()), 'ReferenceErrors are Errors');
    assert.ok(_.isError(new SyntaxError()), 'SyntaxErrors are Errors');
    assert.ok(_.isError(new TypeError()), 'TypeErrors are Errors');
    assert.ok(_.isError(new URIError()), 'URIErrors are Errors');
  });

  if (typeof ArrayBuffer != 'undefined') {
    QUnit.test('isArrayBuffer, isDataView and isTypedArray', function(assert) {
      var buffer = new ArrayBuffer(16);
      var checkValues = {
        'null': null,
        'a string': '',
        'an array': [],
        'an ArrayBuffer': buffer,
        'a TypedArray': new Uint8Array(buffer)
      };
      // Some older browsers support typed arrays but not DataView.
      if (typeof DataView !== 'undefined') {
        checkValues['a DataView'] = new DataView(buffer);
      }
      var types = ['an ArrayBuffer', 'a DataView', 'a TypedArray'];
      _.each(types, function(type) {
        var typeCheck = _['is' + type.split(' ')[1]];
        _.each(checkValues, function(value, description) {
          if (description === type) {
            assert.ok(typeCheck(value), description + ' is ' + type);
          } else {
            assert.ok(!typeCheck(value), description + ' is not ' + type);
          }
        });
      });
    });

    QUnit.test('isTypedArray', function(assert) {
      var buffer = new ArrayBuffer(16);
      var typedArrayTypes = [Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array];
      if (typeof Uint8ClampedArray != 'undefined') {
        typedArrayTypes.push(Uint8ClampedArray);
      }
      if (typeof BigInt64Array != 'undefined') {
        typedArrayTypes.push(BigInt64Array);
      }
      _.each(typedArrayTypes, function(ctor) {
        assert.ok(_.isTypedArray(new ctor(buffer)), ctor.name + ' is a typed array');
      });

    });
  }

  QUnit.test('tap', function(assert) {
    var intercepted = null;
    var interceptor = function(obj) { intercepted = obj; };
    var returned = _.tap(1, interceptor);
    assert.strictEqual(intercepted, 1, 'passes tapped object to interceptor');
    assert.strictEqual(returned, 1, 'returns tapped object');

    returned = _([1, 2, 3]).chain().
      map(function(n){ return n * 2; }).
      max().
      tap(interceptor).
      value();
    assert.strictEqual(returned, 6, 'can use tapped objects in a chain');
    assert.strictEqual(intercepted, returned, 'can use tapped objects in a chain');
  });

  QUnit.test('has', function(assert) {
    var obj = {foo: 'bar', func: function(){}};
    assert.ok(_.has(obj, 'foo'), 'checks that the object has a property.');
    assert.ok(!_.has(obj, 'baz'), "returns false if the object doesn't have the property.");
    assert.ok(_.has(obj, 'func'), 'works for functions too.');
    obj.hasOwnProperty = null;
    assert.ok(_.has(obj, 'foo'), 'works even when the hasOwnProperty method is deleted.');
    function Child() {}
    Child.prototype = obj;
    var child = new Child();
    assert.ok(!_.has(child, 'foo'), 'does not check the prototype chain for a property.');
    assert.strictEqual(_.has(null, 'foo'), false, 'returns false for null');
    assert.strictEqual(_.has(void 0, 'foo'), false, 'returns false for undefined');

    assert.ok(_.has({a: {b: 'foo'}}, ['a', 'b']), 'can check for nested properties.');
    assert.ok(!_.has({a: child}, ['a', 'foo']), 'does not check the prototype of nested props.');
  });

  QUnit.test('get', function(assert) {
    var stooge = {name: 'moe'};
    assert.strictEqual(_.get(stooge, 'name'), 'moe', 'should return the property with the given name');
    assert.strictEqual(_.get(null, 'name'), void 0, 'should return undefined for null values');
    assert.strictEqual(_.get(void 0, 'name'), void 0, 'should return undefined for undefined values');
    assert.strictEqual(_.get('foo', null), void 0, 'should return undefined for null object');
    assert.strictEqual(_.get({x: null}, 'x'), null, 'can fetch null values');
    assert.strictEqual(_.get(null, 'length'), void 0, 'does not crash on property access of non-objects');
    assert.strictEqual(_.get(stooge, 'size', 10), 10, 'allows a fallback value for undefined properties');
    assert.strictEqual(_.get(stooge, 'name', 10), 'moe', 'ignores the fallback value if the property is defined');

    // Deep property access
    assert.strictEqual(_.get({a: 1}, 'a'), 1, 'can get a direct property');
    assert.strictEqual(_.get({a: {b: 2}}, ['a', 'b']), 2, 'can get a nested property');
    assert.strictEqual(_.get({a: {b: 2}}, ['a', 'c'], 10), 10, 'allows a fallback value for undefined properties');
    assert.strictEqual(_.get({a: {b: 2}}, ['a', 'b'], 10), 2, 'ignores the fallback value if the property is defined');
    assert.strictEqual(_.get({a: false}, ['a']), false, 'can fetch falsy values');
    assert.strictEqual(_.get({x: {y: null}}, ['x', 'y']), null, 'can fetch null values deeply');
    assert.strictEqual(_.get({x: null}, ['x', 'y']), void 0, 'does not crash on property access of nested non-objects');
    assert.strictEqual(_.get({x: 'y'}, []), void 0, 'returns `undefined` for a path that is an empty array');
  });

  QUnit.test('property', function(assert) {
    var stooge = {name: 'moe'};
    assert.strictEqual(_.property('name')(stooge), 'moe', 'should return the property with the given name');
    assert.strictEqual(_.property('name')(null), void 0, 'should return undefined for null values');
    assert.strictEqual(_.property('name')(void 0), void 0, 'should return undefined for undefined values');
    assert.strictEqual(_.property(null)('foo'), void 0, 'should return undefined for null object');
    assert.strictEqual(_.property('x')({x: null}), null, 'can fetch null values');
    assert.strictEqual(_.property('length')(null), void 0, 'does not crash on property access of non-objects');

    // Deep property access
    assert.strictEqual(_.property('a')({a: 1}), 1, 'can get a direct property');
    assert.strictEqual(_.property(['a', 'b'])({a: {b: 2}}), 2, 'can get a nested property');
    assert.strictEqual(_.property(['a'])({a: false}), false, 'can fetch falsy values');
    assert.strictEqual(_.property(['x', 'y'])({x: {y: null}}), null, 'can fetch null values deeply');
    assert.strictEqual(_.property(['x', 'y'])({x: null}), void 0, 'does not crash on property access of nested non-objects');
    assert.strictEqual(_.property([])({x: 'y'}), void 0, 'returns `undefined` for a path that is an empty array');
  });

  QUnit.test('propertyOf', function(assert) {
    var stoogeRanks = _.propertyOf({curly: 2, moe: 1, larry: 3});
    assert.strictEqual(stoogeRanks('curly'), 2, 'should return the property with the given name');
    assert.strictEqual(stoogeRanks(null), void 0, 'should return undefined for null values');
    assert.strictEqual(stoogeRanks(void 0), void 0, 'should return undefined for undefined values');
    assert.strictEqual(_.propertyOf({a: null})('a'), null, 'can fetch null values');

    function MoreStooges() { this.shemp = 87; }
    MoreStooges.prototype = {curly: 2, moe: 1, larry: 3};
    var moreStoogeRanks = _.propertyOf(new MoreStooges());
    assert.strictEqual(moreStoogeRanks('curly'), 2, 'should return properties from further up the prototype chain');

    var nullPropertyOf = _.propertyOf(null);
    assert.strictEqual(nullPropertyOf('curly'), void 0, 'should return undefined when obj is null');

    var undefPropertyOf = _.propertyOf(void 0);
    assert.strictEqual(undefPropertyOf('curly'), void 0, 'should return undefined when obj is undefined');

    var deepPropertyOf = _.propertyOf({curly: {number: 2}, joe: {number: null}});
    assert.strictEqual(deepPropertyOf(['curly', 'number']), 2, 'can fetch nested properties of obj');
    assert.strictEqual(deepPropertyOf(['joe', 'number']), null, 'can fetch nested null properties of obj');
  });

  QUnit.test('isMatch', function(assert) {
    var moe = {name: 'Moe Howard', hair: true};
    var curly = {name: 'Curly Howard', hair: false};

    assert.strictEqual(_.isMatch(moe, {hair: true}), true, 'Returns a boolean');
    assert.strictEqual(_.isMatch(curly, {hair: true}), false, 'Returns a boolean');

    assert.strictEqual(_.isMatch(5, {__x__: void 0}), false, 'can match undefined props on primitives');
    assert.strictEqual(_.isMatch({__x__: void 0}, {__x__: void 0}), true, 'can match undefined props');

    assert.strictEqual(_.isMatch(null, {}), true, 'Empty spec called with null object returns true');
    assert.strictEqual(_.isMatch(null, {a: 1}), false, 'Non-empty spec called with null object returns false');

    _.each([null, void 0], function(item) { assert.strictEqual(_.isMatch(item, null), true, 'null matches null'); });
    _.each([null, void 0], function(item) { assert.strictEqual(_.isMatch(item, null), true, 'null matches {}'); });
    assert.strictEqual(_.isMatch({b: 1}, {a: void 0}), false, 'handles undefined values (1683)');

    _.each([true, 5, NaN, null, void 0], function(item) {
      assert.strictEqual(_.isMatch({a: 1}, item), true, 'treats primitives as empty');
    });

    function Prototest() {}
    Prototest.prototype.x = 1;
    var specObj = new Prototest;
    assert.strictEqual(_.isMatch({x: 2}, specObj), true, 'spec is restricted to own properties');

    specObj.y = 5;
    assert.strictEqual(_.isMatch({x: 1, y: 5}, specObj), true);
    assert.strictEqual(_.isMatch({x: 1, y: 4}, specObj), false);

    assert.ok(_.isMatch(specObj, {x: 1, y: 5}), 'inherited and own properties are checked on the test object');

    Prototest.x = 5;
    assert.ok(_.isMatch({x: 5, y: 1}, Prototest), 'spec can be a function');

    //null edge cases
    var oCon = {constructor: Object};
    assert.deepEqual(_.map([null, void 0, 5, {}], _.partial(_.isMatch, _, oCon)), [false, false, false, true], 'doesnt falsy match constructor on undefined/null');
  });

  QUnit.test('matcher', function(assert) {
    var moe = {name: 'Moe Howard', hair: true};
    var curly = {name: 'Curly Howard', hair: false};
    var stooges = [moe, curly];

    assert.strictEqual(_.matcher({hair: true})(moe), true, 'Returns a boolean');
    assert.strictEqual(_.matcher({hair: true})(curly), false, 'Returns a boolean');

    assert.strictEqual(_.matcher({__x__: void 0})(5), false, 'can match undefined props on primitives');
    assert.strictEqual(_.matcher({__x__: void 0})({__x__: void 0}), true, 'can match undefined props');

    assert.strictEqual(_.matcher({})(null), true, 'Empty spec called with null object returns true');
    assert.strictEqual(_.matcher({a: 1})(null), false, 'Non-empty spec called with null object returns false');

    assert.strictEqual(_.find(stooges, _.matcher({hair: false})), curly, 'returns a predicate that can be used by finding functions.');
    assert.strictEqual(_.find(stooges, _.matcher(moe)), moe, 'can be used to locate an object exists in a collection.');
    assert.deepEqual(_.filter([null, void 0], _.matcher({a: 1})), [], 'Do not throw on null values.');

    assert.deepEqual(_.filter([null, void 0], _.matcher(null)), [null, void 0], 'null matches null');
    assert.deepEqual(_.filter([null, void 0], _.matcher({})), [null, void 0], 'null matches {}');
    assert.deepEqual(_.filter([{b: 1}], _.matcher({a: void 0})), [], 'handles undefined values (1683)');

    _.each([true, 5, NaN, null, void 0], function(item) {
      assert.strictEqual(_.matcher(item)({a: 1}), true, 'treats primitives as empty');
    });

    function Prototest() {}
    Prototest.prototype.x = 1;
    var specObj = new Prototest;
    var protospec = _.matcher(specObj);
    assert.strictEqual(protospec({x: 2}), true, 'spec is restricted to own properties');

    specObj.y = 5;
    protospec = _.matcher(specObj);
    assert.strictEqual(protospec({x: 1, y: 5}), true);
    assert.strictEqual(protospec({x: 1, y: 4}), false);

    assert.ok(_.matcher({x: 1, y: 5})(specObj), 'inherited and own properties are checked on the test object');

    Prototest.x = 5;
    assert.ok(_.matcher(Prototest)({x: 5, y: 1}), 'spec can be a function');

    // #1729
    var o = {b: 1};
    var m = _.matcher(o);

    assert.strictEqual(m({b: 1}), true);
    o.b = 2;
    o.a = 1;
    assert.strictEqual(m({b: 1}), true, 'changing spec object doesnt change matches result');


    //null edge cases
    var oCon = _.matcher({constructor: Object});
    assert.deepEqual(_.map([null, void 0, 5, {}], oCon), [false, false, false, true], 'doesnt falsy match constructor on undefined/null');
  });

  QUnit.test('matches', function(assert) {
    assert.strictEqual(_.matches, _.matcher, 'is an alias for matcher');
  });

  QUnit.test('findKey', function(assert) {
    var objects = {
      a: {a: 0, b: 0},
      b: {a: 1, b: 1},
      c: {a: 2, b: 2}
    };

    assert.strictEqual(_.findKey(objects, function(obj) {
      return obj.a === 0;
    }), 'a');

    assert.strictEqual(_.findKey(objects, function(obj) {
      return obj.b * obj.a === 4;
    }), 'c');

    assert.strictEqual(_.findKey(objects, 'a'), 'b', 'Uses lookupIterator');

    assert.strictEqual(_.findKey(objects, function(obj) {
      return obj.b * obj.a === 5;
    }), void 0);

    assert.strictEqual(_.findKey([1, 2, 3, 4, 5, 6], function(obj) {
      return obj === 3;
    }), '2', 'Keys are strings');

    assert.strictEqual(_.findKey(objects, function(a) {
      return a.foo === null;
    }), void 0);

    _.findKey({a: {a: 1}}, function(a, key, obj) {
      assert.strictEqual(key, 'a');
      assert.deepEqual(obj, {a: {a: 1}});
      assert.strictEqual(this, objects, 'called with context');
    }, objects);

    var array = [1, 2, 3, 4];
    array.match = 55;
    assert.strictEqual(_.findKey(array, function(x) { return x === 55; }), 'match', 'matches array-likes keys');
  });


  QUnit.test('mapObject', function(assert) {
    var obj = {a: 1, b: 2};
    var objects = {
      a: {a: 0, b: 0},
      b: {a: 1, b: 1},
      c: {a: 2, b: 2}
    };

    assert.deepEqual(_.mapObject(obj, function(val) {
      return val * 2;
    }), {a: 2, b: 4}, 'simple objects');

    assert.deepEqual(_.mapObject(objects, function(val) {
      return _.reduce(val, function(memo, v){
        return memo + v;
      }, 0);
    }), {a: 0, b: 2, c: 4}, 'nested objects');

    assert.deepEqual(_.mapObject(obj, function(val, key, o) {
      return o[key] * 2;
    }), {a: 2, b: 4}, 'correct keys');

    assert.deepEqual(_.mapObject([1, 2], function(val) {
      return val * 2;
    }), {0: 2, 1: 4}, 'check behavior for arrays');

    assert.deepEqual(_.mapObject(obj, function(val) {
      return val * this.multiplier;
    }, {multiplier: 3}), {a: 3, b: 6}, 'keep context');

    assert.deepEqual(_.mapObject({a: 1}, function() {
      return this.length;
    }, [1, 2]), {a: 2}, 'called with context');

    var ids = _.mapObject({length: 2, 0: {id: '1'}, 1: {id: '2'}}, function(n){
      return n.id;
    });
    assert.deepEqual(ids, {length: void 0, 0: '1', 1: '2'}, 'Check with array-like objects');

    // Passing a property name like _.pluck.
    var people = {a: {name: 'moe', age: 30}, b: {name: 'curly', age: 50}};
    assert.deepEqual(_.mapObject(people, 'name'), {a: 'moe', b: 'curly'}, 'predicate string map to object properties');

    _.each([null, void 0, 1, 'abc', [], {}, void 0], function(val){
      assert.deepEqual(_.mapObject(val, _.identity), {}, 'mapValue identity');
    });

    var Proto = function(){ this.a = 1; };
    Proto.prototype.b = 1;
    var protoObj = new Proto();
    assert.deepEqual(_.mapObject(protoObj, _.identity), {a: 1}, 'ignore inherited values from prototypes');

  });
}());
