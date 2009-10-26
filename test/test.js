$(document).ready(function() {
  
  module("Collection functions (each, any, select, and so on...)");
    
  test("collections: _.each", function() {
    _.each(numbers, function(num, i){
      equals(num, i + 1, 'each iterators provide value and iteration count');
    });
  });
  
  test('collections: _.each and throwing "__break__"', function() {
    var answer = null;
    _.each(numbers, function(num){
      if ((answer = num) == 2) throw '__break__';
    });
    equals(2, answer, 'the loop broke in the middle');
  });
  
  test('collections: _.each can take a context object', function() {
    var answers = [];
    _.each(numbers, function(num) {
      answers.push(num * this.multiplier);
    }, {multiplier : 5});
    equals('5, 10, 15', answers.join(', '), 'context object property accessed');
  });
  
  test('collections: _.all', function() {
    ok(_.all([]), 'the empty set');
    ok(_.all([true, true, true]), 'all true values');
    ok(!_.all([true, false, true]), 'one false value');
    ok(_.all([0, 10, 28], function(num){ return num % 2 == 0; }), 'even numbers');
    ok(!_.all([0, 11, 28], function(num){ return num % 2 == 0; }), 'an odd number');
  });
  
  test('collections: _.any', function() {
    ok(!_.any([]), 'the empty set');
    ok(!_.any([false, false, false]), 'all false values');
    ok(_.any([false, false, true]), 'one true value');
    ok(!_.any([1, 11, 29], function(num){ return num % 2 == 0; }), 'all odd numbers');
    ok(_.any([1, 10, 29], function(num){ return num % 2 == 0; }), 'an even number');
  });
  
  test('collections: _.map', function() {
    var doubled = _.map(numbers, function(num){ return num * 2; });
    equals('2, 4, 6', doubled.join(', '), 'doubled numbers');
    var tripled = _.map(numbers, function(num){ return num * this.multiplier; }, {multiplier : 3});
    equals('3, 6, 9', tripled.join(', '), 'tripled numbers with context');
  });
  
  test('collections: _.detect', function() {
    var result = _.detect(numbers, function(num){ return num * 2 == 4; });
    equals(2, result, 'found the first "2" and broke the loop');
  });
  
  test('collections: _.select', function() {
    var evens = _.select(function([1,2,3,4,5,6], ))
  });
  
});