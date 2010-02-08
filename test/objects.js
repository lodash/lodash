$(document).ready(function() {

  module("Object functions (values, extend, isEqual, and so on...)");

  test("objects: keys", function() {
    equals(_.keys({one : 1, two : 2}).join(', '), 'one, two', 'can extract the keys from an object');
  });

  test("objects: values", function() {
    equals(_.values({one : 1, two : 2}).join(', '), '1, 2', 'can extract the values from an object');
  });

  test("objects: functions", function() {
    var expected = ["all", "any", "bind", "bindAll", "breakLoop", "clone", "compact",
    "compose","defer", "delay", "detect", "each", "every", "extend", "filter", "first",
    "flatten", "foldl", "foldr", "forEach", "functions", "head", "identity", "include",
    "indexOf", "inject", "intersect", "invoke", "isArguments", "isArray", "isDate", "isElement", "isEmpty", "isEqual",
    "isFunction", "isNaN", "isNull", "isNumber", "isRegExp", "isString", "isUndefined", "keys", "last", "lastIndexOf", "map", "max",
    "methods", "min", "noConflict", "pluck", "range", "reduce", "reduceRight", "reject", "rest", "select",
    "size", "some", "sortBy", "sortedIndex", "tail", "tap", "template", "toArray", "uniq",
    "uniqueId", "values", "without", "wrap", "zip"];
    ok(_(expected).isEqual(_.methods(_)), 'provides a sorted list of functions');
    var obj = {a : 'dash', b : _.map, c : (/yo/), d : _.reduce};
    ok(_.isEqual(['b', 'd'], _.functions(obj)), 'can grab the function names of any passed-in object');
  });

  test("objects: extend", function() {
    var source = {name : 'moe'}, dest = {age : 50};
    _.extend(dest, source);
    equals(dest.name, 'moe', 'can extend an object with the attributes of another');
  });

  test("objects: clone", function() {
    var moe = {name : 'moe', lucky : [13, 27, 34]};
    var clone = _.clone(moe);
    equals(clone.name, 'moe', 'the clone as the attributes of the original');

    clone.name = 'curly';
    ok(clone.name == 'curly' && moe.name == 'moe', 'clones can change shallow attributes without affecting the original');

    clone.lucky.push(101);
    equals(_.last(moe.lucky), 101, 'changes to deep attributes are shared with the original');
  });

  test("objects: isEqual", function() {
    var moe   = {name : 'moe', lucky : [13, 27, 34]};
    var clone = {name : 'moe', lucky : [13, 27, 34]};
    ok(moe != clone, 'basic equality between objects is false');
    ok(_.isEqual(moe, clone), 'deep equality is true');
    ok(_(moe).isEqual(clone), 'OO-style deep equality works');
    ok(!_.isEqual(5, NaN), '5 is not equal to NaN');
    ok(_.isEqual(NaN, NaN), 'NaN is equal to NaN');
    ok(_.isEqual(new Date(100), new Date(100)), 'identical dates are equal');
    ok(_.isEqual((/hello/ig), (/hello/ig)), 'identical regexes are equal');
    ok(!_.isEqual(null, [1]), 'a falsy is never equal to a truthy');
  });

  test("objects: isEmpty", function() {
    ok(!_([1]).isEmpty(), '[1] is not empty');
    ok(_.isEmpty([]), '[] is empty');
    ok(!_.isEmpty({one : 1}), '{one : 1} is not empty');
    ok(_.isEmpty({}), '{} is empty');

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
      parent.iString    = 'hello';\
      parent.iNumber    = 100;\
      parent.iFunction  = (function(){});\
      parent.iDate      = new Date();\
      parent.iRegExp    = /hi/;\
      parent.iNaN       = NaN;\
      parent.iNull      = null;\
      parent.iUndefined = undefined;\
    </script>"
  );
  iDoc.close();

  test("objects: isElement", function() {
    ok(!_.isElement('div'), 'strings are not dom elements');
    ok(_.isElement($('html')[0]), 'the html tag is a DOM element');
    ok(_.isElement(iElement), 'even from another frame');
  });

  test("objects: isArguments", function() {
    var args = (function(){ return arguments; })(1, 2, 3);
    ok(!_.isArguments('string'), 'a string is not an arguments object');
    ok(!_.isArguments(_.isArguments), 'a function is not an arguments object');
    ok(_.isArguments(args), 'but the arguments object is an arguments object');
    ok(!_.isArguments(_.toArray(args)), 'but not when it\'s converted into an array');
    ok(!_.isArguments([1,2,3]), 'and not vanilla arrays.');
    ok(_.isArguments(iArguments), 'event from another frame');
  });

  test("objects: isArray", function() {
    ok(!_.isArray(arguments), 'the arguments object is not an array');
    ok(_.isArray([1, 2, 3]), 'but arrays are');
    ok(_.isArray(iArray), 'even from another frame');
  });

  test("objects: isString", function() {
    ok(!_.isString(document.body), 'the document body is not a string');
    ok(_.isString([1, 2, 3].join(', ')), 'but strings are');
    ok(_.isString(iString), 'even from another frame');
  });

  test("objects: isNumber", function() {
    ok(!_.isNumber('string'), 'a string is not a number');
    ok(!_.isNumber(arguments), 'the arguments object is not a number');
    ok(!_.isNumber(undefined), 'undefined is not a number');
    ok(_.isNumber(3 * 4 - 7 / 10), 'but numbers are');
    ok(_.isNumber(NaN), 'NaN is a number');
    ok(_.isNumber(Infinity), 'Infinity is a number');
    ok(_.isNumber(iNumber), 'even from another frame');
  });

  test("objects: isFunction", function() {
    ok(!_.isFunction([1, 2, 3]), 'arrays are not functions');
    ok(!_.isFunction('moe'), 'strings are not functions');
    ok(_.isFunction(_.isFunction), 'but functions are');
    ok(_.isFunction(iFunction), 'even from another frame');
  });

  test("objects: isDate", function() {
    ok(!_.isDate(100), 'numbers are not dates');
    ok(!_.isDate({}), 'objects are not dates');
    ok(_.isDate(new Date()), 'but dates are');
    ok(_.isDate(iDate), 'even from another frame');
  });

  test("objects: isRegExp", function() {
    ok(!_.isRegExp(_.identity), 'functions are not RegExps');
    ok(_.isRegExp(/identity/), 'but RegExps are');
    ok(_.isRegExp(iRegExp), 'even from another frame');
  });

  test("objects: isNaN", function() {
    ok(!_.isNaN(undefined), 'undefined is not NaN');
    ok(!_.isNaN(null), 'null is not NaN');
    ok(!_.isNaN(0), '0 is not NaN');
    ok(_.isNaN(NaN), 'but NaN is');
    ok(_.isNaN(iNaN), 'even from another frame');
  });

  test("objects: isNull", function() {
    ok(!_.isNull(undefined), 'undefined is not null');
    ok(!_.isNull(NaN), 'NaN is not null');
    ok(_.isNull(null), 'but null is');
    ok(_.isNull(iNull), 'even from another frame');
  });

  test("objects: isUndefined", function() {
    ok(!_.isUndefined(1), 'numbers are defined');
    ok(!_.isUndefined(null), 'null is defined');
    ok(!_.isUndefined(false), 'false is defined');
    ok(_.isUndefined(), 'nothing is undefined');
    ok(_.isUndefined(undefined), 'undefined is undefined');
    ok(_.isUndefined(iUndefined), 'even from another frame');
  });

  test("objects: tap", function() {
    var intercepted = null;
    var interceptor = function(obj) { intercepted = obj; };
    var returned = _.tap(1, interceptor);
    equals(intercepted, 1, "passes tapped object to interceptor");
    equals(returned, 1, "returns tapped object");

    returned = _([1,2,3]).chain().
      map(function(n){ return n * 2; }).
      max().
      tap(interceptor).
      value();
    ok(returned == 6 && intercepted == 6, 'can use tapped objects in a chain');
  });
});
