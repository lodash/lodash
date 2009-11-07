$(document).ready(function() {
  
  module("Underscore chaining.");
    
  test("chaining: map/flatten/reduce", function() {
    var lyrics = [
      "I'm a lumberjack and I'm okay",
      "I sleep all night and I work all day",
      "He's a lumberjack and he's okay",
      "He sleeps all night and he works all day"
    ];
    var counts = _(lyrics).chain()
      .map(function(line) { return line.split(''); })
      .flatten()
      .reduce({}, function(hash, l) { 
        hash[l] = hash[l] || 0;
        hash[l]++;
        return hash;
    }).get();
    ok(counts['a'] == 16 && counts['e'] == 10, 'counted all the letters in the song');
  });
  
  test("chaining: select/reject/sortBy", function() {
    var numbers = [1,2,3,4,5,6,7,8,9,10];
    numbers = _(numbers).chain().select(function(n) {
      return n % 2 == 0;
    }).reject(function(n) {
      return n % 4 == 0;
    }).sortBy(function(n) {
      return -n;
    }).get();
    equals(numbers.join(', '), "10, 6, 2", "filtered and reversed the numbers");
  });
  
});
