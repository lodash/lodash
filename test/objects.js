$(document).ready(function() {
  
  module("Object functions (values, extend, isEqual, and so on...)");
    
  test("objects: keys", function() {
    equals(_.keys({one : 1, two : 2}).join(', '), 'one, two', 'can extract the keys from an object');
  });
  
  test("objects: values", function() {
    equals(_.values({one : 1, two : 2}).join(', '), '1, 2', 'can extract the values from an object');
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
  });
  
  test("objects: isElement", function() {
    ok(!_.isElement('div'), 'strings are not dom elements');
    ok(_.isElement($('html')[0]), 'the html tag is a DOM element');
  });
  
  test("objects: isArray", function() {
    ok(!_.isArray(arguments), 'the arguments object is not an array');
    ok(_.isArray([1, 2, 3]), 'but arrays are');
  });
  
  test("objects: isFunction", function() {
    ok(!_.isFunction([1, 2, 3]), 'arrays are not functions');
    ok(!_.isFunction('moe'), 'strings are not functions');
    ok(_.isFunction(_.isFunction), 'but functions are');
  });
  
  test("objects: isUndefined", function() {
    ok(!_.isUndefined(1), 'numbers are defined');
    ok(!_.isUndefined(null), 'null is defined');
    ok(!_.isUndefined(false), 'false is defined');
    ok(_.isUndefined(), 'nothing is undefined');
    ok(_.isUndefined(undefined), 'undefined is undefined');
  });

});
