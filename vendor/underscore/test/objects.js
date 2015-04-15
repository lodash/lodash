(function() {
  var _ = typeof require == 'function' ? require('..') : window._;

  QUnit.module('Objects');

  var testElement = typeof document === 'object' ? document.createElement('div') : void 0;

  test('keys', function() {
    deepEqual(_.keys({one : 1, two : 2}), ['one', 'two'], 'can extract the keys from an object');
    // the test above is not safe because it relies on for-in enumeration order
    var a = []; a[1] = 0;
    deepEqual(_.keys(a), ['1'], 'is not fooled by sparse arrays; see issue #95');
    deepEqual(_.keys(null), []);
    deepEqual(_.keys(void 0), []);
    deepEqual(_.keys(1), []);
    deepEqual(_.keys('a'), []);
    deepEqual(_.keys(true), []);

    // keys that may be missed if the implementation isn't careful
    var trouble = {
      'constructor': Object,
      'valueOf': _.noop,
      'hasOwnProperty': null,
      'toString': 5,
      'toLocaleString': undefined,
      'propertyIsEnumerable': /a/,
      'isPrototypeOf': this,
      '__defineGetter__': Boolean,
      '__defineSetter__': {},
      '__lookupSetter__': false,
      '__lookupGetter__': []
    };
    var troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                  'isPrototypeOf', '__defineGetter__', '__defineSetter__', '__lookupSetter__', '__lookupGetter__'].sort();
    deepEqual(_.keys(trouble).sort(), troubleKeys, 'matches non-enumerable properties');
  });

  test('allKeys', function() {
    deepEqual(_.allKeys({one : 1, two : 2}), ['one', 'two'], 'can extract the allKeys from an object');
    // the test above is not safe because it relies on for-in enumeration order
    var a = []; a[1] = 0;
    deepEqual(_.allKeys(a), ['1'], 'is not fooled by sparse arrays; see issue #95');

    a.a = a;
    deepEqual(_.allKeys(a), ['1', 'a'], 'is not fooled by sparse arrays with additional properties');

    _.each([null, void 0, 1, 'a', true, NaN, {}, [], new Number(5), new Date(0)], function(val) {
      deepEqual(_.allKeys(val), []);
    });

    // allKeys that may be missed if the implementation isn't careful
    var trouble = {
      constructor: Object,
      valueOf: _.noop,
      hasOwnProperty: null,
      toString: 5,
      toLocaleString: undefined,
      propertyIsEnumerable: /a/,
      isPrototypeOf: this
    };
    var troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                  'isPrototypeOf'].sort();
    deepEqual(_.allKeys(trouble).sort(), troubleKeys, 'matches non-enumerable properties');

    function A() {}
    A.prototype.foo = 'foo';
    var b = new A();
    b.bar = 'bar';
    deepEqual(_.allKeys(b).sort(), ['bar', 'foo'], 'should include inherited keys');

    function y() {}
    y.x = 'z';
    deepEqual(_.allKeys(y), ['x'], 'should get keys from constructor');
  });

  test('values', function() {
    deepEqual(_.values({one: 1, two: 2}), [1, 2], 'can extract the values from an object');
    deepEqual(_.values({one: 1, two: 2, length: 3}), [1, 2, 3], '... even when one of them is "length"');
  });

  test('pairs', function() {
    deepEqual(_.pairs({one: 1, two: 2}), [['one', 1], ['two', 2]], 'can convert an object into pairs');
    deepEqual(_.pairs({one: 1, two: 2, length: 3}), [['one', 1], ['two', 2], ['length', 3]], '... even when one of them is "length"');
  });

  test('invert', function() {
    var obj = {first: 'Moe', second: 'Larry', third: 'Curly'};
    deepEqual(_.keys(_.invert(obj)), ['Moe', 'Larry', 'Curly'], 'can invert an object');
    deepEqual(_.invert(_.invert(obj)), obj, 'two inverts gets you back where you started');

    obj = {length: 3};
    equal(_.invert(obj)['3'], 'length', 'can invert an object with "length"');
  });

  test('functions', function() {
    var obj = {a : 'dash', b : _.map, c : /yo/, d : _.reduce};
    deepEqual(['b', 'd'], _.functions(obj), 'can grab the function names of any passed-in object');

    var Animal = function(){};
    Animal.prototype.run = function(){};
    deepEqual(_.functions(new Animal), ['run'], 'also looks up functions on the prototype');
  });

  test('methods', function() {
    strictEqual(_.functions, _.methods, 'alias for functions');
  });

  test('extend', function() {
    var result;
    equal(_.extend({}, {a: 'b'}).a, 'b', 'can extend an object with the attributes of another');
    equal(_.extend({a: 'x'}, {a: 'b'}).a, 'b', 'properties in source override destination');
    equal(_.extend({x: 'x'}, {a: 'b'}).x, 'x', "properties not in source don't get overriden");
    result = _.extend({x: 'x'}, {a: 'a'}, {b: 'b'});
    deepEqual(result, {x: 'x', a: 'a', b: 'b'}, 'can extend from multiple source objects');
    result = _.extend({x: 'x'}, {a: 'a', x: 2}, {a: 'b'});
    deepEqual(result, {x: 2, a: 'b'}, 'extending from multiple source objects last property trumps');
    result = _.extend({}, {a: void 0, b: null});
    deepEqual(_.keys(result), ['a', 'b'], 'extend copies undefined values');

    var F = function() {};
    F.prototype = {a: 'b'};
    var subObj = new F();
    subObj.c = 'd';
    deepEqual(_.extend({}, subObj), {a: 'b', c: 'd'}, 'extend copies all properties from source');
    _.extend(subObj, {});
    ok(!subObj.hasOwnProperty('a'), "extend does not convert destination object's 'in' properties to 'own' properties");

    try {
      result = {};
      _.extend(result, null, undefined, {a: 1});
    } catch(ex) {}

    equal(result.a, 1, 'should not error on `null` or `undefined` sources');

    strictEqual(_.extend(null, {a: 1}), null, 'extending null results in null');
    strictEqual(_.extend(undefined, {a: 1}), undefined, 'extending undefined results in undefined');
  });

  test('extendOwn', function() {
    var result;
    equal(_.extendOwn({}, {a: 'b'}).a, 'b', 'can assign an object with the attributes of another');
    equal(_.extendOwn({a: 'x'}, {a: 'b'}).a, 'b', 'properties in source override destination');
    equal(_.extendOwn({x: 'x'}, {a: 'b'}).x, 'x', "properties not in source don't get overriden");
    result = _.extendOwn({x: 'x'}, {a: 'a'}, {b: 'b'});
    deepEqual(result, {x: 'x', a: 'a', b: 'b'}, 'can assign from multiple source objects');
    result = _.assign({x: 'x'}, {a: 'a', x: 2}, {a: 'b'});
    deepEqual(result, {x: 2, a: 'b'}, 'assigning from multiple source objects last property trumps');
    deepEqual(_.extendOwn({}, {a: void 0, b: null}), {a: void 0, b: null}, 'assign copies undefined values');

    var F = function() {};
    F.prototype = {a: 'b'};
    var subObj = new F();
    subObj.c = 'd';
    deepEqual(_.extendOwn({}, subObj), {c: 'd'}, 'assign copies own properties from source');

    result = {};
    deepEqual(_.assign(result, null, undefined, {a: 1}), {a: 1}, 'should not error on `null` or `undefined` sources');

    _.each(['a', 5, null, false], function(val) {
      strictEqual(_.assign(val, {a: 1}), val, 'assigning non-objects results in returning the non-object value');
    });

    strictEqual(_.extendOwn(undefined, {a: 1}), undefined, 'assigning undefined results in undefined');

    result = _.extendOwn({a: 1, 0: 2, 1: '5', length: 6}, {0: 1, 1: 2, length: 2});
    deepEqual(result, {a: 1, 0: 1, 1: 2, length: 2}, 'assign should treat array-like objects like normal objects');
  });

  test('pick', function() {
    var result;
    result = _.pick({a: 1, b: 2, c: 3}, 'a', 'c');
    deepEqual(result, {a: 1, c: 3}, 'can restrict properties to those named');
    result = _.pick({a: 1, b: 2, c: 3}, ['b', 'c']);
    deepEqual(result, {b: 2, c: 3}, 'can restrict properties to those named in an array');
    result = _.pick({a: 1, b: 2, c: 3}, ['a'], 'b');
    deepEqual(result, {a: 1, b: 2}, 'can restrict properties to those named in mixed args');
    result = _.pick(['a', 'b'], 1);
    deepEqual(result, {1: 'b'}, 'can pick numeric properties');

    _.each([null, void 0], function(val) {
      deepEqual(_.pick(val, 'hasOwnProperty'), {}, 'Called with null/undefined');
      deepEqual(_.pick(val, _.constant(true)), {});
    });
    deepEqual(_.pick(5, 'toString', 'b'), {toString: Number.prototype.toString}, 'can iterate primitives');

    var data = {a: 1, b: 2, c: 3};
    var callback = function(value, key, object) {
      strictEqual(key, {1: 'a', 2: 'b', 3: 'c'}[value]);
      strictEqual(object, data);
      return value !== this.value;
    };
    result = _.pick(data, callback, {value: 2});
    deepEqual(result, {a: 1, c: 3}, 'can accept a predicate and context');

    var Obj = function(){};
    Obj.prototype = {a: 1, b: 2, c: 3};
    var instance = new Obj();
    deepEqual(_.pick(instance, 'a', 'c'), {a: 1, c: 3}, 'include prototype props');

    deepEqual(_.pick(data, function(val, key) {
      return this[key] === 3 && this === instance;
    }, instance), {c: 3}, 'function is given context');

    ok(!_.has(_.pick({}, 'foo'), 'foo'), 'does not set own property if property not in object');
    _.pick(data, function(value, key, obj) {
      equal(obj, data, 'passes same object as third parameter of iteratee');
    });
  });

  test('omit', function() {
    var result;
    result = _.omit({a: 1, b: 2, c: 3}, 'b');
    deepEqual(result, {a: 1, c: 3}, 'can omit a single named property');
    result = _.omit({a: 1, b: 2, c: 3}, 'a', 'c');
    deepEqual(result, {b: 2}, 'can omit several named properties');
    result = _.omit({a: 1, b: 2, c: 3}, ['b', 'c']);
    deepEqual(result, {a: 1}, 'can omit properties named in an array');
    result = _.omit(['a', 'b'], 0);
    deepEqual(result, {1: 'b'}, 'can omit numeric properties');

    deepEqual(_.omit(null, 'a', 'b'), {}, 'non objects return empty object');
    deepEqual(_.omit(undefined, 'toString'), {}, 'null/undefined return empty object');
    deepEqual(_.omit(5, 'toString', 'b'), {}, 'returns empty object for primitives');

    var data = {a: 1, b: 2, c: 3};
    var callback = function(value, key, object) {
      strictEqual(key, {1: 'a', 2: 'b', 3: 'c'}[value]);
      strictEqual(object, data);
      return value !== this.value;
    };
    result = _.omit(data, callback, {value: 2});
    deepEqual(result, {b: 2}, 'can accept a predicate');

    var Obj = function(){};
    Obj.prototype = {a: 1, b: 2, c: 3};
    var instance = new Obj();
    deepEqual(_.omit(instance, 'b'), {a: 1, c: 3}, 'include prototype props');

    deepEqual(_.omit(data, function(val, key) {
      return this[key] === 3 && this === instance;
    }, instance), {a: 1, b: 2}, 'function is given context');
  });

  test('defaults', function() {
    var options = {zero: 0, one: 1, empty: '', nan: NaN, nothing: null};

    _.defaults(options, {zero: 1, one: 10, twenty: 20, nothing: 'str'});
    equal(options.zero, 0, 'value exists');
    equal(options.one, 1, 'value exists');
    equal(options.twenty, 20, 'default applied');
    equal(options.nothing, null, "null isn't overridden");

    _.defaults(options, {empty: 'full'}, {nan: 'nan'}, {word: 'word'}, {word: 'dog'});
    equal(options.empty, '', 'value exists');
    ok(_.isNaN(options.nan), "NaN isn't overridden");
    equal(options.word, 'word', 'new value is added, first one wins');

    try {
      options = {};
      _.defaults(options, null, undefined, {a: 1});
    } catch(ex) {}

    equal(options.a, 1, 'should not error on `null` or `undefined` sources');

    strictEqual(_.defaults(null, {a: 1}), null, 'result is null if destination is null');
    strictEqual(_.defaults(undefined, {a: 1}), undefined, 'result is undefined if destination is undefined');
  });

  test('clone', function() {
    var moe = {name : 'moe', lucky : [13, 27, 34]};
    var clone = _.clone(moe);
    equal(clone.name, 'moe', 'the clone as the attributes of the original');

    clone.name = 'curly';
    ok(clone.name === 'curly' && moe.name === 'moe', 'clones can change shallow attributes without affecting the original');

    clone.lucky.push(101);
    equal(_.last(moe.lucky), 101, 'changes to deep attributes are shared with the original');

    equal(_.clone(undefined), void 0, 'non objects should not be changed by clone');
    equal(_.clone(1), 1, 'non objects should not be changed by clone');
    equal(_.clone(null), null, 'non objects should not be changed by clone');
  });

  test('create', function() {
    var Parent = function() {};
    Parent.prototype = {foo: function() {}, bar: 2};

    _.each(['foo', null, undefined, 1], function(val) {
      deepEqual(_.create(val), {}, 'should return empty object when a non-object is provided');
    });

    ok(_.create([]) instanceof Array, 'should return new instance of array when array is provided');

    var Child = function() {};
    Child.prototype = _.create(Parent.prototype);
    ok(new Child instanceof Parent, 'object should inherit prototype');

    var func = function() {};
    Child.prototype = _.create(Parent.prototype, {func: func});
    strictEqual(Child.prototype.func, func, 'properties should be added to object');

    Child.prototype = _.create(Parent.prototype, {constructor: Child});
    strictEqual(Child.prototype.constructor, Child);

    Child.prototype.foo = 'foo';
    var created = _.create(Child.prototype, new Child);
    ok(!created.hasOwnProperty('foo'), 'should only add own properties');
  });

  test('isEqual', function() {
    function First() {
      this.value = 1;
    }
    First.prototype.value = 1;
    function Second() {
      this.value = 1;
    }
    Second.prototype.value = 2;

    // Basic equality and identity comparisons.
    ok(_.isEqual(null, null), '`null` is equal to `null`');
    ok(_.isEqual(), '`undefined` is equal to `undefined`');

    ok(!_.isEqual(0, -0), '`0` is not equal to `-0`');
    ok(!_.isEqual(-0, 0), 'Commutative equality is implemented for `0` and `-0`');
    ok(!_.isEqual(null, undefined), '`null` is not equal to `undefined`');
    ok(!_.isEqual(undefined, null), 'Commutative equality is implemented for `null` and `undefined`');

    // String object and primitive comparisons.
    ok(_.isEqual('Curly', 'Curly'), 'Identical string primitives are equal');
    ok(_.isEqual(new String('Curly'), new String('Curly')), 'String objects with identical primitive values are equal');
    ok(_.isEqual(new String('Curly'), 'Curly'), 'String primitives and their corresponding object wrappers are equal');
    ok(_.isEqual('Curly', new String('Curly')), 'Commutative equality is implemented for string objects and primitives');

    ok(!_.isEqual('Curly', 'Larry'), 'String primitives with different values are not equal');
    ok(!_.isEqual(new String('Curly'), new String('Larry')), 'String objects with different primitive values are not equal');
    ok(!_.isEqual(new String('Curly'), {toString: function(){ return 'Curly'; }}), 'String objects and objects with a custom `toString` method are not equal');

    // Number object and primitive comparisons.
    ok(_.isEqual(75, 75), 'Identical number primitives are equal');
    ok(_.isEqual(new Number(75), new Number(75)), 'Number objects with identical primitive values are equal');
    ok(_.isEqual(75, new Number(75)), 'Number primitives and their corresponding object wrappers are equal');
    ok(_.isEqual(new Number(75), 75), 'Commutative equality is implemented for number objects and primitives');
    ok(!_.isEqual(new Number(0), -0), '`new Number(0)` and `-0` are not equal');
    ok(!_.isEqual(0, new Number(-0)), 'Commutative equality is implemented for `new Number(0)` and `-0`');

    ok(!_.isEqual(new Number(75), new Number(63)), 'Number objects with different primitive values are not equal');
    ok(!_.isEqual(new Number(63), {valueOf: function(){ return 63; }}), 'Number objects and objects with a `valueOf` method are not equal');

    // Comparisons involving `NaN`.
    ok(_.isEqual(NaN, NaN), '`NaN` is equal to `NaN`');
    ok(_.isEqual(new Object(NaN), NaN), 'Object(`NaN`) is equal to `NaN`');
    ok(!_.isEqual(61, NaN), 'A number primitive is not equal to `NaN`');
    ok(!_.isEqual(new Number(79), NaN), 'A number object is not equal to `NaN`');
    ok(!_.isEqual(Infinity, NaN), '`Infinity` is not equal to `NaN`');

    // Boolean object and primitive comparisons.
    ok(_.isEqual(true, true), 'Identical boolean primitives are equal');
    ok(_.isEqual(new Boolean, new Boolean), 'Boolean objects with identical primitive values are equal');
    ok(_.isEqual(true, new Boolean(true)), 'Boolean primitives and their corresponding object wrappers are equal');
    ok(_.isEqual(new Boolean(true), true), 'Commutative equality is implemented for booleans');
    ok(!_.isEqual(new Boolean(true), new Boolean), 'Boolean objects with different primitive values are not equal');

    // Common type coercions.
    ok(!_.isEqual(new Boolean(false), true), '`new Boolean(false)` is not equal to `true`');
    ok(!_.isEqual('75', 75), 'String and number primitives with like values are not equal');
    ok(!_.isEqual(new Number(63), new String(63)), 'String and number objects with like values are not equal');
    ok(!_.isEqual(75, '75'), 'Commutative equality is implemented for like string and number values');
    ok(!_.isEqual(0, ''), 'Number and string primitives with like values are not equal');
    ok(!_.isEqual(1, true), 'Number and boolean primitives with like values are not equal');
    ok(!_.isEqual(new Boolean(false), new Number(0)), 'Boolean and number objects with like values are not equal');
    ok(!_.isEqual(false, new String('')), 'Boolean primitives and string objects with like values are not equal');
    ok(!_.isEqual(12564504e5, new Date(2009, 9, 25)), 'Dates and their corresponding numeric primitive values are not equal');

    // Dates.
    ok(_.isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25)), 'Date objects referencing identical times are equal');
    ok(!_.isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13)), 'Date objects referencing different times are not equal');
    ok(!_.isEqual(new Date(2009, 11, 13), {
      getTime: function(){
        return 12606876e5;
      }
    }), 'Date objects and objects with a `getTime` method are not equal');
    ok(!_.isEqual(new Date('Curly'), new Date('Curly')), 'Invalid dates are not equal');

    // Functions.
    ok(!_.isEqual(First, Second), 'Different functions with identical bodies and source code representations are not equal');

    // RegExps.
    ok(_.isEqual(/(?:)/gim, /(?:)/gim), 'RegExps with equivalent patterns and flags are equal');
    ok(_.isEqual(/(?:)/gi, /(?:)/ig), 'Flag order is not significant');
    ok(!_.isEqual(/(?:)/g, /(?:)/gi), 'RegExps with equivalent patterns and different flags are not equal');
    ok(!_.isEqual(/Moe/gim, /Curly/gim), 'RegExps with different patterns and equivalent flags are not equal');
    ok(!_.isEqual(/(?:)/gi, /(?:)/g), 'Commutative equality is implemented for RegExps');
    ok(!_.isEqual(/Curly/g, {source: 'Larry', global: true, ignoreCase: false, multiline: false}), 'RegExps and RegExp-like objects are not equal');

    // Empty arrays, array-like objects, and object literals.
    ok(_.isEqual({}, {}), 'Empty object literals are equal');
    ok(_.isEqual([], []), 'Empty array literals are equal');
    ok(_.isEqual([{}], [{}]), 'Empty nested arrays and objects are equal');
    ok(!_.isEqual({length: 0}, []), 'Array-like objects and arrays are not equal.');
    ok(!_.isEqual([], {length: 0}), 'Commutative equality is implemented for array-like objects');

    ok(!_.isEqual({}, []), 'Object literals and array literals are not equal');
    ok(!_.isEqual([], {}), 'Commutative equality is implemented for objects and arrays');

    // Arrays with primitive and object values.
    ok(_.isEqual([1, 'Larry', true], [1, 'Larry', true]), 'Arrays containing identical primitives are equal');
    ok(_.isEqual([/Moe/g, new Date(2009, 9, 25)], [/Moe/g, new Date(2009, 9, 25)]), 'Arrays containing equivalent elements are equal');

    // Multi-dimensional arrays.
    var a = [new Number(47), false, 'Larry', /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
    var b = [new Number(47), false, 'Larry', /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
    ok(_.isEqual(a, b), 'Arrays containing nested arrays and objects are recursively compared');

    // Overwrite the methods defined in ES 5.1 section 15.4.4.
    a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
    b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

    // Array elements and properties.
    ok(_.isEqual(a, b), 'Arrays containing equivalent elements and different non-numeric properties are equal');
    a.push('White Rocks');
    ok(!_.isEqual(a, b), 'Arrays of different lengths are not equal');
    a.push('East Boulder');
    b.push('Gunbarrel Ranch', 'Teller Farm');
    ok(!_.isEqual(a, b), 'Arrays of identical lengths containing different elements are not equal');

    // Sparse arrays.
    ok(_.isEqual(Array(3), Array(3)), 'Sparse arrays of identical lengths are equal');
    ok(!_.isEqual(Array(3), Array(6)), 'Sparse arrays of different lengths are not equal when both are empty');

    var sparse = [];
    sparse[1] = 5;
    ok(_.isEqual(sparse, [undefined, 5]), 'Handles sparse arrays as dense');

    // Simple objects.
    ok(_.isEqual({a: 'Curly', b: 1, c: true}, {a: 'Curly', b: 1, c: true}), 'Objects containing identical primitives are equal');
    ok(_.isEqual({a: /Curly/g, b: new Date(2009, 11, 13)}, {a: /Curly/g, b: new Date(2009, 11, 13)}), 'Objects containing equivalent members are equal');
    ok(!_.isEqual({a: 63, b: 75}, {a: 61, b: 55}), 'Objects of identical sizes with different values are not equal');
    ok(!_.isEqual({a: 63, b: 75}, {a: 61, c: 55}), 'Objects of identical sizes with different property names are not equal');
    ok(!_.isEqual({a: 1, b: 2}, {a: 1}), 'Objects of different sizes are not equal');
    ok(!_.isEqual({a: 1}, {a: 1, b: 2}), 'Commutative equality is implemented for objects');
    ok(!_.isEqual({x: 1, y: undefined}, {x: 1, z: 2}), 'Objects with identical keys and different values are not equivalent');

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
    ok(_.isEqual(a, b), 'Objects with nested equivalent members are recursively compared');

    // Instances.
    ok(_.isEqual(new First, new First), 'Object instances are equal');
    ok(!_.isEqual(new First, new Second), 'Objects with different constructors and identical own properties are not equal');
    ok(!_.isEqual({value: 1}, new First), 'Object instances and objects sharing equivalent properties are not equal');
    ok(!_.isEqual({value: 2}, new Second), 'The prototype chain of objects should not be examined');

    // Circular Arrays.
    (a = []).push(a);
    (b = []).push(b);
    ok(_.isEqual(a, b), 'Arrays containing circular references are equal');
    a.push(new String('Larry'));
    b.push(new String('Larry'));
    ok(_.isEqual(a, b), 'Arrays containing circular references and equivalent properties are equal');
    a.push('Shemp');
    b.push('Curly');
    ok(!_.isEqual(a, b), 'Arrays containing circular references and different properties are not equal');

    // More circular arrays #767.
    a = ['everything is checked but', 'this', 'is not'];
    a[1] = a;
    b = ['everything is checked but', ['this', 'array'], 'is not'];
    ok(!_.isEqual(a, b), 'Comparison of circular references with non-circular references are not equal');

    // Circular Objects.
    a = {abc: null};
    b = {abc: null};
    a.abc = a;
    b.abc = b;
    ok(_.isEqual(a, b), 'Objects containing circular references are equal');
    a.def = 75;
    b.def = 75;
    ok(_.isEqual(a, b), 'Objects containing circular references and equivalent properties are equal');
    a.def = new Number(75);
    b.def = new Number(63);
    ok(!_.isEqual(a, b), 'Objects containing circular references and different properties are not equal');

    // More circular objects #767.
    a = {everything: 'is checked', but: 'this', is: 'not'};
    a.but = a;
    b = {everything: 'is checked', but: {that: 'object'}, is: 'not'};
    ok(!_.isEqual(a, b), 'Comparison of circular references with non-circular object references are not equal');

    // Cyclic Structures.
    a = [{abc: null}];
    b = [{abc: null}];
    (a[0].abc = a).push(a);
    (b[0].abc = b).push(b);
    ok(_.isEqual(a, b), 'Cyclic structures are equal');
    a[0].def = 'Larry';
    b[0].def = 'Larry';
    ok(_.isEqual(a, b), 'Cyclic structures containing equivalent properties are equal');
    a[0].def = new String('Larry');
    b[0].def = new String('Curly');
    ok(!_.isEqual(a, b), 'Cyclic structures containing different properties are not equal');

    // Complex Circular References.
    a = {foo: {b: {foo: {c: {foo: null}}}}};
    b = {foo: {b: {foo: {c: {foo: null}}}}};
    a.foo.b.foo.c.foo = a;
    b.foo.b.foo.c.foo = b;
    ok(_.isEqual(a, b), 'Cyclic structures with nested and identically-named properties are equal');

    // Chaining.
    ok(!_.isEqual(_({x: 1, y: undefined}).chain(), _({x: 1, z: 2}).chain()), 'Chained objects containing different values are not equal');

    a = _({x: 1, y: 2}).chain();
    b = _({x: 1, y: 2}).chain();
    equal(_.isEqual(a.isEqual(b), _(true)), true, '`isEqual` can be chained');

    // Objects without a `constructor` property
    if (Object.create) {
        a = Object.create(null, {x: {value: 1, enumerable: true}});
        b = {x: 1};
        ok(_.isEqual(a, b), 'Handles objects without a constructor (e.g. from Object.create');
    }

    function Foo() { this.a = 1; }
    Foo.prototype.constructor = null;

    var other = {a: 1};
    strictEqual(_.isEqual(new Foo, other), false, 'Objects from different constructors are not equal');
  });

  test('isEmpty', function() {
    ok(!_([1]).isEmpty(), '[1] is not empty');
    ok(_.isEmpty([]), '[] is empty');
    ok(!_.isEmpty({one : 1}), '{one : 1} is not empty');
    ok(_.isEmpty({}), '{} is empty');
    ok(_.isEmpty(new RegExp('')), 'objects with prototype properties are empty');
    ok(_.isEmpty(null), 'null is empty');
    ok(_.isEmpty(), 'undefined is empty');
    ok(_.isEmpty(''), 'the empty string is empty');
    ok(!_.isEmpty('moe'), 'but other strings are not');

    var obj = {one : 1};
    delete obj.one;
    ok(_.isEmpty(obj), 'deleting all the keys from an object empties it');

    var args = function(){ return arguments; };
    ok(_.isEmpty(args()), 'empty arguments object is empty');
    ok(!_.isEmpty(args('')), 'non-empty arguments object is not empty');

    // covers collecting non-enumerable properties in IE < 9
    var nonEnumProp = {'toString': 5};
    ok(!_.isEmpty(nonEnumProp), 'non-enumerable property is not empty');
  });

  if (typeof document === 'object') {
    test('isElement', function() {
      ok(!_.isElement('div'), 'strings are not dom elements');
      ok(_.isElement(testElement), 'an element is a DOM element');
    });
  }

  test('isArguments', function() {
    var args = (function(){ return arguments; }(1, 2, 3));
    ok(!_.isArguments('string'), 'a string is not an arguments object');
    ok(!_.isArguments(_.isArguments), 'a function is not an arguments object');
    ok(_.isArguments(args), 'but the arguments object is an arguments object');
    ok(!_.isArguments(_.toArray(args)), 'but not when it\'s converted into an array');
    ok(!_.isArguments([1, 2, 3]), 'and not vanilla arrays.');
  });

  test('isObject', function() {
    ok(_.isObject(arguments), 'the arguments object is object');
    ok(_.isObject([1, 2, 3]), 'and arrays');
    if (testElement) {
      ok(_.isObject(testElement), 'and DOM element');
    }
    ok(_.isObject(function () {}), 'and functions');
    ok(!_.isObject(null), 'but not null');
    ok(!_.isObject(undefined), 'and not undefined');
    ok(!_.isObject('string'), 'and not string');
    ok(!_.isObject(12), 'and not number');
    ok(!_.isObject(true), 'and not boolean');
    ok(_.isObject(new String('string')), 'but new String()');
  });

  test('isArray', function() {
    ok(!_.isArray(undefined), 'undefined vars are not arrays');
    ok(!_.isArray(arguments), 'the arguments object is not an array');
    ok(_.isArray([1, 2, 3]), 'but arrays are');
  });

  test('isString', function() {
    var obj = new String('I am a string object');
    if (testElement) {
      ok(!_.isString(testElement), 'an element is not a string');
    }
    ok(_.isString([1, 2, 3].join(', ')), 'but strings are');
    strictEqual(_.isString('I am a string literal'), true, 'string literals are');
    ok(_.isString(obj), 'so are String objects');
    strictEqual(_.isString(1), false);
  });

  test('isNumber', function() {
    ok(!_.isNumber('string'), 'a string is not a number');
    ok(!_.isNumber(arguments), 'the arguments object is not a number');
    ok(!_.isNumber(undefined), 'undefined is not a number');
    ok(_.isNumber(3 * 4 - 7 / 10), 'but numbers are');
    ok(_.isNumber(NaN), 'NaN *is* a number');
    ok(_.isNumber(Infinity), 'Infinity is a number');
    ok(!_.isNumber('1'), 'numeric strings are not numbers');
  });

  test('isBoolean', function() {
    ok(!_.isBoolean(2), 'a number is not a boolean');
    ok(!_.isBoolean('string'), 'a string is not a boolean');
    ok(!_.isBoolean('false'), 'the string "false" is not a boolean');
    ok(!_.isBoolean('true'), 'the string "true" is not a boolean');
    ok(!_.isBoolean(arguments), 'the arguments object is not a boolean');
    ok(!_.isBoolean(undefined), 'undefined is not a boolean');
    ok(!_.isBoolean(NaN), 'NaN is not a boolean');
    ok(!_.isBoolean(null), 'null is not a boolean');
    ok(_.isBoolean(true), 'but true is');
    ok(_.isBoolean(false), 'and so is false');
  });

  test('isFunction', function() {
    ok(!_.isFunction(undefined), 'undefined vars are not functions');
    ok(!_.isFunction([1, 2, 3]), 'arrays are not functions');
    ok(!_.isFunction('moe'), 'strings are not functions');
    ok(_.isFunction(_.isFunction), 'but functions are');
    ok(_.isFunction(function(){}), 'even anonymous ones');

    if (testElement) {
      ok(!_.isFunction(testElement), 'elements are not functions');
    }
  });

  if (typeof Int8Array !== 'undefined') {
    test('#1929 Typed Array constructors are functions', function() {
      _.chain(['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array'])
      .map(_.propertyOf(typeof GLOBAL != 'undefined' ? GLOBAL : window))
      .compact()
      .each(function(TypedArray) {
          // PhantomJS reports `typeof UInt8Array == 'object'` and doesn't report toString TypeArray
          // as a function
          strictEqual(_.isFunction(TypedArray), Object.prototype.toString.call(TypedArray) === '[object Function]');
      });
    });
  }

  test('isDate', function() {
    ok(!_.isDate(100), 'numbers are not dates');
    ok(!_.isDate({}), 'objects are not dates');
    ok(_.isDate(new Date()), 'but dates are');
  });

  test('isRegExp', function() {
    ok(!_.isRegExp(_.identity), 'functions are not RegExps');
    ok(_.isRegExp(/identity/), 'but RegExps are');
  });

  test('isFinite', function() {
    ok(!_.isFinite(undefined), 'undefined is not finite');
    ok(!_.isFinite(null), 'null is not finite');
    ok(!_.isFinite(NaN), 'NaN is not finite');
    ok(!_.isFinite(Infinity), 'Infinity is not finite');
    ok(!_.isFinite(-Infinity), '-Infinity is not finite');
    ok(_.isFinite('12'), 'Numeric strings are numbers');
    ok(!_.isFinite('1a'), 'Non numeric strings are not numbers');
    ok(!_.isFinite(''), 'Empty strings are not numbers');
    var obj = new Number(5);
    ok(_.isFinite(obj), 'Number instances can be finite');
    ok(_.isFinite(0), '0 is finite');
    ok(_.isFinite(123), 'Ints are finite');
    ok(_.isFinite(-12.44), 'Floats are finite');
  });

  test('isNaN', function() {
    ok(!_.isNaN(undefined), 'undefined is not NaN');
    ok(!_.isNaN(null), 'null is not NaN');
    ok(!_.isNaN(0), '0 is not NaN');
    ok(_.isNaN(NaN), 'but NaN is');
    ok(_.isNaN(new Number(NaN)), 'wrapped NaN is still NaN');
  });

  test('isNull', function() {
    ok(!_.isNull(undefined), 'undefined is not null');
    ok(!_.isNull(NaN), 'NaN is not null');
    ok(_.isNull(null), 'but null is');
  });

  test('isUndefined', function() {
    ok(!_.isUndefined(1), 'numbers are defined');
    ok(!_.isUndefined(null), 'null is defined');
    ok(!_.isUndefined(false), 'false is defined');
    ok(!_.isUndefined(NaN), 'NaN is defined');
    ok(_.isUndefined(), 'nothing is undefined');
    ok(_.isUndefined(undefined), 'undefined is undefined');
  });

  test('isError', function() {
    ok(!_.isError(1), 'numbers are not Errors');
    ok(!_.isError(null), 'null is not an Error');
    ok(!_.isError(Error), 'functions are not Errors');
    ok(_.isError(new Error()), 'Errors are Errors');
    ok(_.isError(new EvalError()), 'EvalErrors are Errors');
    ok(_.isError(new RangeError()), 'RangeErrors are Errors');
    ok(_.isError(new ReferenceError()), 'ReferenceErrors are Errors');
    ok(_.isError(new SyntaxError()), 'SyntaxErrors are Errors');
    ok(_.isError(new TypeError()), 'TypeErrors are Errors');
    ok(_.isError(new URIError()), 'URIErrors are Errors');
  });

  test('tap', function() {
    var intercepted = null;
    var interceptor = function(obj) { intercepted = obj; };
    var returned = _.tap(1, interceptor);
    equal(intercepted, 1, 'passes tapped object to interceptor');
    equal(returned, 1, 'returns tapped object');

    returned = _([1, 2, 3]).chain().
      map(function(n){ return n * 2; }).
      max().
      tap(interceptor).
      value();
    equal(returned, 6, 'can use tapped objects in a chain');
    equal(intercepted, returned, 'can use tapped objects in a chain');
  });

  test('has', function () {
    var obj = {foo: 'bar', func: function(){}};
    ok(_.has(obj, 'foo'), 'has() checks that the object has a property.');
    ok(!_.has(obj, 'baz'), "has() returns false if the object doesn't have the property.");
    ok(_.has(obj, 'func'), 'has() works for functions too.');
    obj.hasOwnProperty = null;
    ok(_.has(obj, 'foo'), 'has() works even when the hasOwnProperty method is deleted.');
    var child = {};
    child.prototype = obj;
    ok(!_.has(child, 'foo'), 'has() does not check the prototype chain for a property.');
    strictEqual(_.has(null, 'foo'), false, 'has() returns false for null');
    strictEqual(_.has(undefined, 'foo'), false, 'has() returns false for undefined');
  });

  test('isMatch', function() {
    var moe = {name: 'Moe Howard', hair: true};
    var curly = {name: 'Curly Howard', hair: false};

    equal(_.isMatch(moe, {hair: true}), true, 'Returns a boolean');
    equal(_.isMatch(curly, {hair: true}), false, 'Returns a boolean');

    equal(_.isMatch(5, {__x__: undefined}), false, 'can match undefined props on primitives');
    equal(_.isMatch({__x__: undefined}, {__x__: undefined}), true, 'can match undefined props');

    equal(_.isMatch(null, {}), true, 'Empty spec called with null object returns true');
    equal(_.isMatch(null, {a: 1}), false, 'Non-empty spec called with null object returns false');

    _.each([null, undefined], function(item) { strictEqual(_.isMatch(item, null), true, 'null matches null'); });
    _.each([null, undefined], function(item) { strictEqual(_.isMatch(item, null), true, 'null matches {}'); });
    strictEqual(_.isMatch({b: 1}, {a: undefined}), false, 'handles undefined values (1683)');

    _.each([true, 5, NaN, null, undefined], function(item) {
      strictEqual(_.isMatch({a: 1}, item), true, 'treats primitives as empty');
    });

    function Prototest() {}
    Prototest.prototype.x = 1;
    var specObj = new Prototest;
    equal(_.isMatch({x: 2}, specObj), true, 'spec is restricted to own properties');

    specObj.y = 5;
    equal(_.isMatch({x: 1, y: 5}, specObj), true);
    equal(_.isMatch({x: 1, y: 4}, specObj), false);

    ok(_.isMatch(specObj, {x: 1, y: 5}), 'inherited and own properties are checked on the test object');

    Prototest.x = 5;
    ok(_.isMatch({x: 5, y: 1}, Prototest), 'spec can be a function');

    //null edge cases
    var oCon = {'constructor': Object};
    deepEqual(_.map([null, undefined, 5, {}], _.partial(_.isMatch, _, oCon)), [false, false, false, true], 'doesnt falsey match constructor on undefined/null');
  });

  test('matcher', function() {
    var moe = {name: 'Moe Howard', hair: true};
    var curly = {name: 'Curly Howard', hair: false};
    var stooges = [moe, curly];

    equal(_.matcher({hair: true})(moe), true, 'Returns a boolean');
    equal(_.matcher({hair: true})(curly), false, 'Returns a boolean');

    equal(_.matcher({__x__: undefined})(5), false, 'can match undefined props on primitives');
    equal(_.matcher({__x__: undefined})({__x__: undefined}), true, 'can match undefined props');

    equal(_.matcher({})(null), true, 'Empty spec called with null object returns true');
    equal(_.matcher({a: 1})(null), false, 'Non-empty spec called with null object returns false');

    ok(_.find(stooges, _.matcher({hair: false})) === curly, 'returns a predicate that can be used by finding functions.');
    ok(_.find(stooges, _.matcher(moe)) === moe, 'can be used to locate an object exists in a collection.');
    deepEqual(_.where([null, undefined], {a: 1}), [], 'Do not throw on null values.');

    deepEqual(_.where([null, undefined], null), [null, undefined], 'null matches null');
    deepEqual(_.where([null, undefined], {}), [null, undefined], 'null matches {}');
    deepEqual(_.where([{b: 1}], {a: undefined}), [], 'handles undefined values (1683)');

    _.each([true, 5, NaN, null, undefined], function(item) {
      deepEqual(_.where([{a: 1}], item), [{a: 1}], 'treats primitives as empty');
    });

    function Prototest() {}
    Prototest.prototype.x = 1;
    var specObj = new Prototest;
    var protospec = _.matcher(specObj);
    equal(protospec({x: 2}), true, 'spec is restricted to own properties');

    specObj.y = 5;
    protospec = _.matcher(specObj);
    equal(protospec({x: 1, y: 5}), true);
    equal(protospec({x: 1, y: 4}), false);

    ok(_.matcher({x: 1, y: 5})(specObj), 'inherited and own properties are checked on the test object');

    Prototest.x = 5;
    ok(_.matcher(Prototest)({x: 5, y: 1}), 'spec can be a function');

    // #1729
    var o = {'b': 1};
    var m = _.matcher(o);

    equal(m({'b': 1}), true);
    o.b = 2;
    o.a = 1;
    equal(m({'b': 1}), true, 'changing spec object doesnt change matches result');


    //null edge cases
    var oCon = _.matcher({'constructor': Object});
    deepEqual(_.map([null, undefined, 5, {}], oCon), [false, false, false, true], 'doesnt falsey match constructor on undefined/null');
  });

  test('matcher', function() {
    var moe = {name: 'Moe Howard', hair: true};
    var curly = {name: 'Curly Howard', hair: false};
    var stooges = [moe, curly];

    equal(_.matcher({hair: true})(moe), true, 'Returns a boolean');
    equal(_.matcher({hair: true})(curly), false, 'Returns a boolean');

    equal(_.matcher({__x__: undefined})(5), false, 'can match undefined props on primitives');
    equal(_.matcher({__x__: undefined})({__x__: undefined}), true, 'can match undefined props');

    equal(_.matcher({})(null), true, 'Empty spec called with null object returns true');
    equal(_.matcher({a: 1})(null), false, 'Non-empty spec called with null object returns false');

    ok(_.find(stooges, _.matcher({hair: false})) === curly, 'returns a predicate that can be used by finding functions.');
    ok(_.find(stooges, _.matcher(moe)) === moe, 'can be used to locate an object exists in a collection.');
    deepEqual(_.where([null, undefined], {a: 1}), [], 'Do not throw on null values.');

    deepEqual(_.where([null, undefined], null), [null, undefined], 'null matches null');
    deepEqual(_.where([null, undefined], {}), [null, undefined], 'null matches {}');
    deepEqual(_.where([{b: 1}], {a: undefined}), [], 'handles undefined values (1683)');

    _.each([true, 5, NaN, null, undefined], function(item) {
      deepEqual(_.where([{a: 1}], item), [{a: 1}], 'treats primitives as empty');
    });

    function Prototest() {}
    Prototest.prototype.x = 1;
    var specObj = new Prototest;
    var protospec = _.matcher(specObj);
    equal(protospec({x: 2}), true, 'spec is restricted to own properties');

    specObj.y = 5;
    protospec = _.matcher(specObj);
    equal(protospec({x: 1, y: 5}), true);
    equal(protospec({x: 1, y: 4}), false);

    ok(_.matcher({x: 1, y: 5})(specObj), 'inherited and own properties are checked on the test object');

    Prototest.x = 5;
    ok(_.matcher(Prototest)({x: 5, y: 1}), 'spec can be a function');

    // #1729
    var o = {'b': 1};
    var m = _.matcher(o);

    equal(m({'b': 1}), true);
    o.b = 2;
    o.a = 1;
    equal(m({'b': 1}), true, 'changing spec object doesnt change matches result');


    //null edge cases
    var oCon = _.matcher({'constructor': Object});
    deepEqual(_.map([null, undefined, 5, {}], oCon), [false, false, false, true], 'doesnt falsey match constructor on undefined/null');
  });

  test('findKey', function() {
    var objects = {
      a: {'a': 0, 'b': 0},
      b: {'a': 1, 'b': 1},
      c: {'a': 2, 'b': 2}
    };

    equal(_.findKey(objects, function(obj) {
      return obj.a === 0;
    }), 'a');

    equal(_.findKey(objects, function(obj) {
      return obj.b * obj.a === 4;
    }), 'c');

    equal(_.findKey(objects, 'a'), 'b', 'Uses lookupIterator');

    equal(_.findKey(objects, function(obj) {
      return obj.b * obj.a === 5;
    }), undefined);

    strictEqual(_.findKey([1, 2, 3, 4, 5, 6], function(obj) {
      return obj === 3;
    }), '2', 'Keys are strings');

    strictEqual(_.findKey(objects, function(a) {
      return a.foo === null;
    }), undefined);

    _.findKey({a: {a: 1}}, function(a, key, obj) {
      equal(key, 'a');
      deepEqual(obj, {a: {a: 1}});
      strictEqual(this, objects, 'called with context');
    }, objects);

    var array = [1, 2, 3, 4];
    array.match = 55;
    strictEqual(_.findKey(array, function(x) { return x === 55; }), 'match', 'matches array-likes keys');
  });


  test('mapObject', function() {
   var obj = {'a': 1, 'b': 2};
   var objects = {
      a: {'a': 0, 'b': 0},
      b: {'a': 1, 'b': 1},
      c: {'a': 2, 'b': 2}
    };

    deepEqual(_.mapObject(obj, function(val) {
      return val * 2;
    }), {'a': 2, 'b': 4}, 'simple objects');

    deepEqual(_.mapObject(objects, function(val) {
      return _.reduce(val, function(memo,v){
       return memo + v;
      },0);
    }), {'a': 0, 'b': 2, 'c': 4}, 'nested objects');

    deepEqual(_.mapObject(obj, function(val,key,obj) {
      return obj[key] * 2;
    }), {'a': 2, 'b': 4}, 'correct keys');

    deepEqual(_.mapObject([1,2], function(val) {
      return val * 2;
    }), {'0': 2, '1': 4}, 'check behavior for arrays');

    deepEqual(_.mapObject(obj, function(val) {
      return val * this.multiplier;
    }, {multiplier : 3}), {'a': 3, 'b': 6}, 'keep context');

    deepEqual(_.mapObject({a: 1}, function() {
      return this.length;
    }, [1,2]), {'a': 2}, 'called with context');

    var ids = _.mapObject({length: 2, 0: {id: '1'}, 1: {id: '2'}}, function(n){
      return n.id;
    });
    deepEqual(ids, {'length': undefined, '0': '1', '1': '2'}, 'Check with array-like objects');

    // Passing a property name like _.pluck.
    var people = {'a': {name : 'moe', age : 30}, 'b': {name : 'curly', age : 50}};
    deepEqual(_.mapObject(people, 'name'), {'a': 'moe', 'b': 'curly'}, 'predicate string map to object properties');

    _.each([null, void 0, 1, 'abc', [], {}, undefined], function(val){
      deepEqual(_.mapObject(val, _.identity), {}, 'mapValue identity');
    });

    var Proto = function(){this.a = 1;};
    Proto.prototype.b = 1;
    var protoObj = new Proto();
    deepEqual(_.mapObject(protoObj, _.identity), {a: 1}, 'ignore inherited values from prototypes');

  });
}());
