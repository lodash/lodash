$(document).ready(function() {

  module("Utility functions (uniqueId, template)");

  test("utility: noConflict", function() {
    var underscore = _.noConflict();
    ok(underscore.isUndefined(_), "The '_' variable has been returned to its previous state.");
    var intersection = underscore.intersect([-1, 0, 1, 2], [1, 2, 3, 4]);
    equals(intersection.join(', '), '1, 2', 'but the intersection function still works');
    window._ = underscore;
  });

  test("utility: identity", function() {
    var moe = {name : 'moe'};
    equals(_.identity(moe), moe, 'moe is the same as his identity');
  });

  test('utility: breakLoop', function() {
    var result = null;
    _([1,2,3,4,5,6]).each(function(num) {
      result = num;
      if (num == 3) _.breakLoop();
    });
    equals(result, 3, 'broke out of a loop');
  });

  test("utility: uniqueId", function() {
    var ids = [], i = 0;
    while(i++ < 100) ids.push(_.uniqueId());
    equals(_.uniq(ids).length, ids.length, 'can generate a globally-unique stream of ids');
  });

  test("utility: functions", function() {
    var expected = ["all", "any", "bind", "bindAll", "breakLoop", "clone", "compact",
    "compose","defer", "delay", "detect", "each", "every", "extend", "filter", "first",
    "flatten", "foldl", "foldr", "forEach", "functions", "head", "identity", "include",
    "indexOf", "inject", "intersect", "invoke", "isArray", "isDate", "isElement", "isEmpty", "isEqual",
    "isFunction", "isNaN", "isNull", "isNumber", "isRegExp", "isString", "isUndefined", "keys", "last", "lastIndexOf", "map", "max",
    "methods", "min", "pluck", "range", "reduce", "reduceRight", "reject", "rest", "select",
    "size", "some", "sortBy", "sortedIndex", "tail", "template", "toArray", "uniq",
    "uniqueId", "values", "without", "wrap", "zip"];
    ok(_(expected).isEqual(_.methods()), 'provides a sorted list of functions');
  });

  test("utility: template", function() {
    var basicTemplate = _.template("<%= thing %> is gettin' on my noives!");
    var result = basicTemplate({thing : 'This'});
    equals(result, "This is gettin' on my noives!", 'can do basic attribute interpolation');
    var fancyTemplate = _.template("<ul><% for (key in people) { %><li><%= people[key] %></li><% } %></ul>");
    result = fancyTemplate({people : {moe : "Moe", larry : "Larry", curly : "Curly"}});
    equals(result, "<ul><li>Moe</li><li>Larry</li><li>Curly</li></ul>", 'can run arbitrary javascript in templates');
  });

});
