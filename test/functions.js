$(document).ready(function() {
  
  module("Function functions (bind, bindAll, and so on...)");
    
  test("functions: bind", function() {
    var context = {name : 'moe'};
    var func = function() { return "name: " + this.name; };
    var bound = _.bind(func, context);
    equals(bound(), 'name: moe', 'can bind a function to a context');
  });
  
  test("functions: bindAll", function() {
    var curly = {name : 'curly'}, moe = {
      name    : 'moe',
      getName : function() { return 'name: ' + this.name; },
      sayHi   : function() { return 'hi: ' + this.name; }
    };
    curly.getName = moe.getName;
    _.bindAll('getName', 'sayHi', moe);
    curly.sayHi = moe.sayHi;
    equals(curly.getName(), 'name: curly', 'unbound function is bound to current object');
    equals(curly.sayHi(), 'hi: moe', 'bound function is still bound to original object');
  });
  
});
