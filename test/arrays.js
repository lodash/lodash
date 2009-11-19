$(document).ready(function() {
  
  module("Array-only functions (last, compact, uniq, and so on...)");
    
  test("arrays: first", function() {
    equals(_.first([1,2,3]), 1, 'can pull out the first element of an array');
    equals(_([1, 2, 3]).first(), 1, 'can perform OO-style "first()"');
  });
  
  test("arrays: last", function() {
    equals(_.last([1,2,3]), 3, 'can pull out the last element of an array');
  });
  
  test("arrays: compact", function() {
    equals(_.compact([0, 1, false, 2, false, 3]).length, 3, 'can trim out all falsy values');
  });
  
  test("arrays: flatten", function() {
    var list = [1, [2], [3, [[[4]]]]];
    equals(_.flatten(list).join(', '), '1, 2, 3, 4', 'can flatten nested arrays');
  });
  
  test("arrays: without", function() {
    var list = [1, 2, 1, 0, 3, 1, 4];
    equals(_.without(list, 0, 1).join(', '), '2, 3, 4', 'can remove all instances of an object');
  });
  
  test("arrays: uniq", function() {
    var list = [1, 2, 1, 3, 1, 4];
    equals(_.uniq(list).join(', '), '1, 2, 3, 4', 'can find the unique values of an unsorted array');
    
    var list = [1, 1, 1, 2, 2, 3];
    equals(_.uniq(list, true).join(', '), '1, 2, 3', 'can find the unique values of a sorted array faster');
  });
  
  test("arrays: intersect", function() {
    var stooges = ['moe', 'curly', 'larry'], leaders = ['moe', 'groucho'];
    equals(_.intersect(stooges, leaders).join(''), 'moe', 'can take the set intersection of two arrays');
    equals(_(stooges).intersect(leaders).join(''), 'moe', 'can perform an OO-style intersection');
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
  });
  
  test("arrays: lastIndexOf", function() {
    var numbers = [1, 0, 1, 0, 0, 1, 0, 0, 0];
    numbers.lastIndexOf = null;
    equals(_.lastIndexOf(numbers, 1), 5, 'can compute lastIndexOf, even without the native function');
    equals(_.lastIndexOf(numbers, 0), 8, 'lastIndexOf the other element');
  });
  
  test("arrays: tail", function() {
    var numbers = [1, 2, 3, 4];
    equals(_.tail(numbers).join(", "), "2, 3, 4");
  });
  
  test("arrays: init", function() {
    var numbers = [1, 2, 3, 4];
    equals(_.init(numbers).join(", "), "1, 2, 3");
  });
  
  test("arrays: reverse", function() {
    var numbers = [1, 2, 4, 6];
    equals(_.reverse(numbers).join(", "), "6, 4, 2, 1");
  });
  
});
