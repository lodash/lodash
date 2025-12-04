// Test file for multiple variables in _.template()
var _ = require('./lodash.js');

console.log('Testing multiple variables in _.template()...\n');

// Test 1: Basic two variables
console.log('Test 1: Basic two variables');
var compiled1 = _.template('<%= x %> + <%= y %> = <%= x + y %>', { 'variable': 'x, y' });
var result1 = compiled1(2, 3);
console.log('Result:', result1);
console.log('Expected: 2 + 3 = 5');
console.log('Pass:', result1 === '2 + 3 = 5', '\n');

// Test 2: Three variables
console.log('Test 2: Three variables');
var compiled2 = _.template('<%= a %> <%= b %> <%= c %>', { 'variable': 'a, b, c' });
var result2 = compiled2('Hello', 'World', '!');
console.log('Result:', result2);
console.log('Expected: Hello World !');
console.log('Pass:', result2 === 'Hello World !', '\n');

// Test 3: With escape delimiter
console.log('Test 3: With escape delimiter');
var compiled3 = _.template('<%- name %>, age <%= age %>', { 'variable': 'name, age' });
var result3 = compiled3('<script>', 25);
console.log('Result:', result3);
console.log('Expected: &lt;script&gt;, age 25');
console.log('Pass:', result3 === '&lt;script&gt;, age 25', '\n');

// Test 4: Backward compatibility - single object
console.log('Test 4: Backward compatibility - single object');
var compiled4 = _.template('<%= obj.x %> <%= obj.y %>');
var result4 = compiled4({ x: 'a', y: 'b' });
console.log('Result:', result4);
console.log('Expected: a b');
console.log('Pass:', result4 === 'a b', '\n');

// Test 5: Single variable with variable option (existing behavior)
console.log('Test 5: Single variable with variable option');
var compiled5 = _.template('hi <%= data.user %>!', { 'variable': 'data' });
var result5 = compiled5({ user: 'fred' });
console.log('Result:', result5);
console.log('Expected: hi fred!');
console.log('Pass:', result5 === 'hi fred!', '\n');

// Test 6: Check generated source
console.log('Test 6: Check generated source for multiple variables');
var compiled6 = _.template('<%= x %> <%= y %>', { 'variable': 'x, y' });
console.log('Generated function signature:', compiled6.source.split('\n')[0]);
console.log('Should contain: function(x, y)');
console.log('Pass:', compiled6.source.indexOf('function(x, y)') !== -1, '\n');

console.log('All tests completed!');
