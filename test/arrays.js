$(document).ready(function() {

  module("Array-only functions (last, compact, uniq, and so on...)");

  test("arrays: first", function() {
    equals(_.first([1,2,3]), 1, 'can pull out the first element of an array');
    equals(_([1, 2, 3]).first(), 1, 'can perform OO-style "first()"');
    equals(_.first([1,2,3], 2).join(', '), '1, 2', 'can pass an index to first');
    var result = (function(){ return _.first(arguments); })(4, 3, 2, 1);
    equals(result, 4, 'works on an arguments object.');
    result = _.map([[1,2,3],[1,2,3]], _.first);
    equals(result.join(','), '1,1', 'works well with _.map');
  });

  test("arrays: rest", function() {
    var numbers = [1, 2, 3, 4];
    equals(_.rest(numbers).join(", "), "2, 3, 4", 'working rest()');
    equals(_.rest(numbers, 2).join(', '), '3, 4', 'rest can take an index');
    var result = (function(){ return _(arguments).tail(); })(1, 2, 3, 4);
    equals(result.join(', '), '2, 3, 4', 'aliased as tail and works on arguments object');
    result = _.map([[1,2,3],[1,2,3]], _.rest);
    equals(_.flatten(result).join(','), '2,3,2,3', 'works well with _.map');
  });

  test("arrays: last", function() {
    equals(_.last([1,2,3]), 3, 'can pull out the last element of an array');
    var result = (function(){ return _(arguments).last(); })(1, 2, 3, 4);
    equals(result, 4, 'works on an arguments object');
  });

  test("arrays: compact", function() {
    equals(_.compact([0, 1, false, 2, false, 3]).length, 3, 'can trim out all falsy values');
    var result = (function(){ return _(arguments).compact().length; })(0, 1, false, 2, false, 3);
    equals(result, 3, 'works on an arguments object');
  });

  test("arrays: flatten", function() {
    var list = [1, [2], [3, [[[4]]]]];
    equals(_.flatten(list).join(', '), '1, 2, 3, 4', 'can flatten nested arrays');
    var result = (function(){ return _.flatten(arguments); })(1, [2], [3, [[[4]]]]);
    equals(result.join(', '), '1, 2, 3, 4', 'works on an arguments object');
  });

  test("arrays: without", function() {
    var list = [1, 2, 1, 0, 3, 1, 4];
    equals(_.without(list, 0, 1).join(', '), '2, 3, 4', 'can remove all instances of an object');
    var result = (function(){ return _.without(arguments, 0, 1); })(1, 2, 1, 0, 3, 1, 4);
    equals(result.join(', '), '2, 3, 4', 'works on an arguments object');
  });

  test("arrays: uniq", function() {
    var list = [1, 2, 1, 3, 1, 4];
    equals(_.uniq(list).join(', '), '1, 2, 3, 4', 'can find the unique values of an unsorted array');

    var list = [1, 1, 1, 2, 2, 3];
    equals(_.uniq(list, true).join(', '), '1, 2, 3', 'can find the unique values of a sorted array faster');

    var result = (function(){ return _.uniq(arguments); })(1, 2, 1, 3, 1, 4);
    equals(result.join(', '), '1, 2, 3, 4', 'works on an arguments object');
  });

  test("arrays: intersect", function() {
    var stooges = ['moe', 'curly', 'larry'], leaders = ['moe', 'groucho'];
    equals(_.intersect(stooges, leaders).join(''), 'moe', 'can take the set intersection of two arrays');
    equals(_(stooges).intersect(leaders).join(''), 'moe', 'can perform an OO-style intersection');
    var result = (function(){ return _.intersect(arguments, leaders); })('moe', 'curly', 'larry');
    equals(result.join(''), 'moe', 'works an an arguments object');
  });

  test('arrays: zip', function() {
    var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
    var stooges = _.zip(names, ages, leaders);
    equals(String(stooges), 'moe,30,true,larry,40,,curly,50,', 'zipped together arrays of different lengths');
  });

  test("arrays: indexOf", function() {
    var numbers = [1, 2, 3];
    numbers.indexOf = null;
    equals(_.indexOf(numbers, 2), 1, 'can compute indexOf, even without the native function');
    var result = (function(){ return _.indexOf(arguments, 2); })(1, 2, 3);
    equals(result, 1, 'works on an arguments object');
  });

  test("arrays: lastIndexOf", function() {
    var numbers = [1, 0, 1, 0, 0, 1, 0, 0, 0];
    numbers.lastIndexOf = null;
    equals(_.lastIndexOf(numbers, 1), 5, 'can compute lastIndexOf, even without the native function');
    equals(_.lastIndexOf(numbers, 0), 8, 'lastIndexOf the other element');
    var result = (function(){ return _.lastIndexOf(arguments, 1); })(1, 0, 1, 0, 0, 1, 0, 0, 0);
    equals(result, 5, 'works on an arguments object');
  });

  test("arrays: range", function() {
    equals(_.range(0).join(''), '', 'range with 0 as a first argument generates an empty array');
    equals(_.range(4).join(' '), '0 1 2 3', 'range with a single positive argument generates an array of elements 0,1,2,...,n-1');
    equals(_.range(5, 8).join(' '), '5 6 7', 'range with two arguments a & b, a<b generates an array of elements a,a+1,a+2,...,b-2,b-1');
    equals(_.range(8, 5).join(''), '', 'range with two arguments a & b, b<a generates an empty array');
    equals(_.range(3, 10, 3).join(' '), '3 6 9', 'range with three arguments a & b & c, c < b-a, a < b generates an array of elements a,a+c,a+2c,...,b - (multiplier of a) < c');
    equals(_.range(3, 10, 15).join(''), '3', 'range with three arguments a & b & c, c > b-a, a < b generates an array with a single element, equal to a');
    equals(_.range(12, 7, -2).join(' '), '12 10 8', 'range with three arguments a & b & c, a > b, c < 0 generates an array of elements a,a-c,a-2c and ends with the number not less than b');
    equals(_.range(0, -10, -1).join(' '), '0 -1 -2 -3 -4 -5 -6 -7 -8 -9', 'final example in the Python docs');
  });

});
