$(document).ready(function() {
  
  module("Utility functions (uniqueId, template)");
    
  test("utility: uniqueId", function() {
    var ids = [], i = 0;
    while(i++ < 100) ids.push(_.uniqueId());
    equals(_.uniq(ids).length, ids.length, 'can generate a globally-unique stream of ids');
  });
  
  test("utility: template", function() {
    var basicTemplate = _.template("<%= thing %> is gettin' on my noives!");
    var result = basicTemplate({thing : 'This'});
    equals(result, "This is gettin' on my noives!", 'can do basic attribute interpolation');
    var fancyTemplate = _.template("<% for (key in people) { %><li><%= people[key] %></li><% } %>");
    result = fancyTemplate({people : {moe : "Moe", larry : "Larry", curly : "Curly"}});
    equals(result, "<li>Moe</li><li>Larry</li><li>Curly</li>", 'can run arbitrary javascript in templates');
  });
  
});
