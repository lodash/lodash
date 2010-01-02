(function() {

  var func = function(){};
  var date = new Date();
  var str = "a string";
  var numbers = [];
  for (var i=0; i<1000; i++) numbers.push(i);
  var objects = _.map(numbers, function(n){ return {num : n}; });
  var randomized = _.sortBy(numbers, function(){ return Math.random(); });

  JSLitmus.test('_.each()', function() {
    var timesTwo = [];
    _.each(numbers, function(num){ timesTwo.push(num * 2); });
    return timesTwo;
  });

  JSLitmus.test('_.isString', function() {
    return _.isString(str);
  });

  JSLitmus.test('_.isStringNew', function() {
    return _.isStringNew(str);
  });

})();