$(document).ready(function() {

  module("Function functions (bind, bindAll, and so on...)");

  test("functions: bind", function() {
    var context = {name : 'moe'};
    var func = function(arg) { return "name: " + (this.name || arg); };
    var bound = _.bind(func, context);
    equals(bound(), 'name: moe', 'can bind a function to a context');

    bound = _(func).bind(context);
    equals(bound(), 'name: moe', 'can do OO-style binding');

    bound = _.bind(func, null, 'curly');
    equals(bound(), 'name: curly', 'can bind without specifying a context');

    func = function(salutation, name) { return salutation + ': ' + name; };
    func = _.bind(func, this, 'hello');
    equals(func('moe'), 'hello: moe', 'the function was partially applied in advance');

    var func = _.bind(func, this, 'curly');
    equals(func(), 'hello: curly', 'the function was completely applied in advance');
  });

  test("functions: bindAll", function() {
    var curly = {name : 'curly'}, moe = {
      name    : 'moe',
      getName : function() { return 'name: ' + this.name; },
      sayHi   : function() { return 'hi: ' + this.name; }
    };
    curly.getName = moe.getName;
    _.bindAll(moe, 'getName', 'sayHi');
    curly.sayHi = moe.sayHi;
    equals(curly.getName(), 'name: curly', 'unbound function is bound to current object');
    equals(curly.sayHi(), 'hi: moe', 'bound function is still bound to original object');

    curly = {name : 'curly'};
    moe = {
      name    : 'moe',
      getName : function() { return 'name: ' + this.name; },
      sayHi   : function() { return 'hi: ' + this.name; }
    };
    _.bindAll(moe);
    curly.sayHi = moe.sayHi;
    equals(curly.sayHi(), 'hi: moe', 'calling bindAll with no arguments binds all functions to the object');
  });

  asyncTest("functions: delay", function() {
    var delayed = false;
    _.delay(function(){ delayed = true; }, 100);
    _.delay(function(){ ok(!delayed, "didn't delay the function quite yet"); }, 50);
    _.delay(function(){ ok(delayed, 'delayed the function'); start(); }, 150);
  });

  asyncTest("functions: defer", function() {
    var deferred = false;
    _.defer(function(bool){ deferred = bool; }, true);
    _.delay(function(){ ok(deferred, "deferred the function"); start(); }, 50);
  });

  test("functions: wrap", function() {
    var greet = function(name){ return "hi: " + name; };
    var backwards = _.wrap(greet, function(func, name){ return func(name) + ' ' + name.split('').reverse().join(''); });
    equals(backwards('moe'), 'hi: moe eom', 'wrapped the saluation function');
  });

  test("functions: compose", function() {
    var greet = function(name){ return "hi: " + name; };
    var exclaim = function(sentence){ return sentence + '!'; };
    var composed = _.compose(exclaim, greet);
    equals(composed('moe'), 'hi: moe!', 'can compose a function that takes another');

    composed = _.compose(greet, exclaim);
    equals(composed('moe'), 'hi: moe!', 'in this case, the functions are also commutative');
  });

});
