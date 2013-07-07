$(document).ready(function() {

  module("Objects");

  test("keys", function() {
    equal(_.keys({one : 1, two : 2}).join(', '), 'one, two', 'can extract the keys from an object');
    // the test above is not safe because it relies on for-in enumeration order
    var a = []; a[1] = 0;
    equal(_.keys(a).join(', '), '1', 'is not fooled by sparse arrays; see issue #95');
    raises(function() { _.keys(null); }, TypeError, 'throws an error for `null` values');
    raises(function() { _.keys(void 0); }, TypeError, 'throws an error for `undefined` values');
    raises(function() { _.keys(1); }, TypeError, 'throws an error for number primitives');
    raises(function() { _.keys('a'); }, TypeError, 'throws an error for string primitives');
    raises(function() { _.keys(true); }, TypeError, 'throws an error for boolean primitives');
  });

  test("values", function() {
    equal(_.values({one: 1, two: 2}).join(', '), '1, 2', 'can extract the values from an object');
    equal(_.values({one: 1, two: 2, length: 3}).join(', '), '1, 2, 3', '... even when one of them is "length"');
  });

  test("pairs", function() {
    deepEqual(_.pairs({one: 1, two: 2}), [['one', 1], ['two', 2]], 'can convert an object into pairs');
    deepEqual(_.pairs({one: 1, two: 2, length: 3}), [['one', 1], ['two', 2], ['length', 3]], '... even when one of them is "length"');
  });

  test("invert", function() {
    var obj = {first: 'Moe', second: 'Larry', third: 'Curly'};
    equal(_.keys(_.invert(obj)).join(' '), 'Moe Larry Curly', 'can invert an object');
    ok(_.isEqual(_.invert(_.invert(obj)), obj), 'two inverts gets you back where you started');

    var obj = {length: 3};
    ok(_.invert(obj)['3'] == 'length', 'can invert an object with "length"')
  });

  test("functions", function() {
    var obj = {a : 'dash', b : _.map, c : (/yo/), d : _.reduce};
    ok(_.isEqual(['b', 'd'], _.functions(obj)), 'can grab the function names of any passed-in object');

    var Animal = function(){};
    Animal.prototype.run = function(){};
    equal(_.functions(new Animal).join(''), 'run', 'also looks up functions on the prototype');
  });

  test("extend", function() {
    var result;
    equal(_.extend({}, {a:'b'}).a, 'b', 'can extend an object with the attributes of another');
    equal(_.extend({a:'x'}, {a:'b'}).a, 'b', 'properties in source override destination');
    equal(_.extend({x:'x'}, {a:'b'}).x, 'x', "properties not in source don't get overriden");
    result = _.extend({x:'x'}, {a:'a'}, {b:'b'});
    ok(_.isEqual(result, {x:'x', a:'a', b:'b'}), 'can extend from multiple source objects');
    result = _.extend({x:'x'}, {a:'a', x:2}, {a:'b'});
    ok(_.isEqual(result, {x:2, a:'b'}), 'extending from multiple source objects last property trumps');
    result = _.extend({}, {a: void 0, b: null});
    equal(_.keys(result).join(''), 'ab', 'extend does not copy undefined values');

    try {
      result = {};
      _.extend(result, null, undefined, {a:1});
    } catch(ex) {}

    equal(result.a, 1, 'should not error on `null` or `undefined` sources');
  });

  test("pick", function() {
    var result;
    result = _.pick({a:1, b:2, c:3}, 'a', 'c');
    ok(_.isEqual(result, {a:1, c:3}), 'can restrict properties to those named');
    result = _.pick({a:1, b:2, c:3}, ['b', 'c']);
    ok(_.isEqual(result, {b:2, c:3}), 'can restrict properties to those named in an array');
    result = _.pick({a:1, b:2, c:3}, ['a'], 'b');
    ok(_.isEqual(result, {a:1, b:2}), 'can restrict properties to those named in mixed args');

    var Obj = function(){};
    Obj.prototype = {a: 1, b: 2, c: 3};
    ok(_.isEqual(_.pick(new Obj, 'a', 'c'), {a:1, c: 3}), 'include prototype props');
  });

  test("omit", function() {
    var result;
    result = _.omit({a:1, b:2, c:3}, 'b');
    ok(_.isEqual(result, {a:1, c:3}), 'can omit a single named property');
    result = _.omit({a:1, b:2, c:3}, 'a', 'c');
    ok(_.isEqual(result, {b:2}), 'can omit several named properties');
    result = _.omit({a:1, b:2, c:3}, ['b', 'c']);
    ok(_.isEqual(result, {a:1}), 'can omit properties named in an array');

    var Obj = function(){};
    Obj.prototype = {a: 1, b: 2, c: 3};
    ok(_.isEqual(_.omit(new Obj, 'b'), {a:1, c: 3}), 'include prototype props');
  });

  test("defaults", function() {
    var result;
    var options = {zero: 0, one: 1, empty: "", nan: NaN, nothing: null};

    _.defaults(options, {zero: 1, one: 10, twenty: 20, nothing: 'str'});
    equal(options.zero, 0, 'value exists');
    equal(options.one, 1, 'value exists');
    equal(options.twenty, 20, 'default applied');
    equal(options.nothing, null, "null isn't overridden");

    _.defaults(options, {empty: "full"}, {nan: "nan"}, {word: "word"}, {word: "dog"});
    equal(options.empty, "", 'value exists');
    ok(_.isNaN(options.nan), "NaN isn't overridden");
    equal(options.word, "word", 'new value is added, first one wins');

    try {
      options = {};
      _.defaults(options, null, undefined, {a:1});
    } catch(ex) {}

    equal(options.a, 1, 'should not error on `null` or `undefined` sources');
  });

  test("clone", function() {
    var moe = {name : 'moe', lucky : [13, 27, 34]};
    var clone = _.clone(moe);
    equal(clone.name, 'moe', 'the clone as the attributes of the original');

    clone.name = 'curly';
    ok(clone.name == 'curly' && moe.name == 'moe', 'clones can change shallow attributes without affecting the original');

    clone.lucky.push(101);
    equal(_.last(moe.lucky), 101, 'changes to deep attributes are shared with the original');

    equal(_.clone(undefined), void 0, 'non objects should not be changed by clone');
    equal(_.clone(1), 1, 'non objects should not be changed by clone');
    equal(_.clone(null), null, 'non objects should not be changed by clone');
  });

  test("isEqual", function() {
    function First() {
      this.value = 1;
    }
    First.prototype.value = 1;
    function Second() {
      this.value = 1;
    }
    Second.prototype.value = 2;

    // Basic equality and identity comparisons.
    ok(_.isEqual(null, null), "`null` is equal to `null`");
    ok(_.isEqual(), "`undefined` is equal to `undefined`");

    ok(!_.isEqual(0, -0), "`0` is not equal to `-0`");
    ok(!_.isEqual(-0, 0), "Commutative equality is implemented for `0` and `-0`");
    ok(!_.isEqual(null, undefined), "`null` is not equal to `undefined`");
    ok(!_.isEqual(undefined, null), "Commutative equality is implemented for `null` and `undefined`");

    // String object and primitive comparisons.
    ok(_.isEqual("Curly", "Curly"), "Identical string primitives are equal");
    ok(_.isEqual(new String("Curly"), new String("Curly")), "String objects with identical primitive values are equal");
    ok(_.isEqual(new String("Curly"), "Curly"), "String primitives and their corresponding object wrappers are equal");
    ok(_.isEqual("Curly", new String("Curly")), "Commutative equality is implemented for string objects and primitives");

    ok(!_.isEqual("Curly", "Larry"), "String primitives with different values are not equal");
    ok(!_.isEqual(new String("Curly"), new String("Larry")), "String objects with different primitive values are not equal");
    ok(!_.isEqual(new String("Curly"), {toString: function(){ return "Curly"; }}), "String objects and objects with a custom `toString` method are not equal");

    // Number object and primitive comparisons.
    ok(_.isEqual(75, 75), "Identical number primitives are equal");
    ok(_.isEqual(new Number(75), new Number(75)), "Number objects with identical primitive values are equal");
    ok(_.isEqual(75, new Number(75)), "Number primitives and their corresponding object wrappers are equal");
    ok(_.isEqual(new Number(75), 75), "Commutative equality is implemented for number objects and primitives");
    ok(!_.isEqual(new Number(0), -0), "`new Number(0)` and `-0` are not equal");
    ok(!_.isEqual(0, new Number(-0)), "Commutative equality is implemented for `new Number(0)` and `-0`");

    ok(!_.isEqual(new Number(75), new Number(63)), "Number objects with different primitive values are not equal");
    ok(!_.isEqual(new Number(63), {valueOf: function(){ return 63; }}), "Number objects and objects with a `valueOf` method are not equal");

    // Comparisons involving `NaN`.
    ok(_.isEqual(NaN, NaN), "`NaN` is equal to `NaN`");
    ok(!_.isEqual(61, NaN), "A number primitive is not equal to `NaN`");
    ok(!_.isEqual(new Number(79), NaN), "A number object is not equal to `NaN`");
    ok(!_.isEqual(Infinity, NaN), "`Infinity` is not equal to `NaN`");

    // Boolean object and primitive comparisons.
    ok(_.isEqual(true, true), "Identical boolean primitives are equal");
    ok(_.isEqual(new Boolean, new Boolean), "Boolean objects with identical primitive values are equal");
    ok(_.isEqual(true, new Boolean(true)), "Boolean primitives and their corresponding object wrappers are equal");
    ok(_.isEqual(new Boolean(true), true), "Commutative equality is implemented for booleans");
    ok(!_.isEqual(new Boolean(true), new Boolean), "Boolean objects with different primitive values are not equal");

    // Common type coercions.
    ok(!_.isEqual(true, new Boolean(false)), "Boolean objects are not equal to the boolean primitive `true`");
    ok(!_.isEqual("75", 75), "String and number primitives with like values are not equal");
    ok(!_.isEqual(new Number(63), new String(63)), "String and number objects with like values are not equal");
    ok(!_.isEqual(75, "75"), "Commutative equality is implemented for like string and number values");
    ok(!_.isEqual(0, ""), "Number and string primitives with like values are not equal");
    ok(!_.isEqual(1, true), "Number and boolean primitives with like values are not equal");
    ok(!_.isEqual(new Boolean(false), new Number(0)), "Boolean and number objects with like values are not equal");
    ok(!_.isEqual(false, new String("")), "Boolean primitives and string objects with like values are not equal");
    ok(!_.isEqual(12564504e5, new Date(2009, 9, 25)), "Dates and their corresponding numeric primitive values are not equal");

    // Dates.
    ok(_.isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25)), "Date objects referencing identical times are equal");
    ok(!_.isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13)), "Date objects referencing different times are not equal");
    ok(!_.isEqual(new Date(2009, 11, 13), {
      getTime: function(){
        return 12606876e5;
      }
    }), "Date objects and objects with a `getTime` method are not equal");
    ok(!_.isEqual(new Date("Curly"), new Date("Curly")), "Invalid dates are not equal");

    // Functions.
    ok(!_.isEqual(First, Second), "Different functions with identical bodies and source code representations are not equal");

    // RegExps.
    ok(_.isEqual(/(?:)/gim, /(?:)/gim), "RegExps with equivalent patterns and flags are equal");
    ok(!_.isEqual(/(?:)/g, /(?:)/gi), "RegExps with equivalent patterns and different flags are not equal");
    ok(!_.isEqual(/Moe/gim, /Curly/gim), "RegExps with different patterns and equivalent flags are not equal");
    ok(!_.isEqual(/(?:)/gi, /(?:)/g), "Commutative equality is implemented for RegExps");
    ok(!_.isEqual(/Curly/g, {source: "Larry", global: true, ignoreCase: false, multiline: false}), "RegExps and RegExp-like objects are not equal");

    // Empty arrays, array-like objects, and object literals.
    ok(_.isEqual({}, {}), "Empty object literals are equal");
    ok(_.isEqual([], []), "Empty array literals are equal");
    ok(_.isEqual([{}], [{}]), "Empty nested arrays and objects are equal");
    ok(!_.isEqual({length: 0}, []), "Array-like objects and arrays are not equal.");
    ok(!_.isEqual([], {length: 0}), "Commutative equality is implemented for array-like objects");

    ok(!_.isEqual({}, []), "Object literals and array literals are not equal");
    ok(!_.isEqual([], {}), "Commutative equality is implemented for objects and arrays");

    // Arrays with primitive and object values.
    ok(_.isEqual([1, "Larry", true], [1, "Larry", true]), "Arrays containing identical primitives are equal");
    ok(_.isEqual([(/Moe/g), new Date(2009, 9, 25)], [(/Moe/g), new Date(2009, 9, 25)]), "Arrays containing equivalent elements are equal");

    // Multi-dimensional arrays.
    var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
    var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
    ok(_.isEqual(a, b), "Arrays containing nested arrays and objects are recursively compared");

    // Overwrite the methods defined in ES 5.1 section 15.4.4.
    a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
    b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

    // Array elements and properties.
    ok(_.isEqual(a, b), "Arrays containing equivalent elements and different non-numeric properties are equal");
    a.push("White Rocks");
    ok(!_.isEqual(a, b), "Arrays of different lengths are not equal");
    a.push("East Boulder");
    b.push("Gunbarrel Ranch", "Teller Farm");
    ok(!_.isEqual(a, b), "Arrays of identical lengths containing different elements are not equal");

    // Sparse arrays.
    ok(_.isEqual(Array(3), Array(3)), "Sparse arrays of identical lengths are equal");
    ok(!_.isEqual(Array(3), Array(6)), "Sparse arrays of different lengths are not equal when both are empty");

    // Simple objects.
    ok(_.isEqual({a: "Curly", b: 1, c: true}, {a: "Curly", b: 1, c: true}), "Objects containing identical primitives are equal");
    ok(_.isEqual({a: /Curly/g, b: new Date(2009, 11, 13)}, {a: /Curly/g, b: new Date(2009, 11, 13)}), "Objects containing equivalent members are equal");
    ok(!_.isEqual({a: 63, b: 75}, {a: 61, b: 55}), "Objects of identical sizes with different values are not equal");
    ok(!_.isEqual({a: 63, b: 75}, {a: 61, c: 55}), "Objects of identical sizes with different property names are not equal");
    ok(!_.isEqual({a: 1, b: 2}, {a: 1}), "Objects of different sizes are not equal");
    ok(!_.isEqual({a: 1}, {a: 1, b: 2}), "Commutative equality is implemented for objects");
    ok(!_.isEqual({x: 1, y: undefined}, {x: 1, z: 2}), "Objects with identical keys and different values are not equivalent");

    // `A` contains nested objects and arrays.
    a = {
      name: new String("Moe Howard"),
      age: new Number(77),
      stooge: true,
      hobbies: ["acting"],
      film: {
        name: "Sing a Song of Six Pants",
        release: new Date(1947, 9, 30),
        stars: [new String("Larry Fine"), "Shemp Howard"],
        minutes: new Number(16),
        seconds: 54
      }
    };

    // `B` contains equivalent nested objects and arrays.
    b = {
      name: new String("Moe Howard"),
      age: new Number(77),
      stooge: true,
      hobbies: ["acting"],
      film: {
        name: "Sing a Song of Six Pants",
        release: new Date(1947, 9, 30),
        stars: [new String("Larry Fine"), "Shemp Howard"],
        minutes: new Number(16),
        seconds: 54
      }
    };
    ok(_.isEqual(a, b), "Objects with nested equivalent members are recursively compared");

    // Instances.
    ok(_.isEqual(new First, new First), "Object instances are equal");
    ok(!_.isEqual(new First, new Second), "Objects with different constructors and identical own properties are not equal");
    ok(!_.isEqual({value: 1}, new First), "Object instances and objects sharing equivalent properties are not equal");
    ok(!_.isEqual({value: 2}, new Second), "The prototype chain of objects should not be examined");

    // Circular Arrays.
    (a = []).push(a);
    (b = []).push(b);
    ok(_.isEqual(a, b), "Arrays containing circular references are equal");
    a.push(new String("Larry"));
    b.push(new String("Larry"));
    ok(_.isEqual(a, b), "Arrays containing circular references and equivalent properties are equal");
    a.push("Shemp");
    b.push("Curly");
    ok(!_.isEqual(a, b), "Arrays containing circular references and different properties are not equal");

    // More circular arrays #767.
    a = ["everything is checked but", "this", "is not"];
    a[1] = a;
    b = ["everything is checked but", ["this", "array"], "is not"];
    ok(!_.isEqual(a, b), "Comparison of circular references with non-circular references are not equal");

    // Circular Objects.
    a = {abc: null};
    b = {abc: null};
    a.abc = a;
    b.abc = b;
    ok(_.isEqual(a, b), "Objects containing circular references are equal");
    a.def = 75;
    b.def = 75;
    ok(_.isEqual(a, b), "Objects containing circular references and equivalent properties are equal");
    a.def = new Number(75);
    b.def = new Number(63);
    ok(!_.isEqual(a, b), "Objects containing circular references and different properties are not equal");

    // More circular objects #767.
    a = {everything: "is checked", but: "this", is: "not"};
    a.but = a;
    b = {everything: "is checked", but: {that:"object"}, is: "not"};
    ok(!_.isEqual(a, b), "Comparison of circular references with non-circular object references are not equal");

    // Cyclic Structures.
    a = [{abc: null}];
    b = [{abc: null}];
    (a[0].abc = a).push(a);
    (b[0].abc = b).push(b);
    ok(_.isEqual(a, b), "Cyclic structures are equal");
    a[0].def = "Larry";
    b[0].def = "Larry";
    ok(_.isEqual(a, b), "Cyclic structures containing equivalent properties are equal");
    a[0].def = new String("Larry");
    b[0].def = new String("Curly");
    ok(!_.isEqual(a, b), "Cyclic structures containing different properties are not equal");

    // Complex Circular References.
    a = {foo: {b: {foo: {c: {foo: null}}}}};
    b = {foo: {b: {foo: {c: {foo: null}}}}};
    a.foo.b.foo.c.foo = a;
    b.foo.b.foo.c.foo = b;
    ok(_.isEqual(a, b), "Cyclic structures with nested and identically-named properties are equal");

    // Chaining.
    ok(!_.isEqual(_({x: 1, y: undefined}).chain(), _({x: 1, z: 2}).chain()), 'Chained objects containing different values are not equal');

    a = _({x: 1, y: 2}).chain();
    b = _({x: 1, y: 2}).chain();
    equal(_.isEqual(a.isEqual(b), _(true)), true, '`isEqual` can be chained');

    // Objects from another frame.
    ok(_.isEqual({}, iObject));
  });

  test("isEmpty", function() {
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
  });

  // Setup remote variables for iFrame tests.
  var iframe = document.createElement('iframe');
  jQuery(iframe).appendTo(document.body);
  var iDoc = iframe.contentDocument || iframe.contentWindow.document;
  iDoc.write(
    "<script>\
      parent.iElement   = document.createElement('div');\
      parent.iArguments = (function(){ return arguments; })(1, 2, 3);\
      parent.iArray     = [1, 2, 3];\
      parent.iString    = new String('hello');\
      parent.iNumber    = new Number(100);\
      parent.iFunction  = (function(){});\
      parent.iDate      = new Date();\
      parent.iRegExp    = /hi/;\
      parent.iNaN       = NaN;\
      parent.iNull      = null;\
      parent.iBoolean   = new Boolean(false);\
      parent.iUndefined = undefined;\
      parent.iObject     = {};\
    </script>"
  );
  iDoc.close();

  test("isElement", function() {
    ok(!_.isElement('div'), 'strings are not dom elements');
    ok(_.isElement($('html')[0]), 'the html tag is a DOM element');
    ok(_.isElement(iElement), 'even from another frame');
  });

  test("isArguments", function() {
    var args = (function(){ return arguments; })(1, 2, 3);
    ok(!_.isArguments('string'), 'a string is not an arguments object');
    ok(!_.isArguments(_.isArguments), 'a function is not an arguments object');
    ok(_.isArguments(args), 'but the arguments object is an arguments object');
    ok(!_.isArguments(_.toArray(args)), 'but not when it\'s converted into an array');
    ok(!_.isArguments([1,2,3]), 'and not vanilla arrays.');
    ok(_.isArguments(iArguments), 'even from another frame');
  });

  test("isObject", function() {
    ok(_.isObject(arguments), 'the arguments object is object');
    ok(_.isObject([1, 2, 3]), 'and arrays');
    ok(_.isObject($('html')[0]), 'and DOM element');
    ok(_.isObject(iElement), 'even from another frame');
    ok(_.isObject(function () {}), 'and functions');
    ok(_.isObject(iFunction), 'even from another frame');
    ok(!_.isObject(null), 'but not null');
    ok(!_.isObject(undefined), 'and not undefined');
    ok(!_.isObject('string'), 'and not string');
    ok(!_.isObject(12), 'and not number');
    ok(!_.isObject(true), 'and not boolean');
    ok(_.isObject(new String('string')), 'but new String()');
  });

  test("isArray", function() {
    ok(!_.isArray(undefined), 'undefined vars are not arrays');
    ok(!_.isArray(arguments), 'the arguments object is not an array');
    ok(_.isArray([1, 2, 3]), 'but arrays are');
    ok(_.isArray(iArray), 'even from another frame');
  });

  test("isString", function() {
    var obj = new String("I am a string object");
    ok(!_.isString(document.body), 'the document body is not a string');
    ok(_.isString([1, 2, 3].join(', ')), 'but strings are');
    ok(_.isString(iString), 'even from another frame');
    ok(_.isString("I am a string literal"), 'string literals are');
    ok(_.isString(obj), 'so are String objects');
  });

  test("isNumber", function() {
    ok(!_.isNumber('string'), 'a string is not a number');
    ok(!_.isNumber(arguments), 'the arguments object is not a number');
    ok(!_.isNumber(undefined), 'undefined is not a number');
    ok(_.isNumber(3 * 4 - 7 / 10), 'but numbers are');
    ok(_.isNumber(NaN), 'NaN *is* a number');
    ok(_.isNumber(Infinity), 'Infinity is a number');
    ok(_.isNumber(iNumber), 'even from another frame');
    ok(!_.isNumber('1'), 'numeric strings are not numbers');
  });

  test("isBoolean", function() {
    ok(!_.isBoolean(2), 'a number is not a boolean');
    ok(!_.isBoolean("string"), 'a string is not a boolean');
    ok(!_.isBoolean("false"), 'the string "false" is not a boolean');
    ok(!_.isBoolean("true"), 'the string "true" is not a boolean');
    ok(!_.isBoolean(arguments), 'the arguments object is not a boolean');
    ok(!_.isBoolean(undefined), 'undefined is not a boolean');
    ok(!_.isBoolean(NaN), 'NaN is not a boolean');
    ok(!_.isBoolean(null), 'null is not a boolean');
    ok(_.isBoolean(true), 'but true is');
    ok(_.isBoolean(false), 'and so is false');
    ok(_.isBoolean(iBoolean), 'even from another frame');
  });

  test("isFunction", function() {
    ok(!_.isFunction(undefined), 'undefined vars are not functions');
    ok(!_.isFunction([1, 2, 3]), 'arrays are not functions');
    ok(!_.isFunction('moe'), 'strings are not functions');
    ok(_.isFunction(_.isFunction), 'but functions are');
    ok(_.isFunction(iFunction), 'even from another frame');
    ok(_.isFunction(function(){}), 'even anonymous ones');
  });

  test("isDate", function() {
    ok(!_.isDate(100), 'numbers are not dates');
    ok(!_.isDate({}), 'objects are not dates');
    ok(_.isDate(new Date()), 'but dates are');
    ok(_.isDate(iDate), 'even from another frame');
  });

  test("isRegExp", function() {
    ok(!_.isRegExp(_.identity), 'functions are not RegExps');
    ok(_.isRegExp(/identity/), 'but RegExps are');
    ok(_.isRegExp(iRegExp), 'even from another frame');
  });

  test("isFinite", function() {
    ok(!_.isFinite(undefined), 'undefined is not Finite');
    ok(!_.isFinite(null), 'null is not Finite');
    ok(!_.isFinite(NaN), 'NaN is not Finite');
    ok(!_.isFinite(Infinity), 'Infinity is not Finite');
    ok(!_.isFinite(-Infinity), '-Infinity is not Finite');
    ok(_.isFinite('12'), 'Numeric strings are numbers');
    ok(!_.isFinite('1a'), 'Non numeric strings are not numbers');
    ok(!_.isFinite(''), 'Empty strings are not numbers');
    var obj = new Number(5);
    ok(_.isFinite(obj), 'Number instances can be finite');
    ok(_.isFinite(0), '0 is Finite');
    ok(_.isFinite(123), 'Ints are Finite');
    ok(_.isFinite(-12.44), 'Floats are Finite');
  });

  test("isNaN", function() {
    ok(!_.isNaN(undefined), 'undefined is not NaN');
    ok(!_.isNaN(null), 'null is not NaN');
    ok(!_.isNaN(0), '0 is not NaN');
    ok(_.isNaN(NaN), 'but NaN is');
    ok(_.isNaN(iNaN), 'even from another frame');
    ok(_.isNaN(new Number(NaN)), 'wrapped NaN is still NaN');
  });

  test("isNull", function() {
    ok(!_.isNull(undefined), 'undefined is not null');
    ok(!_.isNull(NaN), 'NaN is not null');
    ok(_.isNull(null), 'but null is');
    ok(_.isNull(iNull), 'even from another frame');
  });

  test("isUndefined", function() {
    ok(!_.isUndefined(1), 'numbers are defined');
    ok(!_.isUndefined(null), 'null is defined');
    ok(!_.isUndefined(false), 'false is defined');
    ok(!_.isUndefined(NaN), 'NaN is defined');
    ok(_.isUndefined(), 'nothing is undefined');
    ok(_.isUndefined(undefined), 'undefined is undefined');
    ok(_.isUndefined(iUndefined), 'even from another frame');
  });

  if (window.ActiveXObject) {
    test("IE host objects", function() {
      var xml = new ActiveXObject("Msxml2.DOMDocument.3.0");
      ok(!_.isNumber(xml));
      ok(!_.isBoolean(xml));
      ok(!_.isNaN(xml));
      ok(!_.isFunction(xml));
      ok(!_.isNull(xml));
      ok(!_.isUndefined(xml));
    });
  }

  test("tap", function() {
    var intercepted = null;
    var interceptor = function(obj) { intercepted = obj; };
    var returned = _.tap(1, interceptor);
    equal(intercepted, 1, "passes tapped object to interceptor");
    equal(returned, 1, "returns tapped object");

    returned = _([1,2,3]).chain().
      map(function(n){ return n * 2; }).
      max().
      tap(interceptor).
      value();
    ok(returned == 6 && intercepted == 6, 'can use tapped objects in a chain');
  });

  test("has", function () {
     var obj = {foo: "bar", func: function () {} };
     ok (_.has(obj, "foo"), "has() checks that the object has a property.");
     ok (_.has(obj, "baz") == false, "has() returns false if the object doesn't have the property.");
     ok (_.has(obj, "func"), "has() works for functions too.");
     obj.hasOwnProperty = null;
     ok (_.has(obj, "foo"), "has() works even when the hasOwnProperty method is deleted.");
     var child = {};
     child.prototype = obj;
     ok (_.has(child, "foo") == false, "has() does not check the prototype chain for a property.")
  });
});
